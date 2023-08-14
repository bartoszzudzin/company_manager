import React, { useState, useEffect } from "react";
import "../styles/Dashboard.css";

import { NavLink } from "react-router-dom";
import TopBar from "../components/TopBar";
import NavBar from "../components/NavBar";

const AddInvoice = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [userName, setUserName] = useState(false);

  // useEffect(() => {
  //   checkSession();
  // }, [isLogged]);

  // const checkSession = () => {
  //   const request = new Request("http://localhost:5000/checkSession", {
  //     method: "GET",
  //     credentials: "include",
  //     headers: new Headers({ "Content-Type": "application/json" }),
  //   });
  //   fetch(request)
  //     .then((response) => {
  //       if (response.ok) {
  //         setIsLogged(true);
  //         return response.json();
  //       } else {
  //         console.log("Użytkownik nie zalogowany");
  //         window.location.href = "/";
  //       }
  //     })
  //     .then((data) => {
  //       setUserName(data ? data.name : null);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };

  const title = (
    <p>
      Add new <strong>invoice</strong>.
    </p>
  );

  const [date, setDate] = useState(null);
  const [companyName, setComapnyName] = useState(null);
  const [invoiceType, setInvoiceType] = useState("przychodowa");
  const [invoiceNumber, setInvoiceNumber] = useState(null);
  const [vat, setVat] = useState(null);
  const [description, setDescription] = useState(null);
  const [value, setValue] = useState(null);

  const [info, setInfo] = useState(
    "Enter all the necessary data to add a new invoice."
  );

  const handleDate = (e) => {
    setDate(e.target.value);
  };
  const handleCompanyName = (e) => {
    setComapnyName(e.target.value);
  };
  const handleInvoiceType = (e) => {
    setInvoiceType(e.target.value);
  };
  const handleInvoiceNumber = (e) => {
    setInvoiceNumber(e.target.value);
  };
  const handleVat = (e) => {
    setVat(e.target.value);
  };
  const handleDescription = (e) => {
    setDescription(e.target.value);
  };
  const handleValue = (e) => {
    setValue(e.target.value);
  };

  const addInvoice = (e) => {
    e.preventDefault();
    const random = Math.floor(Math.random() * 100000);
    const id = invoiceType + random;
    const dane = {
      id: id,
      companyName: companyName,
      type: invoiceType,
      date: date,
      month: date.slice(0, 7),
      invoiceNumber: invoiceNumber,
      description: description,
      value: value,
      vat: vat,
    };
    const request = new Request("https://companymanager-59f9b2ca55a6.herokuapp.com/add-invoice", {
      method: "POST",
      body: JSON.stringify(dane),
      headers: new Headers({ "Content-Type": "application/json" }),
    });
    fetch(request).then((response) => {
      if (response.ok) {
        setInfo("Successfully added new invoice.");
        window.location.href = "/dashboard/invoices";
      } else if (response.status === 400) {
        response.json().then((data) => {
          setInfo(data.message);
        });
      }
    });
  };

  return (
    <>
      {/* {isLogged ? ( */}
        <div className="dashboard">
          <TopBar title={title} 
          // userName={userName}
           />
          <div className="frontPanel">
            <NavBar />
            <div className="window withPadding">
              <p>Here you can add a new invoice.</p>
              <p className="margin50">{info}</p>
              <form className="addEmployee" onSubmit={addInvoice}>
                <div className="mb-3">
                  <label forhtml="date" className="form-label">
                    Date of invoice
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="date"
                    onChange={handleDate}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label forhtml="companyName" className="form-label">
                    Company name (seller)
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="companyName"
                    onChange={handleCompanyName}
                    required
                  />
                </div>
                <label forhtml="invoiceType" className="form-label">
                  Ivoice type
                </label>
                <select
                  className="form-select"
                  id="invoiceType"
                  aria-label="Default select example"
                  onChange={handleInvoiceType}
                >
                  <option value={"revenue"}>Revenue</option>
                  <option value={"costs"}>Costs</option>
                </select>
                <br />
                <div className="mb-3">
                  <label forhtml="invoiceNumber" className="form-label">
                    Invoice number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="invoiceNumber"
                    onChange={handleInvoiceNumber}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label forhtml="vat" className="form-label">
                    VAT (%)
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="vat"
                    onChange={handleVat}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label forhtml="description" className="form-label">
                    Note
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    onChange={handleDescription}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label forhtml="value" className="form-label">
                    Gross value ($)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step=".01"
                    className="form-control"
                    id="value"
                    onChange={handleValue}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Add
                </button>
              </form>
            </div>
          </div>
        </div>
      {/* ) : (
        <div className="WelcomePage">
          <div className="center">
            <div className="p-3 text-primary-emphasis bg-danger-subtle border border-danger-subtle rounded-3">
              Użytkownik nie zalogowany
            </div>
            <br />
            <NavLink to="/">
              <button type="submit" className="btn btn-primary">
                Przejdź do logowania
              </button>
            </NavLink>
          </div>
        </div>
      )} */}
    </>
  );
};

export default AddInvoice;
