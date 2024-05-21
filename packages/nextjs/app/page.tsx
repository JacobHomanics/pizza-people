"use client";

import { useEffect } from "react";
import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import hero from "../public/hero.png";
import type { NextPage } from "next";
// import "react-multi-carousel/lib/styles.css";
import { formatEther } from "viem";
import { useAccount } from "wagmi";
import { HeartIcon } from "@heroicons/react/24/outline";
// import { NftCard } from "~~/components/NftCard";
import { PfpCard } from "~~/components/PfpCard";
import { Address } from "~~/components/scaffold-eth";
import {
  useScaffoldContract, // useScaffoldEventHistory,
  useScaffoldReadContract, // useScaffoldWatchContractEvent, // useScaffoldEventSubscriber,
  useScaffoldWriteContract,
} from "~~/hooks/scaffold-eth";
import banner from "~~/public/banner.png";
import ladders from "~~/public/collections-icons/laddersdotvision.png";
import opensea from "~~/public/collections-icons/opensea.png";
import benny from "~~/public/pfps/benny.jpg";
// import { useFetches } from "~~/hooks/useFetches";
// import { useUris } from "~~/hooks/useUris";
// import { useFetches } from "~~/hooks/useFetches";
// import { useUris } from "~~/hooks/useUris";
import jake from "~~/public/pfps/jake.jpg";
import klim from "~~/public/pfps/klim.jpg";
import mark from "~~/public/pfps/mark.jpg";
import noreen from "~~/public/pfps/noreen.jpg";

// import previewImage from "~~/public/preview.png";

const DynamicCarousel = dynamic(() => import("../components/Carousel"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

const Home: NextPage = () => {
  const [nugsToMint, setNugsToMint] = useState<number>(1);

  const { address: connectedAddress } = useAccount();

  const { writeContractAsync: writePizzaPeopleAsync } = useScaffoldWriteContract("PizzaPeople");

  const { data: startMintTimestamp } = useScaffoldReadContract({
    contractName: "PizzaPeople",
    functionName: "getMintStartTimestamp",
  });

  const { data: endMintTimestamp } = useScaffoldReadContract({
    contractName: "PizzaPeople",
    functionName: "getMintEndTimestamp",
  });

  const { data: mintPrice, refetch: refetchMintPrice } = useScaffoldReadContract({
    contractName: "PizzaPeople",
    functionName: "getMintPrice",
  });

  const { data: mintCount, refetch: refetchMintCount } = useScaffoldReadContract({
    contractName: "PizzaPeople",
    functionName: "getCurrentTokenCount",
  });

  const { data: maxMintCount, refetch: refetchMaxMintCount } = useScaffoldReadContract({
    contractName: "PizzaPeople",
    functionName: "getMaxTokenCount",
  });

  const { data: Weedies } = useScaffoldContract({ contractName: "PizzaPeople" });

  const [currentDate, setTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(async () => {
      setTime(Date.now());
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const mintTimeLeft = (Number(endMintTimestamp) * 1000 || currentDate.valueOf()) - currentDate.valueOf();
  const timeLeftTillMint = Number(startMintTimestamp) * 1000 - currentDate.valueOf();

  const date = new Date(Number(startMintTimestamp) * 1000);
  // const endDate = new Date(Number(endMintTimestamp) * 1000);

  const startDateLocale = date.toLocaleString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  // const endDateLocale = endDate.toLocaleString("en-US", {
  //   day: "2-digit",
  //   month: "2-digit",
  //   year: "2-digit",
  //   hour: "2-digit",
  //   minute: "2-digit",
  // });

  // function secondsToDhms2(seconds: number) {
  //   seconds = Number(seconds);
  //   const d = Math.floor(seconds / (3600 * 24));
  //   const h = Math.floor((seconds % (3600 * 24)) / 3600);
  //   const m = Math.floor((seconds % 3600) / 60);
  //   const s = Math.floor(seconds % 60);

  //   const dDisplay = d > 0 ? d + (d == 1 ? " : " : " : ") : "";
  //   const hDisplay = h > 0 ? h + (h == 1 ? " : " : " : ") : "";
  //   const mDisplay = m > 0 ? m + (m == 1 ? " : " : " : ") : "";
  //   const sDisplay = s > 0 ? s + (s == 1 ? "" : "") : "";
  //   return (dDisplay + hDisplay + mDisplay + sDisplay).replace(/,\s*$/, "");
  // }

  // function secondsToDhms(seconds: number) {
  //   seconds = Number(seconds);
  //   const d = Math.floor(seconds / (3600 * 24));
  //   const h = Math.floor((seconds % (3600 * 24)) / 3600);
  //   const m = Math.floor((seconds % 3600) / 60);
  //   const s = Math.floor(seconds % 60);

  //   const dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
  //   const hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
  //   const mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
  //   const sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
  //   return (dDisplay + hDisplay + mDisplay + sDisplay).replace(/,\s*$/, "");
  // }

  // let mintTimeLeftFormatted = secondsToDhms2(mintTimeLeft / 1000);

  const aDate = new Date(0);
  aDate.setSeconds(mintTimeLeft / 1000); // specify value for SECONDS here
  // const mintTimeLeftFormatted = aDate.toISOString().substring(11, 19);

  // const timeLeftTillMintFormatted = secondsToDhms(timeLeftTillMint / 1000);

  let mintWindowOutput;
  if (timeLeftTillMint >= 0) {
    mintWindowOutput = (
      <div className="flex flex-col text-center bg-base-100 rounded-lg p-0 lg:p-2 w-40 lg:w-96 m-1">
        <p className="grilledCheese text-md lg:text-4xl m-0 text-secondary -m-1">Starts</p>
        <p className="text-sm lg:text-4xl m-0 text-red-600 -m-1 font-bold">{startDateLocale}</p>
      </div>
    );
  } else {
    mintWindowOutput = (
      <div className="flex flex-col text-center bg-base-100 rounded-lg p-0 lg:p-2 w-40 lg:w-96 m-1">
        <p className="grilledCheese text-md lg:text-4xl m-0 text-secondary -m-1">The Pizza Shop is open!</p>
      </div>
    );
  }

  const supply = Number(maxMintCount) - Number(mintCount);

  // const [mintedTokenIds, setMintedTokenIds] = useState<bigint[]>([]);

  // const { data: blockNumber } = useBlockNumber();

  // const [mintedBlock, setMintedBlock] = useState<bigint>();

  // const userAccount = useAccount();

  // console.log(mintedBlock);
  // const {
  //   data: events,
  //   isLoading: isLoadingEvents,
  //   error: errorReadingEvents,
  // } = useScaffoldEventHistory({
  //   contractName: "PizzaPeople",
  //   eventName: "Minted",
  //   fromBlock: mintedBlock!,
  //   watch: true,
  //   filters: { user: userAccount.address },
  //   blockData: true,
  //   transactionData: true,
  //   receiptData: true,
  // });

  // const tokenIds: bigint[] = [];
  // events!.map(log => {
  //   const { user, startIndex, endIndex } = log.args;

  //   for (let i = Number(startIndex) || 0; i < Number(endIndex); i++) {
  //     tokenIds.push(BigInt(i) || BigInt(0));
  //   }
  // });

  // useScaffoldWatchContractEvent({
  //   contractName: "PizzaPeople",
  //   eventName: "Minted",
  //   onLogs: logs => {
  //     // const tokenIds: bigint[] = [];

  //     console.log(logs);

  //     logs.map(log => {
  //       console.log(log);
  //       console.log(log.args);
  //       const { user, startIndex, endIndex } = log.args;

  //       // if (user === connectedAddress) {
  //       //   for (let i = Number(startIndex) || 0; i < Number(endIndex); i++) {
  //       //     tokenIds.push(BigInt(i) || BigInt(0));
  //       //   }
  //       //   // setMintedTokenId(tokenId);
  //       // }
  //     });

  //     // setMintedTokenIds([...tokenIds]);
  //   },
  // });

  function IncrementItem() {
    setNugsToMint(nugsToMint + 1);
  }

  function DecreaseItem() {
    if (nugsToMint < 1) {
      setNugsToMint(0);
    } else {
      setNugsToMint(nugsToMint - 1);
    }
  }

  function onSubmit(event: any) {
    event.preventDefault();
    const target = event.target;
    console.log(target.input.value);
  }

  function onChange(event: any) {
    event.preventDefault();
    const target = event.target;

    setNugsToMint(Number(target.value));
  }

  // const { uris } = useUris(Weedies, tokenIds);

  // for (let i = 0; i < uris.length; i++) {
  //   uris[i] = uris[i].replace("ipfs://", "https://nftstorage.link/ipfs/");
  // }

  // const { responses } = useFetches(uris);

  // const allNfts = responses.map((response, index) => {
  //   return (
  //     <NftCard
  //       key={index}
  //       data={response}
  //       attributes={response.attributes}
  //       imgSrc={response.image.replace("ipfs://", "https://nftstorage.link/ipfs/")}
  //     />
  //   );
  // });

  return (
    <>
      {/* <MyCarousel /> */}

      {/* <MyCarousel /> */}

      <div className="flex items-center flex-col flex-grow bg-base-100">
        <div className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={hero.src} alt="Test" className="w-[400px] lg:w-[1051px] lg:h-[670px] lg:mb-4" />{" "}
          {/* 1366px x 870px*/}
          <div className="flex flex-wrap justify-center w-[150px] lg:w-[400px] absolute lg:inset-0 lg:h-[100px] left-[250px] lg:left-[650px] top-[30px] lg:top-[125px]">
            {mintWindowOutput}
          </div>
        </div>

        <p className="grilledCheese text-xl text-center lg:text-4xl m-4 lg:mb-10 w-[375px] lg:w-[675px]">
          {/* <span className="text-red-600">5678</span>{" "} */}
          {"A global cabal of colorful characters that live their best lives one slice at a time."}
        </p>
        <p className="grilledCheese text-2xl text-secondary lg:text-4xl">Cheesy Samples</p>
        <DynamicCarousel />
        <p className="grilledCheese text-center text-2xl lg:text-4xl m-7">Ready to deliver the party to you</p>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={banner.src} alt="banner" className="w-[50%]" />

        {/* {responses.length > 0 ? (
          <>
            <div className="flex flex-wrap items-center justify-center"> {allNfts}</div>
          </>
        ) : (
          <button
            onClick={async () => {
              setMintedBlock(blockNumber);
              await writePizzaPeopleAsync({
                functionName: "mint",
                args: [connectedAddress, BigInt(nugsToMint)],
                value: mintPrice ? mintPrice * BigInt(nugsToMint) : BigInt(0),
              });
              await refetchMintPrice();
              await refetchMintCount();
              await refetchMaxMintCount();
            }}
          > */}
        {/* <NftCard imgSrc={previewImage.src} /> */}
        {/* </button>
        )} */}

        <form onSubmit={onSubmit} className="flex flex-col p-2 m-2">
          <p className="text-center grilledCheese text-4xl">How many slices (to mint)</p>
          <div className="flex items-center justify-center">
            <button onClick={DecreaseItem} className="grilledCheese text-4xl">
              {"<"}
            </button>
            <input
              name="input"
              type="number"
              className="m-1 p-2 bg-white text-black font-mono botder-2 border-black"
              value={nugsToMint.toString()}
              onChange={onChange}
            ></input>
            <button onClick={IncrementItem} className="grilledCheese text-4xl">
              {">"}
            </button>
          </div>
        </form>

        <button
          onClick={async () => {
            // setMintedBlock(blockNumber);

            // await mint({ value: mintPrice });
            await writePizzaPeopleAsync({
              functionName: "mint",
              args: [connectedAddress, BigInt(nugsToMint)],
              value: mintPrice ? mintPrice * BigInt(nugsToMint) : BigInt(0),
            });

            await refetchMintPrice();
            await refetchMintCount();
            await refetchMaxMintCount();
          }}
          className="insanibc btn btn-secondary btn-lg text-3xl mt-5"
        >
          {"Grab a slice!"}
        </button>
        <p className="m-0 mb-10 grilledCheese">*Mint</p>

        <div className="flex flex-wrap justify-center">
          <div className="flex flex-col text-center  border-secondary border-4 rounded-lg p-2 w-32 lg:w-72 m-1">
            <p className="grilledCheese text-md m-0 lg:text-4xl">Mint Price</p>
            <p className="text-md m-0 grilledCheese lg:text-4xl">{formatEther(mintPrice || BigInt(0)).toString()}</p>
          </div>

          <div className="flex flex-col text-center border-secondary border-4 rounded-lg p-2 w-32 lg:w-72 m-1">
            <p className="grilledCheese text-md m-0 lg:text-4xl">Supply</p>
            <p className={`text-md m-0 grilledCheese lg:text-4xl ${supply === 0 ? "text-red-600" : "text-green-500"}`}>
              {supply.toString()}
            </p>
          </div>

          <div className="flex flex-col text-center border-secondary border-4 rounded-lg p-2 w-32 lg:w-72 m-1">
            <p className="grilledCheese text-md m-0 lg:text-4xl">Contract</p>
            <div className="flex items-center justify-center">
              <Address address={Weedies?.address} size="xs" />
            </div>
          </div>
        </div>

        <p className="grilledCheese text-4xl m-0  mt-6 text-violet-800">View Collection</p>
        <div className="flex space-x-1 items-center justify-center space-x-5">
          <Link href={"https://ladders.vision/collections/base/0xF2137f6E039Cc0d2a19709a259CCCe13168cCD33"}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={ladders.src} alt="ladders.vision" className="w-16 lg:w-32" />
          </Link>

          <Link href={"https://opensea.io/pizza-people"}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={opensea.src} alt="opensea" className="w-16 lg:w-32" />
          </Link>
        </div>

        <div className="flex flex-wrap justify-center mt-10">
          <Link href={"https://bigshottoyshop.com/collections/weedies"}>
            <button className="insanibc btn-lg bg-violet-800  hover:bg-blue-500 text-white-700 font-semibold hover:text-white py-2 text-4xl m-10">
              {"MERCH"}
            </button>
          </Link>

          <Link href={"https://www.nounworks.wtf/weedies"}>
            <button className="insanibc btn-lg bg-violet-800  hover:bg-blue-500 text-white-700 font-semibold hover:text-white py-2 text-4xl lg:text-4xl m-10">
              {"MORE INFO"}
            </button>
          </Link>
        </div>

        <p className="grilledCheese text-4xl m-0 text-violet-800">Team</p>
        <div className="flex flex-wrap text-center justify-center items-center">
          <PfpCard
            name="Mark"
            image={mark}
            twitterUrl="https://twitter.com/gbombstudios"
            farcasterUrl="https://www.warpcast.com/greenbomb"
            instagramUrl="https://www.instagram.com/greenbomb/"
          />

          <PfpCard
            name="Klim"
            image={klim}
            twitterUrl="https://www.twitter.com/bigshottoyworks"
            farcasterUrl="https://www.warpcast.com/bigshotklim"
            instagramUrl="https://www.instagram.com/bigshottoyworks/"
          />
          <PfpCard
            name="Jake"
            image={jake}
            twitterUrl="https://www.twitter.com/homanics"
            farcasterUrl="https://www.warpcast.com/hotmanics"
          />
          <PfpCard
            name="Noreen"
            image={noreen}
            instagramUrl="https://www.instagram.com/nonodynamo"
            linkedinUrl="https://www.linkedin.com/in/noreensullivan/"
          />

          <PfpCard name="Benny" image={benny} />
        </div>

        <div className="flex justify-center items-center gap-2 mb-4 mt-10">
          <p className="m-0 text-center">
            Built with <HeartIcon className="inline-block h-4 w-4" /> at
          </p>
          <a
            className="flex justify-center items-center gap-1"
            href="https://www.bigshot.wtf/"
            target="_blank"
            rel="noreferrer"
          >
            {/* <BuidlGuidlLogo className="w-3 h-5 pb-1" /> */}
            <span className="link text-red-600">Bigshot.wtf</span>
          </a>
        </div>
      </div>
    </>
  );
};

export default Home;
