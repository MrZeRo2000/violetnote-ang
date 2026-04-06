// ── constants ────────────────────────────────────────────────────────────────

const SINGLE_ONSETS  = ["b","d","f","g","h","k","l","m","n","p","r","s","t","v","w"];
const CLUSTER_ONSETS = ["bl","br","cl","cr","dr","fl","fr","gl","gr","kl","pl","pr","sk","sl","sm","sn","sp","st","sw","tr","tw"];
const VOWELS         = ["a","e","i","o","u"];
const FINAL_CODAS    = ["n","m","l","r","t","k","s","nd","nt","ld","nk","mp","lt","rn","rd","rk","rt"];
const DIGITS         = ["2","3","4","5","6","7","8","9"];
const SYMBOLS        = ["!","@","#","$","%","&","*","?"];

type CasingStrategy = "firstCap" | "camelCase" | "randomChars";
const STRATEGIES: CasingStrategy[] = ["firstCap", "camelCase", "randomChars"];

interface PasswordOptions {
  /** Number of syllables in the word part. Default: 3 */
  syllables?:    number;
  /** Number of digits to embed. Default: 2 */
  appendDigits?: number;
  /** Whether to include a symbol. Default: true */
  appendSymbol?: boolean;
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

/**
 * Generates a pronounceable, word-like password that is hard to brute-force.
 *
 * @example
 * generatePassword()                                         // "frewa!76bla"
 * generatePassword({ syllables: 4 })                        // "GOLOKONT56!"
 * generatePassword({ appendDigits: 3, appendSymbol: false }) // "kETAnI876"
 */
export function generatePassword(opts: PasswordOptions = {}): string {
  const {
    syllables    = 4,
    appendDigits = 2,
    appendSymbol = true,
  } = opts;

  const parts: string[] = [];
  for (let i = 0; i < syllables - 1; i++) parts.push(middleSyllable());
  parts.push(finalSyllable());

  const cased = applyCasing(parts.join(""), pick(STRATEGIES));

  let digits = "";
  for (let i = 0; i < appendDigits; i++) digits += pick(DIGITS);
  const sym        = appendSymbol ? pick(SYMBOLS) : "";
  const decoration = randInt(2) === 0 ? digits + sym : sym + digits;

  // Decoration lands at the end (~67%) or injected mid-word (~33%)
  if (randInt(3) < 2) {
    return cased + decoration;
  }
  const mid = Math.floor(cased.length / 2) + randInt(3) - 1;
  return cased.slice(0, mid) + decoration + cased.slice(mid);
}
