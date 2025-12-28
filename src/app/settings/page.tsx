import {Suspense} from "react";
import "./settings.scss";
import ReposList from "@/src/components/reposList/ReposList";
import LogoutButton from "@/src/components/buttons/LogoutButton";
import ReposListSkeleton from "@/src/components/reposList/ReposListSkeleton";

export default function SettingsPage() {
  return (
    <div className="w-full h-full flex flex-col justify-start items-center p-4 gap-8 overflow-y-scroll">
      <h1
        className="w-full text-center"
      >
        Settings
      </h1>
      <Suspense fallback={<ReposListSkeleton/>}>
        <ReposList />
      </Suspense>
      <LogoutButton />
    </div>
  );
}
