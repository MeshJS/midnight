import { useWallet } from '@meshsdk/react';
import { CardanoWallet } from '@meshsdk/react';
import { BlockfrostProvider, MeshTxBuilder } from "@meshsdk/core";


const Page = () => {
  const { connected, wallet } = useWallet();
  const blockchainProvider = new BlockfrostProvider(process.env.NEXT_PUBLIC_BLOCKFROST_ID!);

  const txBuilder = new MeshTxBuilder({
    fetcher: blockchainProvider,
    verbose: true,
  });

  const submitTx = async () => {
    if (connected) {
      const utxos = await wallet.getUtxos();
      const rewardAddresses = await wallet.getRewardAddresses();
      const rewardAddress = rewardAddresses[0];
      const changeAddress = await wallet.getChangeAddress();
      if (rewardAddress) {
        try {
          const unsignedTx = await txBuilder
            .txOut('addr1zyzpenlg0vywj7zdh9dzdeggaer94zvckfncv9c3886c36yafhxhu32dys6pvn6wlw8dav6cmp4pmtv7cc3yel9uu0nqhcjd29', [
              { unit: 'lovelace', quantity: '150000000' },
            ])
            .voteDelegationCertificate(
              {
                dRepId: 'drep1yf05mscx9y53363vc2zqc6jk0gqn6yvh8rz4lznv64ewl3cnmpwqu',
              },
              rewardAddress,
            )
            .changeAddress(changeAddress)
            .selectUtxosFrom(utxos)
            .complete();

          const signedTx = await wallet.signTx(unsignedTx);
          const txHash = await wallet.submitTx(signedTx);

          console.log(txHash);
        } catch {
          console.log('that did not work');
        }
      }
    }
  };

  const submitTxTest = async () => {
    if (connected) {
      const utxos = await wallet.getUtxos();
      const rewardAddresses = await wallet.getRewardAddresses();
      const rewardAddress = rewardAddresses[0];
      const changeAddress = await wallet.getChangeAddress();
      if (rewardAddress) {
        try {
          const unsignedTx = await txBuilder
            .txOut('addr_test1qr3jwk6039g88vwnjwd77grpk7nx3xu0dxcgfhql5xh3pwj680nmgxyd0ehkz54tj8h3d8j6r4e0uc8xq75ew680yhasj2n6tm', [
              { unit: 'lovelace', quantity: '1000000' },
            ])            
            .changeAddress(changeAddress)
            .selectUtxosFrom(utxos)
            .complete();

          const signedTx = await wallet.signTx(unsignedTx);
          const txHash = await wallet.submitTx(signedTx);

          console.log(txHash);
        } catch {
          console.log('that did not work');
        }
      }
    }
  };

  return (
    <div className='mt-[70px]'>
      <CardanoWallet />
      <div className='cursor-pointer' onClick={submitTx}>Submit Delegation Tx</div>
      <div className='cursor-pointer' onClick={submitTxTest}>Test Tx</div>
    </div>
  );
};

export default Page;
