import express from 'express'
// import bcrypt from 'bcrypt'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'


const app = express()
const client = new PrismaClient()

app.use(express.json())
app.use(cors())

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.post('/send', async(req, res) => {
    const { username, password } = req.body
    try {
        // const hashed = await bcrypt.hash(password, 3)
        const user = await client.user.create({
            data: { username, password }
        })
        res.status(200).json(user)
    } catch (error) {
        res.status(411).json({
            message: 'Invalid user'
        })
    }
})

app.get('/users', async(req, res) => {
    try {
        const users = await client.user.findMany()
        res.json(users)
    } catch (error) {
        res.status(400).json({
            message: "Something went wrong."
        })
    }
})

app.listen(3000, "0.0.0.0",() => {
    console.log("Server is listenning on port 3000")
})