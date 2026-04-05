import React from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const MapView = ({ data }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "",
  });

  if (!isLoaded) return <div>Loading Map...</div>;

  const center = data?.locations?.[0]?.coordinates || {
    lat: 12.97,
    lng: 77.59,
  };

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={11}>
      
      {/* 📍 Location markers (RED) */}
      {data.locations.map((loc, i) => (
        <Marker
          key={`loc-${i}`}
          position={loc.coordinates}
          label={loc.name}
        />
      ))}

      {/* 🏠 Property markers (BLUE) */}
      {data.properties.map((prop, i) => (
        <Marker
          key={`prop-${i}`}
          position={prop.coordinates}
          icon="http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
        />
      ))}
    </GoogleMap>
  );
};

export default MapView;