import { getUserRepos } from "../../server-actions/get-user-repos";
import "./reposList.scss";
import "../shared-styles.scss";
import Repo from "./Repo";

export default async function ReposList() {
  const response = await getUserRepos();
  const reposNames: string[] = response.map((repo: {name: any}) => repo.name);

  return (
    <div id="reposListContainer">
      <h2>Repositories</h2>
      <div id="reposList">
        {reposNames.map((repoName: string) => (
          <Repo key={repoName} repoName={repoName}/>
        ))}
      </div>
    </div>
  );
}
