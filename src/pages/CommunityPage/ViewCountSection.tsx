import { Game } from "@/interfaces/TypeGame";
import { ReactElement } from "react";
import AnimatedNumbers from "react-animated-numbers";

type ViewCountSectionProps = {
  displayedGame: Game;
};

const ViewCountSection = ({ displayedGame }: ViewCountSectionProps): ReactElement => {
  return (
    <div className="mt-8 flex gap-2 sm:gap-6 lg:gap-8">
      <YouTubeCount displayedGame={displayedGame} />
      <TwitchCount displayedGame={displayedGame} />
      <RedditCount displayedGame={displayedGame} />
    </div>
  );
};

export default ViewCountSection;

const YouTubeCount = ({ displayedGame }: ViewCountSectionProps): ReactElement => {
  return (
    <div className="flex items-center gap-1">
      <svg
        xmlns={"http://www.w3.org/2000/svg"}
        viewBox={"0 0 50 50"}
        fill={"#ffff"}
        className="h-7 w-7 sm:h-7 sm:w-7 lg:h-11 lg:w-11"
      >
        <path
          d={
            "M 44.898438 14.5 C 44.5 12.300781 42.601563 10.699219 40.398438 10.199219 C 37.101563 9.5 31 9 24.398438 9 C 17.800781 9 11.601563 9.5 8.300781 10.199219 C 6.101563 10.699219 4.199219 12.199219 3.800781 14.5 C 3.398438 17 3 20.5 3 25 C 3 29.5 3.398438 33 3.898438 35.5 C 4.300781 37.699219 6.199219 39.300781 8.398438 39.800781 C 11.898438 40.5 17.898438 41 24.5 41 C 31.101563 41 37.101563 40.5 40.601563 39.800781 C 42.800781 39.300781 44.699219 37.800781 45.101563 35.5 C 45.5 33 46 29.398438 46.101563 25 C 45.898438 20.5 45.398438 17 44.898438 14.5 Z M 19 32 L 19 18 L 31.199219 25 Z"
          }
        />
      </svg>
      <div className="flex flex-col">
        <p className="text-xs font-semibold sm:text-base lg:text-lg">{"YOUTUBE COUNT"}</p>
        <div className="text-sm text-gray-400 sm:text-base">
          <AnimateNumber numberToAnimate={displayedGame.youtube_count} />
        </div>
      </div>
    </div>
  );
};

const TwitchCount = ({ displayedGame }: ViewCountSectionProps): ReactElement => {
  return (
    <div className="flex items-center gap-1">
      <svg
        xmlns={"http://www.w3.org/2000/svg"}
        viewBox={"0 0 50 50"}
        fill={"#ffff"}
        className="h-7 w-7 sm:h-7 sm:w-7 lg:h-11 lg:w-11"
      >
        <path
          d={
            "M 5.3125 1 L 2 9.8125 L 2 43 L 13 43 L 13 49 L 20.40625 49 L 26.40625 43 L 35.40625 43 L 48 30.4375 L 48 1 Z M 11 6 L 43 6 L 43 28 L 37 34 L 25 34 L 19 40 L 19 34 L 11 34 Z M 20 13 L 20 27 L 26 27 L 26 13 Z M 30 13 L 30 27 L 36 27 L 36 13 Z"
          }
        />
      </svg>
      <div className="flex flex-col">
        <p className="text-xs font-semibold sm:text-base lg:text-lg">{"TWITCH COUNT"}</p>
        <div className="text-sm text-gray-400 sm:text-base">
          <AnimateNumber numberToAnimate={displayedGame.twitch_count} />
        </div>
      </div>
    </div>
  );
};

const RedditCount = ({ displayedGame }: ViewCountSectionProps): ReactElement => {
  return (
    <div className="flex items-center gap-1">
      <svg
        xmlns={"http://www.w3.org/2000/svg"}
        viewBox={"0 0 50 50"}
        fill={"#ffff"}
        className="h-7 w-7 sm:h-7 sm:w-7 lg:h-11 lg:w-11"
      >
        <path
          d={
            "M 29 3 C 26.894531 3 24.433594 4.652344 24.0625 12.03125 C 24.375 12.023438 24.683594 12 25 12 C 25.351563 12 25.714844 12.019531 26.0625 12.03125 C 26.300781 7.597656 27.355469 5 29 5 C 29.703125 5 30.101563 5.382813 30.84375 6.1875 C 31.710938 7.128906 32.84375 8.351563 35.0625 8.8125 C 35.027344 8.550781 35 8.269531 35 8 C 35 7.578125 35.042969 7.179688 35.125 6.78125 C 33.75 6.40625 33.023438 5.613281 32.3125 4.84375 C 31.519531 3.984375 30.609375 3 29 3 Z M 41 4 C 38.792969 4 37 5.796875 37 8 C 37 10.203125 38.792969 12 41 12 C 43.207031 12 45 10.203125 45 8 C 45 5.796875 43.207031 4 41 4 Z M 25 14 C 12.867188 14 3 20.179688 3 29 C 3 37.820313 12.867188 45 25 45 C 37.132813 45 47 37.820313 47 29 C 47 20.179688 37.132813 14 25 14 Z M 7.5 14.9375 C 6.039063 14.9375 4.652344 15.535156 3.59375 16.59375 C 1.871094 18.316406 1.515625 20.792969 2.5 22.84375 C 4.011719 19.917969 6.613281 17.421875 9.96875 15.5625 C 9.207031 15.175781 8.363281 14.9375 7.5 14.9375 Z M 42.5 14.9375 C 41.636719 14.9375 40.792969 15.175781 40.03125 15.5625 C 43.386719 17.421875 45.988281 19.917969 47.5 22.84375 C 48.484375 20.792969 48.128906 18.316406 46.40625 16.59375 C 45.347656 15.535156 43.960938 14.9375 42.5 14.9375 Z M 17 23 C 18.65625 23 20 24.34375 20 26 C 20 27.65625 18.65625 29 17 29 C 15.34375 29 14 27.65625 14 26 C 14 24.34375 15.34375 23 17 23 Z M 33 23 C 34.65625 23 36 24.34375 36 26 C 36 27.65625 34.65625 29 33 29 C 31.34375 29 30 27.65625 30 26 C 30 24.34375 31.34375 23 33 23 Z M 16.0625 34 C 16.3125 34.042969 16.558594 34.183594 16.71875 34.40625 C 16.824219 34.554688 19.167969 37.6875 25 37.6875 C 30.910156 37.6875 33.257813 34.46875 33.28125 34.4375 C 33.597656 33.988281 34.234375 33.867188 34.6875 34.1875 C 35.136719 34.503906 35.222656 35.109375 34.90625 35.5625 C 34.789063 35.730469 31.9375 39.6875 25 39.6875 C 18.058594 39.6875 15.210938 35.730469 15.09375 35.5625 C 14.777344 35.109375 14.859375 34.503906 15.3125 34.1875 C 15.539063 34.027344 15.8125 33.957031 16.0625 34 Z"
          }
        />
      </svg>
      <div className="flex flex-col">
        <p className="text-xs font-semibold sm:text-base lg:text-lg">{"REDDIT COUNT"}</p>
        <div className="text-sm text-gray-400 sm:text-base">
          <AnimateNumber numberToAnimate={displayedGame.reddit_count} />
        </div>
      </div>
    </div>
  );
};

type AnimateNumberProps = {
  numberToAnimate: number;
};

const AnimateNumber = ({ numberToAnimate }: AnimateNumberProps) => {
  return (
    <AnimatedNumbers
      animateToNumber={numberToAnimate}
      configs={(index: number) => {
        return { mass: 1, tension: 230 * (index + 1), friction: 140 };
      }}
    ></AnimatedNumbers>
  );
};
