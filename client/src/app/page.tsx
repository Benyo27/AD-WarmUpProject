import styles from "./page.module.css";
import { Hero } from "./components/home/Hero";
import { ArticlesContainer } from "./components/home/ArticlesContainer";

export default function Home() {
  return (
    <main className={styles.main}>
      <Hero />
      <ArticlesContainer />
    </main>
  );
}
