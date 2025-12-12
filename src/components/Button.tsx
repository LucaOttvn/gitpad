"use client";;
import Image from "next/image";

interface ButtonProps {
  onClick: () => any;
  disabled?: boolean;
  label?: string;
  className?: string;
  iconSrc?: string;
}

export default function Button(props: ButtonProps) {
  return (
    <button
      className={`mainButton clickableItem ${props.className || ""}`}
      disabled={props.disabled}
      onClick={() => {
        props.onClick()
      }}
    >
      {props.iconSrc && <Image src={props.iconSrc} alt="back" className="ml-4" width={20} height={20} />}
      <span style={{marginLeft: "0.5rem"}}>{props.label}</span>
    </button>
  );
}
