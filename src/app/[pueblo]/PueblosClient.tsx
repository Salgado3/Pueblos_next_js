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
import LoadingOverlay from "@/components/LoadingOverlay";
import NotFoundOverlay from "@/components/NotFoundOverlay";

import "leaflet/dist/leaflet.css";
import styles from "./pueblosClient.module.css";
import { createClient } from "@/lib/supabase/utils/client";
import { useEffect, useState } from "react";
import useUserLikedPueblos from "@/lib/reactQuery/useUserLikedPueblos";
import useUserVisitedPueblos from "@/lib/reactQuery/useUserVisitedPueblos";
import updateUserLikedPueblos from "@/lib/reactQuery/useUpdateUserLikedPueblos";
import updateUserVisitedPueblos from "@/lib/reactQuery/useUpdateUserVisitedPueblos";

export default function PueblosClient() {
  const [userId, setUserId] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const selectedPueblo = params?.pueblo as string;
  const { data, isLoading, error: pueblosError } = usePueblos();
  const normalize = (str: string) =>
    str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const name = normalize(
    decodeURIComponent(selectedPueblo).replace(/_/g, " ").toLowerCase()
  );
  //@ts-expect-error
  const pueblo = data?.find(
    (p: { title: string }) => normalize(p?.title.toLowerCase()) === name
  );

  // const { data: authData, error: authError } = await supabase.auth.getUser();
  const { data: isLiked, isLoading: likedStatusLoading } = useUserLikedPueblos(
    userId,
    pueblo?.id
  );
  const { data: isVisited, isLoading: visitedStatusLoading } =
    useUserVisitedPueblos(userId, pueblo?.id);

  const { mutate: toggleLike } = updateUserLikedPueblos(userId, pueblo?.id);
  const { mutate: toggleVisited } = updateUserVisitedPueblos(
    userId,
    pueblo?.id
  );

  useEffect(() => {
    setLoading(true);
    const fetchUserId = async () => {
      const supabase = createClient();
      const { data: authData, error } = await supabase.auth.getUser();
      if (error) {
        setUserId("");
      }
      if (authData.user) {
        setUserId(authData.user.id);
      }
      setLoading(false);
    };
    fetchUserId();
  }, []);
  if (pueblosError || !pueblo?.id)
    return <NotFoundOverlay title="Looks like nothing is here" />;

  if (isLoading || likedStatusLoading || visitedStatusLoading || loading)
    return <LoadingOverlay />;

  const handleLikeButton = async () => {
    if (typeof isLiked === "boolean") toggleLike(isLiked);
  };
  const handleVisitedButton = () => {
    if (typeof isVisited === "boolean") toggleVisited(isVisited);
  };

  return (
    <main className={styles.cardContainer} key={pueblo.title}>
      <h2 className={styles.titleHeader}>{pueblo.title}</h2>
      <div className={styles.imageContainer}>
        <CloudinaryImage
          puebloTitle={pueblo.title || ""}
          className={styles.image}
          publicId={pueblo.cloudinary_id || ""}
        />
        <div>
          <Button
            variant={isLiked ? "filled" : "subtle"}
            color="pink"
            title={isLiked ? "Liked" : "Like"}
            onClick={handleLikeButton}
          >
            <IconHeartPlus />
          </Button>
          <Button
            variant={isVisited ? "filled" : "subtle"}
            color="pink"
            title={isVisited ? "Visited" : "Visit"}
            onClick={handleVisitedButton}
          >
            <IconMapStar />
          </Button>
          <div>
            <Link
              href={pueblo.photo_by_url ?? ""}
              target="_blank"
              rel="noopener noreferrer"
            >
              photo by: {pueblo.photo_by}
            </Link>
          </div>
        </div>

        {pueblo.latitude && pueblo.longitude && (
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
              title={pueblo.title || ""}
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
        <List.Item>Coming soon...</List.Item>
        <List.Item>I will personally be curating these lists</List.Item>
        <List.Item>
          So this might take me a week or two... maybe three
        </List.Item>
        <List.Item
          icon={
            <ThemeIcon color="blue" size={24} radius="xl">
              <IconCircleDashed size={16} />
            </ThemeIcon>
          }
        >
          Thanks for understanding 🫶
        </List.Item>
      </List>
    </main>
  );
}
