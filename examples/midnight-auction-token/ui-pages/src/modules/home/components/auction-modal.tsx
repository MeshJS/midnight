import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader } from '@/components/ui/dialog';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { EB_Garamond, IBM_Plex_Sans } from 'next/font/google';
import { ContractState, useProviders } from '@/packages/midnight-contracts/auction';
import { useAuctionContractSubscription } from '@/modules/midnight-contracts/auction/hooks/use-contract-subscription';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import Countdown from 'react-countdown';
import { STATE } from '@meshsdk/auction-contract';

export const ebGaramond = EB_Garamond({
  variable: '--font-eb-garamond',
  subsets: ['latin'],
});

const ibmPlexSans = IBM_Plex_Sans({
  variable: '--font-ibm-plex-sans',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700'],
});

interface AuctionModalProps {
  contracts: ContractState[];
  openDialog: boolean;
  setOpenDialog: (open: boolean) => void;
  index: number | undefined;
}

export const AuctionModal = ({ contracts, openDialog, setOpenDialog, index }: AuctionModalProps) => {
  const providers = useProviders();
  const [selectedCertificate, setSelectedCertificate] = useState<string | null>(null);
  const [registerDisabled, setRegisterDisabled] = useState(false);
  const [bidDisabled, setBidDisabled] = useState(false);

  const formSchema = z.object({
    bidValue: z.coerce.number(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bidValue: 0,
    },
  });

  const item = useMemo(() => (index !== undefined ? contracts[index] : undefined), [index, contracts]);
  // Add a key to force re-mount of the hook when index changes
  const key = item?.address || index;
  const { contractDeployment, contractState, register, set_myId1, set_myId2, set_myId3, set_myId4, bid } =
    useAuctionContractSubscription(item, key);
  console.log('contractState', contractState);

  const handleRegister = async () => {
    try {
      setRegisterDisabled(true);
      await register();
      setRegisterDisabled(false);
    } catch (e: any) {
      console.log('error', e.message);
      toast.error(e.message);
      setRegisterDisabled(false);
    }
  };

  useEffect(() => {
    if (contractState?.userAction?.action === 'registering') {
      toast.info('Registering your certificate...');
    }
    if (contractState?.userAction?.action === 'registering-done') {
      toast.dismiss(); // Remove previous messages
      toast.info('Your certificate was registered.');
    }
  }, [contractState?.userAction.action]);

  const handleSelectChange = (value: string) => {
    setSelectedCertificate(value);
    console.log('Selected certificate:', value);
    toast.success(`Certificate ${value} selected`);

    // Map selected value to its respective function
    const functionMap: Record<string, () => void> = {
      myId1: set_myId1,
      myId2: set_myId2,
      myId3: set_myId3,
      myId4: set_myId4,
    };

    // Execute the corresponding function if the value exists in the map
    if (functionMap[value]) {
      functionMap[value]();
      console.log(`Executed function for ${value}`);
    }
  };

  const deadlineString = contractState?.info.deadline;

  // Convert string to Date object safely
  const deadlineDate = useMemo(() => (deadlineString ? dayjs(deadlineString).toDate() : null), [deadlineString]);

  const renderer = ({ days, hours, minutes, seconds, completed }: any) => {
    if (completed) {
      return <span className="text-[18px] text-red-500">Expired</span>;
    } else {
      return (
        <span className="text-[18px] text-[#D28C13]">
          {String(days).padStart(2, '0')}:{String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:
          {String(seconds).padStart(2, '0')}
        </span>
      );
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log(values);
      setBidDisabled(true);
      await bid(values.bidValue);
      setBidDisabled(false);
      form.reset();
    } catch {
      toast.error('something went wrong');
      setBidDisabled(false);
    }
  };

  useEffect(() => {
    if (contractState?.userAction?.action === 'bidding') {
      toast.info('Placing your bid');
    }
    if (contractState?.userAction?.action === 'bidding-done') {
      toast.dismiss(); // Remove previous messages
      toast.info('Your bid was placed');
    }
  }, [contractState?.userAction.action]);

  useEffect(() => {
    if (providers?.flowMessage) {
      toast.info(providers.flowMessage, {
        id: 'flowMessageToast', // Use a fixed ID to avoid duplicates
        duration: Infinity,
      });
    }
  }, [providers?.flowMessage]);

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
                      {contractState?.info.title}
                    </h1>
                    {contractState?.info.image && (
                      <Image
                        className="pointer-events-none h-full w-full rounded-t-[5px] object-cover"
                        src={contractState.info.image}
                        alt="sample"
                        width={300}
                        height={300}
                      />
                    )}
                  </div>
                  <div className="space-y-6 px-6 pb-10 pt-4 text-white">
                    <div className="flex justify-between font-[family-name:var(--font-eb-garamond)] text-base">
                      <div>
                        <h2 className="text-[18px]">Ends In:</h2>
                        <p className="text-[18px] text-[#D28C13]">
                          {deadlineDate ? (
                            <Countdown date={deadlineDate} renderer={renderer} />
                          ) : (
                            <p className="text-[18px] text-red-500">Invalid date</p>
                          )}
                        </p>
                      </div>
                      <div className="text-end">
                        <h2 className="text-[18px]">Highest Bid:</h2>
                        <p className="text-[18px] text-[#D28C13]">
                          {contractState?.highestBid.toString()}
                          {'  '}tBid
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex gap-x-2 text-[14px] leading-snug">
                        <div>Contract:</div>
                        <div className="flex gap-x-2">
                          <div className="">
                            {contractDeployment?.address &&
                              `${contractDeployment.address.slice(0, 15)}...${contractDeployment.address.slice(-15)}`}
                          </div>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Image
                                  className="cursor-pointer"
                                  onClick={() => {
                                    contractDeployment?.address && navigator.clipboard.writeText(contractDeployment.address);
                                    toast.success('Contract address copied!');
                                  }}
                                  src="/copy-white.svg"
                                  alt="copy"
                                  width={12}
                                  height={12}
                                />
                              </TooltipTrigger>
                              <TooltipContent side="bottom">
                                <p>Copy contract</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </div>
                      <div className="flex gap-x-2 text-[14px] leading-snug">
                        <div>Estimate:</div>
                        <div>{contractState?.info.description}</div>
                      </div>
                    </div>
                  </div>

                  {contractState?.state === STATE.active && (
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="flex items-center justify-between px-6 pb-10">
                          <FormField
                            control={form.control}
                            name="bidValue"
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
                          disabled={bidDisabled}
                            type="submit"
                            className="w-[140px] rounded-[4px] bg-gradient-to-r from-[#D26608] to-[#D28C13] font-normal transition-all hover:from-[#E07318] hover:to-[#E29E35]"
                          >
                            Place Bid
                          </Button>
                        </div>
                      </form>
                    </Form>
                  )}
                  {contractState?.state === STATE.open && (
                    <div className="flex w-full justify-between items-center px-6 pb-10">
                      <Select onValueChange={handleSelectChange}>
                        <SelectTrigger className="w-[180px] border-none bg-[#3E4858] rounded-[4px] text-white">
                          <SelectValue placeholder="Select a certificate" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>My Certificates</SelectLabel>
                            <SelectItem value="myId1">My ID 1</SelectItem>
                            <SelectItem value="myId2">My ID 2</SelectItem>
                            <SelectItem value="myId3">My ID 3</SelectItem>
                            <SelectItem value="myId4">My ID 4</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <Button
                        disabled={registerDisabled}
                        onClick={handleRegister}
                        className="w-[140px] rounded-[4px] bg-gradient-to-r from-[#D26608] to-[#D28C13] font-normal transition-all hover:from-[#E07318] hover:to-[#E29E35]"
                      >
                        Register now
                      </Button>
                    </div>
                  )}
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};
