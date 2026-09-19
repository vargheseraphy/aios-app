import Link from "next/link";
import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import styles from "@/components/contact/contact.module.css";

export const metadata: Metadata = {
  title: "Contact — AI Operating System for Leaders",
  description:
    "Bulk orders, course adoption, or anything else about the book or the site — send a message.",
};

export default function ContactPage() {
  return (
    <main>
      <header className="wash">
        <div className="pad" style={{ paddingBlock: "64px 56px" }}>
          <div className="kicker">Contact</div>
          <h1 className="sh" style={{ maxWidth: "24ch" }}>
            Bulk orders, courses, or anything else.
          </h1>
          <p className="sd" style={{ maxWidth: "64ch", marginTop: 10 }}>
            For a team, a class, or a library — or just a question about the book or the site.
          </p>
        </div>
      </header>

      <section className="light">
        <div className="pad">
          <div className={styles.wrap}>
            <div>
              <div className={styles.infoList}>
                <div className={styles.infoItem}>
                  <span className={styles.infoIc}>
                    <svg className="i" width="17" height="17" viewBox="0 0 24 24">
                      <circle cx="9" cy="8" r="3.4" />
                      <circle cx="16.5" cy="9.5" r="2.6" />
                      <path d="M3 19c0-3.3 2.7-6 6-6s6 2.7 6 6" />
                      <path d="M15.5 19c0-2.3 1.3-4 3.2-4s2.8 1.3 2.8 3" />
                    </svg>
                  </span>
                  <div>
                    <h3>Teams and bulk orders</h3>
                    <p>
                      See{" "}
                      <Link href="/for-business" className="underline">
                        for teams
                      </Link>{" "}
                      for the pitch, or just tell us the team size below.
                    </p>
                  </div>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoIc}>
                    <svg className="i" width="17" height="17" viewBox="0 0 24 24">
                      <rect x="4" y="5" width="16" height="14" rx="2" />
                      <path d="M4 8h16" />
                    </svg>
                  </span>
                  <div>
                    <h3>Courses and libraries</h3>
                    <p>
                      See{" "}
                      <Link href="/for-institutions" className="underline">
                        for institutions
                      </Link>{" "}
                      for how the ten modules map to a term.
                    </p>
                  </div>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoIc}>
                    <svg className="i" width="17" height="17" viewBox="0 0 24 24">
                      <path d="M4 6l8 7 8-7" />
                      <rect x="4" y="5" width="16" height="14" rx="2" />
                    </svg>
                  </span>
                  <div>
                    <h3>Anything else</h3>
                    <p>A correction to a prompt, a question about a framework — send it here too.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.formCard}>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
