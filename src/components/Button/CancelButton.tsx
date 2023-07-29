import {  ComponentProps, ReactNode } from "react";

type ButtonProps = ComponentProps<'button'>

export default function CancelButton(props: ButtonProps) {
  return (
    <button
      {...props}
      className="w-full bg-white text-red-500 rounded-lg p-2 text-sm font-semibold border border-red-500 shadow-lg"
    >
      {props.children}
    </button>
  );
}
