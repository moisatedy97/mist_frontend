import { accessLocalStorage } from "@/stores/browser/SessionStorage";
import { ReactElement } from "react";
import { authEndPoints } from "@/api/authentication/AuthenticationEndPoints";
import { useUserInfoStore } from "@/stores/authentication/UserStore";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { AxiosResponse } from "axios";
import { useToast } from "@/components/ui/use-toast";

export const LogoutButton = (): ReactElement => {
  const { setIsUserLoggedIn, setIsTokenChecked, setIsCredentialsChecked } = useUserInfoStore((state) => ({
    setIsUserLoggedIn: state.setIsUserLoggedIn,
    setIsTokenChecked: state.setIsTokenChecked,
    setIsCredentialsChecked: state.setIsCredentialsChecked,
  }));
  const { toate } = useToast();

  const handleClick = () => {
    authEndPoints.API_AUTH_LOGOUT().then((response: AxiosResponse) => {
      if (response.status === 200) {
        setIsUserLoggedIn(false);
        setIsTokenChecked(true);
        setIsCredentialsChecked(false);

        accessLocalStorage.REMOVE_AUTHENTICATION_TOKEN();

        toast({
          title: `Logout`,
          description: "Congratulations. You successfully logged out.",
        });
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
            className="h-4 w-4 sm:h-6 sm:w-6"
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
      <TooltipContent className="bg-gray-900">{"Logout"}</TooltipContent>
    </Tooltip>
  );
};
