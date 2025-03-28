import { useWindowSize } from "usehooks-ts";
import { motion } from "motion/react";
import Image from "next/image";

export const HeroCarouselFramer = () => {
  const { width } = useWindowSize();
  const leftConstraint = -(width * 0.9);
  return (
    <div className="h-full overflow-hidden">
      <motion.div
        drag="x"
        dragConstraints={{ left: leftConstraint, right: 0 }}
        whileDrag={{ cursor: "grabbing" }}
        className="flex h-full w-fit gap-x-4 cursor-grab "
      >
        <div className="relative w-full rounded-[5px] aspect-square overflow-hidden">
          <Image
            className="h-full w-full pointer-events-none  object-cover "
            src="/sample-1.jpg"
            alt="sample"
            width={500}
            height={500}
          />
        </div>
        <div className="relative w-full rounded-[5px] aspect-square overflow-hidden">
          <Image
            className="pointer-events-none h-full w-full object-cover "
            src="/sample-3.jpg"
            alt="sample"
            width={500}
            height={500}
          />
        </div>
        <div className="relative w-full rounded-[5px] aspect-square overflow-hidden ">
          <Image
            className="pointer-events-none h-full w-full object-cover "
            src="/sample-2.jpg"
            alt="sample"
            width={500}
            height={500}
          />
        </div>
        <div className="relative w-full rounded-[5px] aspect-square overflow-hidden ">
          <Image
            className="pointer-events-none h-full w-full object-cover "
            src="/sample-1.jpg"
            alt="sample"
            width={500}
            height={500}
          />
        </div>
      </motion.div>
    </div>
  );
};


//fazer um map dos items do carousel