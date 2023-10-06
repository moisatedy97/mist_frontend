import { Developer } from "@/interfaces/TypeDeveloper";
import { Game } from "@/interfaces/TypeGame";
import { Genre } from "@/interfaces/TypeGenre";
import { Publisher } from "@/interfaces/TypePublisher";
import { useDisplayedGameStore } from "@/stores/DisplayedGame";
import { ReactElement } from "react";
import RedditSection from "./RedditSection";
import RatingsSection from "./RatingsSection";
import ViewCountSection from "./ViewCountSection";

const CommunityPage = (): ReactElement => {
  const displayedGame = useDisplayedGameStore((state) => state.displayedGame);

  return (
    <div className="relative flex h-full flex-1 flex-col gap-11 bg-gray-800 p-8">
      {displayedGame ? (
        <>
          <img
            className="absolute right-0 top-0 z-0 h-full w-3/4 object-cover opacity-30"
            src={displayedGame.background_image}
            alt={displayedGame.name}
          />
          <div className="absolute right-0 top-0 h-full w-3/4 bg-opacity-20 bg-gradient-to-r from-gray-800 to-transparent"></div>
          <CommunityGame displayedGame={displayedGame} />
        </>
      ) : (
        <p className="text-2xl font-semibold">{"No display game found!"}</p>
      )}
    </div>
  );
};

export default CommunityPage;

type CommunityGameProps = {
  displayedGame: Game;
};

const CommunityGame = ({ displayedGame }: CommunityGameProps): ReactElement => {
  return (
    <div className="z-10 flex flex-col overflow-y-auto">
      <a href={displayedGame.website}>
        <p className="text-3xl font-semibold hover:text-blue-600">{displayedGame.name}</p>
      </a>
      <div className="flex gap-2 p-2 text-sm italic text-gray-400">
        {displayedGame.genres.map((genre: Genre, index: number) => {
          return <p key={index}>{genre.name}</p>;
        })}
      </div>
      <GamePublishers displayedGame={displayedGame} />
      <GameDevelopers displayedGame={displayedGame} />
      <GameRelease displayedGame={displayedGame} />
      <RedditSection displayedGame={displayedGame} />
      <RatingsSection displayedGame={displayedGame} />
      <ViewCountSection displayedGame={displayedGame} />
    </div>
  );
};

const GamePublishers = ({ displayedGame }: CommunityGameProps): ReactElement => {
  return (
    <div className="flex items-center gap-4 pt-10">
      <p className="text-sm italic text-gray-400">{"Published by"}</p>
      {displayedGame.publishers.map((publisher: Publisher, index: number) => {
        return (
          <p key={index} className="text-lg font-medium">
            {publisher.name}
          </p>
        );
      })}
    </div>
  );
};

const GameDevelopers = ({ displayedGame }: CommunityGameProps): ReactElement => {
  return (
    <div className="flex items-center gap-4 pt-1">
      <p className="text-sm italic text-gray-400">{"Developed by"}</p>
      {displayedGame.developers.map((developer: Developer, index: number) => {
        return (
          <p key={index} className="text-lg font-medium">
            {developer.name}
          </p>
        );
      })}
    </div>
  );
};

const GameRelease = ({ displayedGame }: CommunityGameProps): ReactElement => {
  return (
    <div className="flex items-center gap-4 pt-1">
      <p className="text-sm italic text-gray-400">{"Released on"}</p>
      <p className="font-medium">{displayedGame.released}</p>
    </div>
  );
};
