# Rootin — 루틴 트래킹 웹앱

> 습관 형성을 도와주는 루틴 트래킹 웹앱.
> 매일 수행할 태스크를 루틴으로 묶어 관리하고, 리차트로 달성률화 시각

**[🚀 데모 보기](https://react-monorepo-rootin-three.vercel.app/)** &nbsp;|&nbsp; **[서버 레포](https://github.com/mirea-shin/rootin-server)**

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
| 태스트 차트 시각화 | 루틴, 태스크에 대한 데이터 차트 구현 |
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
