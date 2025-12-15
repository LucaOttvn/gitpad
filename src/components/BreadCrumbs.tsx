"use client";
import { usePathname } from "next/navigation";
import "./shared-styles.scss";
import Link from "next/link";
import { PagesEnum } from "../utils/enums";

export default function BreadCrumbs() {
  const pathname = usePathname();
  const breadCrumbs = pathname.split("/").filter((x) => x);
  const filteredBreadCrumbs = breadCrumbs.splice(1, breadCrumbs.length - 1)

  if (filteredBreadCrumbs.length === 0) return null;

  return (
    <div className="breadCrumbs">
      <div className="scrollableContent">
        {filteredBreadCrumbs.map((breadCrumb, index) => {
          const href = `/${PagesEnum.fileExplorer}/${filteredBreadCrumbs.slice(0, index + 1).join("/")}`;
          return <Link key={breadCrumb + index} href={href} className="breadCrumb">{`/ ${breadCrumb}`}</Link>;
        })}
      </div>
    </div>
  );
}
