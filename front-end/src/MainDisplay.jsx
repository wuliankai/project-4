import React from "react";
import ExchangeRateQuickInfo from "./ExchangeRateQuickInfo/ExchangeRateQuickInfo";
import HotelQuickInfo from "./HotelQuickInfo/HotelQuickInfo";
import FlightsQuickInfo from "./FlightsQuickInfo/FlightsQuickInfo";
import DiaryEntries from "./DiaryEntries/DiaryEntries";

function MainDisplay() {
  return (
    <>
      <ExchangeRateQuickInfo></ExchangeRateQuickInfo>
      <HotelQuickInfo></HotelQuickInfo>
      <FlightsQuickInfo></FlightsQuickInfo>
      <DiaryEntries></DiaryEntries>
    </>
  );
}

export default MainDisplay;
