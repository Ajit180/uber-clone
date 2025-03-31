import SearchSection from "./Components/Home/SearchSection";
import GoogleMapSection from "./Components/Home/GoogleMapSection";

export default function Home() {
  return (
     <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-5">
       <div className="">
         <SearchSection/>
       </div>
        <div className="col-span-2">
          <GoogleMapSection/>
        </div>
     </div>
  );
}
