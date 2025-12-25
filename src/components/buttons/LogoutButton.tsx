'use client'
import {signOut} from "next-auth/react";
import Button from "./Button";

export default function LogoutButton() {
  return (
    <Button
      onClick={() => {
        signOut();
      }}
      iconSrc="/icons/logout.svg"
      label="Logout"
      style={{
        width: 'fit-content',
        border: 'solid 1px var(--lightGrey)',
      }}
    />
  );
}
