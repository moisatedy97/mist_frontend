import { ReactElement, ReactNode } from "react";
import Carousel from "react-multi-carousel";
import "../../node_modules/react-multi-carousel/lib/styles.css";

type CarouselFunctionalitiesProps = {
  autoPlay: boolean;
  autoPlaySpeed: number;
  showDots: boolean;
  infinite: boolean;
};

type CardCarouselProps = {
  carouselFunctionalities?: CarouselFunctionalitiesProps;
  cards: ReactNode[];
  className?: string;
};

const CardCarousel = ({ cards, carouselFunctionalities, className }: CardCarouselProps): ReactElement => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1536 },
      items: 5,
    },
    largeDesktop: {
      breakpoint: { max: 1536, min: 1280 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 1280, min: 960 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 960, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  const defCarouselFunctionalities: CarouselFunctionalitiesProps = {
    autoPlay: true,
    autoPlaySpeed: 2500,
    showDots: false,
    infinite: true,
  };
  const carouselProps = { ...defCarouselFunctionalities, ...carouselFunctionalities };

  return (
    <div className={className ?? "rounded bg-[#1c2434] p-2"}>
      <Carousel
        responsive={responsive}
        autoPlay={carouselProps.autoPlay}
        showDots={carouselProps.showDots}
        autoPlaySpeed={carouselProps.autoPlaySpeed}
        infinite={carouselProps.infinite}
        removeArrowOnDeviceType={["tablet", "mobile"]}
      >
        {cards.map((card: ReactNode, index: number) => {
          return (
            <div key={index} className="px-2 py-1">
              {card}
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default CardCarousel;
