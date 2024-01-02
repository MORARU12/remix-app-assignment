import { type MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "TypeURL" },
    { name: "Description", content: "Welcome to TypeURL!" },
  ];
};

export default function Index() {
  return (
    <div className="flex flex-1 justify-center items-center h-full">
      <div className="flex flex-col items-center px-6">
        <h1 className="mb-4 text-center text-6xl font-inter font-semibold text-black">
          Don't waste time, summarize!
        </h1>
        <p className=" text-center text-xl text-secondary">
          Generate short summary description of any website url.
        </p>
        <Link
          to="/chat"
          prefetch="intent"
          className="mt-6 py-5 px-6 rounded-xl transition-all bg-green_btn hover:bg-black"
        >
          <span className="text-lg font-semibold text-white">
            Try it now :)
          </span>
        </Link>
      </div>
    </div>
  );
}
