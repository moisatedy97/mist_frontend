import { Notification } from "@/interfaces/TypeNotification";
import { useDisplayedGameStore } from "@/stores/DisplayedGame";
import { useNotificationStore } from "@/stores/authentication/NotificationsStore";
import { format, fromUnixTime } from "date-fns";
import { Menu } from "lucide-react";
import { ReactElement, useState } from "react";
import { NavLink } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

const Navbar = (): ReactElement => {
  return (
    <div className="flex h-14 justify-between bg-gray-900 px-6 sm:px-20 lg:px-32">
      <NavbarLinks />
      <NavbarProfile />
    </div>
  );
};

export default Navbar;

const NavbarLinks = (): ReactElement => {
  const displayedGame = useDisplayedGameStore((state) => state.displayedGame);
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  return (
    <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
      <DropMenu openMenu={openMenu} setOpenMenu={setOpenMenu} />
      {openMenu ? undefined : (
        <>
          <StoreLink openMenu={openMenu} />
          <LibraryLink openMenu={openMenu} />
          {displayedGame !== null ? <CommunityLink openMenu={openMenu} /> : undefined}
          <ProfileLink openMenu={openMenu} />
        </>
      )}
    </div>
  );
};

type DropMenuProps = {
  openMenu: boolean;
  setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

const DropMenu = ({ openMenu, setOpenMenu }: DropMenuProps): ReactElement => {
  const handleClick = () => {
    setOpenMenu(true);
  };

  const handleClose = (): void => {
    setOpenMenu(false);
  };

  return (
    <Sheet key={"right"}>
      <SheetTrigger>
        <Menu className="lg:hidden" onClickCapture={handleClick} />
      </SheetTrigger>
      <SheetContent className="w-full bg-gray-800 sm:w-[400px]" side={"right"} onCloseAutoFocus={handleClose}>
        <div className="mt-44 flex flex-col items-center gap-6 p-2">
          <StoreLink openMenu={openMenu} />
          <LibraryLink openMenu={openMenu} />
          <CommunityLink openMenu={openMenu} />
          <ProfileLink openMenu={openMenu} />
        </div>
      </SheetContent>
    </Sheet>
  );
};

type LinkProps = {
  openMenu: boolean;
};

const StoreLink = ({ openMenu }: LinkProps): ReactElement => {
  return (
    <NavLink className={`${openMenu ? "block" : "hidden lg:block"} relative`} to="/store">
      {({ isActive }) => (
        <div className="flex flex-col-reverse">
          <p
            className={
              isActive
                ? "text-base font-semibold text-blue-500 sm:text-lg lg:text-xl"
                : "text-base font-semibold text-white hover:text-gray-300 sm:text-lg lg:text-xl"
            }
          >
            {"STORE"}
          </p>
          <div className={isActive ? "absolute h-1 w-full rounded-sm bg-blue-500" : "hidden"}></div>
        </div>
      )}
    </NavLink>
  );
};

const LibraryLink = ({ openMenu }: LinkProps): ReactElement => {
  return (
    <NavLink className={`${openMenu ? "block" : "hidden lg:block"} relative`} to="/library">
      {({ isActive }) => (
        <>
          <p
            className={
              isActive
                ? "text-base font-semibold text-blue-500 sm:text-lg lg:text-xl"
                : "text-base font-semibold text-white hover:text-gray-300 sm:text-lg lg:text-xl"
            }
          >
            {"LIBRARY"}
          </p>
          <div className={isActive ? "absolute h-1 w-full rounded-sm bg-blue-500" : "hidden"}></div>
        </>
      )}
    </NavLink>
  );
};

const CommunityLink = ({ openMenu }: LinkProps): ReactElement => {
  return (
    <NavLink className={`${openMenu ? "block" : "hidden lg:block"} relative`} to="/community">
      {({ isActive }) => (
        <>
          <p
            className={
              isActive
                ? "text-base font-semibold text-blue-500 sm:text-lg lg:text-xl"
                : "text-base font-semibold text-white hover:text-gray-300 sm:text-lg lg:text-xl"
            }
          >
            {"COMMUNITY"}
          </p>
          <div className={isActive ? "absolute h-1 w-full rounded-sm bg-blue-500" : "hidden"}></div>
        </>
      )}
    </NavLink>
  );
};

const ProfileLink = ({ openMenu }: LinkProps): ReactElement => {
  return (
    <NavLink className={`${openMenu ? "block" : "hidden lg:block"} relative`} to="/profile">
      {({ isActive }) => (
        <>
          <p
            className={
              isActive
                ? "text-base font-semibold text-blue-500 sm:text-lg lg:text-xl"
                : "text-base font-semibold text-white hover:text-gray-300 sm:text-lg lg:text-xl"
            }
          >
            {"PROFILE"}
          </p>
          <div className={isActive ? "absolute h-1 w-full rounded-sm bg-blue-500" : "hidden"}></div>
        </>
      )}
    </NavLink>
  );
};

const NavbarProfile = (): ReactElement => {
  return (
    <div className="flex items-center gap-2 ">
      <NavbarNews />
      <NavbarNotifications />
    </div>
  );
};

const NavbarNews = (): ReactElement => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button className="h-5 w-10 overflow-hidden rounded-sm sm:h-6 sm:w-14">
          <svg
            xmlns={"http://www.w3.org/2000/svg"}
            fill={"none"}
            viewBox={"0 0 24 24"}
            strokeWidth={"1.5"}
            stroke={"currentColor"}
            className="h-full w-full bg-slate-600 p-[2px]"
          >
            <path
              strokeLinecap={"round"}
              strokeLinejoin={"round"}
              d={
                "M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46"
              }
            />
          </svg>
        </button>
      </TooltipTrigger>
      <TooltipContent className="bg-gray-900">{"Not available"}</TooltipContent>
    </Tooltip>
  );
};

const NavbarNotifications = (): ReactElement => {
  const { notifications, setNotificationToRed } = useNotificationStore((state) => ({
    notifications: state.notifications,
    setNotificationToRed: state.setNotificationToRed,
  }));

  const handleMouseOver = (index: number) => {
    return () => setNotificationToRed(index);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="relative h-5 w-10 overflow-hidden rounded-sm sm:h-6 sm:w-14">
          {notifications.length > 0 ? (
            <div className="absolute right-[1.5px] top-[1.5px] h-2 w-2 rounded-full bg-red-800" />
          ) : undefined}
          <svg
            xmlns={"http://www.w3.org/2000/svg"}
            fill={"none"}
            viewBox={"0 0 24 24"}
            strokeWidth={"1.5"}
            stroke={"currentColor"}
            className="h-full w-full bg-slate-600 p-[2px]"
          >
            <path
              strokeLinecap={"round"}
              strokeLinejoin={"round"}
              d={
                "M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
              }
            />
          </svg>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-60 overflow-hidden bg-gray-900 shadow-xl sm:w-72 lg:w-80">
        <div className="custom_scrollbar flex max-h-96 flex-col-reverse gap-2 overflow-y-auto bg-gray-900 p-1">
          {notifications.length > 0 ? (
            notifications.map((notification: Notification, index: number) => {
              const notificationTimestamp: string = format(fromUnixTime(notification.timestamp), "dd-MM-yyyy HH:mm");

              return (
                <div
                  key={index}
                  onMouseOver={handleMouseOver(index)}
                  className={`flex flex-col gap-2 rounded-lg border p-2 ${
                    notification.read ? "bg-gray-800" : "bg-gray-700"
                  }`}
                >
                  <p className="text-sm font-semibold italic text-gray-400 sm:text-base">{notification.title}</p>
                  <p className="text-xs font-medium sm:text-sm">{notification.description}</p>
                  <p className="mt-2 self-end text-xs font-medium">{notificationTimestamp}</p>
                </div>
              );
            })
          ) : (
            <p>{"No notifications"}</p>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};
