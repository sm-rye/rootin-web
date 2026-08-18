# Rootin — 루틴 트래킹 웹앱

> 반복할 행동을 루틴과 태스크로 구조화하고, 날짜별 수행 기록과 달성 추이를 시각화하는 웹앱입니다.

**[🚀 데모 보기](https://react-monorepo-rootin-three.vercel.app/)** &nbsp;|&nbsp; **[서버 저장소](https://github.com/sm-rye/rootin-server)**

## 프로젝트 개요

- 형태: 개인 프로젝트
- 담당: 프론트엔드 설계 및 구현
- 핵심 과제: 인증 상태, 서버 캐시, 반응형 레이아웃이 서로 영향을 주는 루틴 관리 흐름을 예측 가능하게 구성
- 저장소 구성: 이 저장소는 기존 React 모노레포에서 Rootin의 커밋 이력을 보존해 분리한 프론트엔드 저장소입니다.

### 📢 데모 안내

현재 백엔드 서버는 **Render 무료 플랜**으로 배포되어 있습니다.

- 일정 시간 요청이 없을 경우 서버가 절전 상태(Sleep)에 진입합니다.
- 이로 인해 **첫 요청은 20~60초 정도 소요될 수 있습니다.**
- 서버가 활성화된 이후에는 정상적인 응답 속도로 이용할 수 있습니다.

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
| 루틴 필터·검색 | 상태(진행중/완료), 정렬(최신·오래된·이름순), 키워드 검색 |
| 일일 태스크 체크 | 날짜별 태스크 완료 토글, 오늘의 진행률 계산 |
| 링 캘린더 시각화 | 태스크별 동심원 링으로 날짜별 완료 현황 표현 |
| 대시보드 시각화 | 루틴·태스크 달성률, 추이, 연속 수행 기록 시각화 |
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

**Backend** ([저장소 바로가기](https://github.com/sm-rye/rootin-server))

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
Render (Express 5 + Prisma)
       │
       ▼
PostgreSQL (Neon)
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

## 핵심 설계 결정

### 서버 상태와 UI 상태 분리

- API 데이터와 로딩·에러·무효화는 TanStack React Query로 관리합니다.
- 인증 토큰, 토스트, 확인 모달처럼 브라우저에서만 필요한 상태는 Zustand로 분리했습니다.
- 루틴 변경 후 관련 쿼리를 명시적으로 무효화하여 목록·상세·대시보드가 같은 상태를 바라보도록 구성했습니다.

### 인증 경계에서 캐시 격리

로그아웃하거나 다른 계정으로 로그인했을 때 이전 사용자의 캐시가 노출되는 문제가 있었습니다. 인증 전환 시 Query Client를 초기화하고, Axios 응답 인터셉터에서 만료된 인증 정보를 제거해 사용자별 서버 상태가 섞이지 않도록 처리했습니다.

### 기능 단위 의존성 관리

페이지에서 API와 전역 상태를 직접 다루지 않고 `features`와 `entities`를 통해 접근합니다. 공용 UI는 `shared`에 두고 상위 레이어에 의존하지 않도록 하여 기능이 늘어나도 변경 범위를 좁게 유지했습니다.

## 주요 문제 해결

| 문제 | 원인 | 해결 |
|------|------|------|
| 계정 전환 후 이전 사용자 데이터가 잠시 노출됨 | React Query 캐시가 사용자 경계를 넘어 유지됨 | 로그인·로그아웃 시 캐시 초기화 |
| 토큰 만료 후 재로그인해도 즉시 로그아웃됨 | 이전 인증 쿼리의 오류 상태가 남아 있음 | 인증 쿼리 상태 초기화와 재요청 조건 정리 |
| 데이터 변경 후 대시보드 수치가 늦게 갱신됨 | 기능별 무효화 범위가 불완전함 | 루틴·태스크·대시보드 쿼리 키와 무효화 흐름 정리 |



---

## 개발 환경 설정

```bash
corepack enable
yarn install
yarn dev
```

**환경 변수** (`.env.local`)

```env
VITE_API_URL=http://localhost:3000
```

## 검증

```bash
yarn lint
yarn build
```

Pull request와 `main` 브랜치 변경 시 GitHub Actions에서 정적 분석과 프로덕션 빌드를 실행합니다.
