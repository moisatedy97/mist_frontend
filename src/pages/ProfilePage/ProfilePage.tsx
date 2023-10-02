import { I_AuthToken } from "@/stores/authentication/AuthTokenStore";
import { accessLocalStorage } from "@/stores/browser/SessionStorage";
import { ReactElement, ReactNode, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { DecodedJwt } from "@/interfaces/DecodedJwt";
import { authEndPoints } from "@/api/authentication/AuthenticationEndPoints";
import { I_UserinfoRes } from "@/interfaces/UserInfo";
import { useUserInfoStore } from "@/stores/authentication/UserStore";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { AxiosResponse } from "axios";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { userEndPoints } from "@/api/UserEndPoints";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format, fromUnixTime, getUnixTime } from "date-fns";
import { Calendar } from "@/components/ui/calendar";

const ProfilePage = (): ReactElement => {
    const token: I_AuthToken | null = accessLocalStorage.GET_AUTHENTICATION_TOKEN();
    const { setUserEmail, setFirstName, setLastName, setBirthDate, setBirthPlace } = useUserInfoStore((state) => ({
        setUserEmail: state.setUserEmail,
        setFirstName: state.setFirstName,
        setLastName: state.setLastName,
        setBirthDate: state.setBirthDate,
        setBirthPlace: state.setBirthPlace,
    }));
    let ret: ReactNode;

    useEffect(() => {
        if (token) {
            const decodedToken: DecodedJwt = jwt_decode<DecodedJwt>(token.access_token);

            userEndPoints.API_GET_USERINFO({ email: decodedToken.sub }).then((response: I_UserinfoRes) => {
                setUserEmail(response.email);
                setFirstName(response.firstName);
                setLastName(response.lastName);
                setBirthDate(response.birthDate);
                setBirthPlace(response.birthPlace);
            });
        }
    }, []);

    if (token) {
        ret = (
            <div className={"flex flex-col"}>
                <UserName />
                <UserInfo />
            </div>
        );
    } else {
        ret = <p className={"text-2xl font-semibold"}>{"No user logged in"}</p>;
    }

    return <div className={"flex flex-1 flex-col gap-11 overflow-y-auto bg-gray-800 px-11 py-8"}>{ret}</div>;
};

export default ProfilePage;

const UserName = (): ReactElement => {
    const { userEmail, userFirstName, userLastName } = useUserInfoStore((state) => ({
        userEmail: state.userEmail,
        userFirstName: state.firstName,
        userLastName: state.lastName,
    }));

    if (userEmail) {
        return (
            <div className={"flex items-center gap-4"}>
                <p
                    className={"text-2xl font-semibold hover:text-blue-500"}
                >{`Welcome, ${userFirstName} ${userLastName}`}</p>
                <LogoutButton />
            </div>
        );
    } else {
        return <Skeleton className={"h-11 w-[35rem] bg-gray-500"} />;
    }
};

const UserInfo = (): ReactElement => {
    return (
        <div className={"mt-14 flex flex-col gap-6"}>
            <EmailInput />
            <FirstNameInput />
            <LastNameInput />
            <BirthDateInput />
            <BirthPlaceInput />
            <EditUserInfoButton />
        </div>
    );
};

const EmailInput = (): ReactElement => {
    const userEmail = useUserInfoStore((state) => state.userEmail);

    return (
        <>
            {userEmail.length > 0 ? (
                <div className="flex w-[25rem] flex-col gap-2">
                    <Label className={"text-sm font-medium text-blue-500 hover:text-white"} htmlFor="email">
                        {"Email"}
                    </Label>
                    <Input
                        type="email"
                        placeholder="Email"
                        readOnly={true}
                        value={userEmail}
                        className={"bg-gray-900 text-gray-500 hover:border-blue-500"}
                    />
                </div>
            ) : (
                <Skeleton className={"h-16 w-[25rem] bg-gray-500"} />
            )}
        </>
    );
};

const FirstNameInput = (): ReactElement => {
    const { userEmail, userFirstName, setUserFirstName } = useUserInfoStore((state) => ({
        userEmail: state.userEmail,
        userFirstName: state.firstName,
        setUserFirstName: state.setFirstName,
    }));

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setUserFirstName(event.target.value);
    };

    return (
        <>
            {userEmail.length > 0 ? (
                <div className="flex w-[25rem] flex-col gap-2">
                    <Label className={"text-sm font-medium text-blue-500 hover:text-white"} htmlFor="firstName">
                        {"First Name"}
                    </Label>
                    <Input
                        type="text"
                        placeholder="First Name"
                        value={userFirstName}
                        onChange={handleChange}
                        className={"bg-gray-900 hover:border-blue-500"}
                    />
                </div>
            ) : (
                <Skeleton className={"h-16 w-[25rem] bg-gray-500"} />
            )}
        </>
    );
};

const LastNameInput = (): ReactElement => {
    const { userEmail, userLastName, setUserLastName } = useUserInfoStore((state) => ({
        userEmail: state.userEmail,
        userLastName: state.lastName,
        setUserLastName: state.setLastName,
    }));

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setUserLastName(event.target.value);
    };

    return (
        <>
            {userEmail.length > 0 ? (
                <div className="flex w-[25rem] flex-col gap-2">
                    <Label className={"text-sm font-medium text-blue-500 hover:text-white"} htmlFor="lastName">
                        {"Last Name"}
                    </Label>
                    <Input
                        type="text"
                        placeholder="Last Name"
                        value={userLastName}
                        onChange={handleChange}
                        className={"bg-gray-900 hover:border-blue-500"}
                    />
                </div>
            ) : (
                <Skeleton className={"h-16 w-[25rem] bg-gray-500"} />
            )}
        </>
    );
};

const BirthDateInput = (): ReactElement => {
    const { userEmail, userBirthDate, setUserBirthDate } = useUserInfoStore((state) => ({
        userEmail: state.userEmail,
        userBirthDate: state.birthDate,
        setUserBirthDate: state.setBirthDate,
    }));
    const [date, setDate] = useState<Date | undefined>(fromUnixTime(Number(userBirthDate)));

    useEffect(() => {
        if (date) {
            setUserBirthDate(getUnixTime(date).toString());
        }
    }, [date]);

    return (
        <>
            {userEmail.length > 0 ? (
                <div className="flex w-[25rem] flex-col gap-2">
                    <Popover>
                        <Label className={"text-sm font-medium text-blue-500 hover:text-white"} htmlFor="birthDate">
                            {"Birth Date"}
                        </Label>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "w-full justify-start bg-gray-900 text-left font-normal hover:border-blue-500 hover:bg-gray-900",
                                    !date && "text-muted-foreground",
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date ? format(date, "PPP") : <span>Pick a date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto bg-gray-900 p-0">
                            <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                        </PopoverContent>
                    </Popover>
                </div>
            ) : (
                <Skeleton className={"h-16 w-[25rem] bg-gray-500"} />
            )}
        </>
    );
};

const BirthPlaceInput = (): ReactElement => {
    const { userEmail, userBirthPlace, setUserBirthPlace } = useUserInfoStore((state) => ({
        userEmail: state.userEmail,
        userBirthPlace: state.birthPlace,
        setUserBirthPlace: state.setBirthPlace,
    }));

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setUserBirthPlace(event.target.value);
    };

    return (
        <>
            {userEmail.length > 0 ? (
                <div className="flex w-[25rem] flex-col gap-2">
                    <Label className={"text-sm font-medium text-blue-500 hover:text-white"} htmlFor="birthPlace">
                        {"Birth Place"}
                    </Label>
                    <Input
                        type="text"
                        placeholder="Birth Place"
                        value={userBirthPlace}
                        onChange={handleChange}
                        className={"bg-gray-900 hover:border-blue-500"}
                    />
                </div>
            ) : (
                <Skeleton className={"h-16 w-[25rem] bg-gray-500"} />
            )}
        </>
    );
};

const EditUserInfoButton = (): ReactElement => {
    const userInfo = useUserInfoStore((state) => state);

    const handleClick = () => {
        userEndPoints
            .API_EDIT_USERINFO({
                firstName: userInfo.firstName.length > 0 ? userInfo.firstName : undefined,
                lastName: userInfo.lastName.length > 0 ? userInfo.lastName : undefined,
                birthDate: userInfo.birthDate.length > 0 ? userInfo.birthDate : undefined,
                birthPlace: userInfo.birthPlace.length > 0 ? userInfo.birthPlace : undefined,
            })
            .then((response: AxiosResponse<never>) => {
                if (response.status === 200) {
                    userEndPoints.API_GET_USERINFO({ email: userInfo.userEmail }).then((response: I_UserinfoRes) => {
                        userInfo.setUserEmail(response.email);
                        userInfo.setFirstName(response.firstName);
                        userInfo.setLastName(response.lastName);
                        userInfo.setBirthDate(response.birthDate);
                        userInfo.setBirthPlace(response.birthPlace);
                    });
                }
            });
    };

    return (
        <>
            {userInfo.userEmail.length > 0 ? (
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="outline"
                            onClickCapture={handleClick}
                            className={
                                "flex w-28 items-center gap-2 rounded-md bg-gradient-to-r from-lime-400 to-lime-600 shadow-md hover:from-lime-300 hover:to-lime-500"
                            }
                        >
                            <svg
                                xmlns={"http://www.w3.org/2000/svg"}
                                fill={"none"}
                                viewBox={"0 0 24 24"}
                                strokeWidth={"1.5"}
                                stroke={"currentColor"}
                                className={"h-6 w-6"}
                            >
                                <path
                                    strokeLinecap={"round"}
                                    strokeLinejoin={"round"}
                                    d={
                                        "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                    }
                                />
                            </svg>
                            <p>{"Edit"}</p>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent className={"bg-gray-900"}>Edit</TooltipContent>
                </Tooltip>
            ) : (
                <Skeleton className={"h-12 w-28 bg-gray-500"} />
            )}
        </>
    );
};

const LogoutButton = (): ReactElement => {
    const { setIsUserLoggedIn, setIsTokenChecked, setIsCredentialsChecked } = useUserInfoStore((state) => ({
        setIsUserLoggedIn: state.setIsUserLoggedIn,
        setIsTokenChecked: state.setIsTokenChecked,
        setIsCredentialsChecked: state.setIsCredentialsChecked,
    }));

    const handleClick = () => {
        authEndPoints.API_AUTH_LOGOUT().then((response: AxiosResponse) => {
            if (response.status === 200) {
                setIsUserLoggedIn(false);
                setIsTokenChecked(true);
                setIsCredentialsChecked(false);

                accessLocalStorage.REMOVE_AUTHENTICATION_TOKEN();
            }
        });
    };

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button variant="ghost" onClickCapture={handleClick}>
                    <svg
                        xmlns={"http://www.w3.org/2000/svg"}
                        fill={"none"}
                        viewBox={"0 0 24 24"}
                        strokeWidth={"1.5"}
                        stroke={"currentColor"}
                        className={"h-6 w-6"}
                    >
                        <path
                            strokeLinecap={"round"}
                            strokeLinejoin={"round"}
                            d={
                                "M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                            }
                        />
                    </svg>
                </Button>
            </TooltipTrigger>
            <TooltipContent className={"bg-gray-900"}>Logout</TooltipContent>
        </Tooltip>
    );
};
