import { ReactElement, useEffect } from "react";
import { Game } from "../interfaces/TypeGame";
import { accessSessionStorage } from "@/stores/browser/SessionStorage";
import { useBoughtGamesStore } from "@/stores/BoughtGamesStore";
import { useToast } from "./ui/use-toast";
import { useNotificationStore } from "@/stores/authentication/NotificationsStore";
import { getUnixTime } from "date-fns";

type GameCardProps = {
    game: Game;
    imageClass?: string;
};

const GameCard = ({ game, imageClass }: GameCardProps): ReactElement => {
    const { toast } = useToast();
    const { boughtGames, buyGame } = useBoughtGamesStore((state) => ({
        boughtGames: state,
        buyGame: state.buyGame,
    }));
    const addNotification = useNotificationStore((state) => state.addNotification);

    useEffect(() => {
        accessSessionStorage.SET_BOUGHT_GAMES(boughtGames);
    }, [boughtGames]);

    const handleClick = () => {
        buyGame(game);
        addNotification({
            title: "Purchase recipit",
            description: `You successfully bought ${game.name}. Visit your library to play`,
            timestamp: getUnixTime(new Date()),
            read: false,
        });
        toast({
            title: `You bought ${game.name}!`,
            description: "Visit the library install the game and play.",
        });
    };

    return (
        <div className={"flex flex-col gap-1"}>
            <img className={imageClass ?? "h-40 rounded-md"} src={game.background_image} alt={game.name} />
            <div className={"flex flex-col justify-start"}>
                <p className={"overflow-hidden whitespace-nowrap text-[1vw] font-semibold text-white"}>{game.name}</p>
                <div className={"flex items-center justify-between"}>
                    <div className={"flex flex-1 items-center justify-start gap-1"}>
                        <p className={"font-medium text-white"}>{game.rating}</p>
                        <svg
                            xmlns={"http://www.w3.org/2000/svg"}
                            fill={"none"}
                            viewBox={"0 0 24 24"}
                            strokeWidth={"1.5"}
                            stroke={"currentColor"}
                            className={"h-4 w-4 fill-yellow-200"}
                        >
                            <path
                                strokeLinecap={"round"}
                                strokeLinejoin={"round"}
                                d={
                                    "M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                                }
                            />
                        </svg>
                    </div>
                    <button
                        className={
                            "rounded-sm bg-gradient-to-r from-blue-400 to-blue-600 px-2 shadow-md hover:from-blue-300 hover:to-blue-500"
                        }
                        onClick={handleClick}
                    >
                        <p className={"font-medium text-white"}>{"Buy"}</p>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GameCard;
