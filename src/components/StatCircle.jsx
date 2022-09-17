import styles from "./StatCircle.module.css";

export default function svgCircle({ children }) {
  return (
    <div className={styles.parent}>
      <svg
        viewBox="0 0 120 120"
        width="120"
        height="120"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="0" width="120" height="120" rx="15" fill="#226CE0" />
      </svg>
      <div className={styles.number}>{children}</div>
    </div>
  );
}
