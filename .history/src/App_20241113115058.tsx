import { useEffect, useState } from "react";
import { CardAside } from "./components/CardAside";
import { Post } from "./components/Post";
import { Title } from "./components/Title";

//Estou fazendo a tipagem de acordo com o banco de dados isso aqui é o que vai receber os dados
export type User = {
  id: number;
  name: string;
  role: string;
  profileUrl: string;
};

export type Post = {
  id: number;
  userId: number;
  content: string;
  hashtags: string[];
  publishedAt: string;
  comments: Comment[];
};

export type Comments = {
  userId: number;
  content: string;
  publishedAt: string;
  likes: number;
};

export default function App() {
  const [posts, setPosts] = useState<Post[]>([]);

  async function getPost() {
    try {
      const response = await fetch("http://localhost:3000/posts");
      const data: Post[] = await response.json();
      setPosts(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getPost();
  }, []);

  return (
    <>
      <Title />
      <div className="flex justify-center gap-8 items-start py-8 bg-zinc-900 h-full w-screen">
        <CardAside />
        <div className="grid grid-cols-1 gap-12 w-full max-w-2xl">
          {posts.map((post) => (
            <Post key={post.id} {...post} />
          ))}
        </div>
      </div>
    </>
  );
}