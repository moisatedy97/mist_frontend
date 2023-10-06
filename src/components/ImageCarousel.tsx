import { ReactElement, useEffect } from "react";
import { Game } from "../interfaces/TypeGame";
import { Platform } from "../interfaces/TypePlatform";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useBoughtGamesStore } from "@/stores/BoughtGamesStore";
import { accessSessionStorage } from "@/stores/browser/SessionStorage";
import { useToast } from "./ui/use-toast";
import { useNotificationStore } from "@/stores/authentication/NotificationsStore";
import { getUnixTime } from "date-fns";

type ImageCarouselProps = {
  games: Game[];
};

const ImageCarousel = ({ games }: ImageCarouselProps): ReactElement => {
  return (
    <Carousel
      showArrows={true}
      showThumbs={false}
      autoPlay={true}
      infiniteLoop={true}
      interval={4000}
      showStatus={false}
      stopOnHover={true}
      swipeable={true}
      transitionTime={2000}
    >
      {games.map((game: Game, index: number) => {
        return (
          <div key={index}>
            <img src={game.background_image} alt={game.name} />
            <div className="absolute left-0 top-0 h-full w-full bg-gray-800 opacity-50"></div>
            <div className="absolute left-5 top-2 flex flex-col justify-start">
              <GameName game={game} />
              <GameRating game={game} />
              <GamePlatforms game={game} />
            </div>
            <BuyNowButton game={game} />
          </div>
        );
      })}
    </Carousel>
  );
};

export default ImageCarousel;

type GameOptionProps = {
  game: Game;
};

const GameName = ({ game }: GameOptionProps): ReactElement => {
  return <p className="flex justify-start text-lg font-semibold text-white sm:text-xl lg:text-2xl">{game.name}</p>;
};

const GameRating = ({ game }: GameOptionProps): ReactElement => {
  return (
    <div className="flex items-center gap-1">
      <p className="text-sm font-medium text-white sm:text-base lg:text-xl">{game.rating}</p>
      <svg
        xmlns={"http://www.w3.org/2000/svg"}
        fill={"none"}
        viewBox={"0 0 24 24"}
        strokeWidth={"1.5"}
        stroke={"currentColor"}
        className="h-4 w-4 fill-yellow-200"
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
  );
};

const GamePlatforms = ({ game }: GameOptionProps): ReactElement => {
  if (game.parent_platforms) {
    return (
      <div className="flex gap-1">
        {game.parent_platforms.map((platforms: Platform, index: number) => {
          return (
            <p key={index} className="text-xs font-medium text-white sm:text-sm lg:text-base">
              {platforms.platform.name}
            </p>
          );
        })}
      </div>
    );
  }

  return <></>;
};

type BuyNowButtonProps = {
  game: Game;
};

const BuyNowButton = ({ game }: BuyNowButtonProps): ReactElement => {
  const { boughtGames, buyGame } = useBoughtGamesStore((state) => ({
    boughtGames: state,
    buyGame: state.buyGame,
  }));
  const addNotification = useNotificationStore((state) => state.addNotification);
  const { toast } = useToast();

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
    <button
      className="absolute bottom-2 right-2 rounded-md bg-gradient-to-r from-lime-400 to-lime-600 px-3 py-2 shadow-md hover:from-lime-300 hover:to-lime-500 sm:bottom-3 sm:right-3 lg:bottom-5 lg:right-5 lg:px-5 lg:py-2"
      onClick={handleClick}
    >
      <div className="flex gap-2">
        <svg
          xmlns={"http://www.w3.org/2000/svg"}
          fill={"none"}
          viewBox={"0 0 24 24"}
          strokeWidth={"1.5"}
          stroke={"currentColor"}
          className="h-4 w-4 text-white sm:h-6 sm:w-6"
        >
          <path
            strokeLinecap={"round"}
            strokeLinejoin={"round"}
            d={
              "M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            }
          />
        </svg>

        <p className="text-xs font-medium text-white sm:text-sm lg:text-base">{"Buy Now"}</p>
      </div>
    </button>
  );
};
