import React from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowUpRight, Menu } from 'lucide-react';
import './style.css';
import DestinationsPage from './pages/destinations/index.jsx';
import DestinationDetailsPage from './pages/destination-details/index.jsx';
import CulturePage from './pages/culture/index.jsx';
import EventsPage from './pages/events/index.jsx';
import EventDetailsPage from './pages/event-details/index.jsx';
import LibraryPage from './pages/library/index.jsx';
import BookDetailsPage from './pages/book-details/index.jsx';
import TranslatorPage from './pages/translator/index.jsx';
import ServicesPage from './pages/services/index.jsx';
import HomePage from './pages/home/index.jsx';
import TravelGuidePage from './pages/travel-guide/index.jsx';
import ArticlesPage from './pages/articles/index.jsx';
import ArticleDetailsPage from './pages/article-details/index.jsx';
import AboutSection from './components/AboutSection.jsx';

function App() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [headerHidden, setHeaderHidden] = React.useState(false);
  const [pageScrolled, setPageScrolled] = React.useState(false);
  React.useEffect(() => {
    let previousY = window.scrollY;
    let scheduled = false;
    const articlePath = window.location.pathname.replace(/\/$/, '');
    const isArticlePage = articlePath === '/articles' || articlePath.startsWith('/articles/');
    const collapseHeroOnScroll = !isArticlePage;
    const onScroll = () => {
      if (scheduled) return;
      scheduled = true;
      window.requestAnimationFrame(() => {
        const currentY = window.scrollY;
        // Resizing the article hero while scrolling changes the document height
        // above the reading position and can make the browser jump unexpectedly.
        setPageScrolled(collapseHeroOnScroll && currentY > 120);
        if (isArticlePage || currentY < 80) setHeaderHidden(false);
        else if (currentY < previousY - 3) setHeaderHidden(false);
        else if (currentY > previousY + 3) setHeaderHidden(true);
        previousY = currentY;
        scheduled = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const currentPath = window.location.pathname.replace(/\/$/, '');
  const isDetails = currentPath.startsWith('/destinations/');
  const isDestinations = currentPath === '/destinations';
  const isCulture = currentPath === '/culture';
  const isEvents = currentPath === '/events';
  const isEventDetails = currentPath.startsWith('/events/');
  const isLibrary = currentPath === '/library';
  const isBookDetails = currentPath.startsWith('/library/');
  const isTranslator = currentPath === '/translator';
  const isServices = currentPath === '/services';
  const isTravelGuide = currentPath === '/travel-guide';
  const isArticles = currentPath === '/articles';
  const isArticleDetails = currentPath.startsWith('/articles/');
  const pageNav = isDestinations || isDetails || isCulture || isEvents || isEventDetails || isLibrary || isBookDetails || isTranslator || isServices || isTravelGuide || isArticles || isArticleDetails ? [['Home','/'],['Destinations','/destinations'],['Culture & Heritage','/culture'],['Events','/events'],['Articles','/articles'],['Library','/library'],['Translator','/translator'],['Services','/services'],['Travel Guide','/travel-guide']] : [['Home','#home'],['Destinations','/destinations'],['Culture & Heritage','/culture'],['Events','/events'],['Articles','/articles'],['Library','/library'],['Translator','/translator'],['Services','/services'],['Travel Guide','/travel-guide']];
  const activeNav = isDetails ? 'Destinations' : isEventDetails ? 'Events' : isArticleDetails ? 'Articles' : isBookDetails ? 'Library' : !currentPath ? 'Home' : pageNav.find(([, link]) => link.split('#')[0] === currentPath)?.[0];
  return <><style>{`
    body,body *{font-family:'DM Sans',Arial,sans-serif!important}
    body *:not(.translator-page):not(.translator-page *):not(.travel-guide-page):not(.travel-guide-page *):not(.detail-page):not(.detail-page *):not(.library-page):not(.library-page *):not(.articles-page):not(.articles-page *):not(.article-detail-page):not(.article-detail-page *):not(.home-article-card):not(.home-article-card *){font-size:max(16px,1em)!important}
    h1{font-size:48px!important;line-height:1.08!important}
    h2{font-size:36px!important;line-height:1.15!important}
    h3{font-size:26px!important;line-height:1.2!important}
    .dest-page{width:100%;max-width:none;padding:0 clamp(16px,2.5vw,42px) 48px!important}
    .translator-page{font-family:'DM Sans',Arial,sans-serif!important;width:100%;max-width:none;padding:0 0 18px!important;background:#fff;min-height:calc(100vh - 64px)}
    .translator-hero{height:clamp(150px,19vw,220px);padding:clamp(22px,4vw,42px) 5%;border-radius:0; background-color:#4b078f;background-image:radial-gradient(circle at 88% 30%,#ffffff14 0 2px,transparent 3px),radial-gradient(circle at 92% 44%,#ffffff17 0 1px,transparent 2px),linear-gradient(135deg,#52049a,#31006f);background-size:22px 22px,17px 17px,auto}
    .translator-hero h1{font-size:clamp(30px,3.5vw,44px)!important;line-height:1.1!important}
    .translator-hero p{font-size:15px!important;line-height:1.5!important}
    .translator-box{max-width:none;margin:-28px clamp(12px,4vw,48px) 0;position:relative;padding:18px;background:#fbfaff;border-radius:15px;border:1px solid #eee7f7;box-shadow:0 7px 24px #35106f14}
    .translator-workspace{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:18px;align-items:start}
    .translator-compose{min-width:0}.phrase-section{min-width:0;margin-top:0}
    .language-row select{font-size:14px!important}
    .translator-input textarea{font-size:14px!important;line-height:1.5!important}
    .char-count{font-size:10px!important}
    .phrase-section h2{font-size:18px!important;line-height:1.25!important}
    .phrase-tabs button{font-size:12px!important}
    .phrase-row,.phrase-row>span{font-size:13px!important;line-height:1.4!important}
    .phrase-row small{font-size:11px!important}
    .translator-page:after{content:'✺ ❋ ✺ ❋ ✺ ❋ ✺ ❋ ✺';display:block;text-align:center;color:#8100c9;font-size:17px!important;letter-spacing:.22em;padding:13px 0 0}
    .dest-search,.dest-explorer{width:100%;max-width:none}
    .dest-explorer{grid-template-columns:minmax(210px,18vw) minmax(0,1fr)}
    .hero h1{font-size:clamp(44px,6vw,64px)!important}
    .home-shortcuts>a{min-height:145px!important;padding:14px!important}
    .home-shortcuts svg{width:26px!important;height:26px!important}
    .home-destinations .destination-grid{grid-template-rows:clamp(150px,19vw,205px)!important}
    .home-promo{height:125px!important}
    .dest-hero{min-height:220px}
    .dest-search input,.dest-search select,.dest-filters select{min-height:46px}
    .check-row{margin-bottom:10px}
    .map-panel{height:280px}
    .result-card img{height:120px}
    @media(max-width:600px){
      h1{font-size:40px!important}h2{font-size:30px!important}h3{font-size:23px!important}
      .hero h1{font-size:clamp(40px,11vw,54px)!important}
      .home-shortcuts>a{min-height:140px!important;padding:10px!important}
      .home-destinations .destination-grid{grid-template-rows:clamp(125px,32vw,165px)!important}
      .home-promo{height:110px!important}
      .dest-hero{min-height:210px}
      .map-panel{height:220px}
      .result-card img{height:100px}
      .dest-page{padding:0 12px 30px!important}
      .translator-page{padding:0 0 14px!important}
      .translator-hero{height:150px;padding:20px 18px}
      .translator-hero h1{font-size:30px!important}
      .translator-hero p{font-size:13px!important}
      .translator-box{padding:12px;margin:-18px 8px 0}
      .translator-workspace{grid-template-columns:1fr;gap:14px}
      .phrase-section{margin-top:0}
      .dest-hero{margin:0 -12px;padding:0 20px}
      .dest-explorer{grid-template-columns:1fr}
    }
    .detail-page{width:100%;max-width:none;margin:0;padding:0 0 42px}
    :is(.hero,.dest-hero,.culture-hero,.events-hero,.library-hero,.travel-guide-hero,.services-hero,.articles-hero,.detail-hero,.event-detail-hero,.article-detail-hero){width:100vw!important;max-width:100vw!important;height:clamp(300px,32vw,420px)!important;min-height:0!important;margin-left:calc(50% - 50vw)!important;margin-right:calc(50% - 50vw)!important;border-radius:0!important}
    :is(.dest-hero,.events-hero,.library-hero,.travel-guide-hero,.services-hero,.articles-hero,.detail-hero,.event-detail-hero,.article-detail-hero){background-size:cover!important;animation:shared-hero-image-pan 24s ease-in-out infinite alternate!important}
    @keyframes shared-hero-image-pan{from{background-position:50% 43%}to{background-position:54% 57%}}
    @media(max-width:600px){:is(.hero,.dest-hero,.culture-hero,.events-hero,.library-hero,.travel-guide-hero,.services-hero,.articles-hero,.detail-hero,.event-detail-hero,.article-detail-hero){height:320px!important;min-height:0!important}}
    .topbar nav a{position:relative}
    .topbar{position:sticky;top:0;z-index:1000;transition:transform 220ms ease,box-shadow 220ms ease;will-change:transform}
    .topbar.is-hidden{transform:translateY(-110%);box-shadow:none}
    .topbar.is-compact{box-shadow:0 5px 18px #24103c1f}
    .topbar.is-compact~main :is(.hero,.dest-hero,.culture-hero,.events-hero,.library-hero,.travel-guide-hero,.services-hero,.articles-hero,.detail-hero,.event-detail-hero,.article-detail-hero){height:180px!important;min-height:180px!important;transition:height 320ms ease,min-height 320ms ease}
    @media(max-width:600px){.topbar.is-compact~main :is(.hero,.dest-hero,.culture-hero,.events-hero,.library-hero,.travel-guide-hero,.services-hero,.articles-hero,.detail-hero,.event-detail-hero,.article-detail-hero){height:150px!important;min-height:150px!important}}
    @media(prefers-reduced-motion:reduce){.topbar{transition:none}.topbar.is-compact~main :is(.hero,.dest-hero,.culture-hero,.events-hero,.library-hero,.travel-guide-hero,.services-hero,.articles-hero,.detail-hero,.event-detail-hero,.article-detail-hero){transition:none}}
    .topbar nav{gap:clamp(8px,1.35vw,20px)}
    .topbar nav a:after{content:'';position:absolute;left:0;right:0;bottom:-7px;height:2px;border-radius:2px;background:#7b35c1;transform:scaleX(0);transform-origin:left center;transition:transform 220ms ease}
    .topbar nav a:hover:after{transform:scaleX(1)}
    .topbar nav a.active{color:#4b1388}
    .topbar nav a.active:after{transform:scaleX(1);animation:nav-underline-in 280ms ease-out both}
    @keyframes nav-underline-in{from{transform:scaleX(0)}to{transform:scaleX(1)}}
    .detail-breadcrumb{display:flex;align-items:center;gap:9px;font-size:13px;color:#695b79;margin:0 0 8px}
    .detail-breadcrumb a{color:#4a1883}.detail-breadcrumb button,.detail-hero>button{margin-left:auto;border:0;color:#54138b;background:transparent;font-size:23px;cursor:pointer}
    .detail-hero{height:clamp(270px,34vw,430px);background-size:cover;background-position:center 50%;border-radius:0;position:relative;overflow:hidden;color:#fff;display:flex;align-items:flex-end;padding:clamp(20px,4vw,52px)}
    .detail-hero:before{content:'';position:absolute;inset:0;background:linear-gradient(0deg,#18072dd9,transparent 78%)}
    .detail-hero>div{position:relative}.detail-hero h1{margin:0;font-size:42px!important}.detail-hero p{margin:5px 0 0;font-size:15px;color:#f1e9f8}.detail-hero>button{position:absolute;right:16px;top:14px;color:#fff}
    .detail-breadcrumb{padding:12px clamp(16px,4vw,48px)}
    .detail-gallery,.detail-info,.related-section{margin-left:clamp(16px,4vw,48px);margin-right:clamp(16px,4vw,48px)}
    .detail-gallery{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;margin-top:14px;margin-bottom:22px}.detail-gallery img{width:100%;height:clamp(120px,15vw,210px);object-fit:cover;border-radius:9px}
    .detail-info{display:grid;grid-template-columns:minmax(0,1.55fr) minmax(300px,1fr);gap:20px;align-items:start}.about-detail,.visitor-card{min-width:0;padding:clamp(16px,2.5vw,28px);border:1px solid #eeeaf4;border-radius:12px;background:#fff}.detail-info h2,.related-section h2{font-size:20px!important;margin:0 0 10px;color:#291544}.about-detail>p{font-size:14px;line-height:1.7;color:#6c6176;margin:0 0 16px}.detail-facts{display:grid;gap:13px}.detail-facts>div,.visitor-card>div{display:flex;align-items:center;gap:11px;color:#4b1781}.detail-facts svg,.visitor-card>div svg{width:19px;height:19px;flex:none}.detail-facts b,.detail-facts small,.visitor-card b,.visitor-card small{display:block}.detail-facts b,.visitor-card b{font-size:13px;color:#35234e}.detail-facts small,.visitor-card small{font-size:11px;color:#7e738a;margin-top:2px}.visitor-card{background:#f8f5fc}.visitor-card>div{margin:13px 0}.directions-button{height:42px;border-radius:22px;background:#461282;color:#fff;display:flex;justify-content:center;align-items:center;gap:10px;font-size:13px;margin-top:16px}
    .related-section{margin-top:26px}.related-section h2{margin-bottom:12px}.related-section>div{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}.related-card{display:grid;grid-template-columns:85px minmax(0,1fr);column-gap:10px;align-items:center;padding:8px;border:1px solid #eeeaf4;border-radius:9px;background:white}.related-card img{grid-row:span 2;width:85px;height:65px;object-fit:cover;border-radius:6px}.related-card b{font-size:13px;color:#382356}.related-card small{font-size:11px;color:#81748e}
    @media(max-width:850px){.detail-info{grid-template-columns:minmax(0,1.3fr) minmax(250px,.9fr);gap:12px}.detail-gallery{gap:8px}.related-section>div{grid-template-columns:repeat(2,minmax(0,1fr))}}
    @media(max-width:600px){.detail-page{padding-bottom:25px}.detail-breadcrumb{padding:10px 14px;font-size:11px;gap:6px}.detail-breadcrumb button{font-size:20px}.detail-hero{height:230px;padding:18px}.detail-hero h1{font-size:32px!important}.detail-hero p{font-size:12px}.detail-gallery{margin:9px 12px 14px;grid-template-columns:repeat(2,minmax(0,1fr));gap:7px}.detail-gallery img{height:clamp(100px,30vw,140px);border-radius:7px}.detail-info{margin:0 12px;grid-template-columns:1fr;gap:10px}.about-detail,.visitor-card{padding:15px}.about-detail>p{font-size:13px}.detail-facts{gap:11px}.related-section{margin:18px 12px 0}.related-section>div{grid-template-columns:1fr;gap:8px}.related-card{grid-template-columns:78px minmax(0,1fr)}.related-card img{width:78px;height:58px}.detail-info h2,.related-section h2{font-size:18px!important}}
    `}</style>
    <header className={`topbar${pageScrolled?' is-compact':''}${headerHidden?' is-hidden':''}`}><a className="brand" href="/"><span className="brand-mark">✺</span><span><b>Gedeo</b><small>Culture &amp; Tourism</small></span></a><button className="menu-toggle" aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)}><Menu/></button><nav className={menuOpen ? 'open' : ''}>{pageNav.map(([label,link])=><a key={label} className={label===activeNav?'active':''} href={link} onClick={()=>setMenuOpen(false)}>{label}</a>)}</nav><a className="nav-cta" href="/travel-guide">Plan your trip <ArrowUpRight size={14}/></a></header>
    {isArticleDetails ? <ArticleDetailsPage slug={currentPath.split('/').filter(Boolean).at(-1)}/> : isArticles ? <ArticlesPage/> : isDetails ? <DestinationDetailsPage slug={currentPath.split('/').filter(Boolean).at(-1)}/> : isEventDetails ? <EventDetailsPage slug={currentPath.split('/').filter(Boolean).at(-1)}/> : isBookDetails ? <BookDetailsPage slug={currentPath.split('/').filter(Boolean).at(-1)}/> : isDestinations ? <DestinationsPage/> : isCulture ? <CulturePage/> : isEvents ? <EventsPage/> : isLibrary ? <LibraryPage/> : isTranslator ? <TranslatorPage/> : isServices ? <ServicesPage/> : isTravelGuide ? <TravelGuidePage/> : <HomePage/>}
    <AboutSection/>
  </>;
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>);
