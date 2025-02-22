import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

const postsPath = path.join(process.cwd(), "public", "posts.json");

export async function GET() {
  try {
    const postsData = await fs.readFile(postsPath, "utf-8");
    const posts = JSON.parse(postsData);
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error reading posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { title, summary, content } = await req.json();
    if (!title || !summary || !content) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const newPost = {
      slug: title.toLowerCase().replace(/\s+/g, "-"),
      title,
      summary,
      content,
      date: new Date().toISOString(),
    };

    // Read existing posts
    let posts = [];
    try {
      const postsData = await fs.readFile(postsPath, "utf-8");
      posts = JSON.parse(postsData);
    } catch (error) {
      console.warn("No existing posts found, initializing empty list.");
    }

    // Append new post
    posts.unshift(newPost);

    // Write updated posts list
    await fs.writeFile(postsPath, JSON.stringify(posts, null, 2), "utf-8");

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error("Error saving post:", error);
    return NextResponse.json(
      { error: "Failed to save post" },
      { status: 500 }
    );
  }
}
