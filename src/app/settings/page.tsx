import {Suspense} from "react";
import "./settings.scss";
import ReposList from "@/src/components/reposList/ReposList";
import LogoutButton from "@/src/components/buttons/LogoutButton";

export default function SettingsPage() {
  return (
    <div className="w-full h-full flex flex-col justify-start items-center p-4 gap-8 overflow-y-scroll">
      <h1
        className="w-full text-center"
        style={{
          fontSize: "200%",
        }}
      >
        Settings
      </h1>
      <Suspense fallback={<div>Loading</div>}>
        <ReposList />
      </Suspense>
      <LogoutButton />
    </div>
  );
}
