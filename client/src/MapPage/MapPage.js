import { useSelector } from "react-redux";
import GoogleMapReact from "google-map-react";

import { MapMarker } from "./MapMarker";
import { InfoCard } from "../InfoCard/InfoCard";
import { Messenger } from "../Messanger/Messanger";

const MapPage = () => {
  const myLocation = useSelector((state) => state.map.myLocation);
  const onlineUsers = useSelector((state) => state.map.onlineUsers);
  const cardChosenOption = useSelector((state) => state.map.cardChosenOptions);

  const defaultMapProps = {
    center: {
      lat: myLocation?.lat,
      lng: myLocation?.lng,
    },
    zoom: 11,
  };
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={defaultMapProps.center}
        defaultZoom={defaultMapProps.zoom}
      >
        {onlineUsers.map((user) => {
          return (
            <MapMarker
              lat={user.coords.lat}
              lng={user.coords.lng}
              key={user.socketId}
              myself={user.myself}
              socketId={user.socketId}
              username={user.username}
              coords={user.coords}
            ></MapMarker>
          );
        })}
      </GoogleMapReact>
      <Messenger />
      {cardChosenOption && (
        <InfoCard
          socketId={cardChosenOption.socketId}
          username={cardChosenOption.username}
          userLocation={cardChosenOption.coords}
        />
      )}
    </div>
  );
};

export default MapPage;
