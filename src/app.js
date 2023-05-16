// 2 step: install nodemon for do hot reload
// commments for reastart
const express = require("express");
const db = require("./utils/database.js");
const Todos = require("./models/users.models.js");
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 8000;

db.authenticate()
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));

db.sync() // if any table does not exist, it will create it, if not does not do anything.
  .then(() => console.log("Database synchronized"))
  .catch((err) => console.log(err));

const app = express();

app.use(cors());

app.use(express.json());

//* in order to select just some columns...
// app.get("/api/v1/todos", async (req, res, next) => {
//   try {
//     const todos = await Todos.findAll({
//       attributes: ["title", "description"],
//     });
//     res.json(todos);
//   } catch (error) {
//     next(error);
//   }
// });

//* if i need to exclude some columns
// app.get("/api/v1/todos", async (req, res, next) => {
//   try {
//     const todos = await Todos.findAll({
//       // fin all is similar to select ... from
//       attributes: { exclude: ["id"] },
//     });
//     res.json(todos);
//   } catch (error) {
//     next(error);
//   }
// });

app.get("/api/v1/todos", async (req, res, next) => {
  try {
    const todos = await Todos.findAll();
    res.json(todos);
  } catch (error) {
    next(error);
  }
});

// ! get todo by /:id
app.get("/api/v1/todos/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(req.params);
    const todo = await Todos.findByPk(id);
    res.json(todo);
  } catch (error) {
    next(error);
  }
});

// app.get("/api/v1/todos", async (req, res, next) => {
//   try {
//     const todos = await Todos.findAll();
//     res.json(todos);
//   } catch (error) {
//     next(error);
//   }
// });

app.post("/api/v1/todos", async (req, res) => {
  try {
    // extract request body
    const newTodo = req.body;
    // insert into users = Todos.create
    await Todos.create(newTodo);
    // at the end we answer 201 state
    res.status(201).send();
  } catch (error) {
    res.status(400).json(error);
  }
});

app.delete("/api/v1/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Todos.destroy({
      where: { id },
    });
    res.status(204).send();
  } catch (error) {
    res.status(400).json(error);
  }
});

app.put("/api/v1/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;
    await Todos.update({ completed }, { where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(400).json(error);
  }
});

// -------------------

app.listen(PORT, () => {
  console.log(`server running on ${PORT} Port`);
});
