import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
} from "@vis.gl/react-google-maps";

const CustomMarker = () => {
  return (
    <AdvancedMarker
      key={"beach house"}
      position={{ lat: 35.9208629, lng: -75.6039274 }}
    >
      <Pin background={"#FF3F3F"} glyphColor={"#000"} borderColor={"#000"} />
    </AdvancedMarker>
  );
};

export default function GoogleMap() {
  return (
    <APIProvider apiKey={process.env.GOOGLE_MAPS_API_KEY}>
      <div className="w-full h-96 overflow-hidden">
        <Map
          defaultZoom={8}
          defaultCenter={{ lat: 35.9208629, lng: -75.6039274 }}
          mapId={process.env.GOOGLE_MAPS_MAP_ID}
        >
          <CustomMarker />
        </Map>
      </div>
    </APIProvider>
  );
}
