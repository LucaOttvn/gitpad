'use client'
import { PagesEnum } from "@/src/utils/enums";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";


export default function LoginPage() {
  const {data: session} = useSession();

  if (session) {
    redirect(PagesEnum.fileExplorer)
  }
  return (
    <div>
      <p>Not signed in</p>
      <button onClick={() => signIn("github")} className="mainButton"><span>Sign in with GitHub</span></button>
    </div>
  );
}
