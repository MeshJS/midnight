import { AppRouter } from "@/server/api/root";
import { inferRouterOutputs } from "@trpc/server";
import Image from "next/image";

type RouterOutput = inferRouterOutputs<AppRouter>;
type GetUserOutput = RouterOutput["getTable"]["getMany"][number];
type SimplifiedAuction = Pick<
  GetUserOutput,
  "id" | "title" | "description" | "imageUrl" | "estimate"
>;

interface AuctionCardTrpcExampleProps extends SimplifiedAuction {
  setIndex: (index: number | undefined) => void;
  index: number | undefined;
  setOpenDialog: (open: boolean) => void;
}

export const AuctionCardTrpcExample = ({
  id,
  title,
  description,
  imageUrl,
  estimate,
  setIndex,
  setOpenDialog,
  index,
}: AuctionCardTrpcExampleProps) => {
  return (
    <div
      className="relative h-[370px] w-[270px] cursor-pointer"
      onClick={() => {
        setIndex(index);
        setOpenDialog(true);
      }}
    >
      <div className="absolute left-3 top-2 rounded-[3px] bg-white/10 px-2 py-0.5 text-[15px] text-white backdrop-blur-md">
        Closed
      </div>
      <div className="absolute bottom-0 h-fit w-full space-y-2 rounded-b-[5px] bg-white/20 p-2.5 backdrop-blur-lg">
        <h2 className="font-[family-name:var(--font-eb-garamond)] text-[18px] text-white">
          {title}
        </h2>
        <p className="text-[13px] leading-[1.3] text-[#0E1B2E]">
          {description}
        </p>
        <p className="text-[13px] text-[#D28C13]">{estimate}</p>
      </div>
      <div className="h-[80%] w-full">
        <Image
          className="pointer-events-none h-full w-full rounded-[5px] object-cover"
          src={imageUrl}
          alt="sample"
          width={300}
          height={300}
        />
      </div>
    </div>
  );
};
