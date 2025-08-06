"use client";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { useEffect } from "react";

import "leaflet/dist/leaflet.css";
import Link from "next/link";
import { usePueblosContext } from "../hooks/PueblosContext";

type Pueblo = {
  title: string;
  latitude: number;
  longitude: number;
};

export default function MapClient({ pueblos }: { pueblos: Pueblo[] }) {
  const { filteredPueblos, isLoading } = usePueblosContext();
  // useEffect(() => {
  //   // delete (L.Icon.Default.prototype as any)._getIconUrl;
  //   // L.Icon.Default.mergeOptions({
  //   //   iconRetinaUrl: "/pueblosMagicos256px.png",
  //   //   iconUrl: "/pueblosMagicos64px.png",
  //   //   shadowUrl:
  //   //     "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  //   // });
  // }, []);

  return (
    <MapContainer
      key={"mapContainer"}
      center={[23.0, -104.0]}
      zoom={6}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {filteredPueblos?.map((item) => {
        return item?.latitude && item?.longitude && item.title ? (
          <Marker
            key={item?.id}
            title={item.title}
            zIndexOffset={1000}
            position={[item.latitude, item.longitude]}
            icon={
              new L.Icon({
                iconUrl: "/pueblosMagicos64px.png",
                iconSize: [30, 30],
                iconAnchor: [15, 15],
              })
            }
          >
            <Popup key={item?.id + "popup"}>
              <>
                <h3>{item.title}</h3>
                <Link
                  //TODO set up dynamic links
                  style={{ fontSize: "large" }}
                  href={`/${item.title.toLowerCase().replace(/\s+/g, "_")}`}
                  rel="noopener noreferrer"
                >
                  see more
                </Link>
              </>
            </Popup>
          </Marker>
        ) : null;
      })}
    </MapContainer>
  );
}
