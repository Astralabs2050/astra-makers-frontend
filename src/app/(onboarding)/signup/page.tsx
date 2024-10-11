import Register from "@/components/onboarding/Register";
import AuthRight from "@/shared/AuthRight";

export default function SignUp() {
  return (
    <div className="flex justify-between bg-white">
      <Register />
      <AuthRight />
    </div>
  );
}
