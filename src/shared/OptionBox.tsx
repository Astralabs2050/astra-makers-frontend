import { selectedIcon } from "@/image";
import Image from "next/image";
interface OptionBoxProps {
  text: string;
  ticked: boolean;
  onClick: () => void;
}

export default function OptionBox({ text, ticked, onClick }: OptionBoxProps) {
  return (
    <div
      className={`px-[2rem] py-[1.6rem] flex w-[max-content] gap-x-[1.2rem] rounded-[.5rem] border cursor-pointer ${
        ticked && "border-astraBlue"
      }`}
      onClick={onClick}
    >
      <p className={`text-[1.6rem] ${ticked && "text-astraBlue"}`}>{text}</p>
      {ticked && (
        <div>
          <Image src={selectedIcon} alt="" width={24} height={24} />
        </div>
      )}
    </div>
  );
}
