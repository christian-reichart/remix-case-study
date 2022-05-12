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
    <main className="relative min-h-screen bg-white sm:flex sm:items-center sm:justify-center">
      <div className="relative sm:pb-16 sm:pt-8">
        {decryptedValue &&
          <p>{decryptedValue}</p>
        }
      <Form method="get">
          <label htmlFor="pw" className="pr-2">Password</label>
          <input type="text" id="pw" name="pw" className="w-full rounded border border-gray-500 px-2 py-1 text-lg" /><br />
          <button type="submit" className="rounded bg-blue-500 py-2 px-4 mt-2 text-white hover:bg-blue-600 focus:bg-blue-400 disabled:bg-blue-300">Decrypt</button>
        </Form>
      </div>
    </main>
  );
}
