import express from "express";
import detailsLogger from "./middleware/detailsLogger.js";
import counter from "./middleware/counter.js";

const app = express();

app.use(detailsLogger);

app.get("/api", counter, (req, res) => {
  return res.status(200).json({
    status: "success",
    message: "Hello world",
  });
});

app.get("/api/sum", counter, (req, res) => {
  const { a, b } = req.query;
  const sum = parseInt(a) + parseInt(b);
  return res.status(200).json({
    status: "success",
    sum,
  });
});

app.get("/api/counter", counter, (req, res) => {
  return res.status(200).json({
    status: "success",
    message: `total no of request sent: ${req.count}`,
  });
});

app.listen(8000, () => {
  console.log("server is running on port 8000");
});
