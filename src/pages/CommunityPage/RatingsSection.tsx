import { Game } from "@/interfaces/TypeGame";
import { Rating } from "@/interfaces/TypeRating";
import { ReactElement } from "react";

type RatingsSectionProps = {
  displayedGame: Game;
};

const RatingsSection = ({ displayedGame }: RatingsSectionProps): ReactElement => {
  return (
    <div className="pt-8">
      <p className="text-xl font-semibold hover:text-blue-600">{"Ratings"}</p>
      <div className="flex flex-col gap-2 p-2">
        {displayedGame.ratings.map((rating: Rating, index: number) => {
          return (
            <div key={index} className="flex items-center gap-4">
              <NumberOfStars ratingId={rating.id} />
              <p className="text-sm italic text-gray-400">{rating.title}</p>
              <p>{rating.percent}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RatingsSection;

type NumberOfStarsProps = {
  ratingId: number;
};

const NumberOfStars = ({ ratingId }: NumberOfStarsProps): ReactElement => {
  switch (ratingId) {
    case 1:
      return (
        <div className="flex">
          <RatingStar />
        </div>
      );
      break;

    case 3:
      return (
        <div className="flex">
          <RatingStar />
          <RatingStar />
        </div>
      );
      break;
    case 4:
      return (
        <div className="flex">
          <RatingStar />
          <RatingStar />
          <RatingStar />
        </div>
      );
      break;
    case 5:
      return (
        <div className="flex">
          <RatingStar />
          <RatingStar />
          <RatingStar />
          <RatingStar />
        </div>
      );
      break;
    default:
      return <></>;
      break;
  }
};

const RatingStar = (): ReactElement => {
  return (
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
  );
};
