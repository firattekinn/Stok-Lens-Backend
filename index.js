import express from "express";
import { PORT } from "./config.js";
import morgan from "morgan";
import cors from "cors";
import { V1Router } from "./routes/V1/index.js";

const app = express();

app.use(morgan("tiny"));
app.use(express.json());
app.use(cors());

app.use('/v1', V1Router)

app.listen(PORT, async () => {
  console.log("🚀 ~ index.js:14 ~ app.listen ~ PORT:", PORT);
});
