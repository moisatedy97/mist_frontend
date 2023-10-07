import { Game } from "@/interfaces/TypeGame";
import { ReactElement } from "react";

type RedditSectionProps = {
  displayedGame: Game;
};

const RedditSection = ({ displayedGame }: RedditSectionProps): ReactElement => {
  return (
    <div className="pt-8">
      <p className="text-sm font-semibold hover:text-blue-600 sm:text-base lg:text-xl">{"Reddit Community"}</p>
      <div className="flex flex-col gap-2 p-2">
        {displayedGame.name.length > 0 ? (
          <div className="flex gap-4">
            <p className="text-xs italic text-gray-400 sm:text-sm lg:text-lg">{"Reddit Name"}</p>
            <p className="max-w-[40rem] break-all text-sm font-medium sm:text-base lg:text-lg">{displayedGame.name}</p>
          </div>
        ) : undefined}
        {displayedGame.website.length > 0 ? (
          <div className="flex gap-4">
            <p className="text-xs italic text-gray-400 sm:text-sm lg:text-lg">{"Reddit Website"}</p>
            <a
              href={displayedGame.reddit_url}
              className="max-w-[40rem] break-all text-sm font-medium hover:text-blue-600 hover:underline sm:text-base lg:text-lg"
            >
              {displayedGame.reddit_url}
            </a>
          </div>
        ) : undefined}
        {displayedGame.reddit_description.length > 0 ? (
          <div className="flex gap-4">
            <p className="text-xs italic text-gray-400 sm:text-sm lg:text-lg">{"Reddit Description"}</p>
            <p className="max-w-[40rem] break-all text-xs font-medium sm:text-sm lg:text-lg">
              {displayedGame.reddit_description}
            </p>
          </div>
        ) : undefined}
      </div>
    </div>
  );
};

export default RedditSection;
