import React from 'react';
import { ArrowLeft, ArrowRight, Clock3, Heart, MessageCircle, Send, Share2 } from 'lucide-react';
import { articles } from '../../data/articles.js';

function readSavedComments(key) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || '[]');
    return Array.isArray(value) ? value : [];
  } catch { return []; }
}

export default function ArticleDetailsPage({ slug }) {
  const article = articles.find((item) => item.slug === slug);
  const loveKey = `gedeo-article-love:${slug}`;
  const commentKey = `gedeo-article-comments:${slug}`;
  const [loved, setLoved] = React.useState(() => {
    try { return localStorage.getItem(loveKey) === 'true'; } catch { return false; }
  });
  const [comments, setComments] = React.useState(() => readSavedComments(commentKey));
  const [commentText, setCommentText] = React.useState('');
  const [shareMessage, setShareMessage] = React.useState('');
  const recentArticles = [...articles].sort((first, second) => Number(Boolean(second.isNew)) - Number(Boolean(first.isNew)));

  if (!article) return <main className="article-detail-page"><a className="article-back" href="/articles"><ArrowLeft/> All articles</a><h1>Article not found</h1><p>This article may have been removed or the link may be incorrect.</p></main>;

  const toggleLove = () => {
    const nextLoved = !loved;
    setLoved(nextLoved);
    try { localStorage.setItem(loveKey, String(nextLoved)); } catch {}
  };

  const shareArticle = async () => {
    const url = `${window.location.origin}/articles/${article.slug}`;
    const shareData = { title: article.title, text: article.summary, url };
    setShareMessage('');
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        setShareMessage('Article shared.');
        return;
      } catch (error) {
        if (error.name === 'AbortError') return;
      }
    }
    try {
      if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(url);
      else {
        const copyField = document.createElement('textarea');
        copyField.value = url;
        copyField.setAttribute('readonly', '');
        copyField.style.position = 'fixed';
        copyField.style.opacity = '0';
        document.body.appendChild(copyField);
        copyField.select();
        const copied = document.execCommand('copy');
        copyField.remove();
        if (!copied) throw new Error('Copy failed');
      }
      setShareMessage('Article link copied to clipboard.');
    } catch { setShareMessage(`Copy this link to share: ${url}`); }
  };

  const submitComment = (event) => {
    event.preventDefault();
    const text = commentText.trim();
    if (!text) return;
    const nextComments = [...comments, { id: `${Date.now()}-${Math.random().toString(36).slice(2)}`, text, createdAt: new Date().toISOString() }];
    setComments(nextComments);
    setCommentText('');
    try { localStorage.setItem(commentKey, JSON.stringify(nextComments)); } catch {}
  };

  return <main className="article-detail-page"><style>{`
    .article-detail-page{width:100%;min-height:calc(100vh - 64px);padding:0 0 48px;background:#fbf9fd;color:#302044}.article-detail-hero{height:clamp(250px,38vw,440px);position:relative;display:flex;align-items:flex-end;overflow:hidden;background-size:cover;background-position:center 45%;color:#fff}.article-detail-hero:before{content:'';position:absolute;inset:0;background:linear-gradient(0deg,#17052edb,#1c073855 62%,#1c073822)}.article-detail-hero-copy{position:relative;width:min(100%,900px);margin:0 auto;padding:clamp(20px,5vw,58px)}.article-detail-hero-copy>span{font-size:12px!important;font-weight:700;letter-spacing:.13em;color:#e7d7f5}.article-detail-hero h1{font-size:clamp(32px,5vw,58px)!important;line-height:1.1!important;color:#fff;margin:10px 0}.article-detail-hero p{max-width:720px;font-size:16px!important;line-height:1.6!important;color:#f5effa;margin:0}.article-detail-meta{display:flex;align-items:center;gap:7px;margin-top:14px;color:#f0e6f8;font-size:12px!important}.article-detail-meta svg{width:14px;height:14px}.article-back{display:inline-flex;align-items:center;gap:7px;margin:16px clamp(16px,5vw,60px);color:#551b88;font-size:13px!important;font-weight:700}.article-back svg{width:16px}.article-body-layout{width:min(100% - 32px,1200px);margin:28px auto 0;display:grid;grid-template-columns:minmax(0,1fr) 310px;gap:22px;align-items:start}.article-main-column{min-width:0}.article-reading,.article-interactions{width:100%;margin:0 0 18px;padding:clamp(18px,4vw,36px);border:1px solid #eee8f5;border-radius:14px;background:#fff;box-shadow:0 5px 20px #35106f08}.article-reading p{font-size:16px!important;line-height:1.85!important;color:#51465e;margin:0 0 18px}.article-reading p:last-child{margin-bottom:0}.article-list-sidebar{position:sticky;top:94px;max-height:calc(100vh - 112px);overflow-y:auto;padding:18px;border:1px solid #eee8f5;border-radius:14px;background:#fff;box-shadow:0 5px 20px #35106f08}.article-list-sidebar h2{font-size:18px!important;color:#35106b;margin:0 0 4px}.article-list-sidebar>p{font-size:11px!important;color:#847991;margin:0 0 13px}.article-sidebar-list{display:grid;gap:9px}.article-sidebar-item{display:grid;grid-template-columns:66px minmax(0,1fr);gap:10px;align-items:center;padding:8px;border-radius:10px;background:#faf8fc;transition:background .18s ease,transform .18s ease}.article-sidebar-item:hover{background:#f1edff;transform:translateX(2px)}.article-sidebar-item img{width:66px;height:60px;object-fit:cover;border-radius:7px}.article-sidebar-copy{min-width:0}.article-sidebar-copy small,.article-sidebar-copy b{display:block}.article-sidebar-copy small{font-size:9px!important;color:#0012fd;font-weight:700;margin-bottom:4px}.article-sidebar-copy b{font-size:11px!important;line-height:1.35!important;color:#413052}.article-interactions h2{font-size:22px!important;color:#35106b;margin:0 0 14px}.article-action-row{display:flex;flex-wrap:wrap;gap:9px}.article-action-button{min-height:42px;display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:9px 15px;border:0;border-radius:22px;background:#f0eaf7;color:#4d2877;font:700 13px 'DM Sans',sans-serif;cursor:pointer;transition:transform 160ms ease,background-color 160ms ease}.article-action-button:hover{transform:translateY(-2px)}.article-action-button svg{width:16px;height:16px}.article-action-button.loved,.article-action-button.share-action{background:#0012fd;color:#fff}.article-share-status{min-height:18px;margin:9px 0 0;color:#4d2877;font-size:12px!important;line-height:1.45!important;overflow-wrap:anywhere}.article-comments{margin-top:20px;padding-top:18px;border-top:1px solid #eee8f5}.article-comments h3{font-size:17px!important;color:#35106b;margin:0 0 10px}.article-comment-form{display:grid;gap:9px}.article-comment-form .sr-only{display:block;color:#514460;font-size:12px!important;font-weight:700}.article-comment-form textarea{width:100%;min-height:95px;resize:vertical;padding:11px 12px;border:1px solid #e7dfef;border-radius:9px;font:14px/1.5 'DM Sans',sans-serif;color:#35234e}.article-comment-form textarea::placeholder{color:#9588a1}.article-comment-form-footer{display:flex;align-items:center;justify-content:space-between;gap:10px}.article-comment-count{color:#877a91;font-size:11px!important}.article-comment-submit{min-height:40px;display:inline-flex;align-items:center;justify-content:center;gap:7px;padding:9px 15px;border:0;border-radius:21px;background:#0012fd;color:#fff;font:700 12px 'DM Sans',sans-serif;cursor:pointer}.article-comment-submit:disabled{opacity:.45;cursor:not-allowed}.article-comment-submit svg{width:14px;height:14px}.article-comments-empty{font-size:12px!important;line-height:1.5!important;color:#82768d;margin:15px 0 0}.article-comment-list{display:grid;gap:10px;margin-top:16px}.article-comment{padding:12px;border-radius:9px;background:#f8f5fb}.article-comment-head{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:5px}.article-comment-head b{font-size:12px!important;color:#4a1681}.article-comment-head time{font-size:10px!important;color:#8a7e95}.article-comment p{font-size:13px!important;line-height:1.5!important;color:#594e68;margin:0;white-space:pre-wrap;overflow-wrap:anywhere}.article-comments-note{font-size:10px!important;color:#8a7e95;margin:12px 0 0}.article-related-link{display:flex;align-items:center;justify-content:center;gap:8px;width:max-content;margin:22px auto 0;padding:11px 17px;border-radius:24px;background:#0012fd;color:#fff;font-size:13px!important;font-weight:700}.article-related-link svg{width:15px}
    @media(max-width:850px){.article-body-layout{grid-template-columns:minmax(0,1fr);gap:16px}.article-list-sidebar{position:static;max-height:none;order:2}.article-main-column{order:1}}
    @media(max-width:600px){.article-detail-page{padding-bottom:30px}.article-detail-hero-copy{padding:18px}.article-detail-hero-copy>span{font-size:10px!important}.article-detail-hero h1{font-size:32px!important}.article-detail-hero p{font-size:13px!important}.article-detail-meta{font-size:10px!important}.article-back{margin:12px}.article-body-layout{width:calc(100% - 24px);margin-top:16px;gap:12px}.article-reading,.article-interactions{padding:17px}.article-reading p{font-size:14px!important;line-height:1.75!important}.article-interactions h2{font-size:19px!important}.article-action-button{font-size:12px}.article-comments{margin-top:16px;padding-top:14px}.article-comment-form textarea{font-size:13px}.article-list-sidebar{padding:14px}}
  `}</style><a className="article-back" href="/articles"><ArrowLeft/> All articles</a><header className="article-detail-hero" style={{backgroundImage:`url(${article.image})`}}><div className="article-detail-hero-copy"><span>{article.category.toUpperCase()}</span><h1>{article.title}</h1><p>{article.summary}</p><div className="article-detail-meta"><Clock3/>{article.readTime}</div></div></header><div className="article-body-layout"><div className="article-main-column"><article className="article-reading">{article.paragraphs.map((paragraph,index)=><p key={index}>{paragraph}</p>)}</article><section className="article-interactions" aria-label="Article interactions"><h2>Join the conversation</h2><div className="article-action-row"><button type="button" className={`article-action-button${loved?' loved':''}`} aria-pressed={loved} onClick={toggleLove}><Heart fill={loved?'currentColor':'none'}/>{loved?'Loved':'Love'}</button><button type="button" className="article-action-button share-action" onClick={shareArticle}><Share2/> Share</button><button type="button" className="article-action-button" onClick={()=>document.getElementById('article-comment-box')?.focus()}><MessageCircle/> Comment</button></div><p className="article-share-status" role="status" aria-live="polite">{shareMessage}</p><div className="article-comments"><h3>Comments</h3><form className="article-comment-form" onSubmit={submitComment}><label className="sr-only" htmlFor="article-comment-box">Write a comment</label><textarea id="article-comment-box" maxLength={500} value={commentText} onChange={(event)=>setCommentText(event.target.value)} placeholder="Share a thought about this article…"/><div className="article-comment-form-footer"><span className="article-comment-count">{commentText.length}/500 characters</span><button className="article-comment-submit" type="submit" disabled={!commentText.trim()}><Send/> Post comment</button></div></form>{comments.length===0?<p className="article-comments-empty">No comments yet. Start the conversation.</p>:<div className="article-comment-list">{comments.map((comment)=><article className="article-comment" key={comment.id}><div className="article-comment-head"><b>You</b><time dateTime={comment.createdAt}>{new Date(comment.createdAt).toLocaleDateString()}</time></div><p>{comment.text}</p></article>)}</div>}<p className="article-comments-note">Likes and comments are saved on this device.</p></div></section><a className="article-related-link" href="/articles">More articles <ArrowRight/></a></div><aside className="article-list-sidebar" aria-label="Recent articles"><h2>More articles</h2><p>Recent to older</p><nav className="article-sidebar-list">{recentArticles.map((item)=><a className="article-sidebar-item" href={`/articles/${item.slug}`} key={item.slug} aria-current={item.slug===article.slug?'page':undefined}><img src={item.image} alt=""/><span className="article-sidebar-copy"><small>{item.isNew?'NEW':item.category.toUpperCase()}</small><b>{item.title}</b></span></a>)}</nav></aside></div></main>;
}
