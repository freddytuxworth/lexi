export enum FilterType {
  MEANS_LIKE,
  SOUNDS_LIKE,
  SPELLED_LIKE,
  MODIFIED_BY,
  MODIFIES,
  SYNONYMS,
  TRIGGERS,
  ANTONYMS,
  HYPERNYMS,
  HYPONYMS,
  HOLONYMS,
  MERONYMS,
  FOLLOWS,
  PRECEDES,
  RHYMES,
  NEAR_RHYMES,
  HOMOPHONES,
  CONSONANT_MATCHES,
}

export type Filter = {
  type: FilterType;
  query: string;
};

export const filterKeys = new Map([
  ['ml', FilterType.MEANS_LIKE],
  ['sp', FilterType.SPELLED_LIKE],
  ['sl', FilterType.SOUNDS_LIKE],
  ['mb', FilterType.MODIFIED_BY],
  ['m', FilterType.MODIFIES],
  ['sy', FilterType.SYNONYMS],
  ['w', FilterType.TRIGGERS],
  ['an', FilterType.ANTONYMS],
  ['mem', FilterType.HYPERNYMS],
  ['typ', FilterType.HYPONYMS],
  ['par', FilterType.HOLONYMS],
  ['com', FilterType.MERONYMS],
  ['fol', FilterType.FOLLOWS],
  ['pre', FilterType.PRECEDES],
  ['rhy', FilterType.RHYMES],
  ['nry', FilterType.NEAR_RHYMES],
  ['hom', FilterType.HOMOPHONES],
  ['con', FilterType.CONSONANT_MATCHES],
]);

export const filterQueries = new Map([
  [FilterType.MEANS_LIKE, 'ml'],
  [FilterType.SPELLED_LIKE, 'sp'],
  [FilterType.SOUNDS_LIKE, 'sl'],
  [FilterType.MODIFIED_BY, 'rel_jja'],
  [FilterType.MODIFIES, 'rel_jjb'],
  [FilterType.SYNONYMS, 'rel_syn'],
  [FilterType.TRIGGERS, 'rel_trg'],
  [FilterType.ANTONYMS, 'rel_ant'],
  [FilterType.HYPERNYMS, 'rel_spc'],
  [FilterType.HYPONYMS, 'rel_gen'],
  [FilterType.HOLONYMS, 'rel_com'],
  [FilterType.MERONYMS, 'rel_par'],
  [FilterType.FOLLOWS, 'rel_bga'],
  [FilterType.PRECEDES, 'rel_bgb'],
  [FilterType.RHYMES, 'rel_rhy'],
  [FilterType.NEAR_RHYMES, 'rel_nry'],
  [FilterType.HOMOPHONES, 'rel_hom'],
  [FilterType.CONSONANT_MATCHES, 'rel_cns'],
]);

export type ApiWord = {
  word: string,
  score: number,
  numSyllables: number,
  tags: Array<string>,
  defs: Array<string>
}

export const phonemeMap = {
  AA: 'ah',
  AE: 'a',
  AH: 'uh',
  AO: 'or',
  AW: 'ow',
  AY: 'eye',
  B: 'b',
  CH: 'ch',
  D: 'd',
  DH: 'th',
  EH: 'eh',
  ER: 'er',
  EY: 'ay',
  F: 'f',
  G: 'g',
  HH: 'h',
  IH: 'ih',
  IY: 'ee',
  JH: 'j',
  K: 'k',
  L: 'l',
  M: 'm',
  N: 'n',
  NG: 'ng',
  OW: 'oh',
  OY: 'oy',
  P: 'p',
  R: 'r',
  S: 's',
  SH: 'sh',
  T: 't',
  TH: 'th',
  UH: 'u',
  UW: 'ooh',
  V: 'v',
  W: 'w',
  Y: 'y',
  Z: 'z',
  ZH: 'zsh'
};

export enum PartOfSpeech {
  UNKNOWN, NOUN, ADJECTIVE, VERB
}

export const posCodes = {
  n: PartOfSpeech.NOUN,
  adj: PartOfSpeech.ADJECTIVE,
  v: PartOfSpeech.VERB
};

export type Meaning = {
  partOfSpeech: PartOfSpeech,
  definition: string
}
