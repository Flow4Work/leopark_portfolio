// Kokochizu bilingual copy; original Korean remains in the HTML.
(() => {
  'use strict';
  const english = new Map(Object.entries({
  "외국인 여행자를 위한 로컬 지도 코코치즈와 예약 대행 daijobu를 기획하고 만든 기록.": "How I designed and built Kokochizu, a restaurant discovery map for international visitors to Korea, and Daijobu, a reservation assistance service.",
  "코코치즈 | 박동호 포트폴리오": "Kokochizu | Leo Park Portfolio",
  "상단 메뉴": "Main navigation",
  "프로젝트": "Project",
  "화이트 모드로 전환": "Switch to light mode",
  "코코치즈": "Kokochizu",
  "한국을 찾는 외국인 여행자를 위한 로컬 지도와 예약 대행 서비스": "A restaurant discovery map and reservation assistance service for visitors to Korea",
  "프로젝트 정보": "Project details",
  "개인 프로젝트": "Personal project",
  "담당 역할": "My role",
  "기획 & 바이브코딩": "Planning & vibe coding",
  "기간": "Period",
  "서비스 보기 1: 코코치즈 새 창에서 열기": "Open Kokochizu in a new tab",
  "서비스 보기 1": "View Kokochizu",
  "서비스 보기 2: daijobu 새 창에서 열기": "Open Daijobu in a new tab",
  "서비스 보기 2": "View Daijobu",
  "01 배경": "01 Background",
  "관심 있던 로컬 비즈니스에서, 외국인 여행자의 불편을 찾았다": "Travelers' pain points in local businesses",
  "앞서": "As I noted in",
  "에서 언급했듯, 나의 관심사는 로컬 비즈니스, 해외 시장, AI, 세일즈였다. 그중 한국을 찾는 외국인 관광객이 눈에 들어왔다. 여행자가 동네 가게를 찾고 이용하는 과정에서 어떤 불편을 겪는지 살펴보기로 했다.": ", my interests lay in local businesses, overseas markets, AI, and sales. I became curious about the experiences of people visiting Korea and started looking into what made it difficult for them to find and use neighborhood businesses.",
  "관심 분야인 로컬 비즈니스, 글로벌 시장, AI, 세일즈를 표현한 네 개의 구체": "Four spheres representing my areas of interest: local business, global markets, AI, and sales",
  "프로젝트를 시작할 때 관심을 두었던 분야": "The areas that interested me when I started the project",
  "02 문제 탐색": "02 Understanding the problem",
  "한국을 찾는 외국인 관광객은 어떤 불편을 겪고 있을까?": "Where do travelers struggle in Korea?",
  "2026년 9월까지 한국을 찾은 외국인 관광객은 약 1,700만 명으로, 전년 대비 21% 늘었다. (": "From January to September 2026, 17.11 million international visitors came to Korea, up 21.5% from the same period in 2025. (",
  "관련 기사": "Related article",
  "이전의 한국은 외국인 관광객이 많지 않았기에 그들이 겪을 문제점이 많다고 가정했다. 그래서 구체적으로 어디서 불편을 겪는지 조사했다. 참고한 리서치에서는": "As inbound tourism grew, I suspected that everyday services might not always meet overseas visitors' needs. Rather than rely on that assumption, I looked for evidence of where they faced friction. The studies I reviewed pointed to challenges with",
  "지도": "finding places on maps",
  "와": " and",
  "길찾기, 예약, 가입": "making reservations",
  "과 인증이 주요 불편으로 나타났다.": ", along with account registration and identity verification.",
  "외국인 관광객의 주요 불편: 지도와 길찾기 31%, 예약 28%, 가입과 인증 27%. 네이버 지도 다국어 지원 부족 36.4%, 구글 지도 도보 길찾기 등 기능 제한 31.2%.": "Main challenges reported by international visitors: maps and directions 31%, reservations 28%, account registration and verification 27%. Limited multilingual support on Naver Maps 36.4%; Google Maps feature restrictions, including walking directions, 31.2%.",
  "외국인이 겪는 주요 불편: 지도 및 길찾기 31%, 가게 등 예약 28%, 가입 및 인증 27%": "Challenges faced by overseas visitors: maps and directions 31%, reservations 28%, registration and verification 27%",
  "네이버 지도 불편 원인": "Problems with Naver Maps",
  "다국어 지원 부족 36.4%, 기타 63.6%": "Limited multilingual support 36.4%; other reasons 63.6%",
  "구글 지도 불편 원인": "Problems with Google Maps",
  "외국인 기준": "Reported by international visitors",
  "도보 길찾기 등 기능 제한 31.2%, 기타 68.8%": "Restrictions on features such as walking directions 31.2%; other reasons 68.8%",
  "출처: 야놀자 리서치 2026 / 한국관광공사": "Research references: Yanolja Research (2026); Korea Tourism Organization (2024)",
  "지도 비교": "Comparing map services",
  "네이버 지도와 구글 지도를 일본어·영어로 바꿔 사용해 봤다.": "I tried Naver Maps and Google Maps with their interfaces set to Japanese and English.",
  "네이버 지도": "Naver Maps",
  "는 언어 설정을 바꿔도 메뉴판과 일부 거리 이름이 한국어로 남아 있는 경우가 많았다.": " often still displayed menus and some street names in Korean, even after changing the language.",
  "구글 지도": "Google Maps",
  "에서는 폐업한 가게와 번역되지 않은 메뉴를 여러 번 발견했다.": " sometimes listed closed businesses or showed menus that had not been translated.",
  "03 현장 인터뷰": "03 In-person interviews",
  "성수에서 15팀에게 직접 물었다": "I spoke with 15 groups of travelers in Seongsu",
  "이전까지 8년여 동안 블록체인, 이른바 Web3 업계에서 일했다. 전 세계에서 열리는 컨퍼런스에 참여하고 상장과 협업 등 해외 업체와의 업무를 맡았다. 영어를 잘하지는 못했지만,": "I spent roughly eight years working in blockchain and Web3, attending conferences around the world and working with overseas companies on listings and partnerships. My English was not fluent, but",
  "생존 영어 스킬은 늘어나 있었다.": "I had learned to make myself understood.",
  "다양한 나라의 사람들과 아무렇지 않게 대화를 시작하는 너스레도 늘어 있었다. 그 경험을 이번에도 활용해 보기로 했다.": "I also became comfortable starting conversations with people from different countries. I decided to put those skills to use again.",
  "집에서 가까운 성수역으로 나가 길에서 만난 외국인 여행자에게 짧게 서비스를 소개했다. 이런 서비스가 필요한지, 한국에서 가게를 이용하며 무엇이 불편했는지 물었다. 하루 5팀을 목표로 시작했고,": "I went to Seongsu Station near my home and introduced the idea to travelers I met on the street. I asked what was difficult about visiting restaurants in Korea and whether a service like this might help. I set a goal of speaking with five groups a day and",
  "이틀가량 총 15팀과 이야기했다.": "ended up talking with 15 groups in about two days.",
  "일본어는 하지 못해 영어로 대화할 수 있는 사람들에게 말을 걸었다.": "Since I did not speak Japanese, I approached travelers who could communicate in English.",
  "그들이 이야기해 준 한국 여행의 불편은 크게 세 가지였다.": "Three issues came up repeatedly.",
  "메뉴판의 문제": "Reading menus",
  "한국어 메뉴판을 이해하기 어려웠고, 네이버 지도나 구글 지도에서도 메뉴가 번역되지 않은 채 표시되는 경우가 있었다.": "Korean-language menus were difficult to understand, and menus on Naver Maps or Google Maps were sometimes shown without translation.",
  "번역의 문제": "Getting translations",
  "구글 렌즈나 AI를 쓰고 있었지만 번역 품질이 아쉽고, 매번 번역을 요청하거나 답변을 기다리는 과정도 번거로웠다.": "Many travelers were already using Google Lens or AI, but the translations were not always reliable. Having to translate each item and wait for a response was also tedious.",
  "예약의 문제": "Making reservations",
  "한국 전화번호나 본인인증이 필요하거나, 매장에 한국어로 연락해야 하는 예약 과정에서도 어려움을 겪고 있었다.": "Reservations could require a Korean phone number, identity verification, or contacting a restaurant in Korean.",
  "몇몇 인터뷰어는 인스타그램을 교환하고 예비 고객(?) 겸 친구가 되기도 하였다. 다만 주 타깃이었던 일본인과는 한 건도 인터뷰하지 못한 점이 아쉬웠다. 일본어를 하지 못해 영어로 대화할 수 있는 여행자의 의견을 주로 들었고, 일본인 여행자에게도 같은 수요가 있는지는 확인하지 못했다.": "I exchanged Instagram accounts with a few interviewees, and some became potential customers or friends. But I never spoke to any Japanese travelers, despite choosing them as my primary audience. Because I had only spoken with travelers who could communicate in English, I could not assume Japanese visitors had the same needs.",
  "그럼에도 인터뷰와 지도 비교를 바탕으로 기본 방향은 잡을 수 있었다. 여행자가 매번 검색하고 번역해야 하는": "Even so, the interviews and map comparisons gave me a starting point. I wanted to remove the",
  "귀찮은 일": "repetitive work",
  "을 미리 해 주는 서비스를 만들기로 했다. 외국인이 자주 찾는 지역의 음식점을 대상으로,": " of searching and translating. For restaurants in neighborhoods popular with international visitors, the plan was to provide",
  "영어·일본어 메뉴 → 음식 사진과 설명 → 메뉴 이름의 한국어 발음 → 직원에게 보여줄 주문 화면": "English and Japanese menus → food photos and descriptions → Korean pronunciation of dish names → an ordering screen to show restaurant staff",
  "까지 한 번에 제공하는 구상이었다.": " in one place.",
  "04 코코치즈": "04 Kokochizu",
  "가게를 찾고, 메뉴를 고르고, 주문하기까지": "From restaurant discovery to ordering",
  "코코치즈 이름의 의미": "Meaning behind the name Kokochizu",
  "코코치즈 로고: 웃는 치즈 모양의 지도 핀": "Kokochizu logo: a smiling, cheese-shaped map pin",
  "ココ(여기) + チズ(지도). “여기 좋은 곳 있어”라는 뜻을 담은, 친근한 일본 감성의 지역 탐색 서비스.": "ココ (koko, 'here') + チズ (chizu, 'map'). A friendly, Japanese-inspired local discovery service built around the idea of 'There's a good place right here.'",
  "인터뷰와 조사 경험을 바탕으로, 여행자들이 겪는 불편과 번거로움을 덜어 줄 ‘코코치즈’라는 웹 서비스를 만들기 시작했다. 처음부터 전국을 다루기에는 범위가 컸기에 외국인 방문이 많은 홍대와 성수 두 지역으로 초기 범위를 좁혔다. 영어권은 구체적인 타깃을 정하기 어렵다고 생각해, 고민 끝에 일본인 여행자를 우선 타깃으로 정했다. 코코치즈에서는 일본어와 영어로 메뉴와 가격을 미리 확인하고, 필요하면 예약 대행까지 이어갈 수 있도록 구성했다.": "Using what I learned from the interviews, I started building Kokochizu, a web app designed to make restaurant discovery easier for travelers. Covering all of Korea from the outset would have been too ambitious, so I began with Hongdae and Seongsu, two popular neighborhoods for international visitors. Because I could not easily define a specific English-speaking audience, I chose Japanese travelers as my initial focus. Visitors can browse menus and prices in English or Japanese and move on to reservation assistance if needed.",
  "01 지역·음식별 탐색": "01 Explore by area and cuisine",
  "성수·홍대 음식점 탐색과 비교": "Discover restaurants in Seongsu and Hongdae",
  "성수와 홍대 중 동네를 고르면 가게 사진과 대표 메뉴, 가격을 한곳에서 볼 수 있게 했다. 음식 종류별로 골라보며 여러 가게를 쉽게 비교하도록 구성했다.": "Visitors choose Seongsu or Hongdae to see restaurant photos, signature dishes, and prices together. Filtering by cuisine helps them compare options more easily.",
  "인터뷰에서는": "During the interviews, travelers mentioned",
  "구글 렌즈의 낮은 번역 정확도, 아쉬운 AI 번역 품질과 답변을 기다리는 시간": "poor translations from Google Lens and other AI tools, and the delay involved in getting responses",
  "이 불편으로 나왔다. 메뉴 정보를 영어·일본어로 미리 정리해, 가게를 볼 때마다 번역을 반복하지 않도록 했다.": " as recurring frustrations. I organized menu information in English and Japanese in advance, so travelers would not have to repeat the same translation steps for every restaurant.",
  "현재 앱에서 성수와 홍대의 가게 목록을 전환하고 스크롤하며 가게 사진, 대표 메뉴와 가격을 빠르게 비교하는 모습": "Current app demo showing users switching between Seongsu and Hongdae restaurant listings, scrolling through photos, signature dishes, and prices",
  "성수·홍대의 가게 목록 둘러보기": "Browsing restaurant listings in Seongsu and Hongdae",
  "02 메뉴 번역·주문": "02 Menu translation and ordering",
  "다국어 메뉴 확인과 한국어 주문 화면": "Menus in English and Japanese, with a Korean ordering screen",
  "메뉴명과 가격을 영어·일본어로 미리 정리해, 매번 번역하지 않고도 가게 상세에서 바로 확인할 수 있게 했다.": "I organized dish names and prices in English and Japanese so travelers could read them directly on each restaurant page without needing a separate translation tool.",
  "주문할 때는": "When they are ready to order, travelers can tap",
  "‘직원에게 보여주기’": "'Show to staff'",
  "를 누르면 한국어 메뉴명과 “이 메뉴 하나 주세요”라는 문구가 나타난다. 여행자는 이 화면을 직원에게 보여주면 된다.": " to display the dish name in Korean and a simple phrase meaning 'One of these, please.' They can show the screen directly to a staff member.",
  "현재 코코치즈에서 부오상회 을지로점의 사진을 바꾸고 메뉴를 스크롤한 뒤, 엔화 가격과 목록 보기, 한국어 주문 문구를 확인하는 모습": "Current Kokochizu demo showing the Buo Sanghoe Euljiro location, menu scrolling, yen prices, list view, and a Korean phrase to show staff when ordering",
  "부오상회 을지로점 · 메뉴 확인과 주문": "Buo Sanghoe, Euljiro: viewing the menu and ordering",
  "05 서비스 연결": "05 Connecting services",
  "AI 카드뉴스, 지도앱, 예약앱을 연결한 수익 모델": "Connecting content, maps, and reservations",
  "코코치즈는 무료 지도앱으로 기획했다. 여행자가 가게와 메뉴를 쉽게 찾도록 만들었지만, 그 자체로 수익을 내기는 어려웠다. 현장 인터뷰에서는 한국 전화번호와 본인인증, 매장과의 한국어 연락 때문에 예약도 어렵다는 이야기가 나왔다. 이 문제를 해결하면서 수익도 만들 수 있도록 예약 대행 서비스 다이조부를 추가로 만들었다.": "I designed Kokochizu as a free restaurant map. It made discovery easier, but the map alone offered no clear revenue model. Interviewees had also described how reservations could require Korean phone numbers, identity verification, or contacting restaurants in Korean. To address this and explore a potential revenue stream, I built Daijobu, a separate reservation assistance service.",
  "유입은 직접 만든": "I used the",
  "AI 카드뉴스 에이전트": "AI Instagram carousel agent",
  "가 맡았다. 음식점을 소개하는 콘텐츠로 관심을 끌고,": " I had built to create restaurant content designed to guide interested travelers to",
  "다이조부": "Daijobu",
  "로 이어지게 했다. 코코치즈에서 가게를 살펴본 여행자도 예약이 필요하면 다이조부로 이동하도록 연결했다.": ". Travelers who found a restaurant on Kokochizu could also move directly to Daijobu if they needed help making a reservation.",
  "즉, 콘텐츠로 이용자를 모으고, 지도앱에서 가게를 찾게 하며,": "Together, the three services were designed to attract travelers with content, help them explore restaurants on the map, and",
  "예약 대행에서 수수료를 받는 구조": "offer fee-based reservation assistance",
  "로 3개의 서비스를 묶었다.": ".",
  "3개의 서비스 연결구조": "How the three services work together",
  "AI 카드뉴스 에이전트에서 코코치즈 지도앱과 다이조부 예약앱으로 사용자가 유입됩니다. 코코치즈에서도 다이조부로 연결되며, 다이조부에서 예약 수수료 수익이 발생합니다.": "Restaurant content introduces visitors to Kokochizu and Daijobu. Kokochizu also links to Daijobu when booking help is needed, with a service fee as the proposed revenue model.",
  "사용자 유입": "Visitors",
  "수익 발생": "Service fee",
  "코코치즈 지도앱 새 창에서 열기": "Open the Kokochizu map in a new tab",
  "지도앱": "Map app",
  "AI 카드뉴스 에이전트 프로젝트 보기": "View the AI Instagram carousel agent project",
  "인스타그램": "Instagram",
  "카드뉴스 제작": "carousel content",
  "다이조부 예약앱 새 창에서 열기": "Open the Daijobu reservation service in a new tab",
  "예약앱": "Booking app",
  "지도앱(코코치즈) → 예약앱(다이조부)": "Kokochizu map → Daijobu reservations",
  "지도앱과 예약앱의 연결": "From discovery to reservation",
  "여행자가 지도앱에서 가게와 메뉴를 살펴보다 예약이 필요하면 별도의 예약앱 '다이조부'로 이동하도록 했다. 하나의 앱에 모든 기능을 넣기보다, 가게 탐색과 예약을 각각의 서비스에서 처리하는 구조를 선택했다. 대신 두 서비스가 끊기지 않도록 가게 정보를 전달해 자연스럽게 예약으로 이어지게 했다.": "When a traveler finds a restaurant on Kokochizu and needs a reservation, they can move to Daijobu. Rather than putting every feature in one app, I kept discovery and booking as separate services. Passing restaurant details between them helps make the transition straightforward.",
  "사용자는 원하는 날짜와 인원, 연락처를 남기면 요청이 내 이메일로 접수된다. 이후 내가 매장에 직접 연락해 예약을 진행하고, 결과를 여행자에게 안내하는 방식이다.": "Travelers submit their preferred date, party size, and contact details. The request reaches my email. I then contact the restaurant directly to arrange the reservation and share the outcome with the traveler.",
  "예약 대행 서비스 보기 ↗": "View Daijobu booking service ↗",
  "현재 예약 대행 서비스의 모바일 요청 화면을 스크롤하며 가게 URL, 희망 일시와 인원 입력 항목을 확인하는 모습": "Mobile demo of the reservation request form showing the restaurant URL, requested date and time, and party-size fields",
  "예약앱(다이조부)의 예약 요청 화면": "Daijobu reservation request screen",
  "06 회고": "06 Reflections",
  "불편은 직접 들었지만, 타깃 검증은 더 필요했다": "A clear problem, an untested audience",
  "성수에서 만난 여행자들은 이미 번역 도구를 쓰고 있었다. 그럼에도 메뉴를 이해하기 어렵거나 기다리는 시간이 불편하다는 이야기를 들었다. 기능이 있다는 것과 실제 여행 중 편하게 쓸 수 있다는 것은 다를 수 있음을 느꼈다.": "Travelers I met in Seongsu were already using translation tools. Even so, menus could be hard to understand and waiting for translations took effort. I realized that having a feature available is not the same as making it convenient during a trip.",
  "인터뷰의 한계": "Interview limitations",
  "15팀의 의견을 일본인 여행자의 수요로 볼 수는 없었다": "Fifteen interviews did not prove demand among Japanese travelers",
  "길에서 만나 영어로 대화할 수 있는 사람에게 물었기 때문에 의견을 들을 수 있는 범위가 한정됐다. 특히 주 타깃인 일본인의 반응은 확인하지 못했다. 불편을 들었다는 데서 멈추지 않고, 일본인 여행자가 서비스를 쓰는 과정도 직접 살펴볼 필요가 남았다.": "I approached travelers who could speak English, which limited the perspectives I heard. More importantly, I had not tested the service with Japanese travelers, my intended primary audience. I still needed to watch how they would actually use it before drawing conclusions about demand.",
  "경쟁 환경": "Competitive landscape",
  "AI와 기존 지도가 좋아진 뒤에도 쓸 이유가 필요했다": "The product needed a reason to exist as maps and AI improved",
  "인터뷰를 이어 갈수록 AI의 성능 향상과 구글 지도의 국내 서비스 변화도 함께 신경 쓰게 됐다. 기존 도구의 부족한 부분을 채우는 것만으로 서비스의 필요성이 오래 유지될지는 고민이었다. 번역을 제공하는 데서 더 나아가, 가게 선택부터 주문과 예약까지 얼마나 편하게 이어 주는지가 중요하다고 생각했다.": "As AI translation improved and Google Maps evolved in Korea, I started questioning how long a service built only to fill gaps in other tools would remain useful. The more lasting value, I felt, was helping travelers move from choosing a restaurant to ordering and booking with less effort.",
  "다음 확인": "What to validate next",
  "편리하다는 반응과 실제 예약 요청은 별도로 확인해야 했다": "Convenience alone does not mean people will book",
  "메뉴판의 불편을 듣는 것만으로 코코치즈를 계속 쓰거나 예약 대행을 이용할 것이라고 판단할 수는 없었다. 무료 탐색에서 실제 방문과 예약 요청으로 이어지는지, 어느 단계에서 멈추는지를 확인하는 일이 다음 과제로 남았다.": "Hearing complaints about menus was not enough to conclude that travelers would keep using Kokochizu or request paid booking help. I still needed to see whether restaurant discovery led to visits or reservation requests, and where people dropped off.",
  "다른 프로젝트": "Other projects",
  "프로젝트 목록으로 ↗": "All projects ↗",
  "블랙 모드로 전환": "Switch to dark mode",
  "프로젝트 목록의": "project from the list"
}));
  const hangul = /[가-힣]/;
  const textNodes = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      return node.parentElement?.closest('script,style,noscript') || !hangul.test(node.nodeValue)
        ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
    }
  });
  while (walker.nextNode()) textNodes.push({node: walker.currentNode, ko: walker.currentNode.nodeValue});
  const attributes = [];
  document.querySelectorAll('[alt],[aria-label],[title]').forEach(node => {
    for (const name of ['alt','aria-label','title']) {
      const ko = node.getAttribute(name);
      if (ko && hangul.test(ko)) attributes.push({node,name,ko});
    }
  });
  const root = document.documentElement;
  const languageButton = (document.getElementById('language-switch') || document.createElement('button'));
  const themeButton = document.getElementById('theme-switch');
  const description = document.querySelector('meta[name="description"]');
  const koreanDescription = description?.content || '';
  const koreanTitle = document.title;
  const nav = document.querySelector('.header-link[href="/"]');
  const original = word => english.get(word) || word;
  const localize = (value, en) => {
    if (!en || !hangul.test(value)) return value;
    const trimmed = value.trim();
    const translated = original(trimmed);
    return value.replace(trimmed, translated);
  };
  function syncLanguage() {
    const isEnglish = root.lang === 'en';
    for (const {node,ko} of textNodes) node.nodeValue = localize(ko,isEnglish);
    for (const {node,name,ko} of attributes) node.setAttribute(name,localize(ko,isEnglish));
    document.title = isEnglish ? original(koreanTitle) : koreanTitle;
    if (description) description.content = isEnglish ? original(koreanDescription) : koreanDescription;
    if (nav) nav.textContent = isEnglish ? 'Projects' : '프로젝트';
    const dark = root.dataset.theme === 'dark';
    themeButton?.setAttribute('aria-label',isEnglish
      ? (dark ? 'Switch to light mode' : 'Switch to dark mode')
      : (dark ? '화이트 모드로 전환' : '블랙 모드로 전환'));
    languageButton?.setAttribute('aria-label',isEnglish ? 'Switch to Korean' : 'Switch to English');
    languageButton?.setAttribute('title',isEnglish ? 'Switch to Korean' : 'Switch to English');
    languageButton?.setAttribute('aria-pressed',String(isEnglish));
  }
  try { root.lang = localStorage.getItem('portfolio-language') === 'en' ? 'en' : 'ko'; }
  catch (_) { root.lang = root.lang === 'en' ? 'en' : 'ko'; }
  languageButton?.addEventListener('click', () => {
    root.lang = root.lang === 'en' ? 'ko' : 'en';
    try { localStorage.setItem('portfolio-language',root.lang); } catch (_) {}
    syncLanguage();
  });
  themeButton?.addEventListener('click',syncLanguage);
  syncLanguage();
})();
