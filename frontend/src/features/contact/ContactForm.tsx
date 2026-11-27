import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { EMAIL_PATTERN, FIELD_SPECS, type ContactField } from '@/features/contact/contact-data';
import { sendContactEnquiry } from '@/services/contactService';

type Values = Record<ContactField, string>;
type Errors = Partial<Record<ContactField, string>>;

const EMPTY: Values = {
  firstName: '',
  lastName: '',
  workEmail: '',
  company: '',
  scope: '',
};
const FIELD_ORDER = Object.keys(EMPTY) as ContactField[];

function validate(values: Values): Errors {
  const errors: Errors = {};
  for (const id of FIELD_ORDER) {
    const spec = FIELD_SPECS[id];
    const value = values[id].trim();
    if (!value) errors[id] = `Please add your ${spec.label.toLowerCase()}.`;
    else if (value.length > spec.maxLength) errors[id] = `${spec.label} can be at most ${spec.maxLength} characters.`;
  }
  if (!errors.workEmail && !EMAIL_PATTERN.test(values.workEmail.trim())) {
    errors.workEmail = 'Please enter a valid email address.';
  }
  return errors;
}

/** Contact form: validates, then emails the enquiry to hello@ascendqe.com through the backend. */
export function ContactForm() {
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sent) successRef.current?.focus();
  }, [sent]);

  const update = (id: ContactField, value: string) => {
    setValues((current) => ({ ...current, [id]: value }));
    if (errors[id]) setErrors((current) => ({ ...current, [id]: undefined }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (sending) return;
    setFormError('');
    const nextErrors = validate(values);
    setErrors(nextErrors);
    const firstInvalid = FIELD_ORDER.find((id) => nextErrors[id]);
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`#contact-${firstInvalid}`)?.focus();
      return;
    }

    setSending(true);
    const trimmed = Object.fromEntries(FIELD_ORDER.map((id) => [id, values[id].trim()])) as Values;
    const result = await sendContactEnquiry({
      firstName: trimmed.firstName,
      lastName: trimmed.lastName,
      email: trimmed.workEmail,
      company: trimmed.company,
      scope: trimmed.scope,
    });
    setSending(false);

    if (result.success) {
      setValues(EMPTY);
      setSent(true);
      return;
    }
    setFormError(result.message || 'Your enquiry could not be sent. Please try again or email hello@ascendqe.com.');
  };

  const fieldProps = (id: ContactField) => {
    const spec = FIELD_SPECS[id];
    return {
      id: `contact-${id}`,
      name: id,
      value: values[id],
      placeholder: spec.placeholder,
      maxLength: spec.maxLength,
      autoComplete: spec.autoComplete,
      required: true,
      disabled: sending,
      'aria-invalid': errors[id] ? true : undefined,
      'aria-describedby': errors[id] ? `contact-${id}-err` : undefined,
    };
  };

  const field = (id: ContactField) => {
    const spec = FIELD_SPECS[id];
    return (
      <div className="field" key={id}>
        <label htmlFor={`contact-${id}`}>
          {spec.label} <span className="contact-req">*</span>
        </label>
        {id === 'scope' ? (
          <textarea {...fieldProps(id)} rows={4} onChange={(event) => update(id, event.target.value)} />
        ) : (
          <input
            {...fieldProps(id)}
            type={spec.type ?? 'text'}
            inputMode={spec.type === 'email' ? 'email' : undefined}
            onChange={(event) => update(id, event.target.value)}
          />
        )}
        {errors[id] && (
          <p className="err" id={`contact-${id}-err`}>
            {errors[id]}
          </p>
        )}
      </div>
    );
  };

  if (sent) {
    return (
      <div className="card contact-card">
        <div className="notice contact-success" role="status" tabIndex={-1} ref={successRef}>
          <CheckCircle2 aria-hidden="true" />
          <div>
            <h2>Enquiry sent successfully.</h2>
            <p className="mt8">
              Your enquiry has been delivered to <b>hello@ascendqe.com</b>. Our team will review your enquiry and get in
              touch with you shortly.
            </p>
          </div>
        </div>
        <button type="button" className="btn sm ghost mt24" onClick={() => setSent(false)}>
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} id="contact-form" className="card contact-card form" noValidate onSubmit={handleSubmit}>
      <p className="tiny faint">
        Fields marked <span className="contact-req">*</span> are required.
      </p>
      <div className="contact-row">
        {field('firstName')}
        {field('lastName')}
      </div>
      <div className="contact-row">
        {field('workEmail')}
        {field('company')}
      </div>
      {field('scope')}

      {formError && (
        <p className="contact-alert" role="alert">
          <AlertCircle aria-hidden="true" />
          <span>{formError}</span>
        </p>
      )}
      <div>
        <button className="btn" type="submit" disabled={sending} aria-busy={sending}>
          {sending ? 'Sending enquiry…' : 'Send my enquiry'}
        </button>
        <p className="tiny faint mt8">Your enquiry goes to hello@ascendqe.com. We reply within one business day.</p>
      </div>
    </form>
  );
}
