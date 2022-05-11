import type { Message } from "@prisma/client";
import { prisma } from "~/db.server"

export async function getMessage(id: string): Promise<Message | null> {
  return prisma.message.findUnique({ where: { id } });
}

export async function upsertMessage(message: Message) {
  return prisma.message.upsert({
    where: { id: message.id},
    update: message,
    create: message,
  })
}