import { HeadMeta } from '@/components/seo/HeadMeta';
import { COMPANY_CONTACT } from '@/data/company';
import type { LegalBlock, LegalDocumentContent } from '@/features/legal/legal-types';

function Block({ block }: { block: LegalBlock }) {
  if (block.kind === 'h3') return <h3>{block.text}</h3>;
  if (block.kind === 'p') return <p>{block.text}</p>;
  return (
    <ul>
      {block.items.map((item) =>
        typeof item === 'string' ? (
          <li key={item}>{item}</li>
        ) : (
          <li key={item.term}>
            <strong>{item.term}</strong> {item.text}
          </li>
        )
      )}
    </ul>
  );
}

function ContactDetails() {
  return (
    <dl className="legal-contact">
      <div>
        <dt>Email</dt>
        <dd>
          <a href={`mailto:${COMPANY_CONTACT.email}`}>{COMPANY_CONTACT.email}</a>
        </dd>
      </div>
      <div>
        <dt>Phone</dt>
        <dd>
          <a href={COMPANY_CONTACT.phoneHref}>{COMPANY_CONTACT.phoneLabel}</a>
        </dd>
      </div>
      <div>
        <dt>Registered address</dt>
        <dd>{COMPANY_CONTACT.address}</dd>
      </div>
    </dl>
  );
}

/** A legal page (Privacy, Terms, Cookies): title, last-updated date, contents list and numbered sections. */
export function LegalDocument({ content }: { content: LegalDocumentContent }) {
  return (
    <>
      <HeadMeta
        title={`${content.title} · AscendQE`}
        description={content.description}
        canonicalPath={content.canonicalPath}
      />
      <section className="hero legal-hero">
        <div className="wrap">
          <h1>{content.title}</h1>
          <p className="legal-updated">Last updated {content.lastUpdated}</p>
        </div>
      </section>

      <section className="band white legal-band">
        <div className="wrap legal-layout">
          <nav className="legal-toc" aria-label="On this page">
            <p className="legal-toc-title">On this page</p>
            <ol>
              {content.sections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.title}</a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="legal-body">
            {content.sections.map((section, index) => (
              <section
                key={section.id}
                id={section.id}
                className="legal-section"
                aria-labelledby={`${section.id}-title`}
              >
                <h2 id={`${section.id}-title`}>
                  <span className="legal-num">{String(index + 1).padStart(2, '0')}</span>
                  {section.title}
                </h2>
                {section.blocks.map((block, blockIndex) => (
                  <Block key={blockIndex} block={block} />
                ))}
                {section.contact && <ContactDetails />}
                {section.after?.map((block, blockIndex) => (
                  <Block key={`after-${blockIndex}`} block={block} />
                ))}
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
