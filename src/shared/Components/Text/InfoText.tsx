import { IoIosInformationCircle } from 'react-icons/io';

export default function InfoText({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-1.5 text-primary">
      <span>
        <IoIosInformationCircle />
      </span>
      <p className="text-sm">{text}</p>
    </div>
  );
}
