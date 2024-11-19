"use client";
import {
  logoutIcon,
  notificationSettingsIcon,
  paymentSettingsIcon,
  profileSettingsIcon,
  securitySettingsIcon,
} from "@/image";
import { TOKEN_NAME, USER_PROFILE } from "@/network/constant";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SettingsBox() {
  const route = useRouter();
  const handleSignOut = () => {
    sessionStorage.removeItem(TOKEN_NAME);
    sessionStorage.removeItem(USER_PROFILE);
    route.push("/");
  };
  return (
    <div className="p-[5rem] flex flex-wrap gap-[2.5rem]">
      {[
        {
          icon: profileSettingsIcon,
          title: "Profile Settings",
          description:
            " Your name, contact details and other personal information.",
          link: "/profile-settings",
        },
        {
          icon: securitySettingsIcon,
          title: "Password & Security",
          description:
            " Change your password and other account security preferences.",
          link: "/security-settings",
        },
        {
          icon: notificationSettingsIcon,
          title: "Notification Settings",
          description: "Notification and alert preferences.",
          link: "/notification-settings",
        },
        {
          icon: paymentSettingsIcon,
          title: "Payment Settings",
          description: "Setup your payment through Escrow",
          link: "/",
        },
        {
          icon: logoutIcon,
          title: "Log Out",
          description: "Sign out of your account",
          link: "",
        },
      ].map((item, index) => (
        <div
          key={index}
          className="p-[3rem] border rounded-[1rem] w-[30rem] h-[24rem] cursor-pointer"
          onClick={index === 4 ? handleSignOut : () => route.push(item.link)}
        >
          <div>
            <Image src={item.icon} alt="" height={48} width={48} />
          </div>
          <p
            className={`text-[1.8rem] font-bold mt-[3rem] mb-[1.5rem] ${
              index === 4 && "text-astraRed"
            }`}
          >
            {item.title}
          </p>
          <p
            className={`text-[1.5rem]   ${
              index === 4 ? "text-astraRed" : "text-astraTextGrey"
            }`}
          >
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
}
