import { ReactElement, useEffect, useRef, useState } from "react";
import { useUserInfoStore } from "../../stores/authentication/UserStore";
import { authEndPoints } from "../../api/authentication/AuthenticationEndPoints";
import { LoginUserReq, LoginUserRes } from "../../interfaces/AuthenticationReq";
import { useAuthTokenStore } from "../../stores/authentication/AuthTokenStore";
import { useNavigate } from "react-router";
import { routerEndPoints } from "../../constants/Constants";
import { accessLocalStorage } from "@/stores/browser/SessionStorage";
import LoginLoader from "../../components/LoginLoader";

const OtpForm = (): ReactElement => {
    const [timer, setTimer] = useState<number>(60);
    const [otp, setOtp] = useState<string>("");
    const setIsCredentialsChecked = useUserInfoStore((state) => state.setIsCredentialsChecked);
    const currentTimer = useRef<number>();
    const numberRegEx = new RegExp("^[0-9]+$");

    useEffect(() => {
        startTimer();

        if (timer === 0) {
            stopTimer();
            setIsCredentialsChecked(false);
        }

        return () => clearInterval(currentTimer.current);
    }, [timer]);

    const startTimer = (): void => {
        currentTimer.current = setInterval(() => {
            setTimer((prevState: number) => prevState - 1);
        }, 1000);
    };

    const stopTimer = (): void => {
        clearInterval(currentTimer.current);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const value: string = event.target.value;

        if ((numberRegEx.test(value) && value.length < 5) || value.length === 0) {
            setOtp(value);
        }
    };

    return (
        <div className={"flex flex-col items-center justify-center gap-8"}>
            <p className={"mt-8 font-normal text-white"}>
                {"We've sent you an email with the OTP. Please confirm below:"}
            </p>
            <LoginLoader>{timer}</LoginLoader>
            <div className={"flex items-center gap-4"}>
                <input
                    value={otp}
                    className={
                        "h-14 w-[148px] space-x-4 rounded border border-gray-800 bg-gray-800 px-8 py-3 text-center text-3xl tracking-widest text-white shadow-md outline-none hover:bg-gray-700"
                    }
                    placeholder={"OTP"}
                    onChange={handleChange}
                />
                <ValidateOtpButton otp={otp} />
            </div>
        </div>
    );
};

export default OtpForm;

type ValidateOtpButtonProps = {
    otp: string;
};

const ValidateOtpButton = ({ otp }: ValidateOtpButtonProps) => {
    const navigate = useNavigate();
    const email = useUserInfoStore((state) => state.userEmail);
    const { setIsCredentialsChecked, setIsUserLoggedIn, setIsTokenChecked } = useUserInfoStore((state) => ({
        setIsCredentialsChecked: state.setIsCredentialsChecked,
        setIsUserLoggedIn: state.setIsUserLoggedIn,
        setIsTokenChecked: state.setIsTokenChecked,
    }));
    const { setAccessToken, setRefreshToken } = useAuthTokenStore((state) => ({
        setAccessToken: state.setAccessToken,
        setRefreshToken: state.setRefreshToken,
    }));

    const handleClick = () => {
        const loginData: LoginUserReq = {
            email: email,
            otp: otp,
        };

        authEndPoints.API_AUTH_VALIDATE_OTP(loginData).then((response: LoginUserRes) => {
            if (response.access_token.length > 0 && response.refresh_token.length > 0) {
                setAccessToken(response.access_token);
                setRefreshToken(response.refresh_token);

                accessLocalStorage.SET_AUTHENTICATION_TOKEN({
                    access_token: response.access_token,
                    refresh_token: response.refresh_token,
                });
            }

            setIsUserLoggedIn(true);
            setIsTokenChecked(false);
            setIsCredentialsChecked(false);
            navigate(routerEndPoints.STEAM_PAGE);
        });
    };

    return (
        <button
            className={
                "h-11 w-24 self-center rounded-sm bg-gradient-to-r from-blue-400 to-blue-600 font-normal text-white shadow-md hover:from-blue-300 hover:to-blue-500"
            }
            onClick={handleClick}
        >
            {"VALIDATE"}
        </button>
    );
};
