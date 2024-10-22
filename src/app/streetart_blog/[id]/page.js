import Link from "next/link";
import Image from "next/image";
import { db } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";

export default async function idPage({ params }) {
  const blogs = await db.query(
    `SELECT * FROM streetart_blog_posts WHERE id = ${params.id}`
  );
  const { id } = params;
  const wrangledBlogs = blogs.rows;

  async function handleSubmitComment(formData) {
    "use server";
    const user_name = formData.get("user_name");
    const comment_date = formData.get["comment_date"];
    const user_comment = formData.get("user_comment");
    const street_artist_id = params.id;

    await db.query(
      `INSERT INTO streetart_blog_comments(user_name, comment_date, street_artist_id, user_comment) VALUES ($1, $2, $3, $4)`,
      [user_name, comment_date, street_artist_id, user_comment]
    );
    revalidatePath(`{/streetart_blog/${params.id}}`);
  }
  const comments = await db.query(
    `SELECT * FROM streetart_blog_comments WHERE street_artist_id = ${params.id}`
  );
  const wrangledComments = comments.rows;
  console.log(wrangledComments);
  return (
    <>
      {wrangledBlogs.map((blogs) => (
        <div key={blogs.id}>
          <h1>Have a look at the incredible work of {blogs.street_artist}</h1>
          <h2>{blogs.location}</h2>
          <Image
            src={blogs.src}
            alt="streetart and grafitti from around the world"
            width={500}
            height={300}
          />
          <p>{blogs.blog_description}</p>
        </div>
      ))}
      <h1>What do you think about this? Share your thoughts!</h1>
      <form action={handleSubmitComment}>
        <label htmlFor="user_name">Your name:</label>
        <input type="text" name="user_name" id="user_name" required />
        <label htmlFor="comment_date">Date:</label>
        <input type="date" name="comment_date" id="comment_date" required />
        <label htmlFor="user_comment">Your comment:</label>
        <input
          type="text"
          name="user_comment"
          id="user_comment"
          placeholder="Please share your thoughts"
          required
        />
        <button type="submit">Submit your comment</button>
      </form>
      {wrangledComments.map((comment) => (
        <div key={comment.id}>
          <h2>{comment.user_name}</h2>
          <h3>{comment.user_comment}</h3>
        </div>
      ))}
    </>
  );
}
