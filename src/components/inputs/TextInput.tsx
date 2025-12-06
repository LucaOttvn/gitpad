"use client";
import "./inputs.scss";

interface TextInputProps {
  name: string
  placeholder?: string;
  disabled?: boolean;
  state: {
    success: boolean;
    message: string;
  } | null;
}

export default function TextInput(props: TextInputProps) {
  return (
    <div className="textInputContainer">
      <input name={props.name} type="text" placeholder={props.placeholder || ""} disabled={props.disabled || false} required />

      {props.state?.message && (
        <span
          style={{
            background: props.state.success ? "var(--green)" : "var(--red)",
          }}
        >
          {props.state.message}
        </span>
      )}
    </div>
  );
}
