import express from "express"
import cors from "cors"
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient

app.use(express.json());
app.use(cors());

app.get("/api/task", async (req, res) => {
    const task = await prisma.task.findMany();
    
    res.json(task);
});

app.post("/api/task", async(req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
        return res
         .status(400)
         .send("title and content fielrequiredds ")
    }
    try{
    const task = await prisma.task.create({
        data: { title, content }
    })
    res.json(task);
} catch (error) {
res
 .status(500)
 .send("Ops something went wrong")
}
});

app.put("/api/task/:id", async (req, res) => {
    const { title, content } = req.body;
    const id = parseInt(req.params.id);

    if(!title || !content) {
        return res
        .status(400)
        .send("title and content fields required")
    }

    if (!id || isNaN(id)) {
        return res
        .status(400)
        .send("ID must be a valid number");
    }  

    try {
        const updateTask = await prisma.task.update({
            where: { id },
            data: { title, content },
        });
        res.json(updateTask);
    } catch (error) {
        res
            .status(500)
            .send("Oops, sometjing went wrong");
    }
})

app.delete("/api/task/:id", async (req, res) => {
    const id = parseInt(req.params.id);

    if (!id || isNaN(id)) {
        return res
            .status(400)
            .send("ID must be valid integer")
    }

    try {
       await prisma.task.delete({ 
        where: { id }
       });
       res.status(204).send();
    } catch (error) {
        res
         .status(500)
         .send("Oops, something went wrong")
        
    }
})

app.listen(5000, () => {
    console.log("server running on localhost 5000")
});