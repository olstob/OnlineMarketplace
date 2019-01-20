import express from "express";
import expressGraphQL from "express-graphql";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import schema from "./graphql";
import marked from "marked";
import config from 'config';
import * as fs from "fs";

const getConfig = (key) => {
  if(config.has(key)) {
    return config.get(key);
  }
  console.log("Did not find the key DB_URL in the env variables or the config file.")
  process.exit(0);
};

const app = express();
const PORT = process.env.PORT || "8000";
const README = "/../README.md"
// Using mLab to host a products database.
const DB_URL = process.env.DB_URL || getConfig("DB_URL");


// collection.findAndModify is deprecated, but using findOneAndUpdate still calls it internally
mongoose.set('useFindAndModify', false);

// Connect to MongoDB with Mongoose.
mongoose
  .connect(
    DB_URL,
    {
      useCreateIndex: true,
      useNewUrlParser: true
    }
  )
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.use(
    "/graphql",
    cors(),
    bodyParser.json(),
    expressGraphQL({
      schema,
      graphiql: true
    })
);

app.get('/', (req, res) => {
  const path = __dirname + README;
  const file = fs.readFileSync(path, 'utf8');
  res.send(marked(file.toString()));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`GraphiQL available at localhost:${PORT}/graphql`);
});
