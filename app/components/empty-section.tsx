import EmptyIcon from "~/assets/icons/empty.svg";

export default function EmptySection() {
  return (
    <div className="flex flex-col flex-1 justify-center items-center">
      <img src={EmptyIcon} alt="Empty Icon" className="h-40 w-40" />
      <h6 className="text-center mb-2 text-lg font-semibold text-black">
        Your results will be shown here
      </h6>
      <p className="text-center text-sm font-normal px-16 text-secondary">
        After you press the 'Generate' button, the results will be shown here.
      </p>
    </div>
  );
}
