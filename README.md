# Routinery - 습관 관리 앱

React Native로 개발된 습관 관리 애플리케이션입니다. 일일, 주간, 월간 습관을 설정하고 관리할 수 있습니다.

## 🎯 주요 동작

### 습관 관리 동작

- **습관 추가**: 우측 하단 플로팅 버튼(+)을 눌러 새 습관 생성
- **습관 수정**: 개별 습관을 탭하면 수정 화면으로 이동
- **습관 삭제**: 습관을 길게 누르면(롱프레스) 삭제 확인 다이얼로그 표시
- **습관 체크**: 습관을 탭하여 해당 날짜 완료 체크/해제

### 캘린더 동작

- **날짜 변경**: 캘린더에서 날짜를 탭하여 해당 날짜의 습관 현황 확인

## 🚀 기술 스택

- **React Native** 0.80.0
- **TypeScript** 5.0.4
- **React Navigation** 7.x
- **Zustand** 5.0.6 (상태 관리)
- **React Native MMKV** 3.3.0 (로컬 스토리지)
- **Day.js** 1.11.13 (날짜 처리)
- **React Native Reanimated** 3.18.0 (애니메이션)

## 📁 프로젝트 구조

```
routinery/
├── src/
│   ├── components/          # 재사용 가능한 컴포넌트
│   │   ├── button/         # 버튼 컴포넌트
│   │   │   ├── Button.tsx
│   │   │   ├── FloatingButton.tsx
│   │   │   └── Index.ts
│   │   ├── calendar/       # 캘린더 관련 컴포넌트
│   │   │   ├── CalendarDay.tsx
│   │   │   ├── CalendarGrid.tsx
│   │   │   ├── CalendarHeader.tsx
│   │   │   ├── CalendarModal.tsx
│   │   │   ├── WeekHeader.tsx
│   │   │   └── index.ts
│   │   ├── habit/          # 습관 관련 컴포넌트
│   │   │   ├── DayOfMonthSelector.tsx
│   │   │   ├── DayOfWeekSelector.tsx
│   │   │   ├── Empty.tsx
│   │   │   ├── Habit.tsx
│   │   │   ├── Schedule.tsx
│   │   │   ├── ScheduleDisplay.tsx
│   │   │   ├── SelectedDate.tsx
│   │   │   ├── TotalHabit.tsx
│   │   │   └── index.ts
│   │   └── ReanimatedTest.tsx
│   ├── constants/          # 상수 정의
│   │   └── days.ts
│   ├── hooks/              # 커스텀 훅
│   │   ├── useCalendar.ts
│   │   └── useHabitActions.ts
│   ├── navigation/         # 네비게이션 설정
│   │   └── AppNavigator.tsx
│   ├── screens/            # 화면 컴포넌트
│   │   ├── CreateHabitScreen.tsx
│   │   └── HomeScreen.tsx
│   ├── store/              # 상태 관리
│   │   └── useHabitStore.ts
│   ├── types/              # TypeScript 타입 정의
│   │   ├── habit.ts
│   │   └── navigation.ts
│   └── utils/              # 유틸리티 함수
│       ├── consecutiveDays.ts
│       ├── dimentions.ts
│       ├── habitFilter.ts
│       └── habitStats.ts
├── android/                # Android 설정
├── ios/                    # iOS 설정
├── __tests__/              # 테스트 파일
└── App.tsx                 # 앱 진입점
```

## 🧩 컴포넌트 구조

### 핵심 컴포넌트

#### 1. 습관 컴포넌트 (`src/components/habit/`)

- **`Habit.tsx`**: 개별 습관 아이템 표시
- **`TotalHabit.tsx`**: 습관 목록 전체 관리
- **`Schedule.tsx`**: 습관 스케줄 설정
- **`ScheduleDisplay.tsx`**: 설정된 스케줄 표시
- **`DayOfWeekSelector.tsx`**: 요일 선택 컴포넌트
- **`DayOfMonthSelector.tsx`**: 월 일자 선택 컴포넌트
- **`Empty.tsx`**: 빈 상태 표시
- **`SelectedDate.tsx`**: 선택된 날짜 표시

#### 2. 캘린더 컴포넌트 (`src/components/calendar/`)

- **`CalendarModal.tsx`**: 캘린더 모달
- **`CalendarGrid.tsx`**: 캘린더 그리드
- **`CalendarDay.tsx`**: 개별 날짜 컴포넌트
- **`CalendarHeader.tsx`**: 캘린더 헤더
- **`WeekHeader.tsx`**: 요일 헤더

#### 3. 버튼 컴포넌트 (`src/components/button/`)

- **`Button.tsx`**: 기본 버튼
- **`FloatingButton.tsx`**: 플로팅 버튼

### 화면 컴포넌트 (`src/screens/`)

- **`HomeScreen.tsx`**: 메인 홈 화면
- **`CreateHabitScreen.tsx`**: 습관 생성 화면

## 🔧 유틸리티 함수

### 1. 습관 관련 유틸리티 (`src/utils/`)

#### `consecutiveDays.ts`

- **`calculateConsecutiveDays(habit: Habit): number`**: 습관의 연속일 계산
- **`calcDaily(dates: string[]): number`**: 일일 습관 연속일 계산
- **`calcWeekly(habit: Habit): number`**: 주간 습관 연속일 계산
- **`calcMonthly(habit: Habit): number`**: 월간 습관 연속일 계산
- **`calcMaxWeeklyGap(scheduleDays: number[]): number`**: 주간 스케줄 최대 간격 계산

#### `habitStats.ts`

- 습관 통계 관련 함수들

#### `habitFilter.ts`

- 습관 필터링 관련 함수들

#### `dimentions.ts`

- 화면 크기 관련 상수

### 2. 커스텀 훅 (`src/hooks/`)

#### `useHabitActions.ts`

- 습관 CRUD 작업을 위한 커스텀 훅

#### `useCalendar.ts`

- 캘린더 관련 로직을 위한 커스텀 훅

### 3. 상태 관리 (`src/store/`)

#### `useHabitStore.ts`

- Zustand를 사용한 습관 상태 관리
- 습관 목록, 추가, 수정, 삭제 기능

## 📱 주요 기능

### 1. 습관 관리

- **일일 습관**: 매일 수행하는 습관
- **주간 습관**: 특정 요일에 수행하는 습관
- **월간 습관**: 특정 날짜에 수행하는 습관

### 2. 연속일 계산

- 각 습관의 연속 수행 일수 자동 계산
- 스케줄에 따른 정확한 연속일 계산

### 3. 캘린더 뷰

- 월간 캘린더로 습관 수행 현황 확인
- 체크된 날짜 시각적 표시

## 🚀 실행 방법

```bash
# 의존성 설치
npm install

# iOS 실행
npm run ios

# Android 실행
npm run android

# 개발 서버 시작
npm start
```

## 📋 타입 정의

### Habit 타입

```typescript
type Habit = {
  id: string;
  title: string;
  frequency: HabitFrequency; // "daily" | "weekly" | "monthly"
  schedule?: HabitSchedule; // DayOfWeek[] | DayOfMonth[]
  createdAt: Date;
  checkedDate: string[]; // 체크된 날짜들 (YYYY-MM-DD 형식)
};
```

## 🛠 개발 환경 설정

- Node.js >= 18
- React Native CLI
