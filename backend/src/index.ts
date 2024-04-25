import express from "express";

import { todoRouter, userRouter } from "./routes";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/user', userRouter);
app.use('/todo', todoRouter);


app.listen(PORT, () => {
  console.log(`PORT is running at http://localhost:3000`)
})
