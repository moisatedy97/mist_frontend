import { ReactElement, useEffect } from "react";
import { gamesEndPoints } from "../../api/GamesEndPoints";
import { RawgRes } from "../../interfaces/GamesRes";
import { GAMES_ORDER_BY } from "../../constants/Constants";
import ImageCarousel from "../../components/ImageCarousel";
import CardCarousel from "../../components/CardCarousel";
import GameCard from "../../components/GameCard";
import { Game } from "../../interfaces/TypeGame";
import { useGamesStore } from "../../stores/GamesStore";
import { useLoaderStore } from "@/stores/LoaderStore";

const StorePage = () => {
  const { popularGames, setPopularGames } = useGamesStore((state) => ({
    popularGames: state.popularGames,
    setPopularGames: state.setPopularGames,
  }));
  const { topRatedGames, setTopRatedGames } = useGamesStore((state) => ({
    topRatedGames: state.topRatedGames,
    setTopRatedGames: state.setTopRatedGames,
  }));
  const { topSportsGames, setTopSportsGames } = useGamesStore((state) => ({
    topSportsGames: state.topSportsGames,
    setTopSportsGames: state.setTopSportsGames,
  }));
  const setIsLoaderActive = useLoaderStore((state) => state.setLoader);

  useEffect(() => {
    if (popularGames.length === 0) {
      gamesEndPoints.API_GET_GAMES({ page_size: 5 }).then((response: RawgRes) => {
        setPopularGames(response.results);
      });
    }
    if (topRatedGames.length === 0) {
      setIsLoaderActive(true);
      gamesEndPoints
        .API_GET_GAMES({ page_size: 10, ordering: GAMES_ORDER_BY.RATING_DSC })
        .then((response: RawgRes) => {
          setTopRatedGames(response.results);
        })
        .finally(() => {
          setIsLoaderActive(false);
        });
    }
    if (topSportsGames.length === 0) {
      gamesEndPoints
        .API_GET_GAMES({ page_size: 10, ordering: GAMES_ORDER_BY.RATING_DSC, genres: "sports" })
        .then((response: RawgRes) => {
          setTopSportsGames(response.results);
        });
    }
  }, []);

  return (
    <div className="flex flex-1 flex-col gap-11 overflow-y-auto bg-gray-800 py-10 sm:py-12 lg:py-16">
      <div className="px-14 sm:px-32 lg:px-[13rem] xl:px-[15rem]">
        <ImageCarousel games={popularGames} />
      </div>
      <MostPlayedGames />
      <SportsGames />
    </div>
  );
};

export default StorePage;

const MostPlayedGames = (): ReactElement => {
  const topRatedGames = useGamesStore((state) => state.topRatedGames);

  return (
    <div className="px-4 sm:px-16 lg:px-[6rem]">
      <h4 className="pl-6 text-base font-semibold text-white sm:text-lg lg:pl-11">{"TOP RATED GAMES"}</h4>
      <CardCarousel
        cards={topRatedGames.map((game: Game, index: number) => {
          return <GameCard key={index} game={game} />;
        })}
      />
    </div>
  );
};

const SportsGames = (): ReactElement => {
  const topSportsGames = useGamesStore((state) => state.topSportsGames);

  return (
    <div className="px-4 sm:px-16 lg:px-[6rem]">
      <h4 className="pl-6 text-base font-semibold text-white sm:text-lg lg:pl-11">{"POPULAR GAMES"}</h4>
      <CardCarousel
        cards={topSportsGames.map((game: Game, index: number) => {
          return <GameCard key={index} game={game} />;
        })}
      />
    </div>
  );
};
