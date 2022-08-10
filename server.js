import express from "express";
import mongoose from "mongoose";
import Cors from "cors";
import Cards from "./dbCards.js";

// app config
const app = express();
const port = process.env.PORT || 8001;
const connection_url = `mongodb+srv://manjeet2910:VGule5xT3c0yMnr1@cluster0.i9r0mrs.mongodb.net/?retryWrites=true&w=majority`;
// Middleware
app.use(express.json());
app.use(Cors());

// DB Config
mongoose.connect(connection_url);

// Api  EndPoints
app.get("/", (req, res) => res.status(200).send("Hello Programmers"));

app.post("/tinder/cards", (req, res) => {
  const dbCard = req.body;

  Cards.create(dbCard, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/tinder/cards", (req, res) => {
  Cards.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

// Listener
app.listen(port, () => console.log(`listening to local host: ${port}`));
