"use client";
import {PagesEnum} from "@/src/utils/enums";
import {signIn, useSession} from "next-auth/react";
import Image from "next/image";
import {redirect} from "next/navigation";

export default function LoginPage() {
  const {data: session} = useSession();

  if (session) {
    redirect(PagesEnum.fileExplorer);
  }
  return (
    <div className="w-full h-full center flex-col gap-10">
      <div className="start gap-3">
        <Image
          src="/icons/GitPad.png"
          alt="Logo"
          width={55}
          height={55}
          style={{
            borderRadius: "50%",
          }}
        />
        <h1 style={{fontSize: "250%"}}>GitPad</h1>
      </div>
      <button onClick={() => signIn("github")} className="mainButton clickableItem">
        <Image
          src="/icons/github.svg"
          alt="Logo"
          width={25}
          height={25}
          style={{
            marginLeft: '1rem'
          }}
        />
        <span>Sign in with Github</span>
      </button>
    </div>
  );
}
