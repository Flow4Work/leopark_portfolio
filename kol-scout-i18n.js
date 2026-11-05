/* KOL Scout case-study localization. Original Korean content stays in kol-scout.html. */
(() => {
  'use strict';
  const root = document.documentElement;
  const localeButton = (document.getElementById('language-switch') || document.createElement('button'));
  const entries = [];

  function html(selector, english) {
    const node = document.querySelector(selector);
    if (!node) throw new Error('KOL Scout i18n: missing ' + selector);
    entries.push({node, property: 'innerHTML', korean: node.innerHTML, english});
  }
  function attribute(selector, name, english) {
    const node = document.querySelector(selector);
    if (!node) throw new Error('KOL Scout i18n: missing ' + selector);
    entries.push({node, property: 'attribute', name, korean: node.getAttribute(name), english});
  }
  function leadingText(selector, english) {
    const node = document.querySelector(selector);
    if (!node?.firstChild || node.firstChild.nodeType !== Node.TEXT_NODE) {
      throw new Error('KOL Scout i18n: missing text in ' + selector);
    }
    entries.push({node: node.firstChild, property: 'nodeValue', korean: node.firstChild.nodeValue, english});
  }

  attribute('meta[name="description"]', 'content',
    'How I built and operated an influencer outreach workflow, automating KOL discovery and partnership messages, then expanding from Japan to group buying in Taiwan.');
  attribute('.header-brand', 'aria-label', 'Go to portfolio home');
  attribute('.detail-nav', 'aria-label', 'Main navigation');
  html('.detail-nav .back-link:first-child', '← All projects');
  attribute('.project-facts', 'aria-label', 'Project details');
  html('.project-heading .subtitle', 'Automating influencer discovery and partnership outreach');
  html('.project-fact:nth-child(1) dt', 'Project');
  html('.project-fact:nth-child(1) dd', 'Influencer outreach automation');
  html('.project-fact:nth-child(2) dt', 'My role');
  html('.project-fact:nth-child(2) dd', 'Planning, coding, outreach');
  html('.project-fact:nth-child(3) dt', 'Period');
  html('.project-fact:nth-child(3) dd', 'Jun–Sep 2026');
  leadingText('.project-facts__link', 'View live service\n              ');
  attribute('.project-facts__link', 'aria-label', 'Open KOL Scout in a new tab');
  attribute('.demo-shell > img', 'alt', 'KOL Scout dashboard showing candidate activity, Japanese and Taiwanese influencer lists, and the Scout chat');
  attribute('#scout-motion', 'title', 'V3 influencer seeding agent demonstration');
  html('.hero-media figcaption', 'V3 influencer seeding agent interface');

  html('#background', 'Trying influencer outreach as paid work');
  html('#background + .section-copy .body-copy:nth-child(1)',
    'In June 2026, I had just finished my <a href="/instagram-card-agent">Instagram Card Agent</a> project and was learning to build smaller tools through vibe coding. I was also trying to find a way to earn money with AI. ChatGPT suggested influencer outreach, so I gave it a try. The work involved connecting Japanese influencers visiting Korea with local restaurants and beauty businesses.');
  html('#background + .section-copy .body-copy:nth-child(2)',
    'For the first two days, I found candidates through ChatGPT and contacted them myself. But checking for duplicates, keeping track of whom I had already contacted, and copying messages one by one quickly became tedious. <mark>That was when I decided to automate the process.</mark>');

  html('#design', 'Automating the outreach workflow');
  html('#design + .section-copy .body-copy',
    'I started by writing down the steps I followed in my day-to-day work. I divided them into three parts: finding candidates, drafting messages, and sending them. I then applied the modular approach I had used in my earlier <a href="/instagram-card-agent">Instagram Card Agent ↗</a> project.');
  attribute('#design ~ .work-list', 'aria-label', 'Three functions in the influencer outreach workflow');
  html('#design ~ .work-list li:nth-child(1) h3', 'Automated candidate discovery');
  html('#design ~ .work-list li:nth-child(1) p',
    'I used Codex to build the tool, and Exa, Tavily, and free AI models to search for candidates repeatedly. Rather than relying on one tool for everything, I connected tools suited to different tasks. I also started paying attention to what each search cost and whether the workflow could run reliably every day, not just once.');
  html('#design ~ .work-list li:nth-child(2) h3', 'Personalized outreach messages');
  html('#design ~ .work-list li:nth-child(2) p',
    'I built a separate agent to draft a partnership message using each candidate’s information. This saved me from writing every message from scratch.');
  html('#design ~ .work-list li:nth-child(3) h3', 'Automating outreach across accounts');
  html('#design ~ .work-list li:nth-child(3) p',
    'Sending too many DMs from one Instagram account led to restrictions, so I spread the daily outreach across several accounts. I kept their sessions separate with Chrome profiles and automated the sending process using Playwright and OpenCode.');
  html('#design ~ .work-list + .section-copy .body-copy',
    'I saved candidate records and outreach history in Supabase. Building and testing each part separately made it easier to fix problems without disrupting the others. I finished the first working version in a day and put it to use right away.');

  html('#japan', 'My first earnings');
  html('#japan + .section-copy .body-copy:nth-child(1)',
    'The first version was just for me, so I did not worry much about the number of tabs. Finding candidates, drafting messages, and sending them all had separate screens. I added features as I needed them, and my daily routine settled into roughly 10 minutes in the morning, an hour in the afternoon, and 30 minutes in the evening.');
  html('#japan + .section-copy .body-copy:nth-child(2)',
    'I earned around KRW 500,000–600,000 in the first month. It was not much, but after six months of experimenting with AI and trying to turn it into income, I had finally made some money. I was genuinely happy. I had wanted to use AI to try work I could not have taken on alone and see whether it could actually pay. This was the first time it had worked. Even now, I could not run this kind of outreach by myself without AI.');
  html('#japan + .section-copy .body-copy:nth-child(3)',
    'Development, influencer outreach, translation, and automation all came together. I could connect those pieces because of the tools I had built and the things I had tried along the way. Many of those smaller experiments never made it into this portfolio.');
  attribute('#japan ~ .product-media img', 'alt',
    'V1 Japan seeding dashboard showing account status, follower counts, and evidence of relevance to Korea');
  html('#japan ~ .product-media figcaption', 'V1: Japan outreach agent');

  html('#taiwan', 'Expanding to group buys in Taiwan');
  html('#taiwan + .section-copy .body-copy:nth-child(1)',
    'Over time, it became harder to find new Japanese influencers who were visiting or living in Korea, and the low campaign fees made the work less profitable. Then I received an offer to help sell a company’s own line of specialty footwear through group-buy campaigns in Taiwan. Instead of finding people planning to visit Korea, I now needed influencers interested in selling a product. That meant changing both how I selected candidates and how I approached them.');
  html('#taiwan + .section-copy .body-copy:nth-child(2)',
    'I spent the first day doing everything manually and noting what was slowing me down. On the second day, I built a new tool in three parts, tested them separately, and connected them. <mark>By day three, I was already using it for real work.</mark>');
  html('#taiwan + .section-copy .body-copy:nth-child(3)',
    'At night, I used OpenCode on an old laptop to find candidates. During the day, I contacted 80 people: 20 in the morning, 20 around lunchtime, and 40 in the evening. <mark>In the first month, I secured nine group-buy deals in Taiwan and earned revenue.</mark> Still, there were only so many creators with at least 30,000 followers who were open to group buys. I also had to consider how long I could keep finding new people to contact.');
  attribute('#taiwan ~ .taiwan-media img', 'alt',
    'Top of the V2 Taiwan group-buying agent, showing candidate activity, outreach tools, follower counts, and recent group-buying evidence');
  html('#taiwan ~ .taiwan-media figcaption', 'V2: Taiwan group-buy agent');

  html('#iteration', 'Making the tool easier to use');
  html('#iteration + .section-copy .body-copy',
    'For <a href="https://influencer-scout-ten.vercel.app" target="_blank" rel="noopener noreferrer">V3</a>, I wanted someone new to the tool to understand how to use it without my help. I made the steps that had become second nature to me clear on screen, so users could move from reviewing a candidate to preparing a message without losing their place. I found it easier to use myself, too.');
  attribute('#iteration ~ .work-list', 'aria-label', 'Four usability improvements in V3');
  html('#iteration ~ .work-list li:nth-child(1) h3', 'Japan and Taiwan in one workspace');
  html('#iteration ~ .work-list li:nth-child(1) p',
    'I brought the Japanese and Taiwanese candidate lists into one workspace, with tabs to switch between countries. Activity and saved items sit on the left, candidates in the center, and the chat on the right. This cut down on jumping between screens.');
  html('#iteration ~ .work-list li:nth-child(2) h3', 'Candidate details, search, and sorting');
  html('#iteration ~ .work-list li:nth-child(2) p',
    'For Japanese candidates, I showed evidence of visits to Korea. For Taiwanese candidates, I showed their previous group-buy activity. I also summarized foreign-language sources in Korean and added sorting by follower count and recommendation score, plus search by name, account, or email.');
  html('#iteration ~ .work-list li:nth-child(3) h3', 'Drafting outreach from candidate profiles');
  html('#iteration ~ .work-list li:nth-child(3) p',
    'Once I selected a candidate, I could draft a proposal in the same workspace using their profile information. There was no need to copy everything into a separate chat. The agent could provide the message in Japanese or Traditional Chinese alongside a Korean translation. I also added example prompts to help first-time users get started.');
  html('#iteration ~ .work-list li:nth-child(4) h3', 'New-candidate alerts and gamification');
  html('#iteration ~ .work-list li:nth-child(4) p',
    'When new candidates arrive, the counter goes up and an eagle flies across the screen. I also added an activity log showing saved candidates and timestamps, so it was easy to see what had changed. Part of the idea was simply to make checking for new candidates each hour a little more enjoyable.');
  html('#iteration ~ .work-list + .section-copy .body-copy',
    'The tool is designed so that <mark><strong>its discovery workflow can be adapted to different countries and outreach goals</strong></mark>. I could use a variation of the existing modules to find Mongolian creators planning to visit Korea, for example, or influencers suited to a food group buy in Korea. For a new project, I can update the candidate discovery module and <strong>reuse the existing message drafting and sending functions</strong>.');
  attribute('#v3-screen img', 'alt',
    'V3 agent interface with activity and saved candidates on the left, Japanese and Taiwanese candidate lists in the center, and the Scout chat on the right');
  html('#v3-screen figcaption span', 'V3 interface');
  html('#v3-screen .screen-try-link', 'Try it ↗');
  attribute('#v3-screen .screen-try-link', 'aria-label', 'Try the V3 influencer seeding agent in a new tab');

  html('#lessons', 'Beyond planning: building and running the product');
  attribute('.lesson-journal', 'aria-label', 'What I learned from planning and running the service');
  html('.lesson-entry:nth-child(1) .lesson-label', 'Problem framing');
  html('.lesson-entry:nth-child(1) h3', 'Turning everyday friction into features');
  html('.lesson-entry:nth-child(1) p',
    'As a PM, I was used to defining requirements and mapping user workflows. This time I was also the user, so I could turn the problems I ran into directly into features. Duplicate candidates needed a check against saved records. Multiple Instagram accounts needed separate login sessions. I enjoyed breaking each problem down and finding a practical way to solve it.');
  html('.lesson-entry:nth-child(2) h3', 'What should AI do, and what should I verify?');
  html('.lesson-entry:nth-child(2) p',
    'Just because AI could find candidates and draft messages did not mean I could trust every result. Sometimes the evidence for a candidate was weak, or a message included an unverified claim. I had to decide what AI could handle and what I still needed to check myself. Separating the workflow into stages also made it easier to catch and fix errors. The more I relied on AI, the more important clear review criteria and exception handling became.');
  html('.closing-copy .body-copy:nth-child(1)',
    'I am much more comfortable building tools with AI and letting it handle parts of my work. But watching AI take on more and more still makes me uneasy. Sometimes I wonder whether the things I am building will matter in the long run.');
  html('.closing-copy .body-copy:nth-child(2)',
    'Maybe that is why I have been thinking more about something that might change more slowly: the <mark>relationships</mark> we build with other people. I do not mean collecting as many contacts as possible. As language barriers become easier to cross, I want to work with people in other countries and build relationships that last.');

  attribute('nav[data-project-navigation]', 'aria-label', 'Explore other projects');
  html('nav[data-project-navigation] .project-list-link', 'All projects ↗');

  const koreanTitle = document.title;
  const englishTitle = 'KOL Scout | Dongho Park Portfolio';

  function applyLanguage(nextLanguage) {
    const english = nextLanguage === 'en';
    root.lang = english ? 'en' : 'ko';
    document.title = english ? englishTitle : koreanTitle;
    for (const entry of entries) {
      const value = english ? entry.english : entry.korean;
      if (entry.property === 'attribute') {
        if (value === null) entry.node.removeAttribute(entry.name);
        else entry.node.setAttribute(entry.name, value);
      } else entry.node[entry.property] = value;
    }
    localeButton.setAttribute('aria-pressed', String(english));
    localeButton.setAttribute('aria-label', english ? 'Switch to Korean' : 'Switch to English');
    localeButton.title = english ? 'Switch to Korean' : 'Switch to English';
    const light = root.dataset.theme === 'light';
    document.getElementById('theme-switch').setAttribute('aria-label', english
      ? (light ? 'Switch to dark mode' : 'Switch to light mode')
      : (light ? '블랙 모드로 전환' : '화이트 모드로 전환'));
    try { localStorage.setItem('portfolio-language', english ? 'en' : 'ko'); } catch (_) {}
  }

  let language = root.lang === 'en' ? 'en' : 'ko';
  localeButton.addEventListener('click', () => {
    language = language === 'ko' ? 'en' : 'ko';
    applyLanguage(language);
  });
  window.addEventListener('pageshow', () => {
    let stored;
    try { stored = localStorage.getItem('portfolio-language'); } catch (_) {}
    if (stored === 'en' || stored === 'ko') language = stored;
    applyLanguage(language);
  });
  window.addEventListener('storage', (event) => {
    if (event.key !== 'portfolio-language') return;
    language = event.newValue === 'en' ? 'en' : 'ko';
    applyLanguage(language);
  });
  applyLanguage(language);
})();
