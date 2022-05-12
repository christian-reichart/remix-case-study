import type { Message } from "@prisma/client";
import { AES, enc } from "crypto-js";
import { prisma } from "~/db.server"

export async function getMessage(id: string): Promise<Message | null> {
  return prisma.message.findUnique({ where: { id } });
}

export async function getDecryptedStringFromMessage(id: string, pw: string): Promise<string | null> {
  const msg = await prisma.message.findUnique({ where: { id } });
  if(msg) {
    const dec = AES.decrypt(msg.encryptedValue, pw).toString(enc.Utf8);
    return dec;
  }
  return null;
}

export async function upsertMessage(message: Message) {
  return prisma.message.upsert({
    where: { id: message.id},
    update: message,
    create: message,
  })
}