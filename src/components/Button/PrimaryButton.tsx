import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
};

export default function PrimaryButton({ children }: ButtonProps) {
  return (
    <button
      type="submit"
      className="w-full bg-primary text-white rounded-lg p-2 text-sm font-semibold "
    >
      {children}
    </button>
  );
}
