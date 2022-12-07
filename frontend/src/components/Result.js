import React from "react";
import forwardArrow from "../assets/Forward.svg";
import TicketCard from "./TicketCard";
import EmptyPage from "./emptyPage";

function Result(props) {
  const {
    filteredData,
    bookReturn,
    isSearchClicked,
    returnFilterData,
    passengerCount,
  } = props;


  return (
    <div className="card" style={{ height: "100%" }}>
      <div className="card-body">
        {!isSearchClicked &&
        filteredData.length === 0 &&
        Object.keys(returnFilterData).length === 0 ? (
          <EmptyPage />
        ) : isSearchClicked &&
          filteredData.length === 0 &&
          Object.keys(returnFilterData).length === 0 ? (
          <div
            className="d-flex justify-content-center"
            style={{ color: "red" }}
          >
            <h3>Not Found</h3>
          </div>
        ) : (
          <div>
            <div className="mb-4">
              <div
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
              >
                Available flights{" "}
                <span>
                  <img src={forwardArrow} alt="arrow" className="ml-2" />
                </span>
              </div>
            </div>
            <div>
              {bookReturn && isSearchClicked ? (
                <div className="row">
                  <div className="col">
                    <div style={{ color: "deepskyblue", fontWeight: "bold" }}>
                      Departure flight
                      {(returnFilterData.oneWayData).map((data,P) => 
                    <p>{data.departureDate}</p>
                    )}
                    </div>
                    <TicketCard
                      filteredData={returnFilterData.oneWayData}
                      passengerCount={passengerCount}
                    />
                  </div>
                  {returnFilterData.returnData.length && returnFilterData ? (
                    <div className="col">
                      <div style={{ color: "deepskyblue", fontWeight: "bold" }}>
                        Return flight
                        {(returnFilterData.returnData).map((data,t) => 
                    <p>{data.departureDate}</p>
                    )}
                      </div>
                      <TicketCard
                        filteredData={returnFilterData.returnData}
                        passengerCount={passengerCount}
                      />
                    </div>
                  ) : null}
                </div>
              ) : (
                <>
                  <div style={{ color: "deepskyblue", fontWeight: "bold" }}>
                    Departure flight
                    {filteredData.map((data,j) => 
                    <p>{data.departureDate}</p>
                    )}
                  </div>
                  <TicketCard
                    filteredData={filteredData}
                    passengerCount={passengerCount}
                  />
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Result;