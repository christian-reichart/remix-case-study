import { Form, useSubmit } from "@remix-run/react";
import type { ActionFunction } from "@remix-run/server-runtime";
import { redirect } from "@remix-run/server-runtime";
import { AES } from "crypto-js";
import type { FormEvent} from "react";
import { useRef, useState } from "react";
import Modal from "~/components/modal";
import { upsertMessage } from "~/models/message.server";

export const action: ActionFunction =  async ({ request }) => {
  const formData = await request.formData();
  const message = formData.get("message");
  const pw = formData.get("pw");

  if (typeof message !== "string" || message.length === 0 || typeof pw !== "string" || pw.length === 0) {
    return null;
  }

  const encryptedMessage = AES.encrypt(message, pw).toString();
  await upsertMessage({ id: '0', encryptedValue: encryptedMessage });
  return redirect("/message");
};

export default function Index() {
  const [showModal, setShowModal] = useState(false);
  const inputClassName = 'w-full rounded border border-gray-500 px-2 py-1 text-lg';
  const formRef = useRef<HTMLFormElement>(null);
  const submit = useSubmit();

  const onModalClose = () => {
    setShowModal(false);
  }

  const onModalSubmit = () => {
    const data = new FormData(formRef.current || undefined);
    submit(data, {method: 'post'});
    setShowModal(false);
  }

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowModal(true);
  }
  return (
    <main className="relative min-h-screen bg-white sm:flex sm:items-center sm:justify-center">
      <div className="relative sm:pb-16 sm:pt-8">
        <Form ref={formRef} method="post" onSubmit={handleFormSubmit}>
          <label htmlFor="message" className="pr-2">Message</label>
          <input type="text" id="message" name="message" className={inputClassName} /><br />
          <label htmlFor="pw" className="pr-2">Password</label>
          <input type="text" id="pw" name="pw" className={inputClassName} /><br />
          <button className="rounded bg-blue-500 py-2 px-4 mt-2 text-white hover:bg-blue-600 focus:bg-blue-400 disabled:bg-blue-300">Submit</button>
        </Form>
        {showModal &&
          <Modal onClose={() => onModalClose()} onSubmit={() => onModalSubmit()} />
        }
      </div>
    </main>
  );
}
