import { prisma } from "~/db.server"

type Message = {
  id: string
  encryptedValue: string
}

export async function getMessage(): Promise<Message | null> {
  return prisma.message.findUnique({ where: { id: '0' } });
}

export async function upsertMessage(message: Message) {
  return prisma.message.upsert({
    where: { id: message.id},
    update: message,
    create: message,
  })
}