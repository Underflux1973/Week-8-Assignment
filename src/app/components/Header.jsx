import Link from "next/link";

export default function Header() {
  return (
    <>
      <nav>
        <Link href="/">Home</Link>
        <Link href="/streetart_blog">Street Art Blog</Link>
        <Link href="/new_streetart_post">Post New Blog</Link>
      </nav>
    </>
  );
}
