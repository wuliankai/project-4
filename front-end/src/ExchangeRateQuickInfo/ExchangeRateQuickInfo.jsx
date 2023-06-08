import React, { useEffect, useState } from "react";
import { fetchData } from "../helpers/common";

function ExchangeRateQuickInfo(props) {
  const [exchangeRate, setExchangeRate] = useState(0);
  const resExchangeRate = async () => {
    const { ok, data } = await fetchData("/exchange_rate", undefined, "GET");
    if (ok) {
      setExchangeRate(data[0].exchange_rate);
    } else {
      console.log(data);
    }
  };

  useEffect(() => {
    resExchangeRate();
  }, []);

  return (
    <>
      <table
        style={{
          fontFamily: "'Tsukimi Rounded', sans-serif",
          color: "white",
          fontSize: "1.5rem",
        }}
      >
        <tbody>
          <tr style={{ color: "white" }}>
            <td>{props.baseCurr}</td>
            <td> 1 </td>
            <td> {props.foreignCurr} </td>
            <td> {1 * exchangeRate} </td>
          </tr>
          <tr style={{ color: "white" }}>
            <td>{props.baseCurr}</td>
            <td> 5 </td>
            <td> {props.foreignCurr} </td>
            <td> {5 * exchangeRate} </td>
          </tr>
          <tr style={{ color: "white" }}>
            <td>{props.baseCurr}</td>
            <td> 10 </td>
            <td> {props.foreignCurr} </td>
            <td> {10 * exchangeRate} </td>
          </tr>
          <tr style={{ color: "white" }}>
            <td>{props.baseCurr}</td>
            <td> 50 </td>
            <td> {props.foreignCurr} </td>
            <td> {50 * exchangeRate} </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default ExchangeRateQuickInfo;
