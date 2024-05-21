"use client";

import { useEffect } from "react";
import { useState } from "react";
import { useAccount } from "wagmi";
import { Nft } from "~~/components/nft/Nft";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { useScaffoldTokens } from "~~/hooks/useScaffoldTokens";

export default function NftPage({ params }: { params: { tokenId: bigint } }) {
  const [tokenIds, setTokenIds] = useState<bigint[]>();

  const account = useAccount();
  const { data: ownerOf } = useScaffoldReadContract({
    contractName: "PizzaPeople",
    functionName: "ownerOf",
    args: [params["tokenId"]],
  });
  const { writeContractAsync: writePizzaPeopleAsync } = useScaffoldWriteContract("PizzaPeople");

  console.log(ownerOf);
  console.log(account.address);

  let output;
  if (ownerOf === account.address) {
    output = (
      <button
        className="btn btn-secondary btn-lg mt-10"
        onClick={async () => {
          await writePizzaPeopleAsync({ functionName: "toggleHeadshot", args: [params["tokenId"]] });
        }}
      >
        Toggle Pfp
      </button>
    );
  }
  useEffect(() => {
    setTokenIds([params["tokenId"]]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params["tokenId"]]);

  const { collection } = useScaffoldTokens(tokenIds || [], "nftstorage");

  console.log(collection);

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        {output}
         
        <Nft token={collection.tokens[0]} />
      </div>
    </>
  );
}
