import { ReactElement } from "react";
import Logo from "../../components/Logo";
import SignupForm from "./SignupForm";
import { useUserInfoStore } from "../../stores/authentication/UserStore";
import OtpForm from "../LoginPage/OtpForm";
import { Link } from "react-router-dom";

const SignupPage = (): ReactElement => {
  const { isCredentialsChecked } = useUserInfoStore((state) => ({
    isCredentialsChecked: state.isCredentialsChecked,
  }));

  return (
    <div className="flex h-screen items-center justify-center bg-gray-900">
      <div className="flex w-[22rem] flex-col sm:w-[30rem] lg:w-[33rem]">
        <Logo />
        {isCredentialsChecked ? <OtpForm /> : <SignupForm />}
        <ExtraOptions />
      </div>
    </div>
  );
};

export default SignupPage;

const ExtraOptions = (): ReactElement => {
  return (
    <div className="mt-8 flex w-full justify-between">
      <p className="text-[0.6rem] text-gray-400 underline hover:text-gray-300 sm:text-[0.8rem]">
        {"Help, I can't register"}
      </p>
      <div className="flex gap-2">
        <p className="text-[0.55rem] text-gray-400 sm:text-[0.75rem]">{"You already have an account?"}</p>
        <Link
          to={"/signin"}
          className="cursor-pointer text-[0.6rem] text-gray-400 underline hover:text-gray-300 sm:text-[0.8rem]"
        >
          {"Log in"}
        </Link>
      </div>
    </div>
  );
};
