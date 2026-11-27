import { Link } from 'react-router-dom';
import { SiteLogo } from '@/components/layout/SiteLogo';
import { SOCIAL_LINKS } from '@/data/company';
import { openCookieSettings } from '@/services/cookieConsent';

export function SiteFooter() {
  return (
    <footer className="ftr">
      <div className="wrap">
        <div className="cols">
          {' '}
          <div>
            <Link className="logo" to="/" aria-label="AscendQE home">
              <SiteLogo />
            </Link>
            <p className="mt16" style={{ maxWidth: '30ch' }}>
              Quality engineering for the AI era. Proof at the speed of AI.
            </p>
            <ul className="social" aria-label="AscendQE on social media">
              {SOCIAL_LINKS.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`AscendQE on ${link.name} (opens in a new tab)`}
                    title={link.name}
                  >
                    <img src={link.icon} alt="" width={24} height={24} loading="lazy" decoding="async" />
                  </a>
                </li>
              ))}
            </ul>
          </div>{' '}
          <div>
            <h2>Services</h2>
            <ul>
              <li>
                <Link to="/services#automation">Test automation at AI speed</Link>
              </li>
              <li>
                <Link to="/services#ai">AI and agent assurance</Link>
              </li>
              <li>
                <Link to="/services#skills">AI quality skills</Link>
              </li>
            </ul>
          </div>{' '}
          <div>
            <h2>For you</h2>
            <ul>
              <li>
                <Link to="/gcc">GCC leaders</Link>
              </li>
              <li>
                <Link to="/#it">Enterprise IT leaders</Link>
              </li>
              <li>
                <Link to="/method#check">Check your Proof Level</Link>
              </li>
            </ul>
          </div>{' '}
          <div>
            <h2>Company</h2>
            <ul>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/standard">Our published method</Link>
              </li>
              <li>
                <Link to="/start">Start a Proof Sprint</Link>
              </li>
            </ul>
          </div>{' '}
          <div>
            <h2>Legal</h2>
            <ul>
              <li>
                <Link to="/privacy">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms">Terms of Service</Link>
              </li>
              <li>
                <Link to="/cookie-policy">Cookie Policy</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="base">
          <span>Hyderabad, India</span>
          <span>Our method, PS-1, is published under CC BY 4.0</span>
          <button type="button" className="cookie-settings" onClick={openCookieSettings}>
            Cookie settings
          </button>
        </div>
      </div>
    </footer>
  );
}
