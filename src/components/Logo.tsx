import Link from "next/link";
import React from "react";
import { DM_Serif_Display } from "next/font/google";
import Image from "next/image";

const dmSerif = DM_Serif_Display({ weight: "400", subsets: ["latin"] });

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <Link href="/">
        <div className="flex items-center gap-3">
          <div className="relative flex h-11 w-11">
            <Image
              src="/img/logo-brown.png"
              alt="Craftopia Signature Patchwork Sandals Logo"
              fill
              priority
            />
          </div>
          <p
            className={`${dmSerif.className} h-9 w-auto pt-1 text-xl font-bold uppercase text-primary dark:text-neutral`}
          >
            Craftopia
          </p>
        </div>
      </Link>
    </div>
  );
};

export default Logo;
