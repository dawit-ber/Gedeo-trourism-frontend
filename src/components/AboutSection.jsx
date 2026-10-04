import React from 'react';
import { ArrowUpRight, Mail, Phone } from 'lucide-react';

const aboutLinks = [
  ['Destinations', '/destinations'],
  ['Culture & Heritage', '/culture'],
  ['Events', '/events'],
  ['Articles', '/articles'],
  ['Library', '/library'],
  ['Travel Guide', '/travel-guide'],
];

export default function AboutSection() {
  return <>
    <style>{`
      .site-about{display:grid;grid-template-columns:minmax(0,1.5fr) minmax(220px,1fr);gap:clamp(24px,6vw,90px);padding:clamp(32px,6vw,70px) clamp(20px,7vw,100px);background:#24103f;color:#fff}
      .site-about-copy{max-width:620px}.site-about-kicker{margin:0 0 10px;color:#cdb5e5;font-size:11px!important;font-weight:700;letter-spacing:.16em}
      .site-about h2{margin:0 0 13px;font:700 clamp(27px,3.2vw,40px)/1.15 'Playfair Display',serif!important;color:#fff}
      .site-about-copy>p:last-child{max-width:580px;margin:0;color:#e3d9ec;font-size:14px!important;line-height:1.8!important}
      .site-about-right{display:grid;gap:19px;align-content:center}.site-about-links{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:4px 22px}
      .site-about-links a{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:9px 0;border-bottom:1px solid #ffffff30;color:#fff;font-size:13px!important;transition:color .18s ease}
      .site-about-links a:hover{color:#bda2fa}.site-about-links svg{width:14px;height:14px;flex:none;color:#9f7bea}
      .site-about-contact{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.site-about-contact a{min-width:0;display:flex;align-items:center;gap:9px;color:#fff;font-size:12px!important;overflow-wrap:anywhere}.site-about-contact svg{width:16px;height:16px;flex:none;color:#bda2fa}.site-about-contact small{display:block;margin-bottom:3px;color:#cdb5e5;font-size:10px!important}
      .site-about-social{display:flex;align-items:center;flex-wrap:wrap;gap:9px}.site-about-social>span{margin-right:3px;color:#cdb5e5;font-size:11px!important}.site-about-social a{width:34px;height:34px;display:grid;place-items:center;border:1px solid #ffffff35;border-radius:50%;color:#fff;transition:background .18s ease,border-color .18s ease}.site-about-social a:hover{background:#0012fd;border-color:#0012fd}.site-about-social .social-mark{font-size:13px!important;font-weight:700;line-height:1}
      .site-about-bottom{display:flex;justify-content:space-between;gap:12px;padding:15px clamp(20px,7vw,100px);background:#1b0b31;color:#c8bbd3;font-size:11px!important}
      @media(max-width:650px){.site-about{grid-template-columns:1fr;gap:22px;padding:32px 20px}.site-about-links{gap:5px 18px}.site-about-contact{grid-template-columns:1fr}.site-about-bottom{flex-direction:column;padding:13px 20px;font-size:10px!important}}
    `}</style>
    <section className="site-about" aria-labelledby="site-about-title">
      <div className="site-about-copy">
        <p className="site-about-kicker">ABOUT GEDEO</p>
        <h2 id="site-about-title">A place of living heritage</h2>
        <p>Discover Gedeo through its welcoming communities, distinctive cultural traditions, highland landscapes, and rich history. Find inspiration and practical information to plan a thoughtful visit.</p>
      </div>
      <div className="site-about-right">
        <nav className="site-about-links" aria-label="Explore Gedeo">
          {aboutLinks.map(([label, href]) => <a href={href} key={href}>{label}<ArrowUpRight aria-hidden="true"/></a>)}
        </nav>
        <div className="site-about-contact" aria-label="Contact Gedeo Tourism">
          <a href="tel:+251463312737"><Phone aria-hidden="true"/><span><small>Gedeo Zone Culture &amp; Tourism</small>+251 46 331 2737</span></a>
          <a href="mailto:hello@gedeotourism.et"><Mail aria-hidden="true"/><span><small>Email us</small>hello@gedeotourism.et</span></a>
        </div>
        <div className="site-about-social" aria-label="Ethiopia Tourism social media">
          <span>Ethiopia Tourism</span>
          <a href="https://www.facebook.com/TourismEthiopiaCorporate/" target="_blank" rel="noreferrer" aria-label="Ethiopia Tourism on Facebook"><span className="social-mark">f</span></a>
          <a href="https://twitter.com/TourismETH" target="_blank" rel="noreferrer" aria-label="Ethiopia Tourism on X"><span className="social-mark">𝕏</span></a>
          <a href="https://www.linkedin.com/company/tourismethiopia/" target="_blank" rel="noreferrer" aria-label="Ethiopia Tourism on LinkedIn"><span className="social-mark">in</span></a>
          <a href="https://t.me/tourismethiopia" target="_blank" rel="noreferrer" aria-label="Ethiopia Tourism on Telegram"><span className="social-mark">TG</span></a>
        </div>
      </div>
    </section>
    <div className="site-about-bottom"><span>Gedeo Culture &amp; Tourism</span><span>Explore with curiosity. Visit with respect.</span></div>
  </>;
}
