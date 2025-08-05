import { createClient } from "@/lib/supabase/utils/server";
import CloudinaryImage from "@/lib/cloudinary/cloudinary";
import Link from "next/link";

import styles from "./page.module.css";

const page = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("pueblos_magicos")
    .select("*")
    .order("title", { ascending: true });

  if (error) return <div>error...</div>;

  const puebloData = data?.map((item, i) => {
    return (
      <div className={styles.cardContainer} key={item.title + i}>
        <div className={styles.imageContainer}>
          <CloudinaryImage
            publicId={item.cloudinary_id}
            className={styles.cloudinaryImage}
          />
        </div>
        <div className={styles.titleContainer}>
          <Link
            href={`/${item.title.toLowerCase().replace(/\s+/g, "_")}`}
            rel="noopener noreferrer"
          >
            <h2 className={styles.titleHeader}>{item.title}</h2>
          </Link>
          <p className={styles.description}>{item.description}</p>
        </div>
      </div>
    );
  });

  return <ul>{puebloData}</ul>;
};

export default page;
