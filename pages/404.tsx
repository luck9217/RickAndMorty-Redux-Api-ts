import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Custom404() {
  return (
    <div className={styles.container}>
      <h1>404 - Page Not Found</h1>
      <Link href="/">
            <a>
                Back to Home 
            </a>
        </Link>
    </div>
  );
}
