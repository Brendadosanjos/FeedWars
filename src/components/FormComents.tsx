import { useState } from "react";

type FormComentsProps = {
  onSubmit: (content: string) => Promise<void>;
};

export function FormComents({ onSubmit }: FormComentsProps) {
  const [comment, setComment] = useState("");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (comment.trim() === "") return;

    await onSubmit(comment);
    setComment(""); // Limpa o campo após o envio
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Escreva um comentário..."
        className="p-2 rounded bg-zinc-900 text-white"
      />
      <button
        type="submit"
        className="bg-sky-500 text-white py-2 px-4 rounded hover:bg-sky-600 w-28"
      >
        Publicar
      </button>
    </form>
  );
}
