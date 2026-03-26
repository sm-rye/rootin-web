# Rootin — 루틴 트래킹 웹앱

> 습관 형성을 도와주는 루틴 트래킹 웹앱.
> 매일 수행할 태스크를 루틴으로 묶어 관리하고, 링 캘린더로 달성률을 시각화한다.

**[🚀 데모 보기](https://react-monorepo-rootin.vercel.app/auth)** &nbsp;|&nbsp; **[서버 레포](https://github.com/mirea-shin/rootin-server)**

---

## 게스트 체험

회원가입 없이 바로 사용해볼 수 있어요.

로그인 페이지 하단 **게스트로 체험하기** 클릭 → 샘플 루틴 5개가 채워진 계정으로 즉시 입장.
데이터를 초기화하고 싶다면 로그아웃 후 다시 체험하기를 누르면 돼요.

---

## 주요 기능

| 기능 | 설명 |
|------|------|
| 루틴 관리 | 제목, 설명, 기간, 태스크 목록으로 루틴 생성·수정·삭제 |
| 일일 태스크 체크 | 날짜별 태스크 완료 토글, 오늘의 진행률 계산 |
| 링 캘린더 시각화 | 태스크별 동심원 링으로 날짜별 완료 현황 표현 |
| 루틴 필터·검색 | 상태(진행중/완료), 정렬(최신·오래된·이름순), 키워드 검색 |
| JWT 인증 | 토큰 자동 주입, 만료 시 자동 로그아웃 |
| 반응형 UI | 모바일 하단 네비게이션 / 데스크톱 사이드바 |

---

## 기술 스택

**Frontend**

| 분류 | 기술 |
|------|------|
| Framework | React 19, TypeScript |
| Build | Vite |
| Routing | React Router DOM v7 |
| Client State | Zustand |
| Server State | TanStack React Query |
| HTTP | Axios |
| Styling | Tailwind CSS 4.x |

**Backend** ([레포 바로가기](https://github.com/mirea-shin/rootin-server))

| 분류 | 기술 |
|------|------|
| Runtime | Node.js |
| Framework | Express 5 |
| ORM | Prisma 7 |
| Database | PostgreSQL |
| Auth | JWT + bcrypt |

---

## 시스템 구조

```
Vercel (React SPA)
       │
       │  REST API (JSON)
       ▼
Railway (Express 5 + Prisma)
       │
       ▼
PostgreSQL
```

---

## 아키텍처 — Feature-Sliced Design (FSD)

레이어 간 단방향 의존성을 강제하여 관심사를 명확히 분리했다.

```
src/
├── app/        → 앱 초기화, 라우터, 레이아웃
├── Pages/      → 라우트 단위 페이지
├── widgets/    → 복합 UI 블록 (루틴 목록, 링 캘린더, 사이드바 등)
├── features/   → 사용자 액션 (auth, routine CRUD, task 토글)
├── entities/   → 비즈니스 도메인 (auth, routine, task)
├── shared/     → 재사용 UI 컴포넌트 (Button, Input, Modal, Toast)
├── lib/        → Axios 인스턴스 (JWT 인터셉터)
└── constants/  → API 엔드포인트 상수
```

**의존 방향:** `app → Pages → widgets → features → entities → shared/lib`

---

## 핵심 구현

### 링 캘린더 (`widgets/task-ring`)
루틴의 각 태스크를 동심원 링으로 표현. 링 반경은 태스크 순서에 따라 안쪽부터 증가하고, 날짜별 완료 여부를 색상으로 구분한다.

### View / Edit 모드 전환 (루틴 상세)
CSS `translateX` + `opacity` 트랜지션으로 조회·편집 모드를 전환. 모바일은 수직 슬라이드, 데스크톱은 사이드 패널로 동작한다.

### 인증 흐름
```
로그인 → JWT를 localStorage 저장
      → axios 인터셉터에서 모든 요청에 Bearer 토큰 자동 주입
      → BaseLayout 진입 시 /auth/me로 토큰 유효성 검증
      → 401 수신 시 토큰 초기화 + /auth 리다이렉트
```

### 게스트 체험 (포트폴리오 데모용)
버튼 클릭 한 번으로 UUID 기반 임시 계정을 즉시 생성하고 샘플 데이터를 주입한다. 각 방문자는 독립된 환경에서 체험하며, 1시간 후 서버에서 자동 삭제된다.

---

## 개발 환경 설정

```bash
# 모노레포 루트에서
corepack enable && yarn install

# 개발 서버 실행
yarn dev:rootin
```

**환경 변수** (`.env.local`)

```env
VITE_API_URL=http://localhost:3000
```
