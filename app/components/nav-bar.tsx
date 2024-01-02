import { Link, useLocation } from "@remix-run/react";

import LogoIcon from "~/assets/icons/logo.svg";
import HomeIcon from "~/assets/icons/home.svg";
import ChatIcon from "~/assets/icons/chat.svg";

export default function NavBar() {
  const location = useLocation();

  return (
    <nav className="h-20 flex flex-row justify-between items-center px-8 bg-white">
      <div className="flex flex-row items-center">
        <img src={LogoIcon} alt="Logo Icon" className="h-9 w-9 mr-2" />
        <Link to="/" prefetch="intent" className="text-xl font-semibold">
          Type<span className="text-rose-400">URL</span>
        </Link>
      </div>
      <div className="flex flex-row">
        <Link
          to="/"
          prefetch="intent"
          className="flex flex-col items-center mr-5"
        >
          <img src={HomeIcon} alt="Logo Icon" className="h-5 w-5 mb-[2px]" />
          <p
            className={`font-inter text-xs tracking-wider text-secondary ${
              location.pathname === "/" ? "font-bold" : "font-normal"
            }`}
          >
            home
          </p>
        </Link>
        <Link
          to="/chat"
          prefetch="intent"
          className="flex flex-col items-center"
        >
          <img src={ChatIcon} alt="Logo Icon" className="h-5 w-5 mb-[2px]" />
          <p
            className={`font-inter text-xs tracking-wider text-secondary ${
              location.pathname.startsWith("/chat")
                ? "font-bold"
                : "font-normal"
            }`}
          >
            chat
          </p>
        </Link>
      </div>
    </nav>
  );
}
