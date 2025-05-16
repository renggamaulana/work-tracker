import { ReactNode } from "react";

interface ButtonSubmitProps {
  children: ReactNode;
    disabled?: boolean; 
}

export default function ButtonSubmit({ children }: ButtonSubmitProps) {
  return (
    <button
      type="submit"
      className="text-white font-semibold rounded-lg bg-sky-600/40 hover:bg-sky-400/40 self-baseline px-3 py-1 cursor-pointer"
    >
      {children}
    </button>
  );
}
