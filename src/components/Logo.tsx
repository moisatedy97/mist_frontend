import { ReactElement } from "react";
import steamLogo from "../assets/steam-logo.svg";

const Logo = (): ReactElement => {
  const appName: string = import.meta.env.VITE_APP_NAME;

  return (
    <div className="flex items-center gap-2">
      <img className="h-14 w-14 rotate-180 stroke-white sm:h-16 sm:w-16" src={steamLogo} alt={"steam-logo"} />
      <h1 className="text-2xl font-bold text-white hover:text-blue-600">{appName}</h1>
    </div>
  );
};

export default Logo;
