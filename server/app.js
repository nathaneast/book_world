import express from "express";
import mongoose from "mongoose";
import config from "./config";
import hpp from "hpp";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";

// Routes
import authRoutes from "./routes/api/auth";
import userRoutes from "./routes/api/user";
import postRoutes from "./routes/api/post";
import categoryRoutes from "./routes/api/category";

const app = express();
const { MONGO_URI } = config;

app.use(hpp());
app.use(helmet());

app.use(
  cors({
    rigin: true,
    credentials: true,
  })
);
app.use(morgan("dev"));

app.use(express.json());

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("MongoDB connecting Success ! ! !"))
  .catch((e) => console.log(e));

// Use routes
app.get("/", (req, res) => res.send("not login, home"));
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/category", categoryRoutes);

export default app;
