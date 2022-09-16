import styles from "./StatCircle.module.css";

export default function svgCircle({ children }) {
  return (
    <div className={styles.parent}>
      <svg
        viewBox="0 0 100 100"
        width="100"
        height="100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cy="50" cx="50" r="30" fill="blue" />
      </svg>
      <div className={styles.number}>{children}</div>
    </div>
  );
}
