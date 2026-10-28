import React from 'react';
import { Link } from 'react-router-dom';

const productBriefBase64 =
  'data:text/plain;charset=utf-8;base64,IyBBc2NlbmRRRSDigJQgZnJvemVuIGVudGVycHJpc2Ugc3RvcnkKCkNvZGUgZmFzdC4gVGVzdCBmYXN0ZXIuIFlvdXIgY29kaW5nIGFnZW50cyBkbyBub3Qgc2xvdyBkb3duLiBZb3VyIHF1YWxpdHkgZW5naW5lZXJpbmcgc2hvdWxkIG5vdCBlaXRoZXIuCgojIyBXb3JrZmxvdwpBdXRvbWF0ZS4gRXhlY3V0ZS4gRmluZCBjb3ZlcmFnZSBhbmQgdHJhY2VhYmlsaXR5IGdhcHMuIENvbm5lY3QgY2hhbmdlcywgZGVwZW5kZW5jaWVzIGFuZCBtb2R1bGUgaW1wYWN0LiBQcmlvcml0aXplIG5leHQgdGVzdHMgYXJvdW5kIHJpc2suClByb3Bvc2VkIGVudGVycHJpc2Ugc2NvcGUgc3BhbnMgY29tcGxlbWVudGFyeSBBc2NlbmRRRSBwcm9kdWN0czsgYnVuZGxlZCBtb2R1bGVzIGFuZCBjYXBhYmlsaXR5IGFjY2VwdGFuY2UgbXVzdCBiZSBhZ3JlZWQuCgojIyBPZmZlcnMKUHJpdmF0ZSBlbnRlcnByaXNlIHBsYXRmb3JtIGZyb20gJDI1LDAwMC9tb250aCAoJDMwMCwwMDAveWVhcikuIEFncmVlZCBkZXBsb3ltZW50LCBjb25maWd1cmF0aW9uIGFuZCBjYXBhY2l0eS4gT3BlcmF0aW5nIGNvc3RzLCBiZXNwb2tlIHdvcmsgYW5kIG1hbmFnZWQgc2VydmljZXMgYWRkaXRpb25hbCB1bmxlc3MgY29udHJhY3RlZCBvdGhlcndpc2UuCk1hbmFnZWQgc2VydmljZXMgc2VwYXJhdGVseSBzY29wZWQ7IHNtYWxsIFFBIHRlYW1zIGFuZCBzdGFydHVwcyB3ZWxjb21lLiBRdW90ZSBtdXN0IGl0ZW1pemUgcGxhdGZvcm0gYWNjZXNzLCBkZWxpdmVyeSBhbmQgb3RoZXIgY29zdHMuCkZpcnN0IDEwMCBxdWFsaWZ5aW5nIHRlc3QgY2FzZXMgYXV0b21hdGVkIGZyZWU7IGFncmVlZCBzY29wZSwgYWNjZXNzIGFuZCBhY2NlcHRhbmNlIGNyaXRlcmlhLgoKIyMgUGF5bWVudHMKU3RhcnRpbmcgYXQgJDI1LDAwMC9tb250aCwgbW9udGhseSBiaWxsaW5nIHdpdGggYSAxMi1tb250aCBjb21taXRtZW50OiAkMzAwLDAwMC95ZWFyLiBPcGVyYXRpbmcgY29zdHMgYWRkaXRpb25hbC4gVGhpcyBzdXBlcnNlZGVzIHRoZSBlYXJsaWVyICQyOTlLIGFubnVhbCBhbmQgcHJvcG9zZWQgJDM0OUsgbW9udGhseS1iaWxsaW5nIGFzc3VtcHRpb25zLiBCaWxsaW5nIGZyZXF1ZW5jeSBkb2VzIG5vdCBkZXRlcm1pbmUgYWNjb3VudGluZyBjbGFzc2lmaWNhdGlvbi4KCiMjIENvdmVyYWdlCk9yaWdpbmFsIHNpdGUgZGVzY3JpYmVzIFdlYiBVSSwgQVBJLCBNb2JpbGUsIGRhdGFiYXNlIHZhbGlkYXRpb24gYW5kIGVuZC10by1lbmQgYnVzaW5lc3Mgam91cm5leXMuIFNwZWNpZmljIGlPUy9BbmRyb2lkIHZlcnNpb25zLCBkZXZpY2VzIGFuZCBmcmFtZXdvcmtzIG5vdCBjb25maXJtZWQuIE5vIGF1dG9tYXRlLWFueXRoaW5nIGNsYWltLgoKIyMgVmFsdWUgbW9kZWwKQW5udWFsIGNvc3QgPSAzMDAwMDAgKyBjYXNlcyAqIG9wZXJhdGluZyBjb3N0ICsgb3RoZXIgaW5jcmVtZW50YWwgY29zdHMuIERlZmF1bHRzOiAyMDAwMCBuZXcgYWNjZXB0ZWQgY2FzZXMsIDggaG91cnMgcGVyIGNhc2UsICQzMC9ob3VyLCAkNC45OSBvcGVyYXRpbmcgY29zdCBhbmQgemVybyBvdGhlciBjb3N0cy4gVGhlc2UgYXJlIGlsbHVzdHJhdGl2ZSBhc3N1bXB0aW9ucy4gVmFsdWUvY29zdCA9IGJhc2VsaW5lIC8gcGxhdGZvcm0gY29zdDsgbm90IG5ldCBST0kuIEVxdWl2YWxlbnQgYWNjZXB0ZWQgb3V0cHV0IGFzc3VtZWQuIEZyZWUgcGlsb3QgZXhjbHVkZWQuIFNhdmluZ3MgbWF5IGJlIHJlbGVhc2VkIGNhcGFjaXR5LiBJbmNsdWRlIGFkZGl0aW9uYWwgbGlmZWN5Y2xlIGNvc3RzIGJlZm9yZSBjbGFpbWluZyBmdWxsIFRDTy4KCiMjIEV2aWRlbmNlCmh0dHBzOi8vYXNjZW5kcWUuY29tL3Rlc3RpbW9uaWFscyDigJQgUXRwIFN1ZGhha2FyOiB3YWxrdGhyb3VnaCBpbXByZXNzaW9uczsgU3Jpbml2YXNhbiBEZXNpa2FuOiBteURpeWEgaW1wcmVzc2lvbnMuIE5vdCBtZWFzdXJlZCBST0kgb3IgcHJvZHVjdGlvbiBvdXRjb21lcy4gRm91bmRlciBTZWxlbml1bSByb2xlIG5vdCB2ZXJpZmllZC4KaHR0cHM6Ly9hc2NlbmRxZS5jb20vY29udGFjdCDigJQgSW5mb0Bhc2NlbmRxZS5jb20uIFdlYnNpdGUgb25seSBwcmVwYXJlcyBlbWFpbCBkcmFmdHMgb3IgbG9jYWwgZG93bmxvYWRzLCBubyBhdXRvbWF0aWMgc2VuZGluZy4KCiMjIEhlYWRsaW5lIHZhbHVlIGV4YW1wbGUKMjAsMDAwIG5ldyBhY2NlcHRlZCBjYXNlcy95ZWFyIGF0IDggaG91cnMgYW5kICQzMC9ob3VyID0gJDQsODAwLDAwMCBhbm51YWwgYmFzZWxpbmUuIFBsYXRmb3JtICQzMDAsMDAwIHBsdXMgYXNzdW1lZCAkOTksODAwIG9wZXJhdGluZyBjb3N0ID0gJDM5OSw4MDAuIFZhbHVlL2Nvc3QgPSAxMi4wMDZ4LCByb3VuZGVkIHRvIDEyeC4gTmV0IGJlbmVmaXQgJDQsNDAwLDIwMC95ZWFyLiBBdXRob3Jpbmcgb25seSwgZXF1aXZhbGVudCBvdXRwdXQgYXNzdW1lZCwgYWRkaXRpb25hbCBsaWZlY3ljbGUgY29zdHMgZXhjbHVkZWQuIENvc3QgYW5kIGVmZm9ydCBzYXZpbmdzIGFyZSBub3QgYWRkZWQgdG9nZXRoZXIuCgojIyBPcmlnaW5hbCB3ZWJzaXRlIHJlZmVyZW5jZQpTZWUgcmVmZXJlbmNlLmh0bWwgYW5kIHNvdXJjZS1yZWZlcmVuY2UubWQgZm9yIG9yZ2FuaXplZCBzdW1tYXJpZXMgYW5kIHNvdXJjZSBsaW5rcy4gU291cmNlIHByb2R1Y3QgY2xhaW1zIGRvIG5vdCBlc3RhYmxpc2ggaW5jbHVzaW9uIGluIHRoaXMgbmV3IGNvbW1lcmNpYWwgcGFja2FnZS4K';

const llmsTxtBase64 =
  'data:text/plain;charset=utf-8;base64,IyBBc2NlbmRRRQoKPiBDb2RlIGZhc3QuIFRlc3QgZmFzdGVyLgoKLSBbUHJvZHVjdCBicmllZl0ocHJvZHVjdC1icmllZi5tZCk6IGZyb3plbiBzdG9yeSwgb2ZmZXJzLCBhc3N1bXB0aW9ucyBhbmQgZXZpZGVuY2UgYm91bmRhcmllcy4KLSBbVGVjaG5pY2FsIGxpYnJhcnldKGRvY3MuaHRtbCk6IGNhcGFiaWxpdGllcywgc2VjdXJpdHkgc2NvcGUgYW5kIHBheW1lbnQgY29uc2lkZXJhdGlvbnMuCi0gW1ZhbHVlIG1vZGVsXShwYXlvZmYuaHRtbCk6IGVkaXRhYmxlIHBsYXRmb3JtIGF1dGhvcmluZyBlY29ub21pY3MuCgotIFtPcmlnaW5hbCB3ZWJzaXRlIHJlZmVyZW5jZV0oc291cmNlLXJlZmVyZW5jZS5tZCk6IHN0cnVjdHVyZWQgc3VtbWFyaWVzIG9mIHByb2R1Y3RzLCBzZXJ2aWNlcywgRkFRcywgZXZpZGVuY2UgYW5kIHBvbGljaWVzLCB3aXRoIHNvdXJjZSBsaW5rcy4K';

export const DocsPage: React.FC = () => {
  return (
    <main>
      <section className="page-intro">
        <div className="eyebrow">TECHNICAL LIBRARY</div>
        <h1>
          The detail behind<br />
          <span>the promise.</span>
        </h1>
        <p>Product scope, commercial assumptions and evidence for people and agents.</p>
      </section>

      <section className="section docs">
        <a className="button dark" download="product-brief.md" href={productBriefBase64}>
          Read the product brief
        </a>
        <a className="quiet-link" download="llms.txt" href={llmsTxtBase64}>
          Agent index
        </a>
        <p>
          <Link to="/reference">Browse the original AscendQE website reference</Link> — searchable products, services, FAQs and company context.
        </p>

        <h2>Connected quality workflow</h2>
        <p>
          Automate agreed test cases, execute them, inspect gaps, connect change impact and prioritize what to test next. The proposed enterprise scope combines capabilities across AscendQE’s products; exact modules, integrations, dependencies and acceptance measures must be contracted together.
        </p>
        <p>
          The original site describes mySDET for automation, execution, failure analysis, controlled healing and change impact; mySTLC for requirements, traceability and release readiness. These are described as complementary, independent products. Do not assume every capability is included in every licence.
        </p>

        <h3>Application coverage</h3>
        <p>
          Published product content describes web UI, APIs, mobile applications, database validation and end-to-end journeys. Specific iOS/Android versions, device support, browsers and frameworks must be confirmed during scoping. We do not claim “automate anything.”
        </p>

        <h3>Private deployment and security</h3>
        <p>
          Deployment boundaries, access controls, model providers, data handling and security requirements must be agreed. Private deployment is not a claim of being the most secure product or a certification.
        </p>

        <h2 id="commercial">Commercial assumptions and considerations</h2>
        <ul>
          <li>Private enterprise platform starts at $25,000/month ($300,000/year), with agreed capacity and configuration.</li>
          <li>Operating costs, bespoke development and managed services are additional unless explicitly included.</li>
          <li>Managed services are separately scoped; platform access and other cost components are itemized in the proposal.</li>
          <li>Current agreed starting offer: $25,000/month, billed monthly with a 12-month commitment ($300,000/year). This supersedes the earlier $299K annual and proposed $349K monthly-billed scenarios.</li>
          <li>Monthly billing does not mean cancel-anytime. Commitment and termination terms belong in the agreement.</li>
          <li>Payment frequency does not determine CapEx or OpEx treatment. Customer accounting policy and the contract determine classification; financing or purchase structures require separate agreement.</li>
        </ul>

        <h3>First 100 test cases</h3>
        <p>
          100 qualifying test cases automated free, with scope, access and acceptance criteria agreed beforehand. No guarantee of eligibility for every application. A test case means an agreed business scenario with assertions and acceptance criteria.
        </p>

        <h2>Value model</h2>
        <p>
          The calculator models authoring only, at $25,000/month ($300,000/year) plus editable operating and incremental costs. Defaults are illustrative: 20,000 new cases/year, eight hours/case, $30/hour and $4.99 variable cost/case. The $4.99 is an assumption, not a selling price. It excludes the free pilot and assumes equivalent output. Additional costs should be entered. Value/cost is not net ROI.
        </p>

        <h2>Published evidence</h2>
        <p>
          Qtp Sudhakar’s feedback concerns a walkthrough. Srinivasan Desikan’s excerpt concerns myDiya. These are expert impressions, not independent proof of cost savings or production benchmarks.
        </p>
        <p>
          <a href="https://ascendqe.com/testimonials" target="_blank" rel="noopener noreferrer">
            Original testimonials
          </a>{' '}
          ·{' '}
          <a href="https://ascendqe.com" target="_blank" rel="noopener noreferrer">
            Original product website
          </a>
        </p>
        <p>
          The founder’s specific Selenium project role is not asserted here because authoritative verification has not been supplied.
        </p>

        <h3>Enquiry flow</h3>
        <p>
          The form prepares an email to Info@ascendqe.com, the address on the original contact page, or downloads a local brief. It does not send automatically, upload test cases, take payment or run the product.
        </p>
      </section>
    </main>
  );
};
