import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/Dashboard.css";

import { NavLink } from "react-router-dom";
import TopBar from "../components/TopBar";
import NavBar from "../components/NavBar";

const EditInvoice = () => {
  const { id } = useParams();
  const [companyName, setComapnyName] = useState("");
  const [type, setType] = useState("");
  const [date, setDate] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [vat, setVat] = useState("");

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

  const [info, setInfo] = useState(
    "Enter all details to edit the invoice"
  );

  const handleCompanyName = (e) => {
    setComapnyName(e.target.value);
  };
  const handleInvoiceType = (e) => {
    setType(e.target.value);
  };
  const handleDate = (e) => {
    setDate(e.target.value);
  };
  const handleInvoiceNumber = (e) => {
    setInvoiceNumber(e.target.value);
  };
  const handleDescription = (e) => {
    setDescription(e.target.value);
  };
  const handleVat = (e) => {
    setVat(e.target.value);
  };
  const handleValue = (e) => {
    setValue(e.target.value);
  };

  const getInvoiceData = () => {
    const request = new Request(
      `https://companymanager-59f9b2ca55a6.herokuapp.com/get-invoice-data/${id}`,
      {
        method: "GET",
        headers: new Headers({ "Content-Type": "application/json" }),
      }
    );

    fetch(request)
      .then((response) => response.json())
      .then((data) => {
        setComapnyName(data[0].companyName);
        setType(data[0].type);
        setDate(data[0].date.slice(0, 10));
        setInvoiceNumber(data[0].invoiceNumber);
        setDescription(data[0].description);
        setValue(data[0].value);
        setVat(data[0].vat);
      });
  };

  const updateInvoice = (e) => {
    e.preventDefault();
    const dane = {
      companyName: companyName,
      type: type,
      date: date,
      invoiceNumber: invoiceNumber,
      description: description,
      value: value,
      vat: vat,
    };

    const request = new Request(`https://companymanager-59f9b2ca55a6.herokuapp.com/update-invoice/${id}`, {
      method: "POST",
      body: JSON.stringify(dane),
      headers: new Headers({ "Content-Type": "application/json" }),
    });

    fetch(request)
      .then((response) => {
        if (response.ok) {
          setInfo("Successfully edited data of invoice");
          window.location.href = "/dashboard/invoices";
        } else {
          setInfo("Something went wrong");
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getInvoiceData();
  }, [id]);

  const title = (
    <p>
      Edit invoice <strong>{invoiceNumber}</strong>.
    </p>
  );
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
              <p className="margin50">{info}</p>
              <form className="addEmployee" onSubmit={updateInvoice}>
                <div className="mb-3">
                  <label forhtml="date" className="form-label">
                    Date of invoice
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="date"
                    onChange={handleDate}
                    value={date}
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
                    value={companyName}
                    required
                  />
                </div>
                <label forhtml="invoiceType" className="form-label">
                  Invoice type
                </label>
                <select
                  className="form-select"
                  id="invoiceType"
                  aria-label="Default select example"
                  onChange={handleInvoiceType}
                  value={type}
                  required
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
                    value={invoiceNumber}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label forhtml="vat" className="form-label">
                    VAT (%)
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="vat"
                    onChange={handleVat}
                    value={vat}
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
                    value={description}
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
                    value={value}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Save
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

export default EditInvoice;
