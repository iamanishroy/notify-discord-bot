require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const discord = require("discord.js");
const client = new discord.Client();
const app = express();
// app.use(express.static("public"));
app.use(bodyParser.json());

app.post("/notify/", async (request, response) => {
//   console.log(request.body.secret, process.env.SECRET);
  if (request.body.secret === process.env.SECRET) {
    const message = request.body.msg;
    client.login(process.env.DISCORD_TOKEN);
    // client.on("ready", async () => {
    const user = await client.users
      .fetch(process.env.DISCORD_ID)
      .catch(() => null);
    if (!user) return response.json({ status: "not-sentt" });
    await user
      .send(message)
      .then(() => {
        return response.json({ status: "sent" });
      })
      .catch(() => {
        return response.json({ status: "not-sent" });
      });
    // });
  } else {
    return response.json({ status: "wrong-secret" });
  }
});

const listener = app.listen(process.env.PORT || 1000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
