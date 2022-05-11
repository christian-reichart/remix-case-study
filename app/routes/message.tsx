import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/server-runtime";
import { getMessage } from "~/models/message.server";

type LoaderData = {
  message: Awaited<ReturnType<typeof getMessage>>;
}

export const loader = async() => {
  return json<LoaderData>({
    message: await getMessage('0'),
  })
}

export default function Message() {
  const { message } = useLoaderData() as LoaderData;
  return (
    <main className="relative min-h-screen bg-white sm:flex sm:items-center sm:justify-center">
      <div className="relative sm:pb-16 sm:pt-8">
        {message?.encryptedValue}
      </div>
    </main>
  );
}
