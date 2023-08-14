import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Invoice = (props) => {
  const [style, setStyle] = useState("");
  const netto = (props.value / (1 + props.vat / 100)).toFixed(2);
  const vatValue = (props.value - netto).toFixed(2);

  useEffect(() => {
    if (props.type === "revenue") {
      setStyle("");
    } else if (props.type === "costs") {
      setStyle("table-warning");
    }
  }, []);

  function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }
  return (
    <>
      <tr className={style}>
        <th>{props.date}</th>
        <td>{props.companyName}</td>
        <td>{props.invoiceNumber}</td>
        <td>{props.description}</td>
        <td>{props.type}</td>
        <td>{formatNumber(netto)} $</td>
        <td>{props.vat} %</td>
        <td>{formatNumber(vatValue)} $</td>
        <td>{formatNumber(props.value.toFixed(2))} $</td>
        <td>
          <NavLink
            to={{
              pathname: `/dashboard/invoices/edit-invoice/${props.id}`,
              state: {
                id: props.id,
              },
            }}
          >
            <button type="button" className="btn btn-success">
              Edit
            </button>
          </NavLink>
        </td>
      </tr>
    </>
  );
};

export default Invoice;
