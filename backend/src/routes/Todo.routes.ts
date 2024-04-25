import { Router } from "express";
import { todoValidationSchema } from "@ankitt/common";
const route = Router();

import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();

route.post('/create', (req, res) => {
  const { title, description } = req.body;

  const { success } = todoValidationSchema.safeParse({ title, description });

  if (!success) {
    res.json({ message: "Invalid inputs." });
    return;
  }

  const todo = prisma.todo.create({
    data: {
      title,
      description,
      userId
    }
  })

  res.json({
    message: "this is router for creating todo"
  })
});

route.put("/update/:id", (req, res) => {
  const { } = req.body;

  res.json({
    message: "this is router for updating existing todo"
  })
});

route.get("/alltodods/:id", (req, res) => {
  const { } = req.body;

  res.json({
    message: "this is a route for getting all todos of the user"
  })
})

export default route;
