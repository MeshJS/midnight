import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { api } from '@/utils/api';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { EB_Garamond, IBM_Plex_Sans } from 'next/font/google';
import Image from 'next/image';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

export const ebGaramond = EB_Garamond({
  variable: '--font-eb-garamond',
  subsets: ['latin'],
});

const ibmPlexSans = IBM_Plex_Sans({
  variable: '--font-ibm-plex-sans',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700'],
});

interface AuctionModalTrpcExampleProps {
  openDialog: boolean;
  setOpenDialog: (open: boolean) => void;
  index?: number;
}

export const AuctionModalTrpcExample = ({ openDialog, setOpenDialog, index }: AuctionModalTrpcExampleProps) => {
  const { data, isLoading } = api.getTable.getMany.useQuery();

  const formSchema = z.object({
    name: z.coerce.number(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: 0,
    },
  });

  if (isLoading || !data) {
    return <div>Loading...</div>;
  }

  const item = data[index!];

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log(values);
      form.reset();
    } catch {}
  };

  return (
    <>
      {item && (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent
            className={`${ebGaramond.variable} ${ibmPlexSans.className} border-[0.5px] border-white/20 bg-white/20 backdrop-blur-[20px]`}
          >
            <DialogHeader>
              <DialogDescription>
                <div className="">
                  <div className="relative h-[270px]">
                    <div className="absolute z-10 h-full w-full bg-[#0E1B2E]/40" />
                    <h1 className="absolute bottom-4 left-6 z-20 font-[family-name:var(--font-eb-garamond)] text-[26px] text-white">
                      {item.title}
                    </h1>
                    <Image
                      className="pointer-events-none h-full w-full rounded-t-[5px] object-cover"
                      src={item.imageUrl}
                      alt="sample"
                      width={300}
                      height={300}
                    />
                  </div>
                  <div className="space-y-4 px-6 pb-10 pt-4 text-white">
                    <div className="flex justify-between font-[family-name:var(--font-eb-garamond)] text-base">
                      <div>
                        <h2 className="text-[18px]">Ends In:</h2>
                        <p className="text-[18px] text-[#D28C13]">00:01:45</p>
                      </div>
                      <div className="text-end">
                        <h2 className="text-[18px]">Highest Bid:</h2>
                        <p className="text-[18px] text-[#D28C13]">{item.highestBid} tBID</p>
                      </div>
                    </div>
                    <div className="text-[14px] leading-snug">Description: {item.description}</div>
                    <div className="text-[14px] leading-snug">Estimate: {item.estimate}</div>
                  </div>

                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                      <div className="flex items-center justify-between px-6 pb-10">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem className="">
                              <FormLabel className=""></FormLabel>
                              <FormControl>
                                <Input className="w-[200px] placeholder:text-center" placeholder="0,000 tBID" {...field} />
                              </FormControl>
                              <FormDescription></FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <Button
                          type="submit"
                          className="w-[140px] rounded-[4px] bg-gradient-to-r from-[#D26608] to-[#D28C13] font-normal transition-all hover:from-[#E07318] hover:to-[#E29E35]"
                        >
                          Place Bid
                        </Button>
                      </div>
                    </form>
                  </Form>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};
