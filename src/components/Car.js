import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Car = (props) => {
  const [styles, setStyles] = useState("");
  const [name, setName] = useState(props.name)
  const [model, setModel] = useState(props.model);

  const handleDelete = (e) => {
    const request = new Request(
      `https://companymanager-59f9b2ca55a6.herokuapp.com/delete-car/${props.id}`,
      {
        method: "POST",
        headers: new Headers({ "Content-Type": "application/json" }),
      }
    );
    fetch(request)
      .then((response) => {
        if (response.ok) {
            console.log("usunięto")
        } else {
            console.log("błąd");
        }
      })
      .catch((error) => console.log(error));
      setStyles("table-danger");
      setName("deleting...");
      setModel("deleting...");
  };
  
  return (
    <tr className={styles}>
      <th scope="row">{name}</th>
      <td>{model}</td>
      <td>{props.year}</td>
      <td>{(props.oc).slice(0, 10)}</td>
      <td>{(props.inspection).slice(0, 10)}</td>
      <td>
        <NavLink
          to={{
            pathname: `/dashboard/fleet/edit-car/${props.id}`,
            state: {
              // id: props.id,
            },
          }}
        >
          <button type="button" className="btn btn-warning">
            Edit
          </button>
        </NavLink>
        <button
          type="button"
          className="btn btn-danger marginLeft10"
          onClick={handleDelete}
        >
          <i className="bi bi-file-minus"></i>
        </button>
      </td>
    </tr>
  );
};

export default Car;
