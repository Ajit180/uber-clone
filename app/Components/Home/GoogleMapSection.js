import React, { useContext, useEffect, useState } from "react";
import {
  DirectionsRenderer,
  GoogleMap,
  MarkerF,
  OverlayView,
  OverlayViewF,
  useJsApiLoader,
} from "@react-google-maps/api";
import { SourceContext } from "@/context/SourceContext";
import { DestinationContext } from "@/context/DestinationContext";

const GoogleMapSection = () => {
  const { source } = useContext(SourceContext);
  const { destination } = useContext(DestinationContext);
  const [directionRoutePoints, setDirectionRoutePoints] = useState(null);
  const [map, setMap] = useState(null);
  const [mapHeight, setMapHeight] = useState(400);

  const [center, setCenter] = useState({
    lat: -3.745,
    lng: -38.523,
  });

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setMapHeight(window.innerWidth * 0.4);
    }
  }, []);

  useEffect(() => {
    if (source && Object.keys(source).length > 0 && map) {
      map.panTo({ lat: source.lat, lng: source.lng });
      setCenter({ lat: source.lat, lng: source.lng });
    }

    if (
      source &&
      destination &&
      Object.keys(source).length > 0 &&
      Object.keys(destination).length > 0
    ) {
      directionRoute();
    }
  }, [source, map]);

  useEffect(() => {
    if (destination && Object.keys(destination).length > 0 && map) {
      setCenter({ lat: destination.lat, lng: destination.lng });
    }

    if (
      source &&
      destination &&
      Object.keys(source).length > 0 &&
      Object.keys(destination).length > 0
    ) {
      directionRoute();
    }
  }, [destination, map]);

  const directionRoute = () => {
    const directionService = new google.maps.DirectionsService();
    directionService.route(
      {
        origin: { lat: source.lat, lng: source.lng },
        destination: { lat: destination.lat, lng: destination.lng },
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setDirectionRoutePoints(result);
        } else {
          console.log("Direction error:", status);
        }
      }
    );
  };

  const onLoad = React.useCallback((mapInstance) => {
    const bounds = new window.google.maps.LatLngBounds(center);
    mapInstance.fitBounds(bounds);
    setMap(mapInstance);
  }, [center]);

  const onUnmount = React.useCallback(() => {
    setMap(null);
  }, []);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: mapHeight }}
      center={center}
      zoom={11}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{ mapId: "40c6d83d50e61ab5" }}
    >
      {source && Object.keys(source).length > 0 && (
        <MarkerF
          position={{ lat: source.lat, lng: source.lng }}
          icon={{ url: "/source.png", scaledSize: { width: 20, height: 20 } }}
        >
          <OverlayViewF
            position={{ lat: source.lat, lng: source.lng }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div className="p-2 bg-white font-bold inline-block">
              <p className="text-black text-[16px]">{source.label}</p>
            </div>
          </OverlayViewF>
        </MarkerF>
      )}

      {destination && Object.keys(destination).length > 0 && (
        <MarkerF
          position={{ lat: destination.lat, lng: destination.lng }}
          icon={{ url: "/dest.jpg", scaledSize: { width: 20, height: 20 } }}
        >
          <OverlayViewF
            position={{ lat: destination.lat, lng: destination.lng }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div className="p-2 bg-white font-bold inline-block">
              <p className="text-black text-[16px]">{destination.label}</p>
            </div>
          </OverlayViewF>
        </MarkerF>
      )}

      {directionRoutePoints && (
        <DirectionsRenderer
          directions={directionRoutePoints}
          options={{
            polylineOptions: { strokeColor: "#000", strokeWeight: 7 },
            suppressMarkers: true,
          }}
        />
      )}
    </GoogleMap>
  );
};

export default GoogleMapSection;
