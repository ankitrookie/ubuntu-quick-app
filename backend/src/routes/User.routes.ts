import { Router } from "express";
const route = Router();

import { signupValidationSchema, signinValidationSchema } from "@ankitt/common";

// prisma clinet
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import jwt from "jsonwebtoken";

route.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  // zod validation
  const { success } = signupValidationSchema.safeParse({ username, email, password });

  if (!success) {
    res.status(411).json({ message: "Invalid inputs" })
    return;
  }

  try {
    // here i create user in my data base
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password
      }
    })
    if (!user) {
      res.json({ message: "unable to create ! Try again." })
      return;
    }
    // token 
    const payload = user;
    const token = jwt.sign(payload, "secretKey");
    res.json({
      message: token
    })
  } catch (error) {
    res.status(500).json({ error: "something went wrong" });
  }
})

route.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  // zod validation
  const { success } = signinValidationSchema.safeParse({ email, password });

  if (!success) {
    res.status(411).json({ message: "Invalid inputs" })
    return;
  }

  // here i create user in my data base
  const user = await prisma.user.findFirst({
    where: {
      email,
      password
    }
  })

  if (!user) {
    res.status(500).json({ message: "worng cres." });
    return;
  }
  const payload = user;
  const token = jwt.sign(payload, "secretKey");
  res.json({
    message: token
  })
})

export default route;
