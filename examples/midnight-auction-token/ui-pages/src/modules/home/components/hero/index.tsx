import { HeroCarouselFramer } from "./hero-carousel-framer";

export const Hero = () => {
  return (
    <div className="h-full min-h-[calc(100vh-70px)] flex items-center">
      <div className="flex w-[35%] h-[580px] pl-28 text-white/80">
        <div className="flex flex-col h-full justify-between w-[310px] ">
          <h1 className="leading-none text-5xl font-[family-name:var(--font-eb-garamond)]">
            The future of private auctions
          </h1>
          <div className="relative space-y-5 leading-[22px]">
            <div className="absolute rounded-full h-[1.2px] w-full bg-white/80" />
            <p>
              Bid on exclusive real estate with complete privacy and compliance.
            </p>
            <p>
              Powered by Midnight blockchain, Midnight Auctions ensures secure,
              fair, and anonymous transactions while maintaining full regulatory
              integrity.
            </p>
          </div>
        </div>
      </div>

      <div className="h-[600px] w-[65%]">
        <HeroCarouselFramer />
      </div>
    </div>
  );
};



//falta motion animations hero