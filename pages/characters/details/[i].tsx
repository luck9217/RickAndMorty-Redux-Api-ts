import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../../../styles/Home.module.css";
import { GET_IDCHARACTERS } from "../../../component/apollo/queries/characters";
import { CharacterIdModel } from "../../../component/models/characterId";
import Image from "next/image";
import { useQuery } from "@apollo/client";
import buttonSpecial from "../../../styles/Button.module.css";
import { SideBarComponent } from "../../../component/common/SideBar";

const DetailsCard = () => {
  const router = useRouter();
  const { i: idCharacter } = router.query;

  const { data } = useQuery(GET_IDCHARACTERS(Number(idCharacter)));
  const [character, setCharacter] = useState<CharacterIdModel>();

  useEffect(() => {
    if (data) {
      const dateChange = new Date(data.character.created).toDateString();
      setCharacter({ ...data.character, created: dateChange });
    }
  }, [data]);

  return (
    <div>
      <SideBarComponent />
      <div className={styles.container}>
        <main className={styles.main}>
          {idCharacter && character ? (
            <div className={styles.card}>
              <p>#{idCharacter}</p>
              <h2>{character.name}</h2>

              <Image
                src={character.image}
                width={100}
                height={100}
                alt=""
                layout="responsive"
              />

              <div className={styles.description}>
                <p>
                  Species : <span>{character.species}</span>
                </p>
                <p>
                  Status : <span>{character.status}</span>
                </p>

                <p>
                  Gender : <span>{character.gender}</span>
                </p>
                <p>
                  Created : <span>{character.created}</span>
                </p>
              </div>

              <div className={buttonSpecial.containerButton}>
                <Link href="/">
                  <button className={buttonSpecial.button}>Favorites</button>
                </Link>
                <Link href="/characters">
                  <button className={buttonSpecial.button}>Characters</button>
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
