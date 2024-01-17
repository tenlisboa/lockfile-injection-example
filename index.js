import express from "express";
import { controller } from "./controller.js";

const app = express();

app.use(express.json());

app.post("/buy", controller);

app.listen(3000, () => console.info("Server listening at 3000"))