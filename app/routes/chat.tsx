import { Form, Outlet, useNavigation, useParams } from "@remix-run/react";

import GenerateIcon from "~/assets/icons/generate.svg";
import EmptySection from "~/components/empty-section";

import { ActionFunctionArgs, redirect } from "@remix-run/node";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const searchValue = formData.get("search") as string;

  const encodedURL = encodeURIComponent(searchValue);

  return redirect(`/chat/${encodedURL}`);
}

export default function ChatPage() {
  const param = useParams();
  const navigation = useNavigation();

  return (
    <div className="flex flex-col flex-none justify-center h-5/6 w-2/6 rounded-lg m-auto top-0 bottom-0 overflow-hidden bg-white">
      {/* Display fetched data */}
      <Form method="post">
        <div className="flex flex-1 justify-between w-full h-16 shadow-card px-4 py-2.5 pr-2.5">
          <input
            type="search"
            name="search"
            placeholder="type to search"
            className="flex-1 mr-4"
          />
          <button
            type="submit"
            className="flex flex-row flex-none justify-center items-center px-3 rounded-lg transition-all bg-red-400 hover:bg-black"
          >
            <img src={GenerateIcon} alt="Empty Icon" className="h-5 w-5" />
            <span className="text-white text-sm font-normal ml-2">
              {navigation.state === "submitting" ||
              navigation.state === "loading"
                ? "Loading..."
                : "Generate"}
            </span>
          </button>
        </div>
      </Form>
      {!param.searchValue && <EmptySection />}
      <Outlet />
    </div>
  );
}
