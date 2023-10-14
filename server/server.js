const express = require("express");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

mongoose.set("strictQuery", false);

const app = express();

app.use(express.static(path.join(__dirname + "/public")));

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};

app.use(cors(corsOptions));

const PORT = process.env.PORT || 5000;
const uri = process.env.MONGODB_URI;

const store = new MongoDBStore({
  uri: uri,
  collection: "sessions",
});

app.use(express.json());

const UsersScheme = new mongoose.Schema({
  id: { type: Number, required: false },
  name: { type: String, required: false },
  password: { type: String, required: false },
  role: { type: String, required: false },
});

const EmployeeScheme = new mongoose.Schema({
  id: { type: Number, required: false },
  name: { type: String, required: false },
  surname: { type: String, required: false },
  phone: { type: String, required: false },
  birthDate: { type: Date, required: false },
  salary: { type: Number, required: false },
  duties: { type: Array, required: false },
  bills: { type: Array, required: false },
});

const InvoiceScheme = new mongoose.Schema({
  id: { type: String, required: true },
  companyName: { type: String, required: false },
  type: { type: String, required: true },
  date: { type: Date, required: false },
  month: { type: String, required: false },
  invoiceNumber: { type: String, required: false },
  description: { type: String, required: false },
  value: { type: Number, required: false },
  vat: { type: Number, required: false },
});

const FleetScheme = new mongoose.Schema({
  id: { type: Number, required: false },
  name: { type: String, required: false },
  model: { type: String, required: false },
  year: { type: Number, required: false },
  oc: { type: Date, required: false },
  inspection: { type: Date, required: false },
});

const setData = require("./setData")(
  app,
  UsersScheme,
  EmployeeScheme,
  InvoiceScheme,
  FleetScheme
);
const getData = require("./getData")(
  app,
  EmployeeScheme,
  InvoiceScheme,
  FleetScheme
);

const generator = require("./generator")(app);

app.listen(PORT, () => {
  console.log("Server listening at port: ", PORT);
});

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected with database"))
  .catch((err) => console.log(err));