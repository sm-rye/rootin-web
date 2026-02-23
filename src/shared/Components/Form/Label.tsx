interface LabelProps {
  inputId?: string;
  inputName: string;
}

export default function Label({ inputId = '', inputName }: LabelProps) {
  return (
    <label htmlFor={inputId} className="text-lg text-primary-black">
      {inputName}
    </label>
  );
}
