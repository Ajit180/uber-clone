"use client";
import React, { useContext, useEffect, useState } from "react";
import InputItem from "./InputItem";
import { SourceContext } from "@/context/SourceContext";
import { DestinationContext } from "@/context/DestinationContext";
import CarListOptions from "./CarListOptions";

const SearchSection = () => {
  const { source, setSource } = useContext(SourceContext);
  const { destination, setDestination } = useContext(DestinationContext);
  const [distance, Setdistance] = useState();

  const calculateDistance = () => {
    const dist = google.maps.geometry.spherical.computeDistanceBetween(
      { lat: source.lat, lng: source.lng },
      { lat: destination.lat, lng: destination.lng }
    );

    console.log(dist*0.000621374); //convert it into miles
    Setdistance(dist * 0.000621374);
  };

  console.log("Distance",distance);
  return (
    <div>
      <div className="p-2 md:pd-5 border-[2px] rounded-xl">
        <p className="text-[20px] font-bold">Get a Ride</p>
        <InputItem type="source" />
        <InputItem type="destination" />
        <button
          className="p-3 bg-black w-full mt-5 text-white 
      rounded-lg hover:cursor-grab"
          onClick={() => calculateDistance()}
        >
          Search
        </button>
      </div>
      {distance ? <CarListOptions distance={distance} /> : null}
    </div>
  );
};

export default SearchSection;
