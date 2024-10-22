import { confirmIcon } from "@/image";
import Button from "@/shared/Button";
import Image from "next/image";

interface ConfirmationModalProps {
  isVisible: boolean;
  handleCancel: () => void;
  handleProceed: () => void;
  isLoading?: boolean;
}

export default function ConfirmationModal({
  isVisible,
  handleCancel,
  handleProceed,
  isLoading,
}: ConfirmationModalProps) {
  if (!isVisible) return null;
  return (
    <div
      className="fixed flex justify-center items-center inset-0 bg-black bg-opacity-20  z-[30]"
      onClick={handleCancel}
    >
      <div
        className="bg-white w-[50rem] p-[2.4rem] lg:p-[3.2rem] rounded-[1.8rem]"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="flex justify-center">
          <div className="w-[8rem] ">
            <Image
              src={confirmIcon}
              alt=""
              style={{
                width: "100%",
                height: "auto",
              }}
              height={20}
              width={70}
            />
          </div>
        </div>
        <p className="text-[1.8rem] mt-[2rem] lg:mt-[3rem] w-[60%] mx-auto text-black  text-center">
          You are sending an Application for this Job.
        </p>
        <p className="text-[1.4rem] mt-[.8rem] text-gray-500 mb-[2rem] text-center">
          A job has been created, the creator will reach out to you shortly.
        </p>
        <div className="mt-[1rem] flex justify-between w-[100%]">
          <div className="w-[48%]">
            <Button
              action="Cancel"
              fontSize="text-[1.4rem]"
              width="w-[100%]"
              handleClick={handleCancel}
              inverse
              rounded
            />
          </div>
          <div className="w-[48%]">
            <Button
              action="Confirm"
              fontSize="text-[1.4rem]"
              width="w-[100%]"
              handleClick={handleProceed}
              animate={isLoading}
              isDisabled={isLoading}
              rounded
            />
          </div>
        </div>
      </div>
    </div>
  );
}
