import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
};

export default function SecondaryButton({ children }: ButtonProps) {
  return (
    <button
      type="submit"
      className="w-full rounded-lg p-2 text-sm font-semibold bg-white text-primary border border-primary "
    >
      {children}
    </button>
  );
}
