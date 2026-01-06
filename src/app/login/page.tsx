"use client";
import Button from "@/src/components/buttons/Button";
import {PagesEnum} from "@/src/utils/enums";
import {signIn, useSession} from "next-auth/react";
import Image from "next/image";
import {redirect} from "next/navigation";

export default function LoginPage() {
  const {data: session} = useSession();

  // If the user is logged already, redirect to the main page.
  if (session) redirect(PagesEnum.fileExplorer);

  return (
    <div className="w-full h-full center flex-col gap-15">
      <div className="start gap-5">
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
      <Button
        onClick={() => {
          signIn("github");
        }}
        iconSrc="/icons/github.svg"
        style={{
          width: "fit-content",
          color: 'var(--black)',
          background: 'var(--white)',
        }}
        label="Sign in with Github"
      />
    </div>
  );
}
