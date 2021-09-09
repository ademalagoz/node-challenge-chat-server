const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
// let messages = require("./messages.js");
app.use(cors());

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const date = new Date();
welcomeMessage.timeSent = date;
const messages = [welcomeMessage];

//Homepage

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

//Read all messages
app.get("/messages", (req, res) => {
  res.status(200);
  res.json(messages);
});

//Creating a New Message

app.post("/messages", (request, response) => {
  const message = request.body;
  message.id = messages.length;
  message.timeSent = new Date();
  if (!message.from || !message.text) {
    response.status(400);
    response.send("Please fill all the fields");
  } else {
    response.status(200);
    messages.push(message);
    response.send(messages);
  }
});

// delete message by id
app.delete("/messages/:id", (request, response) => {
  const id = Number(request.params.id);
  messages.map((message) => {
    message.id === id ? messages.splice(id, 1) : null;
  });
  response.status(200);
  response.send(`You have deleted a message with id ${id}`);
});

// app.listen(process.env.PORT);
app.listen(3000, () => {
  console.log("Server is running on Port 3000");
});
