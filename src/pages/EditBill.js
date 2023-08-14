import React, { useEffect, useState } from "react";

import { NavLink } from "react-router-dom";
import TopBar from "../components/TopBar";
import NavBar from "../components/NavBar";
import { useParams } from "react-router-dom";

const EditBill = () => {
  const { employee } = useParams();
  const { id } = useParams();
  const title = (
    <p>
      Edit employee <strong>settlement</strong>.
    </p>
  );
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");

  const [info, setInfo] = useState(
    "Use the form to edit employee settlement."
  );

  // const [isLogged, setIsLogged] = useState(false);
  // const [userName, setUserName] = useState(false);

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

  const handleDate = (e) => {
    setDate(e.target.value);
  };
  const handleDescription = (e) => {
    setDescription(e.target.value);
  };
  const handleValue = (e) => {
    setValue(e.target.value);
  };

  const getBillData = () => {
    const request = new Request(
      `https://companymanager-59f9b2ca55a6.herokuapp.com/get-single-bill/${employee}/${id}`,
      {
        method: "GET",
        headers: new Headers({ "Content-Type": "application/json" }),
      }
    );

    fetch(request)
      .then((response) => response.json())
      .then((data) => {
        setDate(data.date);
        setDescription(data.description);
        setValue(data.value);
      });
  };

  useEffect(() => {
    getBillData();
  }, [employee]);

  const editBill = (e) => {
    e.preventDefault();
    const dane = {
      date: date,
      description: description,
      value: value,
    };
    const request = new Request(
      `https://company-manager.herokuapp.com/update-bill/${employee}/${id}`,
      {
        method: "POST",
        body: JSON.stringify(dane),
        headers: new Headers({ "Content-Type": "application/json" }),
      }
    );

    fetch(request)
      .then((response) => {
        if (response.ok) {
          window.location.href = `/dashboard/bills`;
        } else {
          console.log("Błąd");
        }
      })
      .catch((error) => console.log(error));
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
              <p>{info}</p>
              <form className="addEmployee" onSubmit={editBill}>
                <div className="mb-3">
                  <label forhtml="date" className="form-label">
                    Date of bill
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
                  <label forhtml="description" className="form-label">
                    Note
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    value={description}
                    required
                    onChange={handleDescription}
                  />
                </div>
                <div className="mb-3">
                  <label forhtml="value" className="form-label">
                    Value
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="value"
                    step={0.01}
                    value={value}
                    onChange={handleValue}
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

export default EditBill;
