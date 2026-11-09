/* ChikLink portfolio translation. Original Korean markup remains the source of truth. */
(() => {
  'use strict';
  const root = document.documentElement;
  const button = (document.getElementById('language-switch') || document.createElement('button'));
  const translations = [
    ['.header-nav .header-link', [
      'Projects'
    ]],
    ['.chiklink-hero .subtitle', [
      'A Telegram mini app combining QR invitations, link promotion, and visit rewards'
    ]],
    ['.chiklink-role dt', ['Role']],
    ['.chiklink-responsibilities strong', [
      'Planning & Launch', 'Analysis & Testing', 'Partnerships & Ops'
    ]],
    ['.chiklink-responsibilities p', [
      'Designed QR invites, visit rewards, and link submissions',
      'Used Google Analytics and A/B testing to refine participation flows',
      'Secured advertisers, ran campaigns, and managed revenue'
    ]],
    ['.project-section > .section-no', [
      '01 Background', '02 Inviting Friends', '03 Link Submissions',
      '04 Improving Engagement', '05 Results & Reflections'
    ]],
    ['.project-section h2', [
      'User acquisition through invitations',
      'From sharing a QR code to inviting friends',
      'A daily link draw designed to bring users back',
      'Improving the user journey with Google Analytics',
      '150,000 users and $3,000 in average monthly ad revenue'
    ]],
    ['.project-section[aria-labelledby="background"] > .body-copy', [
      'In 2024, Telegram mini apps that rewarded simple actions with points were gaining popularity. <a href="/tonament">Tonament</a> was a voting mini app we built around that trend. As I considered our next mini app, I noticed something else: people in the blockchain industry often exchanged contact details through Telegram.',
      'At conferences around the world, people often exchanged contact details by scanning Telegram QR codes rather than swapping business cards. <strong>Mini apps were growing in popularity just as Telegram-based networking was becoming routine.</strong> ChikLink brought these behaviors together by rewarding people for inviting friends while exchanging contact details.',
      'We did not need to build a new team from scratch. The team had already gained experience developing Tonament together. I proposed ChikLink, led product planning and coordinated development, and <strong>launched it in one week.</strong>'
    ]],
    ['.chiklink-context-photo figcaption', [
      'Attendees exchanging contact details through Telegram QR codes <span class="photo-source">Source: <a href="https://luma.com/dappsday" target="_blank" rel="noopener noreferrer">Luma</a></span>'
    ]],
    ['.project-section[aria-labelledby="invitation"] > .body-copy', [
      'At the time, many mini-app users expected that points might eventually be converted into tradable tokens. Returning to earn points and inviting friends for additional rewards had become familiar behaviors.',
      'ChikLink <strong>connected these incentives</strong> with <strong>the familiar practice of exchanging contacts</strong>. The app automatically generated a QR code for each user’s Telegram profile. When someone joined through that code, the inviter earned points. This allowed us to build user acquisition into an existing behavior rather than introducing a new one.'
    ]],
    ['.chik-screen-label', [
      'My QR Code', 'Before the First Invite', 'After Inviting Friends'
    ]],
    ['.chik-state-caption', [
      'QR code for my Telegram profile',
      'Prompt to invite your first friend',
      'Invited friends and rewards'
    ]],
    ['.chik-submission-section .chik-story-copy > .body-copy', [
      'QR sharing alone gave users little reason to return every day.<br>To address this, we built <mark>link submissions</mark> into DRAW from the outset. Users could submit a link to their own service or content for a chance to have it featured to the entire user base through a daily draw.'
    ]],
    ['.chik-entry-flow .chik-copy-label', [
      'User flow', 'User flow'
    ]],
    ['.chik-entry-flow .chik-flow-box strong', [
      'Submit button', 'Popup', 'Submit',
      'Select an egg', 'Popup', 'Visit link'
    ]],
    ['.chik-entry-flow .chik-flow-description', [
      'Start with “Enter the draw”',
      'Submit the link you want to promote',
      'Winner announced at 9 a.m. the following day',
      'Tap an egg to reveal the winning link',
      'See the winning link and reward',
      'Visit the link to claim the reward'
    ]],
    ['.chik-entry-flow .chik-draw-rules', [
      '<span>The selected link was featured to all users for 24 hours.</span><span>URLs were automatically screened, with invalid or inappropriate submissions excluded from the draw.</span>',
      'Visitors earned rewards, while the winning link gained exposure and visits.'
    ]],
    ['#chik-entry-hint', [
      'Tap “Enter the draw” on the screen to try submitting a link.'
    ]],
    ['#winning-link', ['Today’s winning link']],
    ['.chiklink-winning .ckp-footer > span', [
      'Tap an egg to reveal the winning link'
    ]],
    ['.chik-demo-reset span', ['Start over']],
    ['.chik-ga .chik-ga-intro', [
      'After launch, I used Google Analytics to examine how users moved from the home screen to invitations and link submissions.<br>Drop-off points and traffic sources helped us prioritize improvements.'
    ]],
    ['.chik-ga-keyword', [
      'Mapping the journey', 'Simplifying submissions', 'Comparing traffic sources'
    ]],
    ['.chik-ga-description', [
      '<span>GA Path Exploration showed how people navigated from the home screen to invitations and link submissions.</span><span>Identifying where they dropped off helped me <strong>prioritize changes to the user journey.</strong></span>',
      '<span>GA Funnel Exploration helped me compare completion and drop-off at each step, from opening the submission screen to submitting a link.</span><span>I then <strong>reduced the number of input fields</strong> and clarified the instructions and error messages.</span>',
      '<span>GA Traffic Acquisition reports let me compare traffic volume and invitation or submission activity by source.</span><span>I evaluated channels based not only on visits but also on <strong>whether those visits led to participation.</strong></span>'
    ]],
    ['.chik-operations[aria-labelledby="results"] > .body-copy', [
      'ChikLink reached <strong>150,000 users in total</strong> and generated an average of <strong>$3,000 in monthly advertising revenue</strong>. Alongside improving invitation and submission flows, I handled advertiser outreach, campaign execution, and revenue management.',
      'ChikLink also attracted partnership interest. I presented it at Philippine Blockchain Week, Consensus Hong Kong, and several meetups, where we received collaboration proposals. A couple of these led to partnerships and opportunities to connect ChikLink with other services.',
      'We were ultimately unable to continue operating ChikLink. As the mini-app market slowed, the company also shifted resources toward its mainnet and new DApp initiatives. Despite gaining users, revenue, and partnership opportunities, we had to redirect our efforts to other projects.'
    ]],
    ['.chik-operations[aria-labelledby="results"] .design-story h3', [
      'Learning from the user journey, not just acquisition'
    ]],
    ['.chik-operations[aria-labelledby="results"] .design-story .body-copy', [
      'After launch, I examined where users dropped off. GA Path Exploration revealed their routes after the home screen, while Funnel Exploration highlighted friction between opening the submission form and completing it. I used these findings to <strong>simplify the input fields</strong> and improve the guidance and error messages.',
      'This experience taught me to <mark><strong>turn data into specific product changes.</strong></mark> Instead of simply noting that submission volume was low, I could identify where users stopped and what needed to change on that screen. Since then, I have tried to define both the action a user should complete and the metric that will show whether a feature works, so improvements continue after launch.'
    ]],
    ['nav[data-project-navigation] .project-list-link', ['All projects ↗']]
  ];

  const registered = [];
  for (const [selector, englishValues] of translations) {
    const nodes = [...document.querySelectorAll(selector)];
    if (nodes.length !== englishValues.length) {
      console.error('[ChikLink i18n] Translation mismatch:', selector, nodes.length, englishValues.length);
      continue;
    }
    nodes.forEach((node, index) => {
      registered.push({ node, ko: node.innerHTML, en: englishValues[index] });
    });
  }

  const attributes = [
    ['.header-nav', 'aria-label', 'Main navigation'],
    ['.chiklink-responsibilities', 'aria-label', 'Responsibilities'],
    ['.chiklink-context-photo img', 'alt', 'Conference attendees networking near a QR sign at a Telegram mini-app event'],
    ['.chik-gallery [data-initial="qr"] .ckp-shell', 'aria-label', 'Personal QR and Leo Park profile, with 32 total friends and zero invitations today'],
    ['.chik-gallery [data-initial="invite"] .ckp-shell', 'aria-label', 'CHIK character inviting the first friend when the friend count is zero'],
    ['.chik-gallery [data-initial="friends"] .ckp-shell', 'aria-label', 'List of invited friends and their rewards'],
    ['.chik-gallery [data-initial="qr"] iframe', 'title', 'ChikLink personal QR code'],
    ['.chik-gallery [data-initial="invite"] iframe', 'title', 'ChikLink first-invitation guide'],
    ['.chik-gallery [data-initial="friends"] iframe', 'title', 'ChikLink friend rewards'],
    ['.chiklink-submit iframe', 'title', 'Try the ChikLink Draw link submission'],
    ['.chiklink-winning iframe', 'title', 'Try revealing the ChikLink Draw winning link'],
    ['.chik-entry-flow .chik-keyword-flow:first-of-type', 'aria-label', 'User flow for link submissions'],
    ['.chik-submission-section .chiklink-winning .chik-keyword-flow', 'aria-label', 'User flow for visiting a winning link'],
    ['.chik-demo-reset', 'aria-label', 'Restart the winning link demo'],
    ['.chik-ga-items', 'aria-label', 'Google Analytics features and use cases'],
    ['nav[data-project-navigation]', 'aria-label', 'Other projects']
  ];
  const attributeRecords = [];
  for (const [selector, name, en] of attributes) {
    const node = document.querySelector(selector);
    if (!node) { console.error('[ChikLink i18n] Missing attribute target:', selector); continue; }
    attributeRecords.push({ node, name, ko: node.getAttribute(name), en });
  }
  const meta = document.querySelector('meta[name="description"]');
  const titles = {
    ko: 'ChikLink | 박동호 포트폴리오',
    en: 'ChikLink | Leo Park Portfolio'
  };
  const descriptions = {
    ko: meta?.content || '',
    en: 'ChikLink is a Telegram mini app that connects QR invitations, visit rewards, and daily link promotions. A product case study covering launch, GA-led improvements, partnerships, and results.'
  };
  const themeButton = document.getElementById('theme-switch');
  const updateThemeLabel = () => {
    const light = root.dataset.theme === 'light';
    themeButton.setAttribute('aria-label', root.lang === 'en'
      ? (light ? 'Switch to dark mode' : 'Switch to light mode')
      : (light ? '블랙 모드로 전환' : '화이트 모드로 전환'));
  };

  let language;
  function applyLanguage(next) {
    language = next === 'en' ? 'en' : 'ko';
    root.lang = language;
    for (const entry of registered) entry.node.innerHTML = entry[language];
    for (const entry of attributeRecords) {
      const value = entry[language];
      if (value === null) entry.node.removeAttribute(entry.name);
      else entry.node.setAttribute(entry.name, value);
    }
    document.title = titles[language];
    if (meta) meta.content = descriptions[language];
    button.setAttribute('aria-pressed', String(language === 'en'));
    button.setAttribute('aria-label', language === 'en' ? '한국어로 전환' : 'Switch to English');
    button.title = language === 'en' ? '한국어로 전환' : 'Switch to English';
    updateThemeLabel();
    try { localStorage.setItem('portfolio-language', language); } catch (_) {}
    document.dispatchEvent(new CustomEvent('portfolio:languagechange', { detail: { language } }));
  }
  button.addEventListener('click', () => applyLanguage(language === 'en' ? 'ko' : 'en'));
  themeButton.addEventListener('click', updateThemeLabel);
  let initial = root.lang === 'en' ? 'en' : 'ko';
  try { initial = localStorage.getItem('portfolio-language') === 'en' ? 'en' : 'ko'; } catch (_) {}
  applyLanguage(initial);
})();
