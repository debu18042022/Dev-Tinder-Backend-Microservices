const express = require("express");

const app = express();

app.use("/test", (req, res) => {
  res.send("Hello from the test route");
});

app.use("/hello",(req,res)=>{
    res.send("Hello hello hello!");
})

app.use((req, res) => {
  res.send("Hello from the dashboard");
});

app.listen(7777, () => {
  console.log("server is running on port 7777");
});
