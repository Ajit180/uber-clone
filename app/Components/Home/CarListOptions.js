import { CarListData } from "@/utils/CarListData";
import React, { useState } from "react";
import CarListItem from "./CarListItem";

const CarListOptions = ({distance}) => {
  const [activeIndex,SetactiveIndex] = useState();
  return (
    <div className="mt-5 overflow-auto h-[250px]">
      <h2 className="text-[22px] font-bold">Recommended</h2>
      {CarListData.map((items,index) => (
        <div className={`cursor-pointer p-2 rounded-md px-4 border-black ${activeIndex==index?'border-[3px]':null}`}
        onClick={()=>SetactiveIndex(index)}> 
          <CarListItem car={items} distance={distance} />
        </div>
      ))}
    </div>
    // intially the index is not set after onclick event happen then the activeindex state = index then 
    // the border will be come to the div 
  );
};

export default CarListOptions;
