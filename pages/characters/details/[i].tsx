import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../../../styles/Home.module.css";
import { GET_IDCHARACTERS } from "../../../component/apollo/queries/characters";
import { CharacterIdModel } from "../../../component/models/characterId";
import Image from "next/image";
import { useQuery } from "@apollo/client";

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
    <div className={styles.container}>
      details
      <Link href="/">
        <a>Go to Home</a>
      </Link>
      <main className={styles.main}>
        <h1 className={styles.title}>Details Character</h1>

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
              Gender :<p>{character.gender}</p>
              <p>{character.species}</p>
              <p>{character.status}</p>
              <p>{character.type}</p>
              <p>{character.created}</p>
            </div>
            <Link href="/">
              <button>Back to Fav</button>
            </Link>
            <Link href="/characters">
              <button>Back to Characters</button>
            </Link>
          </div>
        ) : (
          <div className={styles.card}>loading...</div>
        )}
      </main>
    </div>
  );
};

export default DetailsCard;
