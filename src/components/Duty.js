import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

const Duty = (props) => {
  const [style, setStyle] = useState("");

  const {id} = useParams();
  const {dutyId} = useParams();

  useEffect(() => {
    if (props.note === "nonbe") {
      setStyle("");
    } else if (props.note === "nightshift") {
      setStyle("table-primary");
    } else if (props.note === "sickness") {
      setStyle("table-warning");
    } else if (props.note === "dayoff") {
      setStyle("table-secondary");
    } else if (props.note === "absent") {
      setStyle("table-danger");
    }
  }, [style]);
  return (
    <tr className={style}>
      <th scope="row">{props.date}</th>
      <td>{props.start}</td>
      <td>{props.end}</td>
      <td>{props.note}</td>
      <td>{props.hours}</td>
      <td>
        <NavLink
          to={{
            pathname: `/dashboard/employees/working-hours/${id}/edit-hours/${props.dutyId}`,
            state: {
              id: props.id,
            },
          }}
        >
          <button type="button" className="btn btn-warning">
            Edit
          </button>
        </NavLink>
      </td>
    </tr>
  );
};

export default Duty;
