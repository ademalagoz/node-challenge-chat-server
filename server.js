const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());

app.use(cors());

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.

//Level 4 --add a timestamp, `timeSent`
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

app.get("/messages", (req, res) => {
  res.status(200);
  res.json(messages);
});

// Level 3 a-Read _only_ messages whose text contains a given substring

app.get("/messages/search", (req, res) => {
  const searchWord = req.query.text.toLowerCase();
  const filteredMessage = messages.filter((message) =>
    message.text.toLowerCase().includes(searchWord)
  );
  res.json(filteredMessage);
});

// Level 3 b-Read only the most recent 10 messages

app.get("/messages/latest", (req, res) => {
  res.status(200).json(messages.slice(-10));
});

//Creating a New Message

app.post("/messages", (request, response) => {
  const message = request.body;
  message.id = messages.length;
  message.timeSent = new Date();

  //Level 2
  if (!message.from || !message.text) {
    response.status(400);
    response.send("Please fill all the fields");
  } else {
    response.status(200);
    messages.push(message);
    response.send(messages);
  }
});

//Update the message
app.put("/messages/:id", (req, res) => {
  const findId = messages.filter((message) => message.id === req.params.id);

  if (findId) {
    const newMessage = req.body;
    messages.forEach((message) => {
      if (message.id == req.params.id) {
        message.text = newMessage.text ? newMessage.text : message.text;
        message.from = newMessage.from ? newMessage.from : message.from;
        res.json(message);
      }
    });
  } else {
    res.status(400).json("Not updated");
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
