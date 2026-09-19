import Link from "next/link";
import type { Metadata } from "next";
import { getModule, getLesson } from "@/lib/content";
import { FOR_BUSINESS_CONTENT as C } from "@/lib/pages-content";
import { Rich } from "@/components/RichText";
import { PromptPreviewCard } from "@/components/PromptPreviewCard";
import { ButtonLink } from "@/components/Button";
import { SubscribeSection } from "@/components/marketing/SubscribeSection";
import { DeptRail } from "@/components/for-business/DeptRail";
import styles from "@/components/for-business/for-business.module.css";

export const metadata: Metadata = {
  title: "For Business — AI Operating System for Leaders",
  description:
    "One shared set of 108 frameworks for every function in the company — sales, marketing, operations, people and leadership each get the ones written for their own job.",
};

const colorClassKey = (key: string) => `c${key.charAt(0).toUpperCase()}${key.slice(1)}` as keyof typeof styles;

export default function ForBusinessPage() {
  const framesTotal = C.departments.reduce((sum, d) => {
    const mod = getModule(d.moduleRefs[0]);
    return sum + (mod?.lessons.length ?? 0);
  }, 0);

  return (
    <main>
      <header className={styles.phero}>
        <div className={styles.bg} />
        <div className={styles.gridLines} />
        <div className={styles.scrim} />
        <div className={`pad ${styles.pheroIn}`}>
          <div className={styles.pheroCopy}>
            <div className={styles.crumb}>
              <Link href="/">Home</Link> <span>/</span> <span>{C.crumb}</span>
            </div>
            <h1 className={styles.phH}>{C.heroHeading}</h1>
            <p className={styles.phSub}>{C.heroSub}</p>
            <div className={styles.phBtns}>
              <ButtonLink variant="white" href={C.heroPrimaryCta.href}>
                {C.heroPrimaryCta.label}
              </ButtonLink>
              <ButtonLink variant="line" href={C.heroSecondaryCta.href}>
                {C.heroSecondaryCta.label}
              </ButtonLink>
            </div>
          </div>
          <div className={styles.pheroArt}>
            <svg viewBox="0 0 300 268" className="line" aria-hidden="true">
              <path className="s" d="M118 20c10-6 24-6 32 2v46c-8-8-22-8-32-2z" />
              <path className="s" d="M182 20c-10-6-24-6-32 2v46c8-8 22-8 32-2z" />
              <path className="s" d="M150 22v46" />
              <text className="t" x="118" y="86" style={{ fontSize: 9, letterSpacing: "0.09em" }}>
                ONE BOOK
              </text>
              <path className="s3" d="M150 96v14" />
              <path className="s2" d="M38 110h224" />
              <path className="s3" d="M38 110v16M94 110v16M150 110v16M206 110v16M262 110v16" />
              <circle cx="38" cy="134" r="8" fill="#3B7BF7" />
              <circle cx="94" cy="134" r="8" fill="#EC4A3B" />
              <circle cx="150" cy="134" r="8" fill="#2FAB57" />
              <circle cx="206" cy="134" r="8" fill="#FBBE10" />
              <circle cx="262" cy="134" r="8" fill="#FFFFFF" />
              <text className="t" x="30" y="158">01</text>
              <text className="t" x="86" y="158">02</text>
              <text className="t" x="142" y="158">03</text>
              <text className="t" x="198" y="158">04</text>
              <text className="t" x="254" y="158">05</text>
              <rect className="s" x="18" y="176" width="40" height="56" rx="5" />
              <rect x="18" y="176" width="40" height="4" rx="2" fill="#3B7BF7" />
              <rect className="s" x="74" y="176" width="40" height="56" rx="5" />
              <rect x="74" y="176" width="40" height="4" rx="2" fill="#EC4A3B" />
              <rect className="s" x="130" y="176" width="40" height="56" rx="5" />
              <rect x="130" y="176" width="40" height="4" rx="2" fill="#2FAB57" />
              <rect className="s" x="186" y="176" width="40" height="56" rx="5" />
              <rect x="186" y="176" width="40" height="4" rx="2" fill="#FBBE10" />
              <rect className="s" x="242" y="176" width="40" height="56" rx="5" />
              <rect x="242" y="176" width="40" height="4" rx="2" fill="#FFFFFF" />
              <path
                className="s2"
                d="M26 196h24M26 208h16M82 196h24M82 208h16M138 196h24M138 208h16M194 196h24M194 208h16M250 196h24M250 208h16"
              />
              <text className="t" x="18" y="256" style={{ fontSize: 9, letterSpacing: "0.09em" }}>
                SAME SHAPE COMING BACK
              </text>
            </svg>
          </div>
        </div>
      </header>

      <section className="light" id="depts">
        <div className="pad">
          <div className="head-row">
            <div>
              <div className="kicker">{C.deptsKicker}</div>
              <h2 className="sh">{C.deptsHeading}</h2>
              <p className="sd">{C.deptsSub}</p>
            </div>
          </div>

          <div className={styles.deptWrap}>
            <DeptRail
              items={C.departments.map((d) => ({ id: d.id, number: d.number, name: d.name, colorKey: d.colorKey }))}
            />
            <div>
              {C.departments.map((dept) => {
                const lesson = getLesson(dept.promptRef.module, dept.promptRef.fileId);
                return (
                  <div className={`${styles.dept} ${styles[colorClassKey(dept.colorKey)]}`} id={`d-${dept.id}`} key={dept.id}>
                    <div className={styles.deptHead}>
                      <span className={styles.dn}>{dept.number}</span>
                      <h3>{dept.name}</h3>
                    </div>
                    <p className={styles.situation}>
                      <Rich text={dept.situation} />
                    </p>
                    <p className={styles.detail}>{dept.detail}</p>
                    <div className={styles.deptBody}>
                      <div>
                        <h4 className={styles.collab}>Modules this team lives in</h4>
                        <div className={styles.mods}>
                          {dept.moduleRefs.map((moduleNum) => {
                            const mod = getModule(moduleNum);
                            if (!mod) return null;
                            return (
                              <div className={styles.mod} key={moduleNum}>
                                <span className={styles.mn}>{String(moduleNum).padStart(2, "0")}</span>
                                <span className={styles.mt}>{mod.title}</span>
                                <span className={styles.mc}>{mod.lessons.length} frameworks</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      <div>
                        <h4 className={styles.collab}>One prompt from it</h4>
                        {lesson && (
                          <PromptPreviewCard
                            lessonId={lesson.lesson}
                            title={lesson.title}
                            moduleLabel={`Module ${String(dept.promptRef.module).padStart(2, "0")}`}
                            prompt={lesson.prompt}
                            pairsWith={lesson.pairsWith}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="dark">
        <div className="pad">
          <div className="head-row">
            <div>
              <div className="kicker">{C.coverageKicker}</div>
              <h2 className="sh">{C.coverageHeading}</h2>
            </div>
          </div>
          <div className={styles.cover}>
            <div className={styles.coverText}>
              <p>
                <Rich text={C.coverageP1} />
              </p>
              <p>
                <Rich text={C.coverageP2} />
              </p>
              <div className={styles.phBtns} style={{ marginTop: 22 }}>
                <ButtonLink variant="white" href="#order">
                  Request a quote
                </ButtonLink>
                <ButtonLink variant="line" href="/#modules">
                  Browse all 10 modules
                </ButtonLink>
              </div>
            </div>
            <div className={styles.covergrid}>
              {C.departments.map((dept) => (
                <div className={`${styles.covercell} ${styles[colorClassKey(dept.colorKey)]}`} key={dept.id}>
                  <span className={styles.bar} />
                  <div className={styles.inner}>
                    <span className={styles.deptName}>{dept.name}</span>
                    <ul>
                      {dept.moduleRefs.map((moduleNum) => {
                        const mod = getModule(moduleNum);
                        if (!mod) return null;
                        return (
                          <li key={moduleNum}>
                            <span className={styles.cellN}>{String(moduleNum).padStart(2, "0")}</span>
                            <span className={styles.cellT}>{mod.title}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="wash">
        <div className="pad">
          <div className="head-row">
            <div>
              <div className="kicker">{C.rolloutKicker}</div>
              <h2 className="sh">{C.rolloutHeading}</h2>
              <p className="sd">{C.rolloutSub}</p>
            </div>
          </div>
          <div className={styles.roll}>
            {C.rolloutSteps.map((step, i) => (
              <div className={styles.rstep} key={step.heading}>
                <div
                  className={styles.rart}
                  style={{ background: ROLLOUT_BACKGROUNDS[i] }}
                >
                  {ROLLOUT_ICONS[i]}
                </div>
                <h3>{step.heading}</h3>
                <p>{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.quote} id="order">
        <div className={styles.quoteBg} />
        <div className={styles.quoteLines} />
        <div className={`pad ${styles.quoteIn}`}>
          <div>
            <h2>{C.orderHeading}</h2>
            <p>{C.orderBody}</p>
            <div className={styles.qfacts}>
              {C.orderFacts.map((fact) => (
                <div className={styles.qfact} key={fact.label}>
                  <b>{fact.value}</b>
                  <span>{fact.label}</span>
                </div>
              ))}
              <div className={styles.qfact}>
                <b>{framesTotal || 108}</b>
                <span>Frameworks each</span>
              </div>
            </div>
          </div>
          <div className={styles.ordercard}>
            <h3>{C.orderCardHeading}</h3>
            {C.orderIncludes.map((item) => (
              <div className={styles.orow} key={item}>
                <span className={styles.oi}>
                  <svg className="i" width="16" height="16" viewBox="0 0 24 24">
                    <path d="M4 7h16M4 12h16M4 17h10" />
                  </svg>
                </span>
                <span>{item}</span>
              </div>
            ))}
            <ButtonLink variant="white" href="/contact" className={styles.fullBtn}>
              Request a quote
            </ButtonLink>
            <p className={styles.orderNote}>{C.orderNote}</p>
          </div>
        </div>
      </section>

      <SubscribeSection />
    </main>
  );
}

const ROLLOUT_BACKGROUNDS = [
  "radial-gradient(240px 140px at 30% 35%,#3B7BF7,transparent 62%),radial-gradient(200px 140px at 82% 76%,#6EA0FF,transparent 60%),#0B0C0F",
  "radial-gradient(240px 140px at 70% 30%,#2FAB57,transparent 62%),radial-gradient(200px 140px at 20% 80%,#3B7BF7,transparent 60%),#0B0C0F",
  "radial-gradient(240px 140px at 30% 30%,#FBBE10,transparent 60%),radial-gradient(200px 140px at 82% 80%,#EC4A3B,transparent 62%),#0B0C0F",
];

const ROLLOUT_ICONS = [
  <svg key={0} viewBox="0 0 150 96" className="line" aria-hidden="true">
    <rect className="s" x="16" y="16" width="40" height="60" rx="5" />
    <rect className="s2" x="34" y="22" width="40" height="60" rx="5" />
    <rect className="s2" x="52" y="28" width="40" height="60" rx="5" />
    <path className="s" d="M108 46h26M124 38l10 8-10 8" />
  </svg>,
  <svg key={1} viewBox="0 0 150 96" className="line" aria-hidden="true">
    <rect className="s" x="12" y="24" width="44" height="48" rx="5" />
    <path className="s2" d="M22 40h24M22 52h16" />
    <circle className="s" cx="96" cy="32" r="11" />
    <path className="s" d="M78 72c0-10 8-17 18-17s18 7 18 17" />
    <path className="s3" d="M60 48h22" />
    <text className="t" x="120" y="52">01</text>
  </svg>,
  <svg key={2} viewBox="0 0 150 96" className="line" aria-hidden="true">
    <rect className="s" x="14" y="20" width="36" height="46" rx="4" />
    <rect className="s" x="56" y="20" width="36" height="46" rx="4" />
    <rect className="s" x="98" y="20" width="36" height="46" rx="4" />
    <path className="s2" d="M22 34h20M64 34h20M106 34h20M22 46h12M64 46h12M106 46h12" />
    <path className="s" d="M28 80l8 8 16-18" />
  </svg>,
];
