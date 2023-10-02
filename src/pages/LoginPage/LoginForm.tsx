import { ReactElement } from "react";
import { useLoginStore } from "../../stores/authentication/LoginStore";

const LoginForm = (): ReactElement => {
    return (
        <div className={"flex flex-col gap-4 pt-4"}>
            <EmailInput />
            <PasswordInput />
        </div>
    );
};

export default LoginForm;

const EmailInput = (): ReactElement => {
    const setEmail = useLoginStore((state) => state.setEmail);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    return (
        <div>
            <h4 className={"pb-1 text-sm font-medium text-blue-500"}>{"SIGN IN WITH ACCOUNT NAME"}</h4>
            <input
                className={
                    "h-9 w-full rounded-sm border border-gray-800 bg-gray-800 p-3 text-sm text-white shadow-md outline-none hover:bg-gray-700"
                }
                type={"text"}
                onChange={handleChange}
            />
        </div>
    );
};

const PasswordInput = (): ReactElement => {
    const setPassword = useLoginStore((state) => state.setPassword);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    return (
        <div>
            <h4 className={"pb-1 text-sm font-medium text-gray-400"}>{"PASSWORD *"}</h4>
            <input
                className={
                    "h-9 w-full rounded-sm border border-gray-800 bg-gray-800 p-3 text-sm text-white shadow-md outline-none hover:bg-gray-700"
                }
                type={"password"}
                required={true}
                onChange={handleChange}
            />
        </div>
    );
};
