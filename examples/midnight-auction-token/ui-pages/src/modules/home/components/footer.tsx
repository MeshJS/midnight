import Image from 'next/image';
import Link from 'next/link';

export const Footer = () => {
  return (
    <div className="flex h-20 justify-center">
      <div className="flex h-12  justify-center items-center w-fit gap-x-12 text-white/70">
        <div className=" flex items-center gap-x-3">
          <Image src="/sample-logo-light.svg" alt="Midnight Auctions" width={22} height={22} />
          <h1 className=" text-sm font-[family-name:var(--font-eb-garamond)]">MIDNIGHT AUCTIONS</h1>
        </div>
        <div className="flex items-center justify-center pb-0.5">
          <div className="flex gap-x-2 items-center h-10 pr-2">
            <span>This is a prototype by</span>
            <Link href="https://www.eddalabs.io">
              <Image className="pt-0.5" src="/edda-logo.svg" alt="Edda Labs" width={50} height={50} />
            </Link>
          </div>
          <div className="flex gap-x-2 items-center h-10">
            <span>, powered by</span>
            <Link href="https://meshjs.dev/">
              <Image src="/mesh-sdk-logo.png" alt="Mesh.js" width={95} height={95} />
            </Link>
          </div>
            <span>.</span>
        </div>
      </div>
    </div>
  );
};
