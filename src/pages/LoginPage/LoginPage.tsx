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
        <div className={"flex h-screen items-center justify-center bg-gray-900"}>
            <div className={"flex w-[32.5rem] flex-col"}>
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
        <div className={"mt-12 flex w-full justify-between"}>
            <p className={"text-sm text-gray-400 underline hover:text-gray-300"}>{"Help, I can't sign in"}</p>
            <div className={"flex gap-2"}>
                <p className={"text-sm text-gray-400"}>{"Don't have a Steam account?"}</p>
                <Link to={"/signup"} className={"cursor-pointer text-sm text-gray-400 underline hover:text-gray-300"}>
                    {"Create a Free Account"}
                </Link>
            </div>
        </div>
    );
};
