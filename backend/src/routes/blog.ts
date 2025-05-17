import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from "hono/jwt";
import {createBlogInput, updateBlogInput} from "@chifuyu106/common";

// Ts can't read toml files so it doesn't know the type of the DATABASE_URL
export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();


// Authorization
blogRouter.use("/*", async (c, next) => {
  const authHeader = c.req.header("authorization") || "";
  const token = authHeader.replace("Bearer ", "").trim(); // 👈 extract token only

  try {
    const user = await verify(token, c.env.JWT_SECRET);
    if (user) {
      c.set("userId", user.id);
      await next();
    } else {
      c.status(403);
      return c.json({ message: "You are not logged in" });
    }
  } catch (error) {
    c.status(401);
    return c.json({ message: "You are not logged in" });
  }
});


// cretae a blog
blogRouter.post("/", async (c) => {
  const body = await c.req.json();

  const {success} = createBlogInput.safeParse(body);
  if(!success){
    c.status(411);
    return c.json({message: "Inputs not correct"});
  }
  const authorId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blog = await prisma.blog.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: Number(authorId),
    },
  });

  return c.json({
    id: blog.id,
  });
});


// update a blog
blogRouter.put("/", async (c) => {
  const body = await c.req.json();

  const {success} = updateBlogInput.safeParse(body);
  if(!success){
    c.status(411);
    return c.json({message: "Inputs not correct"});
  }
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blog = await prisma.blog.update({
    where: {
      id: Number(body.id),
    },
    data: {
      title: body.title,
      content: body.content,
    },
  });

  return c.json({
    id: blog.id,
  });
});

//   Todo: Pagination
// all blogs
blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blogs = await prisma.blog.findMany({
    select:{
      content: true,
      title:true,
      id: true,
      author:{
        select:{
          name: true 
        }
      }
    }
  });

  return c.json({
    blogs,
  });
});

// blog by id
blogRouter.get("/:id", async (c) => {
  const id = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blog = await prisma.blog.findFirst({
      where: {
        id: Number(id),
      },
      select:{
        id: true,
        title: true,
        content: true,
        author:{
          select:{
            name: true
          }
        }
      }
    });

    return c.json({
      blog,
    });
  } catch (error) {
    console.log(error);
    c.status(411); // 4
    return c.json({ message: "Error while fetching blog post" });
  }
});