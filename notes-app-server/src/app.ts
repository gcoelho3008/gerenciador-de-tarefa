import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

prisma.task.create({
    data: {
        title: "nova tarefa",
        content: "criar dados"
    }
})