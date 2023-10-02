import { ReactElement } from "react";
import Logo from "../../components/Logo";
import SignupForm from "./SignupForm";
import { useSignupStore } from "../../stores/authentication/SignupStore";
import { authEndPoints } from "../../api/authentication/AuthenticationEndPoints";
import { SignupUserReq } from "../../interfaces/AuthenticationReq";
import { AxiosError, AxiosResponse } from "axios";
import { useUserInfoStore } from "../../stores/authentication/UserStore";
import OtpForm from "../LoginPage/OtpForm";

const SignupPage = (): ReactElement => {
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
                        <SignupForm />
                        {isCredentialsWrong ? <WrongCredentials /> : undefined}
                        <SignupButton />
                    </>
                )}
            </div>
        </div>
    );
};

export default SignupPage;

const SignupButton = (): ReactElement => {
    const { firstName, lastName, email, password } = useSignupStore((state) => ({
        firstName: state.firstName,
        lastName: state.lastName,
        email: state.email,
        password: state.password,
    }));
    const { setEmail, setIsCredentialsChecked, setIsCredentialsWrong } = useUserInfoStore((state) => ({
        setEmail: state.setUserEmail,
        setIsCredentialsChecked: state.setIsCredentialsChecked,
        setIsCredentialsWrong: state.setIsCredentialsWrong,
    }));

    const handleClick = () => {
        if (email.length > 0 && password.length > 0) {
            const signupData: SignupUserReq = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
            };

            authEndPoints.API_AUTH_SIGNUP(signupData).then((response: AxiosResponse<never>) => {
                if (response.status == 200) {
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

    return (
        <div className={"mt-10 flex w-full justify-center"}>
            <button
                className={
                    "h-11 w-44 self-center rounded-sm bg-gradient-to-r from-blue-400 to-blue-600 shadow-md hover:from-blue-300 hover:to-blue-500"
                }
                onClick={handleClick}
            >
                <p className={"font-medium text-white"}>{"Sign up"}</p>
            </button>
        </div>
    );
};

const WrongCredentials = (): ReactElement => {
    return <p className={"mt-2 text-sm font-normal text-red-700"}>* Email/password incorrect or required</p>;
};
