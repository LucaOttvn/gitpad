"use client";
import "./breadCrumbs.scss";
import {usePathname} from "next/navigation";
import Link from "next/link";
import {PagesEnum} from "../../utils/enums";
import {useEffect, useRef} from "react";
import AnimatedDiv from "../animated/AnimatedDiv";

/**
 * Breadcrumbs at the top of the page to show the current folder's path and navigate through it.
 */
export default function BreadCrumbs() {
  const pathName = usePathname();
  const breadCrumbs = pathName.split("/").filter((x) => x);

  // Remove "file-explorer" from the path.
  const filteredBreadCrumbs = breadCrumbs.splice(1, breadCrumbs.length - 1);

  const scrollableRef = useRef<HTMLDivElement | null>(null);

  // Every time that the user navigates to a new folder, this effect is triggered making the last breadcrumb visibile by scrolling to it.
  useEffect(() => {
    scrollableRef.current?.scrollTo({
      left: scrollableRef.current.scrollWidth,
      behavior: "smooth",
    });
  }, [pathName]);

  // At the root of the tree, don't show breadcrumbs.
  if (filteredBreadCrumbs.length === 0) return null;

  // Breadcrumbs don't have to be visible in the login or file-editor page.
  if (pathName.includes(`/${PagesEnum.login}`) || pathName.includes(`/${PagesEnum.fileEditor}`)) return null;

  return (
    <div className="breadCrumbs">
      <div className="scrollableContent" ref={scrollableRef}>
        {filteredBreadCrumbs.map((breadCrumb, index) => {
          const href = `/${PagesEnum.fileExplorer}/${filteredBreadCrumbs.slice(0, index + 1).join("/")}`;
          return (
            <AnimatedDiv key={breadCrumb + index} className="breadCrumb">
              <Link href={href}>{`/${breadCrumb}`}</Link>
            </AnimatedDiv>
          );
        })}
      </div>
    </div>
  );
}
