"use client";
import L from "leaflet";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { List, ThemeIcon } from "@mantine/core";
import { useParams } from "next/navigation";
import { usePueblos } from "@/lib/reactQuery/usePueblos";
import CloudinaryImage from "@/lib/cloudinary/cloudinary";
import Link from "next/link";

import styles from "./pueblosClient.module.css";
import "leaflet/dist/leaflet.css";
import { IconCircleCheck, IconCircleDashed } from "@tabler/icons-react";

export default function PueblosClient() {
  const params = useParams();
  const selectedPueblo = params?.pueblo as string;
  console.log("jaimes params", params);
  const { data, isLoading, error } = usePueblos();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>❌ Error loading data</p>;
  if (!selectedPueblo) return <p>❌ Missing slug</p>;

  const normalize = (str: string) =>
    str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  const name = normalize(
    decodeURIComponent(selectedPueblo).replace(/_/g, " ").toLowerCase()
  );
  //@ts-expect-error
  const pueblo = data?.find((p) => normalize(p.title.toLowerCase()) === name);

  if (!pueblo) return <p>❌ Pueblo not found</p>;

  return (
    <main className={styles.cardContainer} key={pueblo.title}>
      <h2 className={styles.titleHeader}>{pueblo.title}</h2>
      <div className={styles.imageContainer}>
        <CloudinaryImage
          puebloTitle={pueblo.title}
          className={styles.image}
          publicId={pueblo.cloudinary_id}
        />
        <p>
          photo by{" "}
          <Link
            href={pueblo.photo_by_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {pueblo.photo_by}
          </Link>
        </p>

        {pueblo.lattitude && pueblo.longitude && (
          <MapContainer
            key={"mapContainer"}
            center={[pueblo.latitude, pueblo.longitude]}
            zoom={12}
            className={styles.map}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
              key={pueblo?.id}
              title={pueblo.title}
              zIndexOffset={1000}
              position={[pueblo.latitude, pueblo.longitude]}
              icon={
                new L.Icon({
                  iconUrl: "/pueblosMagicos64px.png",
                  iconSize: [30, 30],
                  iconAnchor: [15, 15],
                })
              }
            ></Marker>
          </MapContainer>
        )}
        <Link
          href={`https://www.google.com/maps/place/${pueblo.title}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}
          <p>View on Google Maps</p>
        </Link>
        <p>{`Airport ${pueblo.airport_id}`}</p>
      </div>
      <p className={styles.description}>{pueblo.description}</p>

      <h3 className={styles.thingsToDoListTitle}>Things to Do</h3>
      <List
        className={styles.thingsToDoList}
        spacing="xs"
        size="sm"
        center
        icon={
          <ThemeIcon color="teal" size={24} radius="xl">
            <IconCircleCheck size={16} />
          </ThemeIcon>
        }
      >
        <List.Item>Clone or download repository from GitHub</List.Item>
        <List.Item>Install dependencies with yarn</List.Item>
        <List.Item>To start development server run npm start command</List.Item>
        <List.Item>
          Run tests to make sure your changes do not break the build
        </List.Item>
        <List.Item
          icon={
            <ThemeIcon color="blue" size={24} radius="xl">
              <IconCircleDashed size={16} />
            </ThemeIcon>
          }
        >
          Submit a pull request once you are done
        </List.Item>
      </List>
    </main>
  );
}
