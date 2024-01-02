import { Link, useLoaderData, useParams } from "@remix-run/react";
import CloseIcon from "~/assets/icons/close.svg";

import { LoaderFunctionArgs, json } from "@remix-run/node";

export async function loader({ params }: LoaderFunctionArgs) {
  const response = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${params.wordValue}`
  );
  return json(await response.json());
}

export default function DefinitionModal() {
  const data: any = useLoaderData(); // the response is big to define types so I added any for now.
  const params = useParams();

  return (
    <div className="fixed w-full h-full left-0 top-0 flex justify-center items-center bg-black/30">
      <div className="flex flex-col min-w-80 min-h-40 w-2/5 h-fit rounded-xl p-5 bg-white">
        <div className="flex flex-row justify-between items-center mb-4">
          <h4 className="text-2xl font-bold text-slate-700">
            {params.wordValue}
          </h4>
          <Link
            to=".."
            prefetch="intent"
            className="flex flex-col items-center"
          >
            <img src={CloseIcon} alt="Logo Icon" className="h-6 w-6 mb-[2px]" />
          </Link>
        </div>
        <h6 className="text-lg font-semibold mb-1 text-black">Definition:</h6>
        <p className="text-sm font-normal text-black">
          {data[0]
            ? data[0].meanings[0].definitions[0].definition
            : "Ups, it seems we can't find a definition for such a word."}
        </p>
      </div>
    </div>
  );
}
