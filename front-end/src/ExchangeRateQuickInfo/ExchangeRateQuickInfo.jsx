import React from "react";

function ExchangeRateQuickInfo(props) {
  let baseCurr1 = parseInt(1 * props.exchangeRate);
  let baseCurr5 = parseInt(5 * props.exchangeRate);
  let baseCurr10 = parseInt(10 * props.exchangeRate);
  let baseCurr50 = parseInt(50 * props.exchangeRate);
  return (
    <>
      <table>
        <tbody>
          <tr style={{ color: "white" }}>
            <td>{props.baseCurr}</td>
            <td> 1 </td>
            <td> {props.foreignCurr} </td>
            <td> {baseCurr1} </td>
          </tr>
          <tr style={{ color: "white" }}>
            <td>{props.baseCurr}</td>
            <td> 5 </td>
            <td> {props.foreignCurr} </td>
            <td> {baseCurr5} </td>
          </tr>
          <tr style={{ color: "white" }}>
            <td>{props.baseCurr}</td>
            <td> 10 </td>
            <td> {props.foreignCurr} </td>
            <td> {baseCurr10} </td>
          </tr>
          <tr style={{ color: "white" }}>
            <td>{props.baseCurr}</td>
            <td> 50 </td>
            <td> {props.foreignCurr} </td>
            <td> {baseCurr50} </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default ExchangeRateQuickInfo;
