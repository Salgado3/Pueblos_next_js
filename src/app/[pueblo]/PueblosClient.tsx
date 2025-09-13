"use client";
import L from "leaflet";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { Button, List, ThemeIcon } from "@mantine/core";
import { useParams } from "next/navigation";
import usePueblos from "@/lib/reactQuery/usePueblos";
import CloudinaryImage from "@/lib/cloudinary/cloudinary";
import Link from "next/link";
import {
  IconCircleCheck,
  IconCircleDashed,
  IconHeartPlus,
  IconMapStar,
} from "@tabler/icons-react";
import { PixelImage } from "@/components/magicui/pixel-image";
import LoadingOverlay from "@/components/LoadingOverlay";
import NotFoundOverlay from "@/components/NotFoundOverlay";
import "leaflet/dist/leaflet.css";
import { createClient } from "@/lib/supabase/utils/client";
import { useEffect, useState } from "react";
import { airports } from "@/components/airportData";
import useUpdateUserPuebloAction from "@/lib/reactQuery/useUpdateUserPuebloAction";
import { useQuery } from "@tanstack/react-query";
import useFetchUserActions from "@/lib/reactQuery/useFetchUserActions";
import ThingsToDoList from "./components/ThingsToDoList";

import styles from "./pueblosClient.module.css";

export default function PueblosClient() {
  const params = useParams();
  const selectedPueblo = params?.pueblo as string;
  const {
    data: pueblosData,
    isLoading: pueblosIsLoading,
    error: pueblosError,
  } = usePueblos();

  // Use a useQuery hook to manage auth state and get the userId
  const { data: authData, isLoading: authIsLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const supabase = createClient();
      const { data, error } = await supabase.auth.getUser();
      if (error) throw error;
      return data;
    },
    staleTime: 1000 * 60 * 5, // Cache the user for 5 minutes
  });

  const userId = authData?.user?.id;

  const normalize = (str: string) =>
    str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const name = normalize(
    decodeURIComponent(selectedPueblo).replace(/_/g, " ").toLowerCase()
  );

  const pueblo = pueblosData?.find(
    //@ts-ignore
    (p: { title: string }) => normalize(p?.title.toLowerCase()) === name
  );

  const airport = airports?.find(
    (airport) => airport.value === pueblo?.airport_id
  );
  const airportFullName = airport?.label;

  const { data: userActionsData, isLoading: userActionsIsLoading } =
    useFetchUserActions(userId as string);

  const { mutate: toggleAction } = useUpdateUserPuebloAction(
    userId as string,
    pueblo?.id as string
  );
  if (pueblosIsLoading || authIsLoading || userActionsIsLoading)
    return <LoadingOverlay />;
  if (pueblosError || !pueblo?.id)
    return (
      <NotFoundOverlay title="Looks like nothing is here" showButton={false} />
    );

  // Derive the boolean flags from the fetched data
  const isLiked = userActionsData?.some(
    (action) =>
      action.pueblo_id === pueblo?.id && action.action_type === "liked"
  );
  const isVisited = userActionsData?.some(
    (action) =>
      action.pueblo_id === pueblo?.id && action.action_type === "visited"
  );

  const handleLikeButton = () => {
    if (typeof isLiked === "boolean")
      toggleAction({ isActioned: isLiked, actionType: "liked" });
  };
  const handleVisitedButton = () => {
    if (typeof isVisited === "boolean")
      toggleAction({ isActioned: isVisited, actionType: "visited" });
  };

  return (
    <div className={styles.cardContainer} key={pueblo.title}>
      <h2 className={styles.titleHeader}>{pueblo.title}</h2>
      <div className={styles.imageContainer}>
        <PixelImage
          src={pueblo.image || "/imageNotFound.png"}
          grid="6x4"
          grayscaleAnimation={true}
          pixelFadeInDuration={1000}
        />

        <div className={styles.buttonContainer}>
          <Button
            variant={isLiked ? "filled" : "outline"}
            color="pink"
            title={isLiked ? "Liked" : "Like"}
            onClick={handleLikeButton}
          >
            <IconHeartPlus />
          </Button>
          <Button
            variant={isVisited ? "filled" : "outline"}
            color="pink"
            title={isVisited ? "Visited" : "Visit"}
            onClick={handleVisitedButton}
          >
            <IconMapStar />
          </Button>
          {pueblo.photo_by_url && pueblo.photo_by && (
            <div>
              <Link
                href={pueblo.photo_by_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                photo by: {pueblo.photo_by}
              </Link>
            </div>
          )}
        </div>
        {pueblo.latitude && pueblo.longitude && (
          <MapContainer
            key={"mapContainer"}
            center={[pueblo.latitude, pueblo.longitude]}
            zoom={12}
            className={styles.map}
          >
            <TileLayer
              attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
              key={pueblo?.id}
              title={pueblo.title || ""}
              zIndexOffset={99}
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
          href={`https://www.google.com/maps/search/?api=1&query=${pueblo.latitude},${pueblo.longitude}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <p>View on Google Maps</p>
        </Link>
        {airportFullName && <p>{`Nearest Airport: ${airportFullName}`}</p>}
      </div>
      <p className={styles.description}>{pueblo.description}</p>
      {pueblo.description_url && (
        <Link
          className={styles.decriptionURL}
          href={pueblo.description_url}
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn More
        </Link>
      )}
      <ThingsToDoList puebloId={pueblo.id} />
    </div>
  );
}
