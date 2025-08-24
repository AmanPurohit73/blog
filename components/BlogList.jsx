import { blog_data } from "@/assets/assets";
import React, { useEffect, useState } from "react";
import BlogItem from "./BlogItem";
import axios from "axios";

const BlogList = () => {
  const [menu, setMenu] = useState("All");

  const [blogs, setBlogs] = useState([])

  const fetchBlogs = async() => {
    const response = await axios.get('/api/blog')
    setBlogs(response.data.blogs)
  }

  useEffect(()=>{
    fetchBlogs()
  },[])

  return (
    <div>
      <div className="flex justify-center gap-6 my-10">
        <button
          className={
            menu === "All" ? "bg-black text-white py-1 px-4 rounded-sm" : ""
          }
          onClick={() => setMenu("All")}
        >
          All
        </button>
        <button
          className={
            menu === "Technology"
              ? "bg-black text-white py-1 px-4 rounded-sm"
              : ""
          }
          onClick={() => setMenu("Technology")}
        >
          Technology
        </button>
        <button
          className={
            menu === "Startup" ? "bg-black text-white py-1 px-4 rounded-sm" : ""
          }
          onClick={() => setMenu("Startup")}
        >
          Startup
        </button>
        <button
          className={
            menu === "Lifestyle"
              ? "bg-black text-white py-1 px-4 rounded-sm"
              : ""
          }
          onClick={() => setMenu("Lifestyle")}
        >
          Lifestyle
        </button>
      </div>

      <div className="flex flex-wrap justify-around gap-1 gap-y-10 mb-16 xl:mx-24">
        {blogs
          .filter((item) => (menu === "All" ? true : item.category === menu))
          .map((item, index) => {
            return (
              <BlogItem
                key={index}
                id={item._id}
                image={item.image}
                category={item.category}
                description={item.description}
                title={item.title}
              />
            );
          })}
      </div>
    </div>
  );
};

export default BlogList;
