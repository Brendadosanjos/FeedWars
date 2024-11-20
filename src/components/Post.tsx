import { useState, useEffect } from "react";
import { FormComents } from "./FormComents";
import { Separator } from "./ui/separator";

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
  user?: User;
};

export type PostType = {
  id: number;
  userId: number;
  content: string;
  hashtags: string[];
  publishedAt: string;
  comments: Comment[];
  user?: User;
};

export function Post(props: PostType) {
  const [comments, setComments] = useState(props.comments || []);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Busca os dados do "me" do data.json
  useEffect(() => {
    async function fetchCurrentUser() {
      try {
        const response = await fetch("http://localhost:3000/me");
        const data = await response.json();
        setCurrentUser(data[0]); // Assume que o "me" é um array com apenas um usuário
      } catch (error) {
        console.error("Erro ao carregar o usuário atual:", error);
      }
    }

    fetchCurrentUser();
  }, []);

  async function handleCommentSubmit(content: string) {
    if (!currentUser) return;

    const newComment = {
      userId: currentUser.id,
      content,
      publishedAt: new Date().toISOString(),
      likes: 0,
      user: currentUser,
    };

    setComments((prev) => [...prev, newComment]);
  }

  return (
    <div className="bg-zinc-800 rounded-xl flex flex-col p-10">
      <div className="flex items-center gap-4">
        <img
          src={props.user?.profileUrl || "public/default-profile.jpg"}
          alt={props.user?.name || "Autor do post"}
          className="w-16 h-16 border-2 border-sky-500 rounded-full"
        />
        <div>
          <h2 className="text-white font-bold">{props.user?.name}</h2>
          <p className="text-zinc-500">{props.user?.role}</p>
        </div>
      </div>

      <div className="flex flex-col py-5 gap-2">
        <p className="text-white">{props.content}</p>
        <p className="text-sky-500">{props.hashtags.join(", ")}</p>
      </div>

      <Separator className="bg-zinc-600 my-4" />

      {currentUser ? (
        <FormComents onSubmit={handleCommentSubmit} />
      ) : (
        <p className="text-zinc-500">Carregando...</p>
      )}

      <div className="py-5">
        {comments.map((comment, index) => (
          <div
            key={index}
            className="flex items-start gap-4 text-white border-b border-zinc-700 pb-4 mb-4"
          >
            <img
              src={comment.user?.profileUrl || "public/default-profile.jpg"}
              alt={comment.user?.name || "Comentário"}
              className="w-10 h-10 border-2 border-sky-500 rounded-full"
            />
            <div>
              <h4 className="font-bold text-sky-500">{comment.user?.name}</h4>
              <p className="text-zinc-500 text-sm">{comment.user?.role}</p>
              <p>{comment.content}</p>
              <span className="text-zinc-500 text-sm">
                {new Date(comment.publishedAt).toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
