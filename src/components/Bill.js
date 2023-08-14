import React, {useState} from "react";
import { NavLink, useParams } from "react-router-dom";

const Bill = (props) => {
  const [styles, setStyles] = useState('');
  const [description, setDescription] = useState(props.description);
  const [value, setValue] = useState(props.value);

  const handleDelete = (e) => {
    const request = new Request(
      `https://companymanager-59f9b2ca55a6.herokuapp.com/delete-bill/${props.id}`,
      {
        method: "POST",
        headers: new Headers({ "Content-Type": "application/json" }),
      }
    );
    fetch(request)
      .then((response) => {
        if (response.ok) {
            console.log("deleted")
        } else {
            console.log("error");
        }
      })
      .catch((error) => console.log(error));
      setStyles("table-danger");
      setDescription("deleting...");
      setValue('0');
  };
  
  return (
    <tr className={styles}>
      <th scope="row">{props.date}</th>
      <td>{description}</td>
      <td>{value} $</td>
      <td>
        <NavLink
          to={{
            pathname: `/dashboard/bills/edit-bill/${props.employee}/${props.id}`,
            state: {
              id: props.id,
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

export default Bill;
