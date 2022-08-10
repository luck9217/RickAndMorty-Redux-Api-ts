import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../../../styles/Home.module.css";
import { GET_IDEPISODE } from "../../../component/apollo/queries/episodes";
import { EpisodeIdModel } from "../../../component/models/episodeId";
import { useQuery } from "@apollo/client";
import buttonSpecial from "../../../styles/Button.module.css";
import { SideBarComponent } from "../../../component/common/SideBar";

const DetailsCard = () => {
  const router = useRouter();
  const { i: idEpisode } = router.query;

  const { data } = useQuery(GET_IDEPISODE(Number(idEpisode)));
  const [episode, setEpisode] = useState<EpisodeIdModel>();

  useEffect(() => {
    if (data) {
      const dateChange = new Date(data.episode.created).toDateString();
      setEpisode({ ...data.episode, created: dateChange });
    }
  }, [data]);

  return (
    <div>
      <SideBarComponent />
      <div className={styles.container}>
        <main className={styles.main}>
          {idEpisode && episode ? (
            <div className={styles.card}>
              <p>#{idEpisode}</p>
              <h2>{episode.name}</h2>

              <div className={styles.description}>
                <p>
                  Episode : <span>{episode.episode}</span>
                </p>
                <p>
                  Air Date : <span>{episode.air_date}</span>
                </p>
                <p>
                  Created : <span>{episode.created}</span>
                </p>
              </div>

              <div className={buttonSpecial.containerButton}>
                <Link href="/episodes">
                  <button className={buttonSpecial.button}>
                    Back to Episodes
                  </button>
                </Link>
              </div>
            </div>
          ) : (
            <div className={styles.card}>loading...</div>
          )}
        </main>
      </div>
    </div>
  );
};

export default DetailsCard;
