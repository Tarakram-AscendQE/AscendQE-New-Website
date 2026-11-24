import { useEffect, useRef, useState, type FormEvent } from 'react';

interface Edition {
  value: string;
  label: string;
  detail: string;
}

const EDITIONS: Edition[] = [
  { value: 'sprint-sw', label: 'Proof Sprint · software', detail: 'Custom pricing based on scope · 10 working days' },
  { value: 'sprint-ai', label: 'Proof Sprint · AI system', detail: 'Custom pricing based on scope · 15 working days' },
  { value: 'briefing', label: 'Executive briefing', detail: 'Free · half a day' },
  { value: 'academy', label: 'Team programme', detail: 'Six weeks, up to 20 engineers' },
  { value: 'other', label: 'Something else', detail: 'A question about anything' },
];
const DEFAULT_EDITION = 'sprint-ai';

type FieldId = 'fname' | 'femail' | 'fco' | 'fsys';
const FIELD_ORDER: FieldId[] = ['fname', 'femail', 'fco', 'fsys'];
const EMAIL_PATTERN = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

const COPY_HINT = 'Copy this message into your email application. No message is transmitted from this website.';
const COPY_DONE = 'Message copied. Open your email app to send it to your intended recipient.';
const COPY_FAILED = 'Select and copy the message manually. No email has been sent.';

interface PreparedEnquiry {
  name: string;
  edition: string;
  system: string;
  draft: string;
}

function buildDraft(fields: Record<FieldId, string>, edition: string): string {
  return [
    'AscendQE — Proof Sprint enquiry',
    '',
    'To: NAG Pusuluri, Founder & CEO, AscendQE',
    'Name: ' + fields.fname,
    'Email: ' + fields.femail,
    'Company: ' + fields.fco,
    'Role: ',
    'Interest: ' + edition,
    'System or release: ' + fields.fsys,
    'Decision timing: Not specified',
    '',
    'Please contact me to discuss project scope and commercial terms.',
  ].join('\n');
}

/**
 * "Start a Proof Sprint" form. Nothing is sent from the website: a valid form becomes an email
 * draft the visitor copies into their own email app.
 */
export function ProofSprintForm() {
  const noticeRef = useRef<HTMLDivElement>(null);
  const draftRef = useRef<HTMLTextAreaElement>(null);
  const [invalid, setInvalid] = useState<Partial<Record<FieldId, boolean>>>({});
  const [prepared, setPrepared] = useState<PreparedEnquiry | null>(null);
  const [copyStatus, setCopyStatus] = useState(COPY_HINT);

  useEffect(() => {
    if (prepared) noticeRef.current?.focus();
  }, [prepared]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const fields = {} as Record<FieldId, string>;
    const nextInvalid: Partial<Record<FieldId, boolean>> = {};
    for (const id of FIELD_ORDER) {
      const value = (form.elements.namedItem(id) as HTMLInputElement | HTMLTextAreaElement).value.trim();
      fields[id] = value;
      nextInvalid[id] = !value || (id === 'femail' && !EMAIL_PATTERN.test(value));
    }
    setInvalid(nextInvalid);
    const firstInvalid = FIELD_ORDER.find((id) => nextInvalid[id]);
    if (firstInvalid) {
      (form.elements.namedItem(firstInvalid) as HTMLElement).focus();
      return;
    }

    const editionValue = (form.elements.namedItem('edition') as RadioNodeList).value;
    const edition = EDITIONS.find((item) => item.value === editionValue)?.label ?? '';
    setPrepared({ name: fields.fname, edition, system: fields.fsys, draft: buildDraft(fields, edition) });
  };

  const copyDraft = async () => {
    const textarea = draftRef.current;
    if (!textarea) return;
    let copied = false;
    try {
      await navigator.clipboard.writeText(textarea.value);
      copied = true;
    } catch {
      // Clipboard API unavailable (e.g. non-HTTPS): fall back to selecting the text.
    }
    if (!copied) {
      textarea.focus();
      textarea.select();
      try {
        copied = document.execCommand('copy');
      } catch {
        copied = false;
      }
    }
    setCopyStatus(copied ? COPY_DONE : COPY_FAILED);
  };

  const invalidProps = (id: FieldId) => (id in invalid ? { 'aria-invalid': Boolean(invalid[id]) } : {});

  return (
    <>
      <form id="bookform" className="form" noValidate hidden={prepared !== null} onSubmit={handleSubmit}>
        <fieldset style={{ border: '0', padding: '0', margin: '0' }}>
          <legend style={{ fontWeight: '600', fontSize: '15px', marginBottom: '8px' }}>
            What would you like to start?
          </legend>
          <div className="radios">
            {EDITIONS.map((item) => (
              <label key={item.value}>
                <input type="radio" name="edition" value={item.value} defaultChecked={item.value === DEFAULT_EDITION} />
                <span>
                  <b>{item.label}</b>
                  <span>{item.detail}</span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>
        <div className="g2" style={{ gap: '18px' }}>
          <div className="field">
            <label htmlFor="fname">Your name</label>
            <input id="fname" autoComplete="name" required {...invalidProps('fname')} />
            <p className="err" id="fname-err" hidden={!invalid.fname}>
              Please add your name.
            </p>
          </div>
          <div className="field">
            <label htmlFor="femail">Work email</label>
            <input id="femail" type="email" autoComplete="email" required {...invalidProps('femail')} />
            <p className="err" id="femail-err" hidden={!invalid.femail}>
              Please add a valid work email.
            </p>
          </div>
        </div>
        <div className="field">
          <label htmlFor="fco">Company</label>
          <input id="fco" autoComplete="organization" required {...invalidProps('fco')} />
          <p className="err" id="fco-err" hidden={!invalid.fco}>
            Please add your company.
          </p>
        </div>
        <div className="field">
          <label htmlFor="fsys">Which system or release?</label>
          <textarea id="fsys" required {...invalidProps('fsys')}></textarea>
          <p className="help">One line is enough, for example “claims assistant, going live in March”.</p>
          <p className="err" id="fsys-err" hidden={!invalid.fsys}>
            Tell us which system you have in mind.
          </p>
        </div>
        <div>
          <button className="btn" type="submit">
            Prepare email to NAG
          </button>
          <p className="tiny faint mt8">We reply within one business day. No mailing lists.</p>
        </div>
      </form>
      <div className="notice" hidden={prepared === null} id="booked" tabIndex={-1} ref={noticeRef}>
        <p className="small" style={{ color: 'var(--accent)', fontWeight: '600' }}>
          Email draft prepared · nothing sent
        </p>
        <h3 className="mt8">Your message is ready to copy.</h3>
        <p className="mt8">
          Prepared for <b id="sum-name">{prepared?.name}</b>: <b id="sum-ed">{prepared?.edition}</b> for “
          <span id="sum-sys">{prepared?.system}</span>”. No email has been sent.
        </p>
        <div className="field mt16">
          <label htmlFor="prepared-email">Prepared message</label>
          <textarea
            aria-label="Prepared email to NAG"
            id="prepared-email"
            readOnly
            rows={8}
            ref={draftRef}
            value={prepared?.draft ?? ''}
          ></textarea>
          <button className="btn sm mt16" id="copy-prepared" type="button" onClick={copyDraft}>
            Copy prepared message
          </button>
          <p aria-live="polite" className="small muted mt8" id="copy-status">
            {copyStatus}
          </p>
        </div>
      </div>
    </>
  );
}
