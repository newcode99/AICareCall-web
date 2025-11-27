# 커밋 메시지

```
feat: 도메인 경로 재구성 및 UI 요소 숨김 처리

## 주요 변경사항

### 1. 도메인 경로 재구성
- 온보딩 가이드: `/onboarding/guide` → `/onboarding`
- 온보딩 폼: `/onboarding` → `/register`
- 전체 통화 목록: `/call-history` → `/detail`
- 통화 상세: `/call-history/[id]` → `/detail/[id]`

### 2. 파일 구조 변경
- `app/onboarding/page.tsx`: 온보딩 가이드 페이지로 이동
- `app/register/`: 온보딩 폼 관련 파일들 이동
- `app/(dashboard)/detail/`: 통화 목록 및 상세 페이지 이동
- 중복 파일 제거: `app/register/guide/` 폴더 삭제

### 3. UI 요소 숨김 처리
- 사이드바에서 '소리 맞춤 설정' 메뉴 숨김
- 대시보드 헤더에서 알림 아이콘 숨김

### 4. 경로 참조 업데이트
- 모든 컴포넌트 및 페이지의 라우팅 경로 업데이트
- `app/page.tsx`, `app/dashboard/page.tsx`, `app/components/LNB.tsx`, `app/components/Sidebar.tsx` 등

## 영향 범위
- 프론트엔드 라우팅 전반
- 사이드바 네비게이션
- 대시보드 헤더

## 테스트 확인사항
- [ ] 온보딩 가이드 페이지 접근 (`/onboarding`)
- [ ] 온보딩 폼 페이지 접근 (`/register`)
- [ ] 통화 목록 페이지 접근 (`/detail`)
- [ ] 통화 상세 페이지 접근 (`/detail/[id]`)
- [ ] 사이드바에서 설정 메뉴 미표시 확인
- [ ] 대시보드 헤더에서 알림 미표시 확인
```

