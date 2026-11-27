// Structure of a legal document (Privacy Policy, Terms of Service, Cookie Policy). Content lives in data files.

export type LegalBlock =
  | { kind: 'p'; text: string }
  | { kind: 'h3'; text: string }
  /** Bullet list; an item may lead with a bold term ("Service Providers: …"). */
  | { kind: 'list'; items: (string | { term: string; text: string })[] };

export interface LegalSection {
  /** Anchor for the table of contents (#id). */
  id: string;
  title: string;
  blocks: LegalBlock[];
  /** Show the company contact details after the blocks. */
  contact?: boolean;
  /** Blocks shown after the contact details. */
  after?: LegalBlock[];
}

export interface LegalDocumentContent {
  title: string;
  /** Meta description. */
  description: string;
  canonicalPath: string;
  lastUpdated: string;
  sections: LegalSection[];
}
