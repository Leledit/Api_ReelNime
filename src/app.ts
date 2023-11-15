import express from "express";
import cors from "cors";
import { router } from "./routes.ts";
import bodyParser from "body-parser";

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

export { app };
