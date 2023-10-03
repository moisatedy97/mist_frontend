import { ReactElement } from "react";
import LoginForm from "./LoginForm";
import { authEndPoints } from "../../api/authentication/AuthenticationEndPoints";
import { useLoginStore } from "../../stores/authentication/LoginStore";
import { LoginUserReq } from "../../interfaces/AuthenticationReq";
import { AxiosError, AxiosResponse } from "axios";
import { useUserInfoStore } from "../../stores/authentication/UserStore";
import OtpForm from "./OtpForm";
import Logo from "../../components/Logo";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const LoginPage = (): ReactElement => {
    const { isCredentialsChecked, isCredentialsWrong } = useUserInfoStore((state) => ({
        isCredentialsChecked: state.isCredentialsChecked,
        isCredentialsWrong: state.isCredentialsWrong,
    }));

    return (
        <div className={"flex h-screen items-center justify-center bg-gray-900"}>
            <div className={"flex w-[32.5rem] flex-col"}>
                <Logo />
                {isCredentialsChecked ? (
                    <OtpForm />
                ) : (
                    <>
                        <LoginForm />
                        {isCredentialsWrong ? <WrongCredentials /> : undefined}
                        <SignInButton />
                    </>
                )}
                <ExtraOptions />
            </div>
        </div>
    );
};

export default LoginPage;

const SignInButton = (): ReactElement => {
    const { email, password } = useLoginStore((state) => ({ email: state.email, password: state.password }));
    const { setEmail, setIsCredentialsChecked, setIsCredentialsWrong } = useUserInfoStore((state) => ({
        setEmail: state.setUserEmail,
        setIsCredentialsChecked: state.setIsCredentialsChecked,
        setIsCredentialsWrong: state.setIsCredentialsWrong,
    }));

    const login = (): void => {
        const loginData: LoginUserReq = {
            email: email,
            password: password,
        };

        if (email.length > 0 && password.length > 0) {
            authEndPoints.API_AUTH_LOGIN(loginData).then((response: AxiosResponse<never>) => {
                if (response.status === 206) {
                    setEmail(email);
                    setIsCredentialsChecked(true);
                }

                if (response instanceof AxiosError && response.response?.status === 401) {
                    setIsCredentialsWrong(true);
                }
            });
        } else {
            setIsCredentialsWrong(true);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>): void => {
        if (event.key === "Enter") {
            login();
        }
    };

    const handleClick = () => {
        login();
    };

    return (
        <div className={"mt-10 flex w-full justify-center"}>
            <Button
                className={
                    "h-11 w-44 self-center rounded-sm bg-gradient-to-r from-blue-400 to-blue-600 shadow-md hover:from-blue-300 hover:to-blue-500"
                }
                onClick={handleClick}
                onKeyDown={handleKeyDown}
            >
                <p className={"font-medium text-white"}>{"Sign in"}</p>
            </Button>
        </div>
    );
};

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

const WrongCredentials = () => {
    return <p className={"mt-2 text-sm font-normal text-red-700"}>* Email/password incorrect</p>;
};
