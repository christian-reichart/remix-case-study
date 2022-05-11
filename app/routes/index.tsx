import { Form } from "@remix-run/react";
import type { ActionFunction } from "@remix-run/server-runtime";
import { redirect } from "@remix-run/server-runtime";
import { upsertMessage } from "~/models/message.server";

export const action: ActionFunction =  async ({ request }) => {
  const formData = await request.formData();
  const message = formData.get("message");

  if (typeof message !== "string" || message.length === 0) {
    return;
  }

  await upsertMessage({ id: '0', encryptedValue: message });

  return redirect("/message");
};

export default function Index() {
  const inputClassName = 'w-full rounded border border-gray-500 px-2 py-1 text-lg';
  return (
    <main className="relative min-h-screen bg-white sm:flex sm:items-center sm:justify-center">
      <div className="relative sm:pb-16 sm:pt-8">
        <Form method="post">
          <label htmlFor="message" className="pr-2">Message</label>
          <input type="text" id="message" name="message" className={inputClassName} /><br />
          <label htmlFor="pw" className="pr-2">Password</label>
          <input type="text" id="pw" name="pw" className={inputClassName} /><br />
          <button type="submit" className="rounded bg-blue-500 py-2 px-4 mt-2 text-white hover:bg-blue-600 focus:bg-blue-400 disabled:bg-blue-300">Submit</button>
        </Form>
      </div>
    </main>
  );
}
