import styles from "./home.module.css";

export function SignupBand() {
  return (
    <section className={styles.signup}>
      <div className={styles.bg} />
      <div className={`pad ${styles.signupIn}`}>
        <span className={styles.signupIc}>
          <svg className="i" width="24" height="24" viewBox="0 0 24 24">
            <path d="M19 21V10l-7-6-7 6v11" />
            <path d="M9 21v-7h6v7" />
            <path d="M15.5 3.5l3 3M18.5 3.5l-3 3" />
          </svg>
        </span>
        <div className={styles.signupTxt}>
          <h3>Copying is free. An account keeps them.</h3>
          <p>
            Save any prompt to your own list, pick up where you left off on another device, and
            send a colleague a link that carries your name on it. No card, no trial, no paywall
            on the prompts themselves.
          </p>
        </div>
        <div className={styles.signupCta}>
          <a className="btn btn-white" href="#">
            Create a free account
          </a>
          <a className="btn btn-line" href="#">
            Log in
          </a>
        </div>
      </div>
    </section>
  );
}
