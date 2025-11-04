import PostDetail from "@/app/detailposts/temp";


interface Props {
  params: { id: string };
}

const PostPage = async ({ params }: Props) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${params.id}`);
  const data = await res.json();

  if (!data.post) return <p>Post not found</p>;

  return <PostDetail post={data.post} />;
};

export default PostPage;
