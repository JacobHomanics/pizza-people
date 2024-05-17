"use client";

import Link from "next/link";
import fc from "~~/public/social-icons/farcaster.png";
import ig from "~~/public/social-icons/instagram.png";
import twitter from "~~/public/social-icons/x.png";

type Props = {
  name?: string;
  image?: any;
  twitterUrl?: string;
  farcasterUrl?: string;
  instagramUrl?: string;
};

export const PfpCard = ({ name, image, twitterUrl, farcasterUrl, instagramUrl }: Props) => {
  return (
    <div className="m-5">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={image.src} alt={name} className="lg:w-[275px]" />
      <p className="m-1 lg:m-4 grilledCheese lg:text-4xl">{name}</p>
      <div className="flex space-x-1 items-center justify-center">
        {twitterUrl ? (
          <Link href={twitterUrl}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={twitter.src} alt="x" className="w-7 lg:w-10" />
          </Link>
        ) : (
          <></>
        )}
        {farcasterUrl ? (
          <Link href={farcasterUrl}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={fc.src} alt="fc" className="w-7 lg:w-10" />
          </Link>
        ) : (
          <></>
        )}
        {instagramUrl ? (
          <Link href={instagramUrl}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={ig.src} alt="ig" className="w-7 lg:w-10" />
          </Link>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
