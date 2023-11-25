import express from "express";
import cors from "cors";
import { router } from "./routes.ts";
import bodyParser from "body-parser";
import { FirebaseConfig } from "./database/firebaseConfig.ts";
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//iniciando a configuração do firebase
FirebaseConfig.initializeConfig();

app.use(router);

export { app };
