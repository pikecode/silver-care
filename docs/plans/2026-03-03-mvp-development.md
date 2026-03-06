# MVP 开发实现计划

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 完成家邻康 MVP 的项目骨架搭建、核心功能实现和测试框架建立。

**Architecture:** 采用 monorepo 结构（pnpm workspaces），分离前端（父母端/子女端/驿站后台）和后端（云函数）。使用微信小程序原生开发 + 微信云开发，TypeScript 确保类型安全。

**Tech Stack:** 微信小程序原生、TypeScript、pnpm、Jest、Vitest、ESLint、Prettier

---

## Task 1: 初始化 Monorepo 结构

**Files:**
- Create: `package.json`
- Create: `pnpm-workspace.yaml`
- Create: `tsconfig.json`
- Create: `.eslintrc.json`
- Create: `.prettierrc.json`

**Step 1: 创建根级 package.json**

```bash
cd /Users/peakom/worko/silver-care
cat > package.json << 'EOF'
{
  "name": "silver-care",
  "version": "0.1.0",
  "description": "社区健康助手",
  "private": true,
  "scripts": {
    "dev": "pnpm -r --parallel run dev",
    "build": "pnpm -r run build",
    "test": "pnpm -r run test",
    "lint": "pnpm -r run lint"
  },
  "devDependencies": {
    "@types/jest": "^29.5.0",
    "@types/node": "^20.0.0",
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "@typescript-eslint/parser": "^6.0.0",
    "eslint": "^8.0.0",
    "jest": "^29.5.0",
    "prettier": "^3.0.0",
    "typescript": "^5.0.0"
  }
}
EOF
```

**Step 2: 创建 pnpm-workspace.yaml**

```bash
cat > pnpm-workspace.yaml << 'EOF'
packages:
  - 'packages/*'
EOF
```

**Step 3: 创建 tsconfig.json**

```bash
cat > tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020"],
    "declaration": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "moduleResolution": "node"
  }
}
EOF
```

**Step 4: 创建 .eslintrc.json**

```bash
cat > .eslintrc.json << 'EOF'
{
  "parser": "@typescript-eslint/parser",
  "extends": ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  "rules": {
    "no-console": ["warn", { "allow": ["warn", "error"] }],
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["error"]
  }
}
EOF
```

**Step 5: 创建 .prettierrc.json**

```bash
cat > .prettierrc.json << 'EOF'
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "es5",
  "printWidth": 100,
  "tabWidth": 2
}
EOF
```

**Step 6: 验证配置文件**

```bash
ls -la package.json pnpm-workspace.yaml tsconfig.json .eslintrc.json .prettierrc.json
```

Expected: 所有文件都存在

**Step 7: Commit**

```bash
git add package.json pnpm-workspace.yaml tsconfig.json .eslintrc.json .prettierrc.json
git commit -m "chore: initialize monorepo structure"
```

---

## Task 2: 创建共享库模块

**Files:**
- Create: `packages/shared/package.json`
- Create: `packages/shared/src/types/index.ts`
- Create: `packages/shared/src/constants/index.ts`
- Create: `packages/shared/tsconfig.json`

**Step 1: 创建共享库目录和 package.json**

```bash
mkdir -p packages/shared/src/{types,constants,utils}

cat > packages/shared/package.json << 'EOF'
{
  "name": "@silver-care/shared",
  "version": "0.1.0",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "tsc",
    "test": "jest",
    "lint": "eslint src"
  },
  "dependencies": {
    "zod": "^3.22.0"
  }
}
EOF
```

**Step 2: 创建类型定义文件**

```bash
cat > packages/shared/src/types/index.ts << 'EOF'
// 用户相关类型
export interface User {
  id: string
  name: string
  phone: string
  role: 'parent' | 'child' | 'admin'
  createdAt: number
}

export interface Family {
  id: string
  parentId: string
  childrenIds: string[]
  createdAt: number
}

// 健康数据类型
export interface HealthRecord {
  id: string
  userId: string
  type: 'medication' | 'bloodPressure' | 'bloodSugar'
  value: string
  timestamp: number
}

export interface MedicationReminder {
  id: string
  userId: string
  medicationName: string
  dosage: string
  time: string
  frequency: 'daily' | 'weekly' | 'monthly'
  isActive: boolean
}

// API 响应类型
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  code?: number
}
EOF
```

**Step 3: 创建常量文件**

```bash
cat > packages/shared/src/constants/index.ts << 'EOF'
// 用户角色
export const USER_ROLES = {
  PARENT: 'parent',
  CHILD: 'child',
  ADMIN: 'admin',
} as const

// 健康数据类型
export const HEALTH_RECORD_TYPES = {
  MEDICATION: 'medication',
  BLOOD_PRESSURE: 'bloodPressure',
  BLOOD_SUGAR: 'bloodSugar',
} as const

// 提醒频率
export const REMINDER_FREQUENCY = {
  DAILY: 'daily',
  WEEKLY: 'weekly',
  MONTHLY: 'monthly',
} as const

// 适老化设计常量
export const ELDERLY_UI = {
  MIN_FONT_SIZE: 18,
  KEY_FONT_SIZE: 24,
  MIN_BUTTON_SIZE: 48,
  BUTTON_SPACING: 12,
} as const
EOF
```

**Step 4: 创建 tsconfig.json**

```bash
cat > packages/shared/tsconfig.json << 'EOF'
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
EOF
```

**Step 5: 创建入口文件**

```bash
cat > packages/shared/src/index.ts << 'EOF'
export * from './types'
export * from './constants'
EOF
```

**Step 6: Commit**

```bash
git add packages/shared/
git commit -m "feat: create shared library with types and constants"
```

---

## Task 3: 创建父母端模块骨架

**Files:**
- Create: `packages/parent-app/package.json`
- Create: `packages/parent-app/app.json`
- Create: `packages/parent-app/src/pages/index.ts`
- Create: `packages/parent-app/tsconfig.json`

**Step 1: 创建父母端目录**

```bash
mkdir -p packages/parent-app/src/{pages,components,utils,services}

cat > packages/parent-app/package.json << 'EOF'
{
  "name": "@silver-care/parent-app",
  "version": "0.1.0",
  "scripts": {
    "dev": "tsc --watch",
    "build": "tsc",
    "test": "jest",
    "lint": "eslint src"
  },
  "dependencies": {
    "@silver-care/shared": "workspace:*",
    "zod": "^3.22.0"
  }
}
EOF
```

**Step 2: 创建小程序配置**

```bash
cat > packages/parent-app/app.json << 'EOF'
{
  "pages": [
    "pages/index/index",
    "pages/medication/index",
    "pages/health/index",
    "pages/profile/index"
  ],
  "window": {
    "backgroundTextStyle": "light",
    "navigationBarBackgroundColor": "#fff",
    "navigationBarTitleText": "家邻康",
    "navigationBarTextStyle": "black",
    "navigationStyle": "default"
  },
  "tabBar": {
    "color": "#999",
    "selectedColor": "#07c160",
    "backgroundColor": "#fff",
    "borderStyle": "black",
    "list": [
      {
        "pagePath": "pages/index/index",
        "text": "首页",
        "iconPath": "assets/icons/home.png",
        "selectedIconPath": "assets/icons/home-active.png"
      },
      {
        "pagePath": "pages/medication/index",
        "text": "用药",
        "iconPath": "assets/icons/medication.png",
        "selectedIconPath": "assets/icons/medication-active.png"
      },
      {
        "pagePath": "pages/health/index",
        "text": "健康",
        "iconPath": "assets/icons/health.png",
        "selectedIconPath": "assets/icons/health-active.png"
      },
      {
        "pagePath": "pages/profile/index",
        "text": "我的",
        "iconPath": "assets/icons/profile.png",
        "selectedIconPath": "assets/icons/profile-active.png"
      }
    ]
  }
}
EOF
```

**Step 3: 创建页面入口**

```bash
cat > packages/parent-app/src/pages/index.ts << 'EOF'
// 父母端页面入口
// Phase 1: 首页、用药提醒、健康打卡、个人资料
EOF
```

**Step 4: 创建 tsconfig.json**

```bash
cat > packages/parent-app/tsconfig.json << 'EOF'
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
EOF
```

**Step 5: Commit**

```bash
git add packages/parent-app/
git commit -m "feat: create parent-app module skeleton"
```

---

## Task 4: 创建子女端模块骨架

**Files:**
- Create: `packages/children-app/package.json`
- Create: `packages/children-app/app.json`
- Create: `packages/children-app/src/pages/index.ts`
- Create: `packages/children-app/tsconfig.json`

**Step 1: 创建子女端目录**

```bash
mkdir -p packages/children-app/src/{pages,components,utils,services}

cat > packages/children-app/package.json << 'EOF'
{
  "name": "@silver-care/children-app",
  "version": "0.1.0",
  "scripts": {
    "dev": "tsc --watch",
    "build": "tsc",
    "test": "jest",
    "lint": "eslint src"
  },
  "dependencies": {
    "@silver-care/shared": "workspace:*",
    "zod": "^3.22.0"
  }
}
EOF
```

**Step 2: 创建小程序配置**

```bash
cat > packages/children-app/app.json << 'EOF'
{
  "pages": [
    "pages/index/index",
    "pages/health-report/index",
    "pages/services/index",
    "pages/profile/index"
  ],
  "window": {
    "backgroundTextStyle": "light",
    "navigationBarBackgroundColor": "#fff",
    "navigationBarTitleText": "家邻康",
    "navigationBarTextStyle": "black"
  },
  "tabBar": {
    "color": "#999",
    "selectedColor": "#07c160",
    "backgroundColor": "#fff",
    "list": [
      {
        "pagePath": "pages/index/index",
        "text": "首页"
      },
      {
        "pagePath": "pages/health-report/index",
        "text": "健康报告"
      },
      {
        "pagePath": "pages/services/index",
        "text": "服务"
      },
      {
        "pagePath": "pages/profile/index",
        "text": "我的"
      }
    ]
  }
}
EOF
```

**Step 3: 创建页面入口**

```bash
cat > packages/children-app/src/pages/index.ts << 'EOF'
// 子女端页面入口
// Phase 1: 首页、健康日报、异常预警、服务管理
EOF
```

**Step 4: 创建 tsconfig.json**

```bash
cat > packages/children-app/tsconfig.json << 'EOF'
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
EOF
```

**Step 5: Commit**

```bash
git add packages/children-app/
git commit -m "feat: create children-app module skeleton"
```

---

## Task 5: 创建驿站后台模块骨架

**Files:**
- Create: `packages/station-admin/package.json`
- Create: `packages/station-admin/app.json`
- Create: `packages/station-admin/src/pages/index.ts`
- Create: `packages/station-admin/tsconfig.json`

**Step 1: 创建驿站后台目录**

```bash
mkdir -p packages/station-admin/src/{pages,components,utils,services}

cat > packages/station-admin/package.json << 'EOF'
{
  "name": "@silver-care/station-admin",
  "version": "0.1.0",
  "scripts": {
    "dev": "tsc --watch",
    "build": "tsc",
    "test": "jest",
    "lint": "eslint src"
  },
  "dependencies": {
    "@silver-care/shared": "workspace:*",
    "zod": "^3.22.0"
  }
}
EOF
```

**Step 2: 创建小程序配置**

```bash
cat > packages/station-admin/app.json << 'EOF'
{
  "pages": [
    "pages/index/index",
    "pages/residents/index",
    "pages/activities/index",
    "pages/services/index",
    "pages/profile/index"
  ],
  "window": {
    "backgroundTextStyle": "light",
    "navigationBarBackgroundColor": "#fff",
    "navigationBarTitleText": "家邻康驿站",
    "navigationBarTextStyle": "black"
  },
  "tabBar": {
    "color": "#999",
    "selectedColor": "#07c160",
    "backgroundColor": "#fff",
    "list": [
      {
        "pagePath": "pages/index/index",
        "text": "首页"
      },
      {
        "pagePath": "pages/residents/index",
        "text": "居民"
      },
      {
        "pagePath": "pages/activities/index",
        "text": "活动"
      },
      {
        "pagePath": "pages/services/index",
        "text": "服务"
      },
      {
        "pagePath": "pages/profile/index",
        "text": "我的"
      }
    ]
  }
}
EOF
```

**Step 3: 创建页面入口**

```bash
cat > packages/station-admin/src/pages/index.ts << 'EOF'
// 驿站后台页面入口
// Phase 1: 首页、居民档案、活动管理、服务工单
EOF
```

**Step 4: 创建 tsconfig.json**

```bash
cat > packages/station-admin/tsconfig.json << 'EOF'
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
EOF
```

**Step 5: Commit**

```bash
git add packages/station-admin/
git commit -m "feat: create station-admin module skeleton"
```

---

## Task 6: 创建云函数模块骨架

**Files:**
- Create: `packages/cloud-functions/package.json`
- Create: `packages/cloud-functions/src/index.ts`
- Create: `packages/cloud-functions/tsconfig.json`

**Step 1: 创建云函数目录**

```bash
mkdir -p packages/cloud-functions/src/{functions,models,services,utils}

cat > packages/cloud-functions/package.json << 'EOF'
{
  "name": "@silver-care/cloud-functions",
  "version": "0.1.0",
  "scripts": {
    "build": "tsc",
    "test": "jest",
    "lint": "eslint src"
  },
  "dependencies": {
    "@silver-care/shared": "workspace:*",
    "zod": "^3.22.0"
  }
}
EOF
```

**Step 2: 创建云函数入口**

```bash
cat > packages/cloud-functions/src/index.ts << 'EOF'
// 云函数入口
// Phase 1: 用户认证、健康数据管理、通知推送
EOF
```

**Step 3: 创建 tsconfig.json**

```bash
cat > packages/cloud-functions/tsconfig.json << 'EOF'
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
EOF
```

**Step 4: Commit**

```bash
git add packages/cloud-functions/
git commit -m "feat: create cloud-functions module skeleton"
```

---

## 执行完成

所有 MVP 骨架已创建完成。下一步可以选择：

**1. 子智能体驱动执行（本会话）** - 我为每个任务派遣新的子智能体，任务间进行代码审查，快速迭代

**2. 并行会话执行（新会话）** - 在 worktree 中打开新会话，使用 executing-plans 进行批量执行和检查点

你想选择哪种方式继续开发？
