import { CarListData } from "@/utils/CarListData";
import React, {useContext, useState } from "react";
import CarListItem from "./CarListItem";
import { useRouter } from "next/navigation";
import { FareContext } from "@/context/FareContext";

const CarListOptions = ({distance}) => {
  const [activeIndex,SetactiveIndex] = useState();
  const [SelectedCar , SetSelcetedCar] = useState([]);
  const {fare,setFare} = useContext(FareContext);
  const router = useRouter();
  return (
    <div className="mt-5 overflow-auto h-[250px]">
      <h2 className="text-[22px] font-bold">Recommended</h2>
      {CarListData.map((items,index) => (
        <div className={`cursor-pointer p-2 rounded-md px-4 border-black ${activeIndex==index?'border-[3px]':null}`}
        onClick={()=>{SetactiveIndex(index);
          SetSelcetedCar(items)}}> 
          <CarListItem car={items} distance={distance} />
        </div>
      ))}

    {SelectedCar?.name?
      <div className="flex justify-between fixed bottom-5 bg-white p-3 shadow-xl 
      rounded-lg w-full md:w-[30%] border-[1px] items-center">
        <h2>Make Payment for</h2>
        <button 
        
         onClick={()=>{router.push('/payment');
          setFare(SelectedCar.amount);
          console.log("Setting Fare Value",fare);
         }
         }
         className="p-3 bg-black text-white rounded-lg text-center">Request{SelectedCar.name}</button>
      </div>:null}
    </div>
  );
};

export default CarListOptions;
