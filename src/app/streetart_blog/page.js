import { db } from "@/utils/dbConnection";
import Header from "../components/Header";
import Link from "next/link";

// this is my code to get the data from my databse for the blogs.
export default async function getBlogPosts() {
  const fetchedBlogPosts = await db.query(`SELECT * FROM streetart_blog_posts`);
  const wrangledBlogPosts = fetchedBlogPosts.rows;
  console.log(fetchedBlogPosts);
  console.log("WrangledBlogPosts", wrangledBlogPosts);

  //this is my code to render the information from my database to the page.
  return (
    <div>
      <h1>Street Art Posts</h1>
      <ul>
        {wrangledBlogPosts.map((blog) => (
          <div key={blog.id}>
            <Link href={`/streetart_blog/${blog.id}`}>
              {blog.street_artist}
            </Link>
            {blog.location}
          </div>
        ))}
      </ul>
    </div>
  );
}
