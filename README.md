# 박동호 포트폴리오

localhost:3200에서 운영하던 포트폴리오의 정적 웹사이트입니다.

## 로컬 실행

```sh
node server.js
```

http://localhost:3200 에서 확인합니다.

## 배포

- 공개 사이트: https://leopark-portfolio.vercel.app/
- GitHub: https://github.com/Flow4Work/leopark_portfolio
- `main` 브랜치에 push하면 연결된 Vercel 프로젝트에서 자동으로 배포합니다.

운영 배포의 원본은 이 저장소의 `main`입니다. 수정은 반드시 저장소에도 반영합니다. 별도 로컬 폴더만 배포하면 이후 Git 자동 배포에서 변경이 사라질 수 있습니다.

Vercel에서 이 저장소의 main 브랜치를 연결합니다. 빌드 과정이 없는 정적 HTML 사이트이며, `vercel.json`에서 확장자 없는 경로와 `/profile` 별칭을 설정합니다.

Law Map 대표 이미지와 메인 미리보기는 제공된 전체 화면 원본(1920 × 1080)을 원본 비율로 표시합니다.

## 배포 전 검사

```sh
node scripts/check-site.mjs
```

확장자 제거 리디렉션 이후의 URL을 기준으로 HTML/CSS의 로컬 자산 경로와 JavaScript 구문을 검사합니다. Vercel 빌드에서도 실행되며, 누락된 자산이 있으면 배포를 중단합니다. KOL Scout 데모는 실제 목록과 스타일이 준비된 뒤 표시하고, 준비되지 않은 동안에는 정적 대표 이미지를 유지합니다.

프로필의 베이스트레이드 표기와 간결한 경력 목록, Law Map 명칭도 검사해 이전 버전의 파일이 섞인 배포를 막습니다. 의도적으로 해당 내용을 바꿀 때에는 검사 기준도 함께 업데이트합니다.
