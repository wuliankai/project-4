import React from "react";
import { fetchData } from "../helpers/common";

function ExchangeRateQuickInfo(props) {
  // const resExchangeRate = async () => {
  //   const { ok, data } = await fetchData("/exchange_rate", undefined, "GET");
  //   if (ok) {
  //     setExchangeRate(data[0].exchange_rate);
  //     console.log("Exchange rate displayed!");
  //   } else {
  //     console.log(data);
  //   }
  // };

  // useEffect(() => {
  //   resExchangeRate();
  //   props.computeExchangeRate();
  // }, []);

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
            <td> {1 * props.exchangeRate} </td>
          </tr>
          <tr style={{ color: "white" }}>
            <td>{props.baseCurr}</td>
            <td> 5 </td>
            <td> {props.foreignCurr} </td>
            <td> {5 * props.exchangeRate} </td>
          </tr>
          <tr style={{ color: "white" }}>
            <td>{props.baseCurr}</td>
            <td> 10 </td>
            <td> {props.foreignCurr} </td>
            <td> {10 * props.exchangeRate} </td>
          </tr>
          <tr style={{ color: "white" }}>
            <td>{props.baseCurr}</td>
            <td> 50 </td>
            <td> {props.foreignCurr} </td>
            <td> {50 * props.exchangeRate} </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default ExchangeRateQuickInfo;
