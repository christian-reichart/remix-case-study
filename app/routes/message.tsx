import { Form, useLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import { getDecryptedStringFromMessage } from "~/models/message.server";

export const loader: LoaderFunction = async({ request }) => {
  const url = new URL(request.url);
  const pw = url.searchParams.get('pw');
  if(!pw) {
    return null;
  }

  const decryptedMessage = await getDecryptedStringFromMessage('0', pw);

  if(decryptedMessage) {
    return json<string>(
      decryptedMessage
    )
  }
  return null;
}

export default function Message() {
  const decryptedValue = useLoaderData();
  return (
    <main className="relative sm:flex sm:items-center sm:justify-center">
      <div className="relative sm:pb-16 sm:pt-8">
        {decryptedValue &&
          <p className="text-lg text-center font-bold bg-primary/[.1] rounded p-4 my-4">
            {decryptedValue}
          </p>
        }
      <Form method="get">
          <label htmlFor="pw" className="pl-4 text-sm">Password</label>
          <input type="text" id="pw" name="pw" className="w-full rounded-full border border-gray-200 px-4 py-1 mb-2 text-lg" /><br />
          <button type="submit" className="rounded-full bg-primary py-2 px-4 mt-2 text-white w-full">Decrypt</button>
        </Form>
      </div>
    </main>
  );
}
