import "./fileExplorer.scss";
export default function FileExplorerSkeleton() {
  return (
    <div className="fileExplorerSkeleton">
      <div className="breadCrumbsSkeleton"></div>
      <div className="fileExplorerListSkeleton">
        {Array.from({length: 10}).map((_, i) => (
          <div key={i} className="treeItemSkeleton"></div>
        ))}
      </div>
    </div>
  );
}
