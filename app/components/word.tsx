interface WordProps {
  word: string;
}

export default function Word({ word }: WordProps): JSX.Element {
  return (
    <p className="px-1 py-1 hover:shadow-card cursor-pointer rounded select-none relative w-fit h-fit inline-block text-black">
      <span>{word}</span>
    </p>
  );
}
