import express, { json } from "express"
import "express-async-errors";
import errorHandler from './middlewares/errorHandler.js';
import cors from "cors";
import router from "./routers/index.router.js";

const app = express();

app.use(cors());
app.use(json());
app.use(router);
app.use(errorHandler);

const port = 5000;
app.listen(port, () => {
	console.log(`Servidor rodando na porta ${port}`)
});

