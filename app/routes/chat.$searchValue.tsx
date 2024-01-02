import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { LoaderFunctionArgs, json } from "@remix-run/node";
import Word from "~/components/word";

function processSentence(sentence: string) {
  const wordsArray = sentence.replace(/[^\w\s]/g, "").split(/\s+/);
  const filteredWords = wordsArray.filter((word: string) => word.trim() !== "");
  return filteredWords;
}

interface LoaderData {
  sentence: string;
  error?: string;
}

export async function loader({ params }: LoaderFunctionArgs) {
  const decodedURL = decodeURIComponent(params.searchValue || "");

  try {
    const response = await fetch(
      `http://0.0.0.0:8000/scrape/?url=${decodedURL}`
    );

    if (response.status !== 200) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();
    const sentence = data.content;

    return json({ sentence });
  } catch (error) {
    return json({ error });
  }
}

export default function SearchValue() {
  const { sentence, error }: LoaderData = useLoaderData();

  if (error) {
    return (
      <div className="flex flex-col flex-1 px-5 py-5">
        <p className="text-sm font-medium text-black">
          Ups, somethings went wrong! Try again and make sure to use a proper
          url link :)
        </p>
      </div>
    );
  }

  const words = processSentence(sentence);

  return (
    <div className="flex flex-col flex-1 px-5 py-5">
      <section className="text-sm font-medium text-black">
        {words.map((word: string, index) => (
          <Link to={`./${word}`} prefetch="intent" key={index}>
            <Word word={word} />
          </Link>
        ))}
      </section>
      <Outlet />
    </div>
  );
}
