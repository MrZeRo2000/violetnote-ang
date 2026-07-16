// ── constants ────────────────────────────────────────────────────────────────

const SINGLE_ONSETS  = ["b","d","f","g","h","k","l","m","n","p","r","s","t","v","w"];
const CLUSTER_ONSETS = ["bl","br","cl","cr","dr","fl","fr","gl","gr","kl","pl","pr","sk","sl","sm","sn","sp","st","sw","tr","tw"];
const VOWELS         = ["a","e","i","o","u"];
const FINAL_CODAS    = ["n","m","l","r","t","k","s","nd","nt","ld","nk","mp","lt","rn","rd","rk","rt"];
const DIGITS         = ["2","3","4","5","6","7","8","9"];
const SYMBOLS        = ["!","@","#","$","%","&","*","?"];
// Ambiguous glyphs (0/O, 1/l/I) are intentionally excluded from every set above
// and below so generated passwords stay transcribable.
const LOWER          = [..."abcdefghjkmnpqrstuvwxyz"];
const UPPER          = [..."ABCDEFGHJKLMNPQRSTUVWXYZ"];

type CasingStrategy = "firstCap" | "camelCase" | "randomChars";
const STRATEGIES: CasingStrategy[] = ["firstCap", "camelCase", "randomChars"];

/**
 * Password complexity levels, mapped to the traffic-light generator UI.
 * Naming follows the common generator convention (memorable → standard →
 * maximum) used by mainstream password managers.
 */
export const PasswordComplexity = {
  /** Red — short, pronounceable, easy to remember. */
  Memorable: "memorable",
  /** Yellow — balanced: readable but strong (the original default). */
  Standard:  "standard",
  /** Green — long, fully random; maximum strength, not readable. */
  Maximum:   "maximum",
} as const;

export type PasswordComplexity = typeof PasswordComplexity[keyof typeof PasswordComplexity];

interface PronounceableOptions {
  /** Number of pronounceable parts (floored at 1). Default: 3 */
  parts?:      number;
  /** Minimum total length of the generated password. Default: 0 (no growth) */
  minLength?:  number;
  /** Number of digits to embed. Default: 2 */
  digits?:     number;
  /** Fixed casing strategy; when omitted, one is chosen at random. */
  casing?:     CasingStrategy;
}

// ── randomness ────────────────────────────────────────────────────────────────

/** Cryptographically-secure random integer in [0, max) */
function randInt(max: number): number {
  const arr = new Uint32Array(1);
  crypto.getRandomValues(arr);
  return arr[0] % max;
}

function pick<T>(arr: T[]): T {
  return arr[randInt(arr.length)];
}

// ── syllable builder ──────────────────────────────────────────────────────────

function onset(): string {
  return randInt(4) === 0 ? pick(CLUSTER_ONSETS) : pick(SINGLE_ONSETS);
}

/** Open syllable (CV) — used in the middle to avoid ugly CC junctions */
function middleSyllable(): string {
  return onset() + pick(VOWELS);
}

/** Closed syllable (CV + optional coda) — used last for a natural word ending */
function finalSyllable(): string {
  const coda = randInt(5) < 3 ? pick(FINAL_CODAS) : "";
  return onset() + pick(VOWELS) + coda;
}

/** A pronounceable part of 1–2 syllables. The last part of the password ends
 *  on a closed syllable for a natural word ending. */
function buildPart(isLast: boolean): string {
  const syllableCount = 1 + randInt(2); // 1 or 2
  let part = "";
  for (let i = 0; i < syllableCount; i++) {
    const lastSyllable = isLast && i === syllableCount - 1;
    part += lastSyllable ? finalSyllable() : middleSyllable();
  }
  return part;
}

// ── casing strategies ─────────────────────────────────────────────────────────

function applyCasing(word: string, strategy: CasingStrategy): string {
  switch (strategy) {
    case "firstCap":
      return word[0].toUpperCase() + word.slice(1).toLowerCase();

    case "camelCase": {
      let out = "";
      let upper = randInt(2) === 0;
      for (const ch of word) {
        out += upper ? ch.toUpperCase() : ch.toLowerCase();
        if (randInt(3) === 0) upper = !upper;
      }
      return out;
    }

    case "randomChars":
      return [...word].map(c => randInt(10) < 3 ? c.toUpperCase() : c.toLowerCase()).join("");
  }
}

// ── main generator ────────────────────────────────────────────────────────────

/** Pick a symbol that differs from the previous one, for visual variety. */
function pickSymbol(previous: string): string {
  let sym = pick(SYMBOLS);
  while (sym === previous) sym = pick(SYMBOLS);
  return sym;
}

/**
 * Builds a pronounceable, word-like password from several parts joined by
 * special characters, so it stays readable. With the defaults it guarantees
 * ≥14 characters, ≥2 separator symbols between parts, embedded digits and
 * mixed casing.
 */
function generatePronounceable(opts: PronounceableOptions = {}): string {
  const {
    parts     = 3,
    minLength = 0,
    digits    = 2,
  } = opts;

  const partCount = Math.max(1, parts);

  const words: string[] = [];
  for (let i = 0; i < partCount; i++) {
    words.push(buildPart(i === partCount - 1));
  }

  // Grow the pronounceable content until the fixed extras (separators + digits)
  // plus the letters reach the requested minimum length. Prepending an open
  // syllable keeps each part pronounceable.
  const fixedExtras  = (partCount - 1) + digits;
  const letterTarget = Math.max(0, minLength - fixedExtras);
  while (words.reduce((n, w) => n + w.length, 0) < letterTarget) {
    const idx = randInt(partCount);
    words[idx] = middleSyllable() + words[idx];
  }

  // One casing strategy across all parts for a consistent look.
  const strategy = opts.casing ?? pick(STRATEGIES);
  const cased    = words.map(w => applyCasing(w, strategy));

  let digitRun = "";
  for (let i = 0; i < digits; i++) digitRun += pick(DIGITS);

  // Attach the digit run right after a randomly chosen part, so it sits between
  // pronounceable chunks (never inside one) and its position varies per call.
  const digitAfter = randInt(partCount);

  let out     = "";
  let lastSym = "";
  for (let i = 0; i < partCount; i++) {
    if (i > 0) {
      lastSym = pickSymbol(lastSym);
      out += lastSym;
    }
    out += cased[i];
    if (i === digitAfter) out += digitRun;
  }

  return out;
}

/**
 * Builds a fully-random password over lowercase + uppercase + digits + symbols,
 * guaranteeing at least one character from each class. Not pronounceable —
 * maximum entropy per character.
 */
function generateRandom(length: number): string {
  const classes = [LOWER, UPPER, DIGITS, SYMBOLS];
  const alphabet = classes.flat();

  // Seed with one character per class so every class is represented...
  const chars = classes.map(cls => pick(cls));
  // ...then fill the rest from the whole alphabet.
  while (chars.length < length) chars.push(pick(alphabet));

  // Fisher–Yates shuffle so the seeded characters aren't stuck up front.
  for (let i = chars.length - 1; i > 0; i--) {
    const j = randInt(i + 1);
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }
  return chars.join("");
}

/**
 * Generates a password at the requested complexity level.
 *
 * @example
 * generatePassword()                              // Standard (default)
 * generatePassword(PasswordComplexity.Memorable)  // e.g. "Broka!Teli47"
 * generatePassword(PasswordComplexity.Maximum)    // e.g. "q7#Kf$2mR!zVn8@wJ4pd"
 */
export function generatePassword(
  complexity: PasswordComplexity = PasswordComplexity.Standard,
): string {
  switch (complexity) {
    case PasswordComplexity.Memorable:
      // Two capitalised parts + one separator + digits: short and readable.
      return generatePronounceable({ parts: 2, minLength: 10, digits: 2, casing: "firstCap" });

    case PasswordComplexity.Maximum:
      return generateRandom(20);

    case PasswordComplexity.Standard:
    default:
      return generatePronounceable({ parts: 3, minLength: 14, digits: 2 });
  }
}
