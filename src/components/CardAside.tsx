import { useEffect } from "react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";


export type me = {
  id: number
  name: string
  role: string
  profileUrl: string
}
export function CardAside() {

  async function getMe() {
    try {
      const response = await fetch(`http://localhost:3000/me`);
      if (!response.ok) throw new Error("Erro ao buscar os dados");
    } catch (error) {
      console.error("Erro ao buscar os dados do usuário:", error);
    }
  }

  useEffect(() => {
    getMe();
  }, []);;

  return (
    <div className=" bg-zinc-800 flex flex-col h-full w-60 rounded-xl justify-start">
      <header>
        <img
          src='public/backgroundcard.jpg'
          alt="darth vader"
          className="h-20 w-full rounded-xl"
        />
      </header>
      <main className="flex flex-col items-center rounded-xl gap-2 relative bottom-6">
        <img
          src="public/fotoperfil.jpg"
          alt="darth vader"
          className="w-20 rounded-full border-2 border-sky-600 "
        />
        <h2 className="font-bold text-white">{"Darth Vader"}</h2>
        <p className="text-zinc-500 text-lg">{"Sith"}</p>
      </main>
      <Separator orientation="horizontal" className="bg-zinc-700" />
      <footer className="flex justify-center items-center py-5">
        <Button className=" border-2 border-sky-600 text-sky-600 w-3/6 h-full hover:bg-sky-600 hover:text-black">
          Editar seu perfil
        </Button>
      </footer>
    </div>
  );
}