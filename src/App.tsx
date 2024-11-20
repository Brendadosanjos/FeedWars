import { CardAside } from "./components/CardAside";
import { Post } from "./components/Post";
import { Title } from "./components/Title";
import { useEffect, useState } from "react";

export type User = {
  id: number;
  name: string;
  role: string;
  profileUrl: string;
};

export type Comment = {
  userId: number;
  content: string;
  publishedAt: string;
  likes: number;
};

export type PostType = {
  id: number;
  userId: number;
  content: string;
  hashtags: string[];
  publishedAt: string;
  comments: Comment[];
};

export default function App() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const API_BASE_URL = "http://localhost:3000";

  // Função para buscar usuários
  async function getUsers() {
    try {
      const response = await fetch(`${API_BASE_URL}/users`);
      if (!response.ok) {
        throw new Error("Erro ao buscar usuários.");
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      setError("Não foi possível carregar os usuários.");
      return [];
    }
  }

  // Função para buscar posts
  async function getPosts() {
    try {
      const response = await fetch(`${API_BASE_URL}/posts`);
      if (!response.ok) {
        throw new Error("Erro ao buscar os posts.");
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      setError("Não foi possível carregar os posts.");
      return [];
    }
  }

  // Carregar posts e usuários ao montar o componente
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const [fetchedPosts, fetchedUsers] = await Promise.all([getPosts(), getUsers()]);
      setPosts(fetchedPosts);
      setUsers(fetchedUsers);
      setLoading(false);
    }

    fetchData();
  }, []);

  // Renderização da aplicação
  return (
    <>
      <Title />
      <div className="flex justify-center gap-8 items-start py-8 bg-zinc-900 h-full w-full">
        <CardAside />
        <div className="grid grid-cols-1 gap-12 w-full max-w-2xl">
          {loading && <p className="text-white">Carregando posts...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!loading && !error && posts.length === 0 && (
            <p className="text-zinc-500">Nenhum post disponível.</p>
          )}
          {!loading &&
            !error &&
            posts.map((post) => {
              const postAuthor = users.find((user) => user.id === post.userId);
              const commentsWithUsers = post.comments.map((comment) => ({
                ...comment,
                user: users.find((user) => user.id === comment.userId),
              }));
              return (
                <Post
                  key={post.id}
                  {...post}
                  user={postAuthor}
                  comments={commentsWithUsers}
                />
              );
            })}
        </div>
      </div>
    </>
  );
}
