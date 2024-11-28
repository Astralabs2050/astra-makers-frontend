import Register from "@/components/onboarding/Register";
import AuthRight from "@/shared/AuthRight";

export default function SignUp() {
  return (
    <div className="flex bg-white">
      <div className="flex justify-center w-[55%]">
        <Register />
      </div>
      <div className="w-[45%]">
        <AuthRight />
      </div>
    </div>
  );
}
