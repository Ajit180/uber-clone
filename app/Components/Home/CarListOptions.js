import { CarListData } from "@/utils/CarListData";
import React, { useContext, useState, useEffect } from "react";
import CarListItem from "./CarListItem";
import { useRouter } from "next/navigation";
import { FareContext } from "@/context/FareContext";

const CarListOptions = ({ distance }) => {
  const [activeIndex, setActiveIndex] = useState();
  const [selectedCar, setSelectedCar] = useState(null);
  const { fare, setFare } = useContext(FareContext);
  const router = useRouter();

  useEffect(() => {
    console.log("Updated Fare:", fare);
  }, [fare]);

  return (
    <div className="mt-5 overflow-auto h-[250px]">
      <h2 className="text-[22px] font-bold">Recommended</h2>
      {CarListData.map((items, index) => (
        <div
          key={index}
          className={`cursor-pointer p-2 rounded-md px-4 border-black ${activeIndex === index ? "border-[3px]" : ""}`}
          onClick={() => {
            setActiveIndex(index);
            setSelectedCar(items);
          }}
        >
          <CarListItem car={items} distance={distance} />
        </div>
      ))}

      {selectedCar?.name && (
        <div className="flex justify-between fixed bottom-5 bg-white p-3 shadow-xl rounded-lg w-full md:w-[30%] border-[1px] items-center">
          <h2>Make Payment for</h2>
          <button
            onClick={() => {
              setFare(selectedCar.amount);
              router.push("/payment");
            }}
            className="p-3 bg-black text-white rounded-lg text-center"
          >
            Request {selectedCar.name}
          </button>
        </div>
      )}
    </div>
  );
};

export default CarListOptions;
