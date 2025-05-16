import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function MainContainer({children}: Props) {
    return (
        <div className="bg-white/5 min-h-[85vh] backdrop-blur-md rounded-lg shadow-lg p-10">
            {children}
        </div>
    )
}