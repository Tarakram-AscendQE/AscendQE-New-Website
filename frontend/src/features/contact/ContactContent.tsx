import { Mail, MapPin } from 'lucide-react';
import { ContactForm } from '@/features/contact/ContactForm';
import { OFFICE_ADDRESS_LINES } from '@/features/contact/contact-data';
import { COMPANY_CONTACT } from '@/data/company';

/** Contact page: heading and office details beside the enquiry form (form first on small screens). */
export function ContactContent() {
  return (
    <section className="hero contact">
      <div className="wrap contact-grid">
        <div className="contact-intro">
          <h1 className="contact-title">Let’s start with your application.</h1>

          <dl className="contact-details">
            <div>
              <dt>
                <MapPin aria-hidden="true" />
                Location
              </dt>
              <dd>
                <address>
                  {OFFICE_ADDRESS_LINES.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </address>
              </dd>
            </div>
            <div>
              <dt>
                <Mail aria-hidden="true" />
                Email
              </dt>
              <dd>
                <a href={`mailto:${COMPANY_CONTACT.email}`}>{COMPANY_CONTACT.email}</a>
              </dd>
            </div>
          </dl>
        </div>

        <div className="contact-form-col">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
