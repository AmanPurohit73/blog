import { ConnectDB } from "@/lib/config/db";
import blogModel from "@/lib/models/blogModel";
const { NextResponse } = require("next/server");
import { writeFile } from "fs/promises";
const fs = require('fs')

const loadDB = async () => {
  await ConnectDB();
};
loadDB();

export async function GET(request) {
  const blogId = request.nextUrl.searchParams.get("id");
  if (blogId) {
    const blog = await blogModel.findById(blogId);
    return NextResponse.json(blog);
  } else {
    const blogs = await blogModel.find({});
    return NextResponse.json({ blogs });
  }
}

export async function POST(request) {
  const formData = await request.formData();
  const timestamp = Date.now();

  const image = formData.get("image");
  const imageByteData = await image.arrayBuffer();
  const buffer = Buffer.from(imageByteData);
  const path = `./public/${timestamp}_${image.name}`;
  await writeFile(path, buffer);
  const imgUrl = `/${timestamp}_${image.name}`;

  const blogData = {
    title: `${formData.get("title")}`,
    description: `${formData.get("description")}`,
    category: `${formData.get("category")}`,
    author: `${formData.get("author")}`,
    image: `${imgUrl}`,
    authorImg: `${formData.get("authorImg")}`,
  };

  await blogModel.create(blogData);
  console.log("Blog Saved");

  return NextResponse.json({ success: true, msg: "Blog Added" });
}


export async function DELETE(request){
  const id = await request.nextUrl.searchParams.get('id')
  const blog = await blogModel.findById(id)
  fs.unlink(`./public${blog.image}`,() => {})
  await blogModel.findByIdAndDelete(id)
  return NextResponse.json({msg:"Blog Deleted"})

}ger