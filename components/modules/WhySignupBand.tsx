import { Rich } from "@/components/RichText";
import { EACH_MODULE_CONTENT } from "@/lib/pages-content";
import styles from "./modulePage.module.css";

const ICON_STYLE: { background: string; color: string }[] = [
  { background: "#FFEBE8", color: "#C4382B" },
  { background: "#E8F0FE", color: "#1E5CE0" },
  { background: "#E6F6EC", color: "#1B7A3C" },
  { background: "#E8F0FE", color: "#1E5CE0" },
  { background: "#F4F5F7", color: "#1B1C1F" },
  { background: "#FFF4D6", color: "#8A5B00" },
];

const ICON_PATHS = [
  <>
    <path d="M12 8.5v5" />
    <path d="M12 16.8h.01" />
    <path d="M10.3 3.9L2.5 17.5A2 2 0 0 0 4.2 20.5h15.6a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
  </>,
  <>
    <circle cx="12" cy="12" r="8.6" />
    <path d="M12 11v5.5" />
    <path d="M12 7.6h.01" />
  </>,
  <>
    <path d="M4 7h10M4 12h12M4 17h7" />
    <path d="M19 5.5l2.5 2.5L19 10.5" />
  </>,
  <>
    <circle cx="9" cy="8" r="3.2" />
    <path d="M3 19c0-3.3 2.7-5.4 6-5.4s6 2.1 6 5.4" />
    <path d="M16.5 6.2a3.2 3.2 0 0 1 0 5.6M18 19c0-2.6-1-4.3-2.6-5.1" />
  </>,
  <>
    <path d="M4 4.5h6.5a2 2 0 0 1 2 2V20a2 2 0 0 0-2-2H4z" />
    <path d="M20 4.5h-5.5a2 2 0 0 0-2 2V20a2 2 0 0 1 2-2H20z" />
  </>,
  <>
    <path d="M9 18h6M10 21.5h4" />
    <path d="M12 2.5a6.5 6.5 0 0 0-3.6 11.9c.4.3.6.7.6 1.2v.4h6v-.4c0-.5.2-.9.6-1.2A6.5 6.5 0 0 0 12 2.5z" />
  </>,
];

/**
 * "What an account opens" — each-module.html's pitch for why the free
 * lesson pages are worth signing up for, sitting between the (fully open)
 * prompts and the join band. Not present on /modules — see all-module.html's
 * own NOTE list, which has no #why section at all.
 */
export function WhySignupBand({ roleCount }: { roleCount: number }) {
  const c = EACH_MODULE_CONTENT;

  return (
    <div className={styles.why} id="why">
      <div className={`pad ${styles.whyIn}`}>
        <p className={styles.whyKicker}>{c.whyKicker}</p>
        <h2>{c.whyHeading}</h2>
        <p className={styles.whyLead}>{c.whyLead}</p>
        <div className={styles.whygrid}>
          {c.whyItems.map((item, i) => (
            <div className={styles.wi} key={item.title}>
              <span className={styles.wiIcon} style={ICON_STYLE[i]}>
                <svg className="i" width="17" height="17" viewBox="0 0 24 24" aria-hidden="true">
                  {ICON_PATHS[i]}
                </svg>
              </span>
              <div>
                <h3>{item.titleIsRoleCount ? `${roleCount} ${item.title}` : item.title}</h3>
                <p>
                  <Rich text={item.body} />
                </p>
              </div>
            </div>
          ))}
        </div>
        <p className={styles.wfoot}>
          <svg className="i" width="17" height="17" viewBox="0 0 24 24" aria-hidden="true" style={{ color: "var(--green)" }}>
            <path d="M5 12.5l4.5 4.5L19 7.5" />
          </svg>
          <span>
            <Rich text={c.whyFoot} />
          </span>
        </p>
      </div>
    </div>
  );
}
