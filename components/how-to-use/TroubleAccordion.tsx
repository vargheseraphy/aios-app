"use client";

import { useState } from "react";
import { AccordionItem } from "@/components/Accordion";
import styles from "./how-to-use.module.css";

const ITEMS = [
  {
    id: "trouble-scan",
    q: "The code will not scan",
    node: (
      <>
        Move the phone back until the whole square is in frame, and hold it still for a second —
        most cameras want the code steady, not close. If the page is in shadow, tilt the book
        toward the light. If it still will not read, every framework has an address you can type:{" "}
        <code>aios.obio.in/m1/01</code> for framework 1.1, and the module and lesson numbers are
        on every page.
      </>
    ),
  },
  {
    id: "trouble-different",
    q: "The prompt on screen is different from the one in the book",
    node: "That is the site doing its job. When a technique changes, the prompt behind the code is rewritten. The screen version is the current one; the printed version is the one that was current at press. Use the screen.",
  },
  {
    id: "trouble-keep",
    q: "I want to keep a prompt without scanning again",
    node: 'Sign in — email link or Google, no password — and tap the bookmark on any framework. It goes into "My prompts", which follows you across devices. Copying never needs an account; keeping does.',
  },
  {
    id: "trouble-nophone",
    q: "I have no phone with me",
    node: (
      <>
        Type the framework&rsquo;s address into any browser: <code>aios.obio.in/m</code>, then
        the module number, a slash, and the two-digit lesson number — <code>/m6/03</code> for
        framework 6.3. Same page, same copy button.
      </>
    ),
  },
  {
    id: "trouble-generic",
    q: "The answer I got was generic",
    node: "Nine times out of ten a bracket was left as-is, or filled with something vague. Go back and put a real phrase in each one — company, stage, market, number. If that still misses, paste the bracket-interview helper above first and let the model ask you.",
  },
];

/** Exclusive-open FAQ-style accordion, first item open by default. */
export function TroubleAccordion() {
  const [openId, setOpenId] = useState<string>(ITEMS[0].id);

  return (
    <div>
      {ITEMS.map((item) => (
        <AccordionItem
          key={item.id}
          id={item.id}
          trigger={<span>{item.q}</span>}
          open={openId === item.id}
          onToggle={() => setOpenId((cur) => (cur === item.id ? "" : item.id))}
        >
          <div className={styles.faqInner}>{item.node}</div>
        </AccordionItem>
      ))}
    </div>
  );
}
