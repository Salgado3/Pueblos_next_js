import styles from "./page.module.css";

const page = () => {
  return (
    <div className={styles.page}>
      <main className={styles.main}> Hello world. Welcome to the pueblos</main>
      <footer className={styles.footer}></footer>
    </div>
  );
};

export default page;
