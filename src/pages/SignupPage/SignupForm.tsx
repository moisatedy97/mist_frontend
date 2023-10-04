import { ReactElement } from "react";
import { useSignupStore } from "../../stores/authentication/SignupStore";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm, UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useUserInfoStore } from "@/stores/authentication/UserStore";
import { authEndPoints } from "@/api/authentication/AuthenticationEndPoints";
import { SignupUserReq } from "@/interfaces/AuthenticationReq";
import { AxiosError, AxiosResponse } from "axios";

const singUpFormSchema = z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    email: z.string().email({ message: "This must be a valid email!" }),
    password: z.string().min(6, { message: "Password must be atleast 6 characters" }).max(30),
});

const SignupForm = (): ReactElement => {
    const form = useForm<z.infer<typeof singUpFormSchema>>({
        resolver: zodResolver(singUpFormSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
        },
    });
    const { isCredentialsWrong, setEmail, setIsCredentialsChecked, setIsCredentialsWrong } = useUserInfoStore(
        (state) => ({
            isCredentialsWrong: state.isCredentialsWrong,
            setEmail: state.setUserEmail,
            setIsCredentialsChecked: state.setIsCredentialsChecked,
            setIsCredentialsWrong: state.setIsCredentialsWrong,
        }),
    );

    const onSubmit = (validatedValues: z.infer<typeof singUpFormSchema>) => {
        const signUpData: SignupUserReq = {
            firstName: validatedValues.firstName,
            lastName: validatedValues.lastName,
            email: validatedValues.email,
            password: validatedValues.password,
        };

        authEndPoints.API_AUTH_SIGNUP(signUpData).then((response: AxiosResponse<never>) => {
            if (response.status == 200) {
                setEmail(validatedValues.email);
                setIsCredentialsChecked(true);
            }

            if (response instanceof AxiosError && response.response?.status === 401) {
                setIsCredentialsWrong(true);
            }
        });
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={"mt-6 flex flex-col gap-4"}>
                <FirstNameInput form={form} />
                <LastNameInput form={form} />
                <EmailInput form={form} />
                <PasswordInput form={form} />
                {isCredentialsWrong ? <WrongCredentials /> : undefined}
                <SignupButton />
            </form>
        </Form>
    );
};

export default SignupForm;

type InputsProps = {
    form: UseFormReturn<z.infer<typeof singUpFormSchema>>;
};

const FirstNameInput = ({ form }: InputsProps): ReactElement => {
    const setFirstName = useSignupStore((state) => state.setFirstName);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFirstName(event.target.value);
    };

    return (
        <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
                <FormItem>
                    <FormLabel className={"pb-2 text-sm font-medium text-gray-400"}>{"FIRST NAME"}</FormLabel>
                    <FormControl>
                        <Input placeholder="First Name" onChangeCapture={handleChange} {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

const LastNameInput = ({ form }: InputsProps): ReactElement => {
    const setLastName = useSignupStore((state) => state.setLastName);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLastName(event.target.value);
    };

    return (
        <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
                <FormItem>
                    <FormLabel className={"pb-2 text-sm font-medium text-gray-400"}>{"LAST NAME"}</FormLabel>
                    <FormControl>
                        <Input placeholder="Last Name" onChangeCapture={handleChange} {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

const EmailInput = ({ form }: InputsProps): ReactElement => {
    const setEmail = useSignupStore((state) => state.setEmail);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    return (
        <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
                <FormItem>
                    <FormLabel className={"pb-2 text-base font-semibold text-blue-600"}>{"EMAIL *"}</FormLabel>
                    <FormControl>
                        <Input required={true} placeholder="Email" onChangeCapture={handleChange} {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

const PasswordInput = ({ form }: InputsProps): ReactElement => {
    const setPassword = useSignupStore((state) => state.setPassword);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    return (
        <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
                <FormItem>
                    <FormLabel className={"pb-2 text-sm font-medium text-gray-400"}>{"PASSWORD *"}</FormLabel>
                    <FormControl>
                        <Input
                            required={true}
                            placeholder={"Password"}
                            type={"password"}
                            onChangeCapture={handleChange}
                            {...field}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

const SignupButton = (): ReactElement => {
    return (
        <div className={"flex w-full justify-center py-4"}>
            <Button
                type={"submit"}
                className={
                    "h-11 w-44 self-center rounded-sm bg-gradient-to-r from-blue-400 to-blue-600 shadow-md hover:from-blue-300 hover:to-blue-500 sm:h-11 sm:w-36"
                }
            >
                <p className={"font-medium text-white"}>{"Sign up"}</p>
            </Button>
        </div>
    );
};

const WrongCredentials = (): ReactElement => {
    return <p className={"mt-2 text-sm font-normal text-red-700 sm:text-sm"}>* Email/password incorrect or required</p>;
};
