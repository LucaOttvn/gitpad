"use client";
import {Suspense, useEffect, useState} from "react";
import {getUserRepos} from "../../server-actions/get-user-repos";
import "./style.scss";
import {setCookie} from "cookies-next";

export default function ReposList() {
  const [repos, setRepos] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      const response = await getUserRepos();
      const reposNames: string[] = response.map((repo: {name: any}) => repo.name);
      setRepos(reposNames);
    })();
  }, []);

  const handleCookie = (selectedRepo: string) => {
    setCookie("selectedRepo", selectedRepo, {
      maxAge: 60 * 60 * 24 * 365 * 2, // 2 years (browser-capped)
      secure: process.env.NODE_ENV === "production",
      path: "/", // Available site-wide
      domain: undefined, // Your domain only
    });
  };

  return (
    <div id="reposListContainer">
      <h2>Repositories</h2>
      <div id="reposList">
        {repos.map((repoName: string) => (
          <button
            onClick={() => {
              handleCookie(repoName);
            }}
            key={repoName}
            className="repo clickableItem"
          >
            {repoName}
          </button>
        ))}
      </div>
    </div>
  );
}
