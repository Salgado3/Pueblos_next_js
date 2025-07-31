import CloudinaryImage from "@/lib/cloudinary/cloudinary";

import styles from "./page.module.css";
import Link from "next/link";
import MapClient from "../map/MapClient";
import { createClient } from "@/lib/supabase/utils/server";

const page = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("pueblos_magicos")
    .select("*")
    .order("title", { ascending: false });

  if (error) return <div>error...</div>;

  const puebloData = data?.map((item, i) => {
    return (
      <div className={styles.cardContainer} key={item.title + i}>
        <h2 className={styles.titleHeader}>{item.title}</h2>
        <div className={styles.imageContainer}>
          <CloudinaryImage publicId={item.cloudinary_id} />
          <p>
            photo by{" "}
            <Link
              href={item.photo_by_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.photo_by}
            </Link>
          </p>
        </div>
        <p className={styles.description}>{item.description}</p>
        <Link
          href={item.description_url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}
          <p>Learn More </p>
        </Link>
        <p>{`Airport ${item.airport_id}`}</p>
      </div>
    );
  });

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <ul className={styles.unOrderedListContainer}>{puebloData}</ul>{" "}
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
};

export default page;
