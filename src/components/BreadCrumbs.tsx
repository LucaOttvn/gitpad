"use client";
import {usePathname} from "next/navigation";
import './shared-styles.scss'

interface BreadCrumbsProps {}

export default function BreadCrumbs(props: BreadCrumbsProps) {
  const pathname = usePathname();
  console.log(pathname);
  const breadCrumbs = pathname.split("/");

  return (
    <div className="breadCrumbs">
      {breadCrumbs.map((breadCrumb, index) => (
        <span key={breadCrumb + index} className="breadCrumb">{`/ ${breadCrumb}`}</span>
      ))}
    </div>
  );
}
