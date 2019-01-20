import express from "express";
import expressGraphQL from "express-graphql";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import schema from "./graphql";
import marked from "marked";
import path from "path";
import * as fs from "fs";

const app = express();
const PORT = process.env.PORT || "8000";

const README = "/../README.md"

// Using mLab to host a products database.
// I normally would place the user and password in a untracked config file,
// but I decided to leave it here so you could actually test the api.
const DB_URL = "mongodb://shopify_s2019_challenge:BJ6tr64XEUWvWGv@ds161764.mlab.com:61764/db_s2019_challenge";

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
  var path = __dirname + README;
  var file = fs.readFileSync(path, 'utf8');
  res.send(marked(file.toString()));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`GraphiQL available at localhost:${PORT}/graphql`);
});
