import React, { useState } from "react";
import Navbar from "../components/Navbar";
import data from "../tedsa.json";
import FeatureCard from "../components/FeatureCard";
import ResultRow from "../components/ResultRow";

const SamplePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const totalItems = Object.keys(data.Location_and_Date).length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  const { bigrams, polarity } = data;
  let map1 = new Map();

  for (const key in bigrams) {
    if (bigrams.hasOwnProperty(key)) {
      let bgVal = `${bigrams[key]}`;
      if (map1.has(bgVal)) {
        let { count, sum } = map1.get(bgVal);
        count++;
        sum += polarity[key];
        map1.set(bgVal, { count, sum });
      } else {
        const sum = polarity[key];
        map1.set(bgVal, { count: 1, sum });
      }
    }
  }

  // console.log(map1);

  const arrFeatures = Array.from(map1, (entry) => {
    return { key: entry[0], value: entry[1] };
  });

  const rows = Object.keys(data.Location_and_Date)
    .slice(startIndex, endIndex)
    .map((key) => {
      return {
        Fake_or_True: data.Fake_or_True[key],
        Location_and_Date: data.Location_and_Date[key],
        Rating: data.Rating[key],
        Review_Text: data.Review_Text[key],
        Title: data.Title[key],
        Verified: data.Verified[key],
      };
    });

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const pageNumbers = Array.from(Array(totalPages).keys());
  // console.log(rows);

  return (
    <>
      <Navbar />
      <div className="container-xxl">
        <h3 className="my-4 text-center">FEATURES</h3>

        <div className="mt-3 d-flex flex-wrap align-items-center row-3">
          <div className="col-12 d-flex flex-row flex-wrap justify-content-center gap-10">
            {arrFeatures.map((element) => {
              // console.log(element);
              return (
                <FeatureCard
                  name={`${element.key}`}
                  sum={`${element.value.sum}`}
                  count={`${element.value.count}`}
                />
              );
            })}
          </div>
        </div>
        <div className="row-9 mb-3">
          <h3 className="mt-5 mb-4 text-center">REVIEWS</h3>
          <div className="mt-3 d-flex flex-column">
            <div className="d-flex flex-wrap pb-3">
              <div className="col-1 text-center bg-warning border g ">S.NO</div>
              <div className="col-3 text-center bg-warning border g ">
                TITLE
              </div>
              <div className="col-4 text-center bg-warning border g ">TEXT</div>
              <div className="col-1 text-center bg-warning border g">
                RATING
              </div>
              <div className="col-2 text-center bg-warning border g">
                LOCATION AND DATE
              </div>

              <div className="col-1 text-center bg-warning border g">
                VERIFIED
              </div>
              {rows.map((row, i) => {
                return (
                  <ResultRow
                    sno={`${i + 1}`}
                    fake={`${row.Fake_or_True}`}
                    title={`${row.Title}`}
                    text={`${row.Review_Text}`}
                    rating={`${row.Rating}`}
                    loc={`${row.Location_and_Date}`}
                    ver={`${row.Verified}`}
                  />
                );
              })}
            </div>
            <div className="d-flex flex-wrap justify-content-center mb-4">
              {pageNumbers.map((pageNumber) => (
                <button
                  // {currentPage === pageNumber + 1 ? 'active' : ''}
                  className={`button btn btn-dark mx-1 my-1 ${
                    currentPage === pageNumber + 1 ? "active-custom" : ""
                  }`}
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber + 1)}
                >
                  {pageNumber + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SamplePage;
