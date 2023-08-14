const mongoose = require("mongoose");
const cors = require("cors");

function setData(app, UsersScheme, EmployeeScheme, InvoiceScheme, FleetScheme) {
  const UsersCollection = mongoose.model("users", UsersScheme);
  const EmployeesCollection = mongoose.model("employees", EmployeeScheme);
  const InvoicesCollection = mongoose.model("invoices", InvoiceScheme);
  const FleetCollection = mongoose.model("fleet", FleetScheme);

  app.post("/register", async (req, res) => {
    try {
      const nameExist = await UsersCollection.findOne({ name: req.body.name });
      if (nameExist) {
        res
          .status(400)
          .json({ message: `User ${req.body.name} already exist` });
        return;
      }
      const newDoc = new UsersCollection(req.body);
      await newDoc.save();
      res.sendStatus(200);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  });

  app.post("/login", async (req, res) => {
    const { name, password } = req.body;

    // Sprawdzenie czy użytkownik o podanych danych istnieje w bazie danych
    const user = await UsersCollection.findOne({
      name: name,
      password: password,
    });
    if (user) {
      // Ustawienie wartości sesji
      req.session.user = {
        name: name,
        isLoggedIn: true,
      };
      res.json({ succes: true });
    } else {
      res.status(401).send("Sign in error");
    }
  });

  app.post("/logout", (req, res) => {
    // Usunięcie wartości sesji dla użytkownika
    req.session.destroy((err) => {
      if (err) {
        console.error(err);
        res.status(500).send("Server error");
      } else {
        res.clearCookie("connect.sid"); // Usunięcie ciasteczka sesji
        res.send("Succesfully logged out");
      }
    });
  });

  app.post("/add-employee", async (req, res) => {
    try {
      const nameExist = await EmployeesCollection.findOne({
        name: req.body.name,
        surname: req.body.surname,
      });
      if (nameExist) {
        res.status(400).json({
          message: `Employee ${req.body.name} ${req.body.surname} already exist.`,
        });
        return;
      }
      const idExist = await EmployeesCollection.findOne({ id: req.body.id });
      if (idExist) {
        res.status(400).json({
          message: `An existing ID was generated, please try again.`,
        });
      }
      const newDoc = new EmployeesCollection(req.body);
      await newDoc.save();
      res.sendStatus(200);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  });
  app.post("/update-employee/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const element = await EmployeesCollection.findOne({ id: id });
      if (!element) {
        res.sendStatus(404);
        console.log("Couldn't find the right item");
        return;
      }
      await EmployeesCollection.findOneAndUpdate(
        { id: id },
        {
          name: req.body.name,
          surname: req.body.surname,
          phone: req.body.phone,
          birthDate: req.body.birthDate,
          salary: req.body.salary,
        },
        { new: true }
      );
      res.sendStatus(204);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  });

  app.post("/add-duty", async (req, res) => {
    try {
      const id = req.body.id;
      console.log(id);
      const element = await EmployeesCollection.findOne({ id: id });
      if (!element) {
        res.sendStatus(404);
        console.log("Couldn't find the right item");
        return;
      } else {
        // if(element.duties){
        //   element.duties.forEach(e => {
        //     if(e.date === req.body.date){
        //       res.status(400).json({ message: `Dla podanej daty wprowadzono już godziny.` });
        //     }
        //   })
        // }
        const update = {
          dutyId: req.body.dutyId,
          date: req.body.date,
          start: req.body.start,
          end: req.body.end,
          note: req.body.note,
          hours: req.body.hours,
        };
        const options = { upsert: true };
        // await EmployeesCollection.updateOne(element, update, options);
        await EmployeesCollection.findOneAndUpdate(
          { id: id },
          { $push: { duties: update } }, // Zaktualizuj pole `duties` w dokumencie
          { new: true }
        );
        res.sendStatus(200);
      }
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  });

  app.post("/update-duty/:id/:dutyId", async (req, res) => {
    const id = req.params.id;
    const dutyId = req.params.dutyId;
    try {
      const element = await EmployeesCollection.findOne({ id: id });
      if (!element) {
        res.sendStatus(404);
        console.log("Couldn't find the right item");
        return;
      }
      if (Array.isArray(element.bills)) {
        const updatedDuties = element.duties.map((duty) => {
          if (duty.dutyId === dutyId) {
            // Zaktualizuj pole `start` i `end` dla elementu z danym `dutyId`
            duty.date = req.body.date;
            duty.start = req.body.start;
            duty.end = req.body.end;
            duty.note = req.body.note;
            duty.hours = req.body.hours;
          }
          return duty;
        });

        await EmployeesCollection.findOneAndUpdate(
          { id: id },
          { $set: { duties: updatedDuties } }, // Zaktualizuj pole `duties` w dokumencie
          { new: true }
        );

        res.sendStatus(204);
      }
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  });

  app.post("/add-invoice", async (req, res) => {
    try {
      const idExist = await InvoicesCollection.findOne({ id: req.body.id });
      if (idExist) {
        res.status(400).json({
          message: `An existing ID was generated, please try again.`,
        });
      }
      const newDoc = new InvoicesCollection(req.body);
      await newDoc.save();
      res.sendStatus(200);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: `Błąd: ${err}`,
      });
    }
  });
  app.post("/update-invoice/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const element = await InvoicesCollection.findOne({ id: id });
      if (!element) {
        res.sendStatus(404);
        console.log("Couldn't find the right item");
        return;
      }
      await InvoicesCollection.findOneAndUpdate(
        { id: id },
        {
          companyName: req.body.companyName,
          type: req.body.type,
          date: req.body.date,
          invoiceNumber: req.body.invoiceNumber,
          description: req.body.description,
          value: req.body.value,
          vat: req.body.vat,
        },
        { new: true }
      );
      res.sendStatus(204);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  });

  app.post("/add-bill/:id", async (req, res) => {
    try {
      const id = req.params.id;
      if (id == 0) {
        res.status(400).json({
          message: `No employee selected.`,
        });
      } else {
        const element = await EmployeesCollection.findOne({ id: id });
        if (!element) {
          res.sendStatus(404);
          console.log("Couldn't find the right item");
          return;
        } else {
          const update = {
            id: req.body.id,
            date: req.body.date,
            description: req.body.description,
            value: req.body.value,
          };

          await EmployeesCollection.findOneAndUpdate(
            { id: id },
            { $push: { bills: update } }, // Zaktualizuj pole `duties` w dokumencie
            { new: true }
          );
          res.sendStatus(204);
        }
      }
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  });
  app.post("/update-bill/:employee/:id", async (req, res) => {
    const employee = req.params.employee;
    const id = req.params.id;
    try {
      const element = await EmployeesCollection.findOne({ id: employee });
      if (!element) {
        res.sendStatus(404);
        console.log("Couldn't find the right item");
        return;
      }
      if (Array.isArray(element.bills)) {
        const updateBill = element.bills.map((bill) => {
          if (bill.id === id) {
            // Zaktualizuj pole `start` i `end` dla elementu z danym `dutyId`
            bill.date = req.body.date;
            bill.description = req.body.description;
            bill.value = req.body.value;
          }
          return bill;
        });

        await EmployeesCollection.findOneAndUpdate(
          { id: employee },
          { $set: { bills: updateBill } }, // Zaktualizuj pole `duties` w dokumencie
          { new: true }
        );

        res.sendStatus(204);
      }
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  });
  app.post("/delete-bill/:employee/:id", async (req, res) => {
    const employee = req.params.employee;
    const id = req.params.id;
    try {
      const findEmployee = await EmployeesCollection.findOne({ id: employee });
      if (findEmployee) {
        if (Array.isArray(findEmployee.bills)) {
          await EmployeesCollection.findOneAndUpdate(
            { id: employee },
            { $pull: { bills: { id: id } } }, // Zaktualizuj pole `duties` w dokumencie
            { new: true }
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  });
  app.post("/add-car", async (req, res) => {
    try {
      const idExist = await FleetCollection.findOne({ id: req.body.id });
      if (idExist) {
        res.status(400).json({
          message: `An existing ID was generated, please try again.`,
        });
      }
      const newDoc = new FleetCollection(req.body);
      await newDoc.save();
      res.sendStatus(200);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  });
  app.post("/edit-car/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const element = await FleetCollection.findOne({ id: id });
      if (!element) {
        res.sendStatus(404);
        console.log("Couldn't find the right item");
        return;
      }
      await FleetCollection.findOneAndUpdate(
        { id: id },
        {
          name: req.body.name,
          model: req.body.model,
          year: req.body.year,
          oc: req.body.oc,
          description: req.body.description,
          inspection: req.body.inspection,
        },
        { new: true }
      );
      res.sendStatus(204);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  });
  app.post("/delete-car/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const car = await FleetCollection.findOne({ id: id });
      if (car) {
        await FleetCollection.findOneAndDelete({ id: id });
      }
    } catch (error) {
      console.log(error);
    }
  });
}

module.exports = setData;
