const path = require("path");
const mongoose = require("mongoose");

function getData(app, EmployeeScheme, InvoiceScheme, FleetScheme) {
  const EmployeesCollection = mongoose.model("employees", EmployeeScheme);
  const InvoicesCollection = mongoose.model("invoices", InvoiceScheme);
  const FleetCollection = mongoose.model("fleet", FleetScheme);

  app.get("/", async (req, res) => {
    try {
      res.sendFile(path.join(__dirname, "/public", "index.html"));
    } catch (err) {
      console.error(err);
      res.status(500).send("An error occured");
    }
  });

  app.get("/dashboard", async (req, res) => {
    try {
      res.sendFile(path.join(__dirname, "/public", "index.html"));
    } catch (err) {
      console.error(err);
      res.status(500).send("An error occured");
    }
  });
  app.get("/dashboard/*", async (req, res) => {
    try {
      res.sendFile(path.join(__dirname, "/public", "index.html"));
    } catch (err) {
      console.error(err);
      res.status(500).send("An error occured");
    }
  });

  app.get("/checkSession", (req, res) => {
    const user = req.session.user;
    if (user && user.isLoggedIn) {
      res.send(user);
    } else {
      //res.status(401).send('Użytkownik nie jest zalogowany');
    }
  });
  app.get("/employees", async (req, res) => {
    try {
      const employee = await EmployeesCollection.find({});
      res.json(employee);
    } catch (err) {
      console.log(err);
    }
  });
  
  app.get("/employee/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const employee = await EmployeesCollection.find({ id: id });
      if (employee) {
        res.json(employee);
      } else {
        res.sendStatus(404);
        console.log("Couldn't find the right item");
        return;
      }
    } catch (err) {
      console.log(err);
    }
  });

  app.get("/get-duties/:id/:date", async (req, res) => {
    const id = req.params.id;
    const date = req.params.date;
    try {
      const employee = await EmployeesCollection.findOne({ id: id });
      const dutiesArray = [];
      employee.duties.forEach((element) => {
        const dateString = element.date.slice(0, 7);
        if (dateString === date) {
          dutiesArray.push(element);
        }
      });
      res.send(dutiesArray);
    } catch (err) {
      console.log(err);
    }
  });
  app.get("/get-duty-data/:id/:dutyId", async (req, res) => {
    const id = req.params.id;
    const dutyId = req.params.dutyId;
    try {
      const employee = await EmployeesCollection.findOne({ id: id });
      let duty = null;
      if (Array.isArray(employee.duties)) {
        employee.duties.forEach((element) => {
          if (element.dutyId === dutyId) {
            duty = element;
          }
        });
      }
      res.json(duty);
    } catch (err) {
      console.log(err);
    }
  });
  app.get("/get-invoices/:invtype/:invdate", async (req, res) => {
    const type = req.params.invtype;
    const date = req.params.invdate;
    try {
      let object = null;
      if (type === "all") {
        const invoice = await InvoicesCollection.find({ month: date });
        object = invoice;
      } else {
        const invoice = await InvoicesCollection.find({
          type: type,
          month: date,
        });
        object = invoice;
      }
      res.json(object);
    } catch (err) {
      console.log(err);
    }
  });
  app.get("/get-invoice-data/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const invoice = await InvoicesCollection.find({ id: id });
      if (invoice) {
        res.json(invoice);
      } else {
        res.sendStatus(404);
        console.log("Couldn't find the right item");
        return;
      }
    } catch (err) {
      console.log(err);
    }
  });
  app.get("/get-bill-data/:id/:date", async (req, res) => {
    const id = req.params.id;
    const date = req.params.date;
    try {
      if (id != 0 && date != 0) {
        const employee = await EmployeesCollection.findOne({ id: id });
        if (employee) {
          const billsArray = [];
          if (Array.isArray(employee.bills)) {
            employee.bills.forEach((element) => {
              const dateString = element.date.slice(0, 7);
              if (dateString === date) {
                billsArray.push(element);
              }
            });
          }
          res.send(billsArray);
        } else {
          res.sendStatus(404);
          console.log("Couldn't find the right item");
          return;
        }
      }
    } catch (err) {
      console.log(err);
    }
  });

  app.get("/get-single-bill/:employee/:id", async (req, res) => {
    const employee = req.params.employee;
    const id = req.params.id;
    try {
      const findEmployee = await EmployeesCollection.findOne({ id: employee });
      if (findEmployee) {
        let bill = null;
        if (Array.isArray(findEmployee.bills)) {
          findEmployee.bills.forEach((element) => {
            if (element.id === id) {
              bill = element;
            }
          });
        }
        res.json(bill);
      }
    } catch (error) {
      console.log(error);
    }
  });
  app.get("/get-car-data", async (req, res) => {
    try {
      const cars = await FleetCollection.find({});
      res.json(cars);
    } catch (err) {
      console.log(err);
    }
  });
  app.get("/get-car-data/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const car = await FleetCollection.find({ id: id });
      if (car) {
        res.json(car);
      } else {
        res.sendStatus(404);
        console.log("Couldn't find the right item");
        return;
      }
    } catch (err) {
      console.log(err);
    }
  });
}

module.exports = getData;
