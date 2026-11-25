import { Link } from 'react-router-dom';
import { SiteLogo } from '@/components/layout/SiteLogo';

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
        </div>
        <div className="base">
          <span>Hyderabad, India</span>
          <span>Our method, PS-1, is published under CC BY 4.0</span>
        </div>
      </div>
    </footer>
  );
}
