"use client"
import SearchSection from "./Components/Home/SearchSection";
import GoogleMapSection from "./Components/Home/GoogleMapSection";
import { SourceContext } from "@/context/SourceContext";
import { useState } from "react";
import { DestinationContext } from "@/context/DestinationContext";
import { LoadScript } from "@react-google-maps/api";

export default function Home() {
  const [source,setSource]=useState([]);
  const [destination , setDestination] = useState([]); 
  return (
  
    <SourceContext.Provider value={{source,setSource}}>
      <DestinationContext.Provider value={{destination,setDestination}}>
        <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
        libraries={['places']}
        >
     <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-5">
       <div>
         <SearchSection/>
       </div>
        <div className="col-span-2">
          <GoogleMapSection/>
        </div>
     </div>
     </LoadScript>
     </DestinationContext.Provider>
     </SourceContext.Provider>
  );
}
