import { Game } from "@/interfaces/TypeGame";
import { ReactElement } from "react";

type RedditSectionProps = {
  displayedGame: Game;
};

const RedditSection = ({ displayedGame }: RedditSectionProps): ReactElement => {
  return (
    <div className="pt-8">
      <p className="text-xl font-semibold hover:text-blue-600">{"Reddit Community"}</p>
      <div className="flex flex-col gap-2 p-2">
        <div className="flex gap-4">
          <p className="text-sm italic text-gray-400">{"Reddit Name"}</p>
          <p className="font-medium">{displayedGame.name}</p>
        </div>
        <div className="flex gap-4">
          <p className="text-sm italic text-gray-400">{"Reddit Website"}</p>
          <a href={displayedGame.reddit_url} className="font-medium hover:text-blue-600 hover:underline">
            {displayedGame.reddit_url}
          </a>
        </div>
        <div className="flex gap-4">
          <p className="text-sm italic text-gray-400">{"Reddit Description"}</p>
          <p className="w-[40rem] font-medium">{displayedGame.reddit_description}</p>
        </div>
      </div>
    </div>
  );
};

export default RedditSection;
