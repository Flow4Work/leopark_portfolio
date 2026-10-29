// WEB 프로젝트 3개와 MOBILE 프로젝트 4개를 각각 관리합니다.
// webImage/mobileImage/icon에 실제 이미지 경로를 넣으면 텍스트 미리보기가 대체됩니다.
// WEB 이미지 권장 크기: 475.5 x 297.19px (16:10). MOBILE 이미지는 9:16 비율.

window.PORTFOLIO_WEB_SERVICES = [
  {
    id: "law-project",
    name: "LAW PROJECT",
    initials: "LAW",
    href: "/law-project",
    type: "AI 법률 로드맵",
    description: "법률 상담과 대응 절차 흐름도",
    previewLabel: "상담에서 후속 절차까지",
    webImage: "./assets/law-showcase-fit-20261029.jpg",
    icon: ""
  },
  {
    id: "kol-scout",
    name: "KOL Scout",
    initials: "TK",
    href: "/kol-scout",
    type: "AI KOL 스카우터",
    description: "일본·대만 KOL 발굴과 협업 운영",
    previewLabel: "KOL 발굴부터 협업 운영까지",
    webImage: "./assets/kol-scout-v3-screen.png",
    previewDemo: "./assets/scout-demo.html",
    icon: "./assets/home-kol-icon.webp"
  },
  {
    id: "instagram-card-agent",
    name: "Instagram Card Agent",
    initials: "IG",
    href: "/instagram-card-agent",
    type: "AI 콘텐츠 자동화",
    description: "일본어 맛집 카드뉴스 제작",
    previewLabel: "인스타그램 카드뉴스 자동 제작",
    webImage: "./assets/instagram-card-agent-1.webp",
    demoSlides: [
      "./assets/instagram-card-agent-slide-1.webp",
      "./assets/instagram-card-agent-slide-2.webp",
      "./assets/instagram-card-agent-slide-3.webp"
    ],
    icon: "./assets/home-instagram-icon.webp"
  }
];

// 모바일 중심 프로젝트. 상세 페이지의 하단 탐색도 이 순서를 따릅니다.
window.PORTFOLIO_MOBILE_SERVICES = [
  {
    id: "kokochizu",
    name: "코코치즈",
    initials: "K",
    href: "/kokochizu",
    type: "외국인 여행 서비스",
    description: "맛집 지도와 예약 대행",
    previewLabel: "맛집 지도와 예약 대행",
    mobileImage: "./assets/home-kokochizu-motion.webp",
    icon: "./assets/kokochizu-logo.png"
  },
  {
    id: "tonament",
    name: "Tonament",
    initials: "T",
    href: "/tonament",
    type: "텔레그램 미니앱",
    description: "투표하고 보상받는 게임",
    previewLabel: "투표하고 보상받는 게임",
    mobileImage: "./assets/home-tonament-preview.webp",
    previewTemplate: "tonament-tap-preview",
    icon: "./assets/chiklink-logo.webp"
  },
  {
    id: "chiklink",
    name: "ChikLink",
    initials: "C",
    href: "/chiklink",
    type: "텔레그램 미니앱",
    description: "친구 초대와 링크 홍보",
    previewLabel: "친구 초대와 링크 홍보",
    mobileImage: "./assets/home-chiklink-draw-reference.png",
    previewTemplate: "chiklink-draw-preview",
    previewTitle: "ChikLink 알이 흔들리는 DRAW 화면 미리보기",
    icon: "./assets/tonament-logo.webp"
  },
  {
    id: "ownerbe",
    name: "OwnerBe",
    initials: "O",
    href: "/ownerbe",
    type: "콘텐츠 커뮤니티",
    description: "광고 수익을 나누는 곳",
    previewLabel: "광고 수익을 나누는 곳",
    mobileImage: "./assets/home-ownerbe-preview.webp",
    icon: "./assets/home-ownerbe-logo.png"
  }
];

// 상세 페이지 공통 하단 탐색. 메인에 표시된 WEB → MOBILE 순서를 따릅니다.
(() => {
  const mounts = document.querySelectorAll('nav[data-project-navigation]');
  if (!mounts.length) return;
  const seen = new Set();
  const projects = [...window.PORTFOLIO_WEB_SERVICES, ...window.PORTFOLIO_MOBILE_SERVICES].filter(project => {
    const key = project.href || project.id;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  const style = document.createElement('style');
  style.textContent = `
    nav[data-project-navigation] {max-width:860px;margin:45px auto 0;border-top:1px solid var(--line);padding-top:23px;display:flex;justify-content:space-between;gap:20px;font-size:13px;font-weight:600;}
    nav[data-project-navigation] a {color:#77aaff;text-decoration:none;line-height:1.6;}
    html[data-theme="light"] nav[data-project-navigation] a {color:#145bc5;}
    nav[data-project-navigation] a:hover {text-decoration:underline;text-underline-offset:4px;}
    nav[data-project-navigation] a:focus-visible {outline:2px solid currentColor;outline-offset:5px;}
    nav[data-project-navigation] .project-list-link {margin-left:auto;white-space:nowrap;}
    @media(max-width:560px) {nav[data-project-navigation] {flex-wrap:wrap;font-size:12px;margin-top:34px;}}
  `;
  document.head.append(style);
  mounts.forEach(nav => {
    const index = projects.findIndex(project => project.id === nav.dataset.projectNavigation);
    if (index < 0) return;
    const next = projects[index + 1];
    nav.replaceChildren();
    nav.setAttribute('aria-label', '다른 프로젝트');
    if (next) {
      const link = document.createElement('a');
      link.href = next.href || '/#project-' + next.id;
      link.textContent = next.name + ' ↗';
      if (!next.href) link.setAttribute('aria-label', '프로젝트 목록의 ' + next.name + '로 이동');
      nav.append(link);
    }
    const list = document.createElement('a');
    list.className = 'project-list-link';
    list.href = '/';
    list.textContent = '프로젝트 목록으로 ↗';
    nav.append(list);
  });
})();
