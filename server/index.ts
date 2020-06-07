import express from "express";
const app: express.Application = express();

app.get("/api/hello", (req, res) => {
  res.send("Hello Webpack Basic!");
});

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use("/", express.static("client/dist"));
}

const port = 5000 || process.env.PORT;
app.listen(port, () => {
  console.log(`Server Running on port: ${port}`);
});
