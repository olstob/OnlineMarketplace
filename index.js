import express from "express";
import expressGraphQL from "express-graphql";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import schema from "./graphql";

const app = express();
const PORT = process.env.PORT || "4000";
const DB_URL = "mongodb://shopify_s2019_challenge:BJ6tr64XEUWvWGv@ds159184.mlab.com:59184/db_tea";

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

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
