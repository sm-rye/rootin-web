interface LabelProps {
  inputId?: string;
  inputName: string;
}

export default function Label({ inputId = '', inputName }: LabelProps) {
  return (
    <label htmlFor={inputId} className="text-sm text-primary-black">
      {inputName}
    </label>
  );
}
