import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Dashboard.css";

import { NavLink } from "react-router-dom";
import TopBar from "../components/TopBar";
import NavBar from "../components/NavBar";

const Offers = () => {
  const title = (
    <p>
      Offer <strong>generator</strong>.
    </p>
  );

  const [date, setDate] = useState(null);
  const [companyName, setComapnyName] = useState(null);
  const [postalCode, setPostalCode] = useState(null);
  const [city, setCity] = useState(null);
  const [street, setStreet] = useState(null);
  const [description, setDescription] = useState(null);
  const [el1, setEl1] = useState(null);
  const [el2, setEl2] = useState(null);
  const [el3, setEl3] = useState(null);
  const [el4, setEl4] = useState(null);
  const [el5, setEl5] = useState(null);
  const [el6, setEl6] = useState(null);
  const [el7, setEl7] = useState(null);
  const [el8, setEl8] = useState(null);
  const [el9, setEl9] = useState(null);
  const [el10, setEl10] = useState(null);
  const [comments, setComments] = useState(null);

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
    "Create a new offer based on the completed form."
  );

  const handleDate = (e) => {
    setDate(e.target.value);
    console.log(date);
  };
  const handleCompanyName = (e) => {
    setComapnyName(e.target.value);
  };
  const handlePostalCode = (e) => {
    setPostalCode(e.target.value);
  };
  const handleCity = (e) => {
    setCity(e.target.value);
  };
  const handleStreet = (e) => {
    setStreet(e.target.value);
  };
  const handleDescription = (e) => {
    setDescription(e.target.value);
  };
  const handleEl1 = (e) => {
    setEl1(e.target.value);
  };
  const handleEl2 = (e) => {
    setEl2(e.target.value);
  };
  const handleEl3 = (e) => {
    setEl3(e.target.value);
  };
  const handleEl4 = (e) => {
    setEl4(e.target.value);
  };
  const handleEl5 = (e) => {
    setEl5(e.target.value);
  };
  const handleEl6 = (e) => {
    setEl6(e.target.value);
  };
  const handleEl7 = (e) => {
    setEl7(e.target.value);
  };
  const handleEl8 = (e) => {
    setEl8(e.target.value);
  };
  const handleEl9 = (e) => {
    setEl9(e.target.value);
  };
  const handleEl10 = (e) => {
    setEl10(e.target.value);
  };
  const handleComments = (e) => {
    setComments(e.target.value);
  };

  const generateOffer = (e) => {
    e.preventDefault();

    const data = {
      date: date,
      companyName: companyName,
      postalCode: postalCode,
      city: city,
      street: street,
      description: description,
      el1: el1 ? el1 : "",
      el2: el2 ? el2 : "",
      el3: el3 ? el3 : "",
      el4: el4 ? el4 : "",
      el5: el5 ? el5 : "",
      el6: el6 ? el6 : "",
      el7: el7 ? el7 : "",
      el8: el8 ? el8 : "",
      el9: el9 ? el9 : "",
      el10: el10 ? el10 : "",
      comments: comments ? comments : "-",
    };

    const request = new Request("https://companymanager-59f9b2ca55a6.herokuapp.com/generate-offer", {
      method: "POST",
      body: JSON.stringify(data),
      headers: new Headers({ "Content-Type": "application/json" }),
    });

    fetch(request)
      .then((response) => {
        if (response.ok) {
          // Utwórz odpowiednią treść informacji sukcesu
          setInfo("Successfully generated new offer");

          // Pobierz plik, używając mechanizmu odpowiedzi
          response.blob().then((blob) => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `company_manager_${companyName}_${date}.docx`; // Tutaj wprowadź odpowiednią nazwę pliku
            a.click();
            window.URL.revokeObjectURL(url);
          });
        } else {
          // Utwórz odpowiednią treść informacji o błędzie
          setInfo("Something went wrong");
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
              <form className="split" onSubmit={generateOffer}>
                <div>
                  <div className="mb-3">
                    <label forhtml="date" className="form-label">
                    The date of the offer
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="date"
                      onChange={handleDate}
                    />
                  </div>
                  <div className="mb-3">
                    <label forhtml="companyName" className="form-label">
                      Company name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="companyName"
                      onChange={handleCompanyName}
                    />
                  </div>
                  <div className="mb-3">
                    <label forhtml="postalCode" className="form-label">
                      Postal code
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="postalCode"
                      onChange={handlePostalCode}
                    />
                  </div>
                  <div className="mb-3">
                    <label forhtml="city" className="form-label">
                      City
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="city"
                      onChange={handleCity}
                    />
                  </div>
                  <div className="mb-3">
                    <label forhtml="street" className="form-label">
                      Street
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="street"
                      onChange={handleStreet}
                    />
                  </div>
                  <div className="mb-3">
                    <label forhtml="description" className="form-label">
                    Service description
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="description"
                      onChange={handleDescription}
                    />
                  </div>
                </div>
                <div>
                  <div className="mb-3">
                    <label forhtml="el1" className="form-label">
                      1. Offer element:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="el1"
                      onChange={handleEl1}
                    />
                  </div>
                  <div className="mb-3">
                    <label forhtml="el2" className="form-label">
                      2. Offer element:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="el2"
                      onChange={handleEl2}
                    />
                  </div>
                  <div className="mb-3">
                    <label forhtml="el3" className="form-label">
                      3. Offer element:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="el3"
                      onChange={handleEl3}
                    />
                  </div>
                  <div className="mb-3">
                    <label forhtml="el4" className="form-label">
                      4. Offer element:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="el4"
                      onChange={handleEl4}
                    />
                  </div>
                  <div className="mb-3">
                    <label forhtml="el5" className="form-label">
                      5. Offer element:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="el5"
                      onChange={handleEl5}
                    />
                  </div>
                  <div className="mb-3">
                    <label forhtml="el6" className="form-label">
                      6. Offer element:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="el6"
                      onChange={handleEl6}
                    />
                  </div>
                </div>
                <div>
                  <div className="mb-3">
                    <label forhtml="el7" className="form-label">
                      7. Offer element:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="el7"
                      onChange={handleEl7}
                    />
                  </div>
                  <div className="mb-3">
                    <label forhtml="el8" className="form-label">
                      8. Offer element:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="el8"
                      onChange={handleEl8}
                    />
                  </div>
                  <div className="mb-3">
                    <label forhtml="el9" className="form-label">
                      9. Offer element:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="el9"
                      onChange={handleEl9}
                    />
                  </div>
                  <div className="mb-3">
                    <label forhtml="el10" className="form-label">
                      10. Offer element:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="el10"
                      onChange={handleEl10}
                    />
                  </div>
                  <div className="mb-3">
                    <label forhtml="comments" className="form-label">
                      Additional information / comments:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="comments"
                      onChange={handleComments}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Generate
                  </button>
                </div>
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

export default Offers;
