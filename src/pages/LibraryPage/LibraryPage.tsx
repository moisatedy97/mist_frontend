import { gamesEndPoints } from "@/api/GamesEndPoints";
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Game } from "@/interfaces/TypeGame";
import { Genre } from "@/interfaces/TypeGenre";
import { useBoughtGamesStore } from "@/stores/BoughtGamesStore";
import { useDisplayedGameStore } from "@/stores/DisplayedGame";
import { AxiosResponse } from "axios";
import { ReactElement } from "react";

const LibraryPage = (): ReactElement => {
  const displayedGame = useDisplayedGameStore((state) => state.displayedGame);

  return (
    <div className="flex flex-1 overflow-hidden bg-gray-800">
      <CommandComponent />
      {displayedGame ? (
        <DisplayGame displayedGame={displayedGame} />
      ) : (
        <p className="p-10 text-2xl">{"Select a game to play"}</p>
      )}
    </div>
  );
};

export default LibraryPage;

const CommandComponent = (): ReactElement => {
  const boughtGames = useBoughtGamesStore((state) => state.boughtGames);
  const setDisplayedGame = useDisplayedGameStore((state) => state.setDisplayedGame);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    gamesEndPoints.API_GET_GAME_INFO({ id: Number(event.currentTarget.id) }).then((response: AxiosResponse<Game>) => {
      setDisplayedGame(response.data);
    });
  };

  return (
    <Command className="w-96 border bg-gray-900 shadow-md">
      <CommandInput placeholder={"Search game..."} />
      <CommandList className="custom_scrollbar m-2 min-h-[45rem] rounded-lg bg-gray-700">
        <CommandEmpty>{"No results found."}</CommandEmpty>
        {boughtGames.map((boughtGame: Game, index: number) => {
          return (
            <CommandItem
              key={index}
              id={boughtGame.id.toString()}
              className="flex cursor-pointer items-center gap-2"
              onClickCapture={handleClick}
            >
              <img className="h-6 w-6 rounded-full" src={boughtGame.background_image} alt={boughtGame.name} />
              <p className="max-w-[18rem] overflow-hidden">{boughtGame.name}</p>
            </CommandItem>
          );
        })}
      </CommandList>
    </Command>
  );
};

type DisplayGameProps = {
  displayedGame: Game;
};

const DisplayGame = ({ displayedGame }: DisplayGameProps): ReactElement => {
  return (
    <div className="flex w-full flex-1">
      <div className="overflow-y-auto">
        <div className="h-[28rem] w-full self-center overflow-hidden">
          <img className="min-w-full" src={displayedGame.background_image} alt={displayedGame.name} />
        </div>
        <DisplayedGameInfo displayedGame={displayedGame} />
        <DisplayedGameDescription displayedGame={displayedGame} />
      </div>
    </div>
  );
};

const DisplayedGameInfo = ({ displayedGame }: DisplayGameProps): ReactElement => {
  return (
    <div className="flex gap-16 p-4">
      <div className="flex flex-col gap-2">
        <p className="text-4xl font-semibold">{displayedGame.name}</p>
        <div className="flex gap-2 pl-8">
          {displayedGame.genres.map((genre: Genre, index: number) => {
            return (
              <p key={index} className="text-sm italic text-gray-400">
                {genre.name}
              </p>
            );
          })}
        </div>
        <GameRating displayedGame={displayedGame} />
      </div>
      <GamePlayedTime displayedGame={displayedGame} />
      <GameMetacritic displayedGame={displayedGame} />
      <GameAchievements displayedGame={displayedGame} />
    </div>
  );
};

const GameRating = ({ displayedGame }: DisplayGameProps): ReactElement => {
  return (
    <div className="flex items-center gap-1 pl-8">
      <p className="text-xl font-medium text-white">{displayedGame.rating}</p>
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

const GamePlayedTime = ({ displayedGame }: DisplayGameProps): ReactElement => {
  return (
    <div className="flex items-center gap-2">
      <svg
        xmlns={"http://www.w3.org/2000/svg"}
        fill={"none"}
        viewBox={"0 0 24 24"}
        strokeWidth={"1.5"}
        stroke={"currentColor"}
        className="h-10 w-10"
      >
        <path strokeLinecap={"round"} strokeLinejoin={"round"} d={"M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"} />
      </svg>
      <div>
        <p className="text-lg font-semibold">{"TIME PLAYED"}</p>
        <p className="text-gray-400">{`${displayedGame.playtime} hours`}</p>
      </div>
    </div>
  );
};

const GameMetacritic = ({ displayedGame }: DisplayGameProps): ReactElement => {
  return (
    <div className="flex items-center gap-2">
      <svg
        xmlns={"http://www.w3.org/2000/svg"}
        fill={"none"}
        viewBox={"0 0 24 24"}
        strokeWidth={"1.5"}
        stroke={"currentColor"}
        className="h-9 w-9"
      >
        <path
          strokeLinecap={"round"}
          strokeLinejoin={"round"}
          d={
            "M10.05 4.575a1.575 1.575 0 10-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 013.15 0v1.5m-3.15 0l.075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 013.15 0V15M6.9 7.575a1.575 1.575 0 10-3.15 0v8.175a6.75 6.75 0 006.75 6.75h2.018a5.25 5.25 0 003.712-1.538l1.732-1.732a5.25 5.25 0 001.538-3.712l.003-2.024a.668.668 0 01.198-.471 1.575 1.575 0 10-2.228-2.228 3.818 3.818 0 00-1.12 2.687M6.9 7.575V12m6.27 4.318A4.49 4.49 0 0116.35 15m.002 0h-.002"
          }
        />
      </svg>
      <div>
        <p className="text-lg font-semibold">{"METACRITIC"}</p>
        <p className="text-gray-400">{`${displayedGame.metacritic} critics`}</p>
      </div>
    </div>
  );
};

const GameAchievements = ({ displayedGame }: DisplayGameProps): ReactElement => {
  return (
    <div className="flex items-center gap-2">
      <svg
        xmlns={"http://www.w3.org/2000/svg"}
        fill={"none"}
        viewBox={"0 0 24 24"}
        strokeWidth={"1.5"}
        stroke={"currentColor"}
        className="h-9 w-9"
      >
        <path
          strokeLinecap={"round"}
          strokeLinejoin={"round"}
          d={
            "M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0"
          }
        />
      </svg>

      <div>
        <p className="text-lg font-semibold">{"ACHIVEMENTS"}</p>
        <p className="text-gray-400">{`${displayedGame.achievements_count} achievements`}</p>
      </div>
    </div>
  );
};

const DisplayedGameDescription = ({ displayedGame }: DisplayGameProps): ReactElement => {
  return (
    <div className="flex flex-col gap-2 px-4 py-8">
      <p className="text-xl font-semibold">{"Description"}</p>
      <p className="text-xs text-gray-400">{displayedGame.description_raw}</p>
    </div>
  );
};
