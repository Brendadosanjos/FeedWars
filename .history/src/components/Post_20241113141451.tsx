import { Post as PostType, User } from "@/App";
import { FormComents } from "./FormComents";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { useEffect, useState } from "react";

export function Post(props: PostType) {
    const [user, setUser] = useState<User>();
  
    async function getUser() {
      try {
        const response = await fetch(
          `http://localhost:3000/users/${props.userId}`
        );
        const data: User = await response.json();
        setUser(data);
      } catch (error) {
        console.log(error);
      }
    }
  
    useEffect(() => {
      getUser();
    });
  
    return (
      <>
        <div className=" bg-zinc-800 rounded-xl flex flex-col p-10">
          <div className="flex">
            <img
              src={Users?.profileUrl}
              alt="darth vader serio"
              className="w-16 h-16 border-2 border-sky-500 rounded-xl"
            />
            <div className="flex flex-col px-3">
              <h2 className="text-white font-bold">{user?.name}</h2>
              <p className="text-zinc-500">{user?.role}</p>
            </div>
          </div>
          <div className=" flex flex-col py-5 gap-2">
            <p className="text-white">
              {props.content}
            </p>
            <p className="text-sky-500">{props.hashtags.join(', ')}</p>
          </div>
  
          <Separator className="bg-zinc-600 my-4" />
          <div className="py-5">
            <FormComents />
          </div>
          <Button className="w-36 h-10 bg-sky-500">Enviar</Button>
        </div>
      </>
    );
  }