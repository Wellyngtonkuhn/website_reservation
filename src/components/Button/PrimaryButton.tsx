import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
};

export default function PrimaryButton({ children, onClick }: ButtonProps) {
  return (
    <button
      type="submit"
      className="w-full bg-primary text-white rounded-lg p-2 text-sm font-semibold "
      onClick={onClick}
    >
      {children}
    </button>
  );
}
