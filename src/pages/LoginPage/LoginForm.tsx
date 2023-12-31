import { ReactElement } from "react";
import { useLoginStore } from "../../stores/authentication/LoginStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm, UseFormReturn } from "react-hook-form";
import { LoginUserReq } from "@/interfaces/AuthenticationReq";
import { authEndPoints } from "@/api/authentication/AuthenticationEndPoints";
import { AxiosError, AxiosResponse } from "axios";
import { useUserInfoStore } from "@/stores/authentication/UserStore";

const singInFormSchema = z.object({
  email: z.string().email({ message: "This must be a valid email!" }),
  password: z.string().min(6, { message: "Password must be atleast 6 characters" }).max(30),
});

const LoginForm = (): ReactElement => {
  const form = useForm<z.infer<typeof singInFormSchema>>({
    resolver: zodResolver(singInFormSchema),
    defaultValues: {
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

  const onSubmit = (validatedValues: z.infer<typeof singInFormSchema>) => {
    const loginData: LoginUserReq = {
      email: validatedValues.email,
      password: validatedValues.password,
    };

    authEndPoints.API_AUTH_LOGIN(loginData).then((response: AxiosResponse<never>) => {
      if (response.status === 206) {
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 flex flex-col gap-4">
        <EmailInput form={form} />
        <PasswordInput form={form} />
        <SignInButton />
        {isCredentialsWrong ? <WrongCredentials /> : undefined}
      </form>
    </Form>
  );
};

export default LoginForm;

type InputsProps = {
  form: UseFormReturn<z.infer<typeof singInFormSchema>>;
};

const EmailInput = ({ form }: InputsProps): ReactElement => {
  const setEmail = useLoginStore((state) => state.setEmail);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  return (
    <FormField
      control={form.control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-base font-semibold text-blue-600">{"SIGN IN WITH ACCOUNT NAME"}</FormLabel>
          <FormControl>
            <Input placeholder={"Email"} onChangeCapture={handleChange} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const PasswordInput = ({ form }: InputsProps): ReactElement => {
  const setPassword = useLoginStore((state) => state.setPassword);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <FormField
      control={form.control}
      name="password"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="pb-1 text-sm font-medium text-gray-400">{"PASSWORD"}</FormLabel>
          <FormControl>
            <Input type={"password"} placeholder={"Password"} onChangeCapture={handleChange} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const SignInButton = (): ReactElement => {
  return (
    <div className="flex w-full justify-center py-4">
      <Button
        type={"submit"}
        className="h-10 w-32 self-center rounded-sm bg-gradient-to-r from-blue-400 to-blue-600 shadow-md hover:from-blue-300 hover:to-blue-500 sm:h-11 sm:w-36"
      >
        <p className="font-medium text-white">{"Sign in"}</p>
      </Button>
    </div>
  );
};

const WrongCredentials = (): ReactElement => {
  return (
    <p className="text-xs font-normal text-red-700 sm:text-sm">{"* Email/password incorrect. Please try again!"}</p>
  );
};
