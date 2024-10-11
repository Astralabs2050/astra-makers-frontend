import LoaderSvg from "./LoaderSvg";

interface ButtonProps {
  width: string;
  action: string;
  fontSize: string;
  handleClick: () => void;
  inverse?: boolean;
  rounded?: boolean;
  isDisabled?: boolean;
  animate?: boolean;
}
export default function Button({
  width,
  action,
  inverse,
  rounded,
  fontSize,
  handleClick,
  isDisabled,
  animate,
}: ButtonProps) {
  return (
    <button
      className={`py-[1.6rem] ${width}  ${
        rounded ? "rounded-full" : "rounded-[1rem]"
      } ${fontSize} ${
        inverse
          ? isDisabled
            ? "border-astraLightBlack bg-white text-astraLightBlack"
            : "border-black border bg-white text-black"
          : isDisabled
          ? "bg-astraLightBlack text-white"
          : "bg-black text-white"
      } flex justify-center items-center`}
      onClick={handleClick}
      disabled={isDisabled}
    >
      {animate ? <LoaderSvg color={inverse ? "#000000" : "#ffffff"} /> : action}
    </button>
  );
}
