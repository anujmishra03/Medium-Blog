import { Link } from "react-router-dom";
import { Avatar } from "./BlogCard";

export const Appbar = () => {
    return (
        <div className="border-b flex justify-between items-center px-10 py-4 bg-white shadow-sm">
            <Link to="/blogs" className="text-xl font-bold hover:text-gray-700 transition">
                Medium
            </Link>
            
            <div>
                <Link to={`/Publish`}>
                <button type="button" className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none
                 focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2
                  mb-2 ">New</button>
                  </Link>

                <Avatar size={"10"} name="Anuj" />
            </div>
        </div>
    );
};
