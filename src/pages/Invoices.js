import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../styles/Dashboard.css";

import TopBar from "../components/TopBar";
import NavBar from "../components/NavBar";
import Invoice from "../components/Invoice";

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [invdate, setInvdate] = useState(null);
  const [invtype, setInvtype] = useState("all");

  const [style1, setStyle1] = useState({ color: "black" });
  const [style2, setStyle2] = useState({ color: "black" });
  const [style3, setStyle3] = useState({ color: "black" });

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

  const handleDateForm = (e) => {
    setInvdate(e.target.value);
  };
  const handleTypeForm = (e) => {
    setInvtype(e.target.value);
  };

  function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

  const getInvoicesData = () => {
    const request = new Request(
      `https://companymanager-59f9b2ca55a6.herokuapp.com/get-invoices/${invtype}/${invdate}`,
      {
        method: "GET",
        headers: new Headers({ "Content-Type": "application/json" }),
      }
    );
    fetch(request)
      .then((response) => response.json())
      .then((data) => {
        const arr = [];
        for (let key in data) {
          arr.push({
            id: data[key].id,
            companyName: data[key].companyName,
            type: data[key].type,
            date: data[key].date.slice(0, 10),
            invoiceNumber: data[key].invoiceNumber,
            description: data[key].description,
            value: data[key].value,
            vat: data[key].vat,
          });
        }
        setInvoices(arr);
      });
  };
  useEffect(() => {
    getInvoicesData();
  }, [invdate]);
  useEffect(() => {
    getInvoicesData();
  }, [invtype]);

  let nettoAmount = 0;
  let vatValueAmount = 0;
  let bruttoAmount = 0;

  let costsNetto = 0;
  let costsVatValue = 0;
  let costsBruttoValue = 0;

  let incomeNetto = 0;
  let incomeVatValue = 0;
  let incomeBruttoValue = 0;

  const allInvoices = invoices.map((i) => {
    const netto = i.value / (1 + i.vat / 100);
    const vatValue = i.value - netto;
    nettoAmount += netto;
    vatValueAmount += vatValue;
    bruttoAmount += i.value;

    if (i.type === "costs") {
      costsNetto += netto;
      costsVatValue += vatValue;
      costsBruttoValue += i.value;
    }
    if (i.type === "revenue") {
      incomeNetto += netto;
      incomeVatValue += vatValue;
      incomeBruttoValue += i.value;
    }

    return (
      <Invoice
        key={i.id}
        id={i.id}
        companyName={i.companyName}
        type={i.type}
        date={i.date}
        invoiceNumber={i.invoiceNumber}
        description={i.description}
        value={i.value}
        vat={i.vat}
      />
    );
  });

  const changeColor = () => {
    if (valueResultsNetto < 0) {
      setStyle1({ color: "red" });
    } else {
      setStyle1({ color: "black" });
    }
    if (valueResultsVatValue < 0) {
      setStyle2({ color: "red" });
    } else {
      setStyle2({ color: "black" });
    }
    if (valueResultsBruttoAmount < 0) {
      setStyle3({ color: "red" });
    } else {
      setStyle3({ color: "black" });
    }
  };

  let valueResultsNetto = 0;
  let valueResultsVatValue = 0;
  let valueResultsBruttoAmount = 0;

  // const valueResultsNetto = incomeNetto - costsNetto;
  // const valueResultsVatValue = incomeVatValue - costsVatValue;
  // const valueResultsBruttoAmount = incomeBruttoValue - costsBruttoValue;

  invtype !== "all"
    ? (valueResultsNetto = 0)
    : (valueResultsNetto = incomeNetto - costsNetto);

  invtype !== "all"
    ? (valueResultsNetto = 0)
    : (valueResultsVatValue = incomeVatValue - costsVatValue);

  invtype !== "all"
    ? (valueResultsNetto = 0)
    : (valueResultsBruttoAmount = incomeBruttoValue - costsBruttoValue);

  useEffect(() => {
    changeColor();
  }, [valueResultsNetto]);

  const sortedInvoices = allInvoices.slice().sort((a, b) => {
    const dateA = new Date(a.props.date);
    const dateB = new Date(b.props.date);
    return dateA - dateB;
  });

  const title = (
    <p>
      Your <strong>costs</strong>.
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
              <p>Here you can add your costs and invoices.</p>
              <NavLink to="/dashboard/invoices/add-invoice">
                <button type="button" className="btn btn-success">
                  Add invoice
                </button>
              </NavLink>
              <p className="margin50">
              Select the month for which you want to view the invoices:
              </p>
              <select
                className="form-select width20"
                aria-label="Default select example"
                onChange={handleDateForm}
              >
                <option defaultValue="all">Month</option>
                <option value={"2023-07"}>July 2023</option>
                <option value={"2023-08"}>August 2023</option>
                <option value={"2023-09"}>September 2023</option>
                <option value={"2023-10"}>October 2023</option>
              </select>
              <p className="margin20">Invoice type:</p>
              <select
                className="form-select width20"
                aria-label="Default select example"
                onChange={handleTypeForm}
              >
                <option value={"all"}>All</option>
                <option value={"revenue"}>Revenue</option>
                <option value={"costs"}>Costs</option>
              </select>
              <br />
              <table className="table">
                <thead>
                  <tr className="table-secondary">
                    <th scope="col">Date</th>
                    <th scope="col">Company name</th>
                    <th scope="col">Invoice number</th>
                    <th scope="col">Name of product or service</th>
                    <th scope="col">Invoice type</th>
                    <th scope="col">The NET value</th>
                    <th scope="col">VAT rate</th>
                    <th scope="col">The amount of VAT</th>
                    <th scope="col">Gross value</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedInvoices}
                  <tr className="table-success">
                    <th></th>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                      <strong style={{ color: "black" }}>SUM:</strong>
                    </td>
                    <td>{formatNumber(nettoAmount.toFixed(2))} $</td>
                    <td></td>
                    <td>{formatNumber(vatValueAmount.toFixed(2))} $</td>
                    <td>{formatNumber(bruttoAmount.toFixed(2))} $</td>
                    <td></td>
                  </tr>
                  {invtype !== "all" ? (
                    <></>
                  ) : (
                    <tr className="table-secondary">
                      <th></th>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>
                        <strong style={{ color: "black" }}>
                          (revenue - costs):
                        </strong>
                      </td>
                      <td style={style1}>
                        {formatNumber(valueResultsNetto.toFixed(2))} $
                      </td>
                      <td></td>
                      <td style={style2}>
                        {formatNumber(valueResultsVatValue.toFixed(2))} $
                      </td>
                      <td style={style3}>
                        {formatNumber(valueResultsBruttoAmount.toFixed(2))} $
                      </td>
                      <td></td>
                    </tr>
                  )}
                </tbody>
              </table>
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

export default Invoices;
