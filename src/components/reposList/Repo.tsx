"use client";

import {getCookie, setCookie} from "cookies-next";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";

interface RepoProps {
  repoName: string;
}
/**
 * The repo selector for the whole app.
 */
export default function Repo({repoName}: RepoProps) {
  const router = useRouter();
  /**
   * This state exists to avoid hydration errors.
   * Without calling it in the useEffect(), getCookie() would be called both on the server and the client.
   * By doing that, it would renturn different results, undefined in the server and the actual value in the client (cookies are unreachable from the server).
   * This would cause a mismatch between the style of the pre-rendered code in the server and the actual style in the client.
   */
  const [selectedRepo, setSelectedRepo] = useState<string | null>(null);

  useEffect(() => {
    const cookie = getCookie("selectedRepo");
    setSelectedRepo(typeof cookie === "string" ? cookie : null);
  }, []);

  const handleCookie = (selected: string) => {
    setCookie("selectedRepo", selected, {
      maxAge: 60 * 60 * 24 * 365 * 2,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      domain: undefined,
    });
    setSelectedRepo(selected);
    router.refresh();
  };

  const isSelected = selectedRepo === repoName;

  return (
    <button onClick={() => handleCookie(repoName)} className="treeItem clickableItem">
      <span
        style={{
          width: '100%',
          background: isSelected ? "var(--blue)" : "",
          color: isSelected ? "var(--white)" : "",
          padding: "0 0.5rem",
        }}
      >
        {repoName}
      </span>
    </button>
  );
}
