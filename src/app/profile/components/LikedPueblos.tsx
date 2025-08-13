import LoadingOverlay from "@/components/LoadingOverlay";
import CloudinaryImage from "@/lib/cloudinary/cloudinary";
import Image from "next/image";
import usePueblos from "@/lib/reactQuery/usePueblos";
import useUserLikedPueblos from "@/lib/reactQuery/useUserLikedPueblos";
import { createClient } from "@/lib/supabase/utils/client";
import { Key, useEffect, useState } from "react";

import styles from "./likedPueblos.module.css";
import { Title } from "@mantine/core";
import Link from "next/link";
const LikedPueblos = () => {
  const [userId, setUserId] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const {
    data: pueblosData,
    isLoading: usePueblosIsLoading,
    error: pueblosError,
  } = usePueblos();
  const {
    data: likedPuebloData,
    isLoading: likedPueblosIsLoading,
    error: likedPueblosError,
  } = useUserLikedPueblos(userId);

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
  //@ts-expect-error
  const puebloIdArray = likedPuebloData?.map(
    (item: { pueblo_id: string; id: string }) => item.pueblo_id
  );
  //@ts-expect-error
  const filteredLikedPueblos = pueblosData?.filter((item) => {
    return puebloIdArray?.includes(item.id);
  });

  if (usePueblosIsLoading || likedPueblosIsLoading || loading) {
    return <LoadingOverlay />;
  }

  if (filteredLikedPueblos?.length === 0) {
    return <p>The Pueblos you love will display here..</p>;
  }

  //    airport_id: string | null
  //           cloudinary_id: string | null
  //           created_at: string | null
  //           description: string | null
  //           description_url: string | null
  //           id: string
  //           image: string | null
  //           latitude: number | null
  //           longitude: number | null
  //           mongo_id: string | null
  //           photo_by: string | null
  //           photo_by_url: string | null
  //           title: string | null
  //           user_id: string | null
  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <Title order={2} className={styles.title}>
          Pueblos I Love
        </Title>
        <Image
          className={styles.titleContainerImg}
          src="/axolotlLove.png"
          alt="axolotl holding a heart"
          width={30}
          height={35}
          aria-hidden
        />
      </div>
      <ul className={styles.unorderedListContainer}>
        {filteredLikedPueblos?.map(
          (item: {
            id: Key | null | undefined;
            title: string;
            cloudinary_id: string;
          }) => {
            return (
              <li key={item.id} className={styles.listContainer}>
                <Link
                  className={styles.cardContainerLink}
                  href={`/${item.title.toLowerCase().replace(/\s+/g, "_")}`}
                  rel="noopener noreferrer"
                >
                  <CloudinaryImage
                    puebloTitle={item.title}
                    publicId={item.cloudinary_id}
                    className={styles.image}
                  />
                </Link>
                {/* <Title order={3}>{item.title}</Title> */}
              </li>
            );
          }
        )}
      </ul>
    </div>
  );
};

export default LikedPueblos;
