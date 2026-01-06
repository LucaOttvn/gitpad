"use client";
import Image from "next/image";
import { CSSProperties } from "react";

interface ButtonProps {
  onClick: () => any;
  disabled?: boolean;
  label?: string;
  className?: string;
  iconSrc?: string;
  style?: CSSProperties;
}

export default function Button(props: ButtonProps) {
  return (
    <button
      className={`mainButton clickableItem ${props.className || ""}`}
      disabled={props.disabled}
      onClick={() => {
        props.onClick();
      }}
      style={props.style}
    >
      {props.iconSrc && <Image src={props.iconSrc} alt="back" className="ml-4" width={25} height={25} />}
      <span style={{marginLeft: "0.5rem"}}>{props.label}</span>
    </button>
  );
}
