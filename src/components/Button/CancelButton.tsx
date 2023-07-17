import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
};

export default function CancelButton({ children }: ButtonProps) {
  return (
    <button
      type="submit"
      className="w-full bg-white text-red-500 rounded-lg p-2 text-sm font-semibold border border-red-500 shadow-lg"
    >
      {children}
    </button>
  );
}
