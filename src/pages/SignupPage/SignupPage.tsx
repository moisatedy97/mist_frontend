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
        <div className={"flex h-screen items-center justify-center bg-gray-900"}>
            <div className={"flex w-[32.5rem] flex-col"}>
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
        <div className={"mt-8 flex w-full justify-between"}>
            <p className={"text-sm text-gray-400 underline hover:text-gray-300"}>{"Help, I can't register"}</p>
            <div className={"flex gap-2"}>
                <p className={"text-sm text-gray-400"}>{"You already have an account?"}</p>
                <Link to={"/signin"} className={"cursor-pointer text-sm text-gray-400 underline hover:text-gray-300"}>
                    {"Log in"}
                </Link>
            </div>
        </div>
    );
};
