import { useAuctionContractSubscription } from '@/modules/midnight-contracts/auction/hooks/use-contract-subscription';
import { ContractState } from '@/packages/midnight-contracts/auction';
import { useAssets } from '@/packages/midnight-react';
import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import Image from 'next/image';
import { toast } from 'sonner';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface CertificatePageProps {
  contract: ContractState;
}

const FormSchema = z.object({
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'You have to select at least one item.',
  }),
});

export const CertificatePage = ({ contract }: CertificatePageProps) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: [],
    },
  });

  const { contractDeployment, contractState, list_register, list_confirmed, approve_certificates } = useAuctionContractSubscription(contract);

  const { coinPublicKey } = useAssets();
  const [list_register_, setList_register_] = useState<(string | undefined)[] | undefined>([]);
  const [list_confirmed_, setList_confirmed_] = useState<(string | undefined)[] | undefined>(undefined);

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      console.log(data);
      await approve_certificates(data.items);
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  useEffect(() => {
    if (contractState?.userAction?.action === 'approving-hashed') {
      toast.info('Approving certificate');
    }
    if (contractState?.userAction?.action === 'approving-hashedDone') {
      toast.dismiss(); // Remove previous messages
      toast.info('Certificate approved');
    }
  }, [contractState?.userAction.action]);

  useEffect(() => {
    const list_register_ = list_register();
    setList_register_(list_register_);
  }, [list_register]);

  // Update form default values when list_register_ changes
  useEffect(() => {
    if (list_register_) {
      form.reset({ items: list_register_.filter((item) => item !== undefined) });
    }
  }, [list_register_, form]);

  useEffect(() => {
    const list_confirmed_ = list_confirmed();
    setList_confirmed_(list_confirmed_);
  }, [list_confirmed]);

  return (
    <div className="border border-[#707070] rounded-[3px] px-3 py-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="items"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="font-normal">
                    <div className="flex space-x-2">
                      <h1 className="text-white/50">Contract Address: </h1>
                      <div className="flex gap-x-2">
                        <div className="text-white/80">
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
                  </FormLabel>
                  <FormDescription></FormDescription>
                </div>
                <div className="pt-2 space-y-2 ">
                  {(list_register_ ?? []).map((item, index) => (
                    <FormField
                      key={index}
                      control={form.control}
                      name="items"
                      render={({ field }) => {
                        console.log('field value', field.value);
                        console.log('item', item);
                        return (
                          <FormItem key={index} className="flex flex-row items-start space-x-2 space-y-0 text-white/80 text-sm">
                            <FormControl>
                              <Checkbox
                                className="border-gray-500 text-green-500 checked:bg-green-500 checked:border-green-500 checked:text-white"
                                checked={field.value.includes(item ?? '')}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, item])
                                    : field.onChange(field.value?.filter((value) => value !== item));
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">{item}</FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-start">
            <Button
              className="py-[5px] h-fit rounded-[3px] bg-gradient-to-r from-[#D26608] to-[#D28C13] font-normal transition-all hover:from-[#E07318] hover:to-[#E29E35]"
              type="submit"
            >
              Approve Certificates
            </Button>
          </div>
        </form>
      </Form>
    </div>
    //   <div>
    //   <div>Registered Certificates: {list_register_ && list_register_.toString()}</div>
    //   // <div>Confirmed Certificates: {list_confirmed_ && list_confirmed_.toString()}</div>
    //   <div onClick={() => approve_certificates(['e90936a4daa108d901e3b5793c095d70d64397d80a8ffc6e378882302a3d31f6'])}>
    //     // // Approve Certificates //{' '}
    //   </div>
    // </div>
  );
};
