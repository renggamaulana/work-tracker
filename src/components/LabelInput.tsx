interface InputProps {
  htmlFor: string;
  label: string;
}

export default function LabelInput({ htmlFor, label }: InputProps) {
  return (
    <div className="text-white font-semibold">
      <label htmlFor={htmlFor}>{label}</label>
    </div>
  );
}
