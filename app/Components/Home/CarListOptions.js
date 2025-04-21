import { CarListData } from "@/utils/CarListData";
import React, { useState } from "react";
import CarListItem from "./CarListItem";
import { useRouter } from "next/navigation";
import useFareStore from "@/app/Store/useFareStore";
import useDistanceStore from "@/app/Store/useDistance";

const CarListOptions = ({ distance }) => {
  const [activeIndex, setActiveIndex] = useState();
  const [selectedCar, setSelectedCar] = useState([]);
  const setFare = useFareStore((state) => state.setFare);
  const setDistance = useDistanceStore((state) => state.setDistance);
  const router = useRouter();

  return (
    <div className="mt-5 overflow-auto h-[250px]">
      <h2 className="text-[22px] font-bold">Recommended</h2>

      {CarListData.map((item, index) => (
        <div
          key={item.id || index} // Use item.id if available, fallback to index
          className={`cursor-pointer p-2 rounded-md px-4 border-black ${
            activeIndex === index ? "border-[3px]" : ""
          }`}
          onClick={() => {
            setActiveIndex(index);
            setSelectedCar(item);
          }}
        >
          <CarListItem car={item} distance={distance} />
        </div>
      ))}

      {selectedCar?.name && (
        <div className="flex justify-between fixed bottom-5 bg-white p-3 shadow-xl rounded-lg w-full md:w-[30%] border-[1px] items-center">
          <h2>Make Payment for</h2>
          <button
            onClick={() => {
              router.push("/payment");
              setFare(selectedCar.amount);
              setDistance(distance);
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
