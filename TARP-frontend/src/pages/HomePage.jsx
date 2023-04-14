import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";

function HomePage() {
  const navigate = useNavigate();
  // const [data, setData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = async (event) => {
    console.log(searchTerm);
    event.preventDefault();

    try {
      setLoading(true);
      fetch(`http://127.0.0.1:5000/api/data?url=${searchTerm}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: searchTerm }),
      })
        .then((response) => response.json())
        .then((data) => {
          // setData(data);
          console.log(data);
          navigate("/result", { state: data });
        });
      // const responseData = await response.json();

      // setData(response);
      // console.log(data);
      // navigate(`/result/${encodeURIComponent(searchTerm)}`);
    } catch (e) {
      throw new Error(e);
    }
  };

  return (
    <>
      <Navbar />
      <div
        className="container-fluid d-flex justify-content-center align-items-center"
        style={{ height: "100vh", overflow: "hidden" }}
      >
        <div
          className="row text-center d-flex align-items-center"
          style={{
            overflow: "hidden",
            width: "50vw",
            height: "50vh",
          }}
        >
          <div>
            <label className="mb-3" style={{ fontSize: "28px" }} htmlFor="url">
              Enter the link for the product!
            </label>
            <form onSubmit={handleSubmit} className="lead">
              <div className="input-group mb-3">
                <input
                  type="text"
                  placeholder="Link goes here..."
                  value={searchTerm}
                  onChange={handleInputChange}
                  className="form-control"
                  id="url"
                />
              </div>
              {loading ? (
                <div className="parent">
                  <div>
                    <ReactLoading
                      className=""
                      type="balls"
                      color="#0000FF"
                      height={100}
                      width={50}
                    />
                  </div>
                </div>
              ) : (
                <button className="btn btn-info text-light" type="submit">
                  Submit
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default HomePage;
