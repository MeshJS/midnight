import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

export const HeroCarousel = () => {
  return (
    <Carousel className="h-full w-full border border-pink-300">
      <CarouselContent className="-ml-1 border border-orange-400">
        <CarouselItem className="pl-1 basis-[550px] border">
          <div className="p-1">
            <Card>
              <CardContent className="w-full aspect-square overflow-hidden ">
                <Image className="object-cover w-full" src="/sample-1.jpg" alt="sample" width={100} height={100}/>
              </CardContent>
            </Card>
          </div>
        </CarouselItem>
        <CarouselItem className="pl-1 basis-[550px]">
          <div className="p-1">
            <Card>
              <CardContent className="flex aspect-square items-center justify-center p-6">
                <span className="text-2xl font-semibold">2</span>
              </CardContent>
            </Card>
          </div>
        </CarouselItem>
        <CarouselItem className="pl-1 basis-[550px]">
          <div className="p-1">
            <Card>
              <CardContent className="flex aspect-square items-center justify-center p-6">
                <span className="text-2xl font-semibold">3</span>
              </CardContent>
            </Card>
          </div>
        </CarouselItem>
        <CarouselItem className="pl-1 basis-[550px]">
          <div className="p-1">
            <Card>
              <CardContent className="flex aspect-square items-center justify-center p-6">
                <span className="text-2xl font-semibold">4</span>
              </CardContent>
            </Card>
          </div>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
};
