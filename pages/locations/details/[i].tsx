import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../../../styles/Home.module.css";
import { GET_IDLOCATIONS } from "../../../component/apollo/queries/locations";
import { LocationIdModel } from "../../../component/models/locationsId";
import { useQuery } from "@apollo/client";
import buttonSpecial from "../../../styles/Button.module.css";
import { SideBarComponent } from "../../../component/common/SideBar";

const DetailsCard = () => {
  const router = useRouter();
  const { i: idLocation } = router.query;

  const { data } = useQuery(GET_IDLOCATIONS(Number(idLocation)));
  const [location, setLocation] = useState<LocationIdModel>();

  useEffect(() => {
    if (data) {
      const dateChange = new Date(data.location.created).toDateString();
      setLocation({ ...data.location, created: dateChange });
    }
  }, [data]);

  return (
    <div>
      <SideBarComponent />
      <div className={styles.container}>
        <main className={styles.main}>
          {idLocation && location ? (
            <div className={styles.card}>
              <p>#{idLocation}</p>
              <h2>{location.name}</h2>

              <div className={styles.description}>
                <p>
                  Dimension : <span>{location.dimension}</span>
                </p>
                <p>
                  Type : <span>{location.type}</span>
                </p>

                <p>
                  Created : <span>{location.created}</span>
                </p>
              </div>

              <div className={buttonSpecial.containerButton}>
                <Link href="/locations">
                  <button className={buttonSpecial.button}>
                    Back to Location
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
