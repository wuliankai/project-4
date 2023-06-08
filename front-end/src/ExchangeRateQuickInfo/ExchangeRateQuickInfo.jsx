import React, { useState, useEffect } from "react";
import { fetchData } from "../helpers/common";

function ExchangeRateQuickInfo() {
  const [baseCurrAmt, setBaseCurrAmt] = useState("2500");
  const [foreignCurrAmt, setForeignCurrAmt] = useState("64000");
  const [baseCurr, setBaseCurr] = useState("SGD");
  const [foreignCurr, setForeignCurr] = useState("THB");
  const [exchangeRate, setExchangeRate] = useState(0);

  const getExchangeRate = async () => {
    const { ok, data } = await fetchData("/exchange_rate", undefined, "GET");
    if (ok) {
      setExchangeRate(data[0].exchange_rate);
      setForeignCurrAmt(
        parseFloat(baseCurrAmt) * parseFloat(data[0].exchange_rate)
      );
      console.log("Exchange rate displayed!");
    } else {
      console.log(data);
    }
  };

  const computeExchangeRate = async () => {
    // setExchangeRate(parseInt(foreignCurrAmt) / parseInt(baseCurrAmt));
    const calExchangeRate =
      parseFloat(foreignCurrAmt) / parseFloat(baseCurrAmt);

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

  useEffect(() => {
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
      <table
        style={{
          fontFamily: "'Tsukimi Rounded', sans-serif",
          color: "white",
          fontSize: "1.5rem",
        }}
      >
        <tbody>
          <tr style={{ color: "white" }}>
            <td>{baseCurr}</td>
            <td> 1 </td>
            <td> {foreignCurr} </td>
            <td> {(1 * exchangeRate).toFixed(2)} </td>
          </tr>
          <tr style={{ color: "white" }}>
            <td>{baseCurr}</td>
            <td> 5 </td>
            <td> {foreignCurr} </td>
            <td> {(5 * exchangeRate).toFixed(2)} </td>
          </tr>
          <tr style={{ color: "white" }}>
            <td>{baseCurr}</td>
            <td> 10 </td>
            <td> {foreignCurr} </td>
            <td> {(10 * exchangeRate).toFixed(2)} </td>
          </tr>
          <tr style={{ color: "white" }}>
            <td>{baseCurr}</td>
            <td> 50 </td>
            <td> {foreignCurr} </td>
            <td> {(50 * exchangeRate).toFixed(2)} </td>
          </tr>
        </tbody>
      </table>
      <hr />
    </>
  );
}

export default ExchangeRateQuickInfo;
