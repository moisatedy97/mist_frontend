import { ReactElement, useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { gamesEndPoints } from "@/api/GamesEndPoints";
import { Game } from "@/interfaces/TypeGame";
import { useBoughtGamesStore } from "@/stores/BoughtGamesStore";
import { AxiosResponse } from "axios";
import { accessSessionStorage } from "@/stores/browser/SessionStorage";

const Footer = (): ReactElement => {
  return (
    <div className="flex h-14 justify-between bg-gray-900 px-6 sm:px-20 lg:px-32">
      <FooterAddGame />
      <FooterFriendsAndChat />
    </div>
  );
};

export default Footer;

const FooterAddGame = (): ReactElement => {
  return (
    <Popover>
      <PopoverTrigger>
        <div className="flex items-center gap-2 hover:text-slate-200">
          <svg
            xmlns={"http://www.w3.org/2000/svg"}
            fill={"none"}
            viewBox={"0 0 24 24"}
            strokeWidth={"1.5"}
            stroke={"currentColor"}
            className="h-5 w-5 rounded-sm bg-slate-500 p-[2px] "
          >
            <path strokeLinecap={"round"} strokeLinejoin={"round"} d={"M12 4.5v15m7.5-7.5h-15"} />
          </svg>
          <div className="text-xs font-normal text-slate-500 hover:text-slate-200">{"Add a game"}</div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="z-30 h-72 w-60 bg-gray-900 shadow-xl sm:h-80 sm:w-72 lg:h-96 lg:w-80">
        <AddGame />
      </PopoverContent>
    </Popover>
  );
};

const FooterFriendsAndChat = (): ReactElement => {
  return (
    <Popover>
      <PopoverTrigger>
        <div className="flex items-center gap-2 hover:text-slate-200">
          <div className="text-xs font-normal text-slate-500 hover:text-slate-200">{"Friends & Chat"}</div>
          <svg
            xmlns={"http://www.w3.org/2000/svg"}
            fill={"none"}
            viewBox={"0 0 24 24"}
            strokeWidth={"1.5"}
            stroke={"currentColor"}
            className="h-5 w-5 rounded-sm bg-slate-500 p-[2px] "
          >
            <path
              strokeLinecap={"round"}
              strokeLinejoin={"round"}
              d={
                "M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
              }
            />
          </svg>
        </div>
      </PopoverTrigger>
      <PopoverContent className="h-72 w-60 bg-gray-900 shadow-xl sm:h-80 sm:w-72 lg:h-96 lg:w-80">
        <div className="flex h-72 flex-col items-center gap-2 pt-16">
          <svg
            xmlns={"http://www.w3.org/2000/svg"}
            fill={"none"}
            viewBox={"0 0 24 24"}
            strokeWidth={"1.5"}
            stroke={"currentColor"}
            className="h-10 w-10"
          >
            <path
              strokeLinecap={"round"}
              strokeLinejoin={"round"}
              d={
                "M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
              }
            />
          </svg>
          <p className="text-sm sm:text-base">{"Sorry you have no friends"}</p>
        </div>
      </PopoverContent>
    </Popover>
  );
};

const AddGame = (): ReactElement => {
  const { boughtGames, addBoughtGame } = useBoughtGamesStore((state) => ({
    boughtGames: state,
    addBoughtGame: state.buyGame,
  }));
  const [licenseCode, setLicenseCode] = useState<string>("");
  const [isLicenseCodeValid, setIsLicenseCodeValid] = useState<boolean>(false);
  const numberRegEx = new RegExp("^[0-9]+$");

  useEffect(() => {
    accessSessionStorage.SET_BOUGHT_GAMES(boughtGames);
  }, [boughtGames]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value: string = event.target.value;

    if ((numberRegEx.test(value) && value.length < 9) || value.length === 0) {
      setLicenseCode(value);
    }
  };

  const handleButtonClick = (): void => {
    gamesEndPoints.API_GET_GAME_INFO({ id: Number(licenseCode) }).then((response: AxiosResponse<Game>) => {
      if (response.status === 200) {
        addBoughtGame(response.data);
        setIsLicenseCodeValid(true);
      } else {
        setIsLicenseCodeValid(false);
      }
    });
  };

  return (
    <div className="flex flex-col">
      <p className="break-normal text-xs font-semibold sm:text-sm">{"Do you already have a game license?"}</p>
      <p className="p-1 text-xs text-gray-600 sm:text-sm">{"Enter it here and claim your game!"}</p>
      <div className="mt-4 flex flex-col gap-2">
        <Input
          type={"text"}
          placeholder={"License code"}
          className={"h-8"}
          onChange={handleChange}
          value={licenseCode}
        />
        {!isLicenseCodeValid ? (
          <p className="text-xs text-red-700">{"*Invalid license code! Try again."}</p>
        ) : undefined}
        <Button className="h-6 w-14 self-end hover:bg-blue-600 sm:h-8 sm:w-16" onClick={handleButtonClick}>
          {"Enter"}
        </Button>
      </div>
      <p className="pt-5 text-[0.5rem] sm:pt-6 sm:text-xs lg:pt-8">
        {
          "*In this app the license code is the ID of a game. So if you wanna try adding a game to the library try a random 4 figure number."
        }
      </p>
      <p className="mt-2 text-[0.5rem] text-gray-600 sm:mt-3 sm:text-xs">{"Ex: 4000 -> Remember Me"}</p>
    </div>
  );
};
