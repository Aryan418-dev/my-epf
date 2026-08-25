import { SERVICES, type ServiceDef } from "./services";

export interface IntentResult {
  query: string;
  matched: ServiceDef[];
  message: string;
}

/** Rule-based intent matching for English / Hindi / Hinglish demo queries. */
export function matchIntent(raw: string): IntentResult {
  const q = raw.trim().toLowerCase();
  if (!q) {
    return { query: raw, matched: [], message: "Tell us what you need to get done." };
  }

  const scored = SERVICES.map((s) => {
    let score = 0;
    for (const k of s.keywords) {
      if (q.includes(k.toLowerCase())) score += 2;
    }
    for (const k of s.keywordsHi) {
      if (q.includes(k.toLowerCase()) || raw.includes(k)) score += 2;
    }
    // Hinglish / common phrases
    if ((q.includes("caste") || q.includes("income") || q.includes("certificate") || q.includes("प्रमाण")) && s.category === "certificates")
      score += 1;
    if ((q.includes("college") || q.includes("scholarship") || q.includes("पढ़ाई") || q.includes("financial help")) && s.category === "education")
      score += 1;
    if ((q.includes("epf") || q.includes("pf") || q.includes("pension") || q.includes("withdraw") || q.includes("claim") || q.includes("uan")) && s.id === "epf-claim")
      score += 3;
    if ((q.includes("grievance") || q.includes("complaint") || q.includes("problem") || q.includes("शिकायत") || q.includes("not arrived") || q.includes("delay")) && s.id === "grievance")
      score += 2;
    return { s, score };
  })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);

  const matched = scored.map((x) => x.s).filter((s) => s.status !== "coming");
  const coming = scored.map((x) => x.s).filter((s) => s.status === "coming");

  if (matched.length === 0 && coming.length === 0) {
    return {
      query: raw,
      matched: SERVICES.filter((s) => s.status === "working"),
      message: "We couldn’t match that exactly. Here are services you can try now.",
    };
  }

  if (matched.length === 0) {
    return {
      query: raw,
      matched: [],
      message: "That service is marked Coming later in this prototype. Try EPF, Income Certificate, Scholarship, or Grievance.",
    };
  }

  return {
    query: raw,
    matched,
    message: matched.length === 1 ? `We found a matching service.` : `We found ${matched.length} matching services.`,
  };
}
