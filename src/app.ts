import express from "express";
import cors from "cors";
import { router } from "./routes.ts";
import bodyParser from "body-parser";
import { FirebaseConfig } from "./database/firebaseConfig.ts";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./swagger.json" assert { type: "json" };

const app = express();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//iniciando a configuração do firebase
FirebaseConfig.initializeConfig();

app.use("/api/v1", router);

export { app };
