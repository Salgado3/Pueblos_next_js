"use client";

import { useParams } from "next/navigation";
import { usePueblos } from "@/lib/reactQuery/usePueblos";
import CloudinaryImage from "@/lib/cloudinary/cloudinary";
import Link from "next/link";

import styles from "./pueblosClient.module.css";

export default function PueblosClient() {
  const params = useParams();
  const selectedPueblo = params?.pueblo;
  console.log("jaimes params", params);
  const { data, isLoading, error } = usePueblos();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>❌ Error loading data</p>;
  if (!selectedPueblo) return <p>❌ Missing slug</p>;

  const name = selectedPueblo.replace(/_/g, " ").toLowerCase();
  const pueblo = data?.find((p) => p.title.toLowerCase() === name);

  if (!pueblo) return <p>❌ Pueblo not found</p>;

  return (
    <main className={styles.cardContainer} key={pueblo.title}>
      <h2 className={styles.titleHeader}>{pueblo.title}</h2>
      <div className={styles.imageContainer}>
        <CloudinaryImage className={styles.image} publicId={pueblo.cloudinary_id} />
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
      </div>
      <p className={styles.description}>{pueblo.description}</p>
      <Link
        href={pueblo.description_url}
        target="_blank"
        rel="noopener noreferrer"
      >
        {" "}
        <p>Learn More </p>
      </Link>
      <p>{`Airport ${pueblo.airport_id}`}</p>
    </main>
  );
}
