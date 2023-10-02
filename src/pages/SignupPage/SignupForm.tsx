import { ReactElement } from "react";
import { useSignupStore } from "../../stores/authentication/SignupStore";

const SignupForm = (): ReactElement => {
    return (
        <div className={"flex flex-col gap-4 pt-4"}>
            <FirstNameInput />
            <LastNameInput />
            <EmailInput />
            <PasswordInput />
        </div>
    );
};

export default SignupForm;

const FirstNameInput = (): ReactElement => {
    const setFirstName = useSignupStore((state) => state.setFirstName);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFirstName(event.target.value);
    };

    return (
        <div>
            <h4 className={"pb-1 text-sm font-medium text-gray-400"}>{"FIRST NAME"}</h4>
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

const LastNameInput = (): ReactElement => {
    const setLastName = useSignupStore((state) => state.setLastName);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLastName(event.target.value);
    };

    return (
        <div>
            <h4 className={"pb-1 text-sm font-medium text-gray-400"}>{"LAST NAME"}</h4>
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

const EmailInput = (): ReactElement => {
    const setEmail = useSignupStore((state) => state.setEmail);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    return (
        <div>
            <h4 className={"pb-1 text-sm font-medium text-gray-400"}>{"EMAIL *"}</h4>
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
    const setPassword = useSignupStore((state) => state.setPassword);

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
