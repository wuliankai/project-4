import React, { useState, useContext, useEffect } from "react";
import { fetchData } from "./helpers/common";
import ExchangeRateQuickInfo from "./ExchangeRateQuickInfo/ExchangeRateQuickInfo";
import HotelQuickInfo from "./HotelQuickInfo/HotelQuickInfo";
import FlightsQuickInfo from "./FlightsQuickInfo/FlightsQuickInfo";
import UserContext from "./context/user";

function MainDisplay() {
  const [baseCurrAmt, setBaseCurrAmt] = useState("2500");
  const [foreignCurrAmt, setForeignCurrAmt] = useState("64000");
  const [baseCurr, setBaseCurr] = useState("SGD");
  const [foreignCurr, setForeignCurr] = useState("THB");
  const [exchangeRate, setExchangeRate] = useState(0);
  const userCtx = useContext(UserContext);

  const computeExchangeRate = async () => {
    // setExchangeRate(parseInt(foreignCurrAmt) / parseInt(baseCurrAmt));
    const calExchangeRate = parseInt(foreignCurrAmt) / parseInt(baseCurrAmt);

    const { ok, data } = await fetchData("/exchange_rate", undefined, "POST", {
      exchange_rate: calExchangeRate,
    });
    if (ok) {
      setExchangeRate(calExchangeRate);
      console.log("Exchange rate saved!");
    } else {
      console.log(data);
    }
  };

  const getExchangeRate = async () => {
    const { ok, data } = await fetchData("/exchange_rate", undefined, "GET");
    if (ok) {
      setExchangeRate(data[0].exchange_rate);
      console.log("Exchange rate displayed!");
    } else {
      console.log(data);
    }
  };

  useEffect(() => {
    computeExchangeRate();
    getExchangeRate();
  }, []);

  return (
    <>
      <input
        placeholder="base currency"
        style={{ width: "7rem", height: "2rem" }} //this chunk sets the base curr sign (sgd, etc)
        value={baseCurr}
        onChange={(e) => {
          setBaseCurr(e.target.value);
        }}
      ></input>
      <input
        placeholder="base currency amount"
        value={baseCurrAmt}
        style={{ width: "20rem", height: "2rem" }} //this chunk sets the base currency amount
        onChange={(e) => {
          setBaseCurrAmt(e.target.value);
        }}
      ></input>
      <input
        placeholder="foreign currency"
        style={{ width: "7rem", height: "2rem" }} //this chunk sets the foreign curr sign (usd, thb, krw, etc)
        value={foreignCurr}
        onChange={(e) => {
          setForeignCurr(e.target.value);
        }}
      ></input>
      <input
        placeholder="foreign currency amount"
        value={foreignCurrAmt}
        style={{ width: "20rem", height: "2rem" }} //this chunk sets the foreign currency amount
        onChange={(e) => {
          setForeignCurrAmt(e.target.value);
        }}
      ></input>
      <button
        style={{ width: "10rem", height: "2rem" }}
        onClick={computeExchangeRate}
      >
        Compute Exchange Rate
      </button>
      <ExchangeRateQuickInfo
        exchangeRate={exchangeRate}
        baseCurr={baseCurr}
        foreignCurr={foreignCurr}
      ></ExchangeRateQuickInfo>
      <HotelQuickInfo></HotelQuickInfo>
      <FlightsQuickInfo></FlightsQuickInfo>
    </>
  );
}

export default MainDisplay;
