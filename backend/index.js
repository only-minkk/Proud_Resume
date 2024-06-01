import app from "./src/app.js";
const PORT = process.env.SEVER_PORT || 5005;

app.get("/", (req, res) => {
  res.send("Hello, this is back");
});

app.listen(PORT, () => {
  console.log("Server is running.");
});
