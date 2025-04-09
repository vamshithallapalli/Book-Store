import express from "express";
import { PORT, MONGO_URL } from "./config.js";
import mongoose from "mongoose";
import bookRoutes from "./routes/bookRoutes.js";
import cors from "cors";

const app = express();

//Middleware for parsing req data from body
app.use(express.json());

//Midlleware for handling CORS policy
app.use(cors());

//we can also write like this
// app.use(cors({
//     origin: "localhost:3000",
//     methods: ["get", "put", "delete", "post"],
//     allowedHeaders: ['content-Type']
// }))

//data base connection
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("MongoDB connected successfully!");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/books", bookRoutes);

app.get("/", (req, res) => {
  console.log(res);
  return res.status(200).send("Welcome to MERN Stack");
});

app.listen(PORT, () => {
  console.log(`Server is running... on the port no.${PORT}`);
});
