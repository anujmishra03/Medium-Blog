import { useParams } from "react-router-dom";
// import { FullBlog } from "../components/FullBlog";
import { useBlog } from "../hooks"
import { FullBlog } from "../components/FullBlog";
import { Spinner } from "../components/Spinner";

export const Blog = ()=>{
    const{id} = useParams();
    const{loading, blog}  =useBlog({
        id: id|| ""
    });
    if (loading || !blog) {
        return  <div className="flex justify-center items-center h-screen">
            <Spinner/>
         </div>
        
    }
    return <div>
        <FullBlog blog={blog}/> 
    </div>
}