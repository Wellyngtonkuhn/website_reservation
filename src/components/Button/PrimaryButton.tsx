import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
};

export default function PrimaryButton({ children }: ButtonProps) {
  return (
    <button
      type="submit"
      className="bg-primary text-white w-full rounded-lg p-2 text-sm font-semibold "
    >
      {children}
    </button>
  );
}
