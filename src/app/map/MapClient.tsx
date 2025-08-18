"use client";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect } from "react";

import "leaflet/dist/leaflet.css";
import Link from "next/link";
import { usePueblosContext } from "../context/PueblosContext";
import LoadingOverlay from "@/components/LoadingOverlay";
import NotFoundOverlay from "@/components/NotFoundOverlay";

const MapClient = () => {
  const { filteredPueblos, isLoading } = usePueblosContext();

  useEffect(() => {
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "/pueblosMagicos256px.png",
      iconUrl: "/pueblosMagicos64px.png",
      shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    });
  }, []);
  if (isLoading) return <LoadingOverlay />;
  if (filteredPueblos.length === 0)
    return <NotFoundOverlay title="Looks like nothing is here" />;
  return (
    <MapContainer
      key={"mapContainer"}
      center={[23.0, -104.0]}
      zoom={6}
      style={{
        height: "90%",
        width: "100%",
        paddingTop: "100px",
        marginBottom: "50px",
      }}
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
            zIndexOffset={999}
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
};

export default MapClient;
