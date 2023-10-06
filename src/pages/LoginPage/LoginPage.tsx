import { ReactElement } from "react";
import { Link } from "react-router-dom";
import Logo from "../../components/Logo";
import { useUserInfoStore } from "../../stores/authentication/UserStore";
import LoginForm from "./LoginForm";
import OtpForm from "./OtpForm";

const LoginPage = (): ReactElement => {
  const { isCredentialsChecked } = useUserInfoStore((state) => ({
    isCredentialsChecked: state.isCredentialsChecked,
  }));

  return (
    <div className="flex h-screen items-center justify-center bg-gray-900">
      <div className="flex w-[22rem] flex-col sm:w-[30rem] lg:w-[33rem]">
        <Logo />
        {isCredentialsChecked ? <OtpForm /> : <LoginForm />}
        <ExtraOptions />
      </div>
    </div>
  );
};

export default LoginPage;

const ExtraOptions = (): ReactElement => {
  return (
    <div className="mt-6 flex w-full items-center justify-between gap-1">
      <p className="text-[0.6rem] text-gray-400 underline hover:text-gray-300 sm:text-[0.8rem]">
        {"Help, I can't sign in"}
      </p>
      <div className="flex items-center gap-2">
        <p className="text-[0.55rem] text-gray-400 sm:text-[0.75rem]">{"Don't have a Steam account?"}</p>
        <Link
          to={"/signup"}
          className="cursor-pointer text-[0.6rem] text-gray-400 underline hover:text-gray-300 sm:text-[0.8rem]"
        >
          {"Create a Free Account"}
        </Link>
      </div>
    </div>
  );
};
