import Image from "next/image";
import React from "react";
import { MdAirlineSeatReclineExtra } from "react-icons/md";

const CarListItem = ({ car, distance }) => {
  return (
    <div className="flex">
      <div className="flex items-center justify-between mt-5">
        <Image src={car.image} width={100} height={100} alt="car-image" />
        <div>
          <h2 className="font-semibold text-[18px] flex gap-3">
            {car.name}
            
            <span className="flex gap-2 font-normal text-[14px] items-center">
            <MdAirlineSeatReclineExtra />
                {car.seat}
            </span>
          </h2>
          <p>{car.desc}</p>
        </div>
        <h2 className="text-[18px] font-semibold">${(car.amount*distance).toFixed(2)}</h2>
      </div>
    </div>
  );
};

export default CarListItem;
