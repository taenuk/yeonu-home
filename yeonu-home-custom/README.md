# YEONU Personal Home

O.HOME의 운영 방식처럼 **GitHub → Vercel → Supabase**로 배포하는 개인 홈페이지 템플릿입니다. 디자인과 페이지 구조는 별도로 구성했습니다.

## 포함된 기능

- pastel blue / lavender 기반 개인 홈
- PROFILE: 프로필 이미지, 소개, LOVE / HATE
- CHARACTERS: 캐릭터 카드 → 상세 모달
- PROMPTS: 제목/분류/태그/프롬프트 + COPY 버튼
- LINKS: 외부 링크 목록
- MOVING IMAGE BANNER: 여러 이미지 무한 가로 슬라이드 + 이미지별 선택적 링크
- FRIEND BANNERS: 별도 정적 배너, 최대 520px 표시 폭
- ADMIN: 로그인 후 프로필/캐릭터/프롬프트/링크/배너 CRUD, 순서 변경, 이미지 URL/파일 업로드
- Supabase Auth + Postgres + Storage + RLS
- BGM: 관리자에서 음원 URL/파일 업로드, 자동재생/반복재생 설정
- 첫 가입 계정을 자동 admin으로 만드는 DB 트리거

## 1. GitHub에 올리기

1. GitHub에서 새 repository를 만듭니다. 예: `yeonu-home`
2. 이 프로젝트 폴더의 파일을 업로드하거나 git으로 push합니다.
3. `.env.example`은 참고용입니다. 실제 비밀키는 GitHub에 올리지 마세요.

## 2. Supabase 만들기

1. Supabase에서 새 Project를 만듭니다.
2. SQL Editor에서 `supabase/schema.sql` 전체를 그대로 실행합니다.
3. Authentication → Providers에서 Email 로그인을 켭니다.
4. Settings → API에서 Project URL과 anon public key를 확인합니다.

> 첫 번째로 회원가입한 계정이 admin이 됩니다. 이미 테스트 계정을 만든 경우에는 SQL에서 해당 profile의 role을 admin으로 바꿔 주세요.

## 3. Vercel 배포

O.HOME README와 같은 흐름입니다.

1. Vercel에서 GitHub로 로그인
2. Add New → Project
3. 방금 만든 `yeonu-home` repository를 Import
4. Environment Variables에 아래 두 값을 넣습니다.

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

5. Deploy

## 4. 관리자 첫 로그인

배포한 주소에서 `/admin`으로 이동합니다.

첫 계정은 `CREATE FIRST ACCOUNT`로 가입합니다. Supabase 이메일 확인이 켜져 있으면 이메일 인증을 끝낸 뒤 다시 로그인합니다.

로그인되면 ADMIN 화면에서 전부 수정할 수 있습니다.

## 5. 이미지 사용

### 외부 URL

관리자 화면의 IMAGE URL에 이미지 주소를 붙여 넣습니다.

### 파일 업로드

배너 항목의 UPLOAD에서 파일을 선택합니다.

BGM은 PROFILE / SITE → BGM에서 음원 URL을 넣거나 오디오 파일을 업로드할 수 있습니다. 자동재생과 반복재생도 켜고 끌 수 있습니다. 브라우저 정책상 음원이 있는 자동재생이 막히는 경우에는 사이트에 `CLICK TO PLAY` 버튼이 표시됩니다. Supabase Storage `media` 버킷에 업로드되고 public URL이 자동 입력됩니다.

## 6. 서울 리전

한국에서 사용할 경우 Vercel Project Settings → Functions에서 가능한 경우 Seoul 계열 리전을 선택하는 것을 권장합니다. 변경 후 최신 배포를 다시 배포하세요.

## 7. 로컬 실행

Node.js 설치 후:

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:3000`을 엽니다.

## 원본 O.HOME을 설치하는 경우

원본 저장소: https://github.com/w00j00working/O.home

원본 README의 기본 절차는 **Fork → Vercel Import → 배포 → Supabase/Firebase 연결 → 첫 계정 생성**입니다. 원본은 Supabase와 Firebase 두 백엔드를 지원합니다.

## 8. PAIRS / 로그 백업

- PAIRS 탭에서 페어를 무제한으로 추가/삭제/순서변경할 수 있습니다.
- 각 페어에 캐릭터 A/B를 연결하고 이미지, 설명, 태그를 설정합니다.
- 페어 카드를 누르면 해당 페어의 상세 영역과 LOG ARCHIVE가 열립니다.
- 관리자에서 페어별 로그를 무제한으로 추가/수정/삭제할 수 있습니다.
- `EXPORT PAIR`는 해당 페어와 로그를 JSON으로 백업합니다.
- `BACKUP ALL LOGS`는 모든 페어와 로그를 하나의 JSON으로 백업합니다.
- `IMPORT BACKUP`으로 이전 JSON 백업을 다시 불러올 수 있습니다.
