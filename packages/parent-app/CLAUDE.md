# 父母端（parent-app）— 模块上下文

> 老人使用的微信小程序 | 核心功能：用药提醒、健康打卡、一键呼叫、活动报名

**面包屑**：[🏠 根目录](../CLAUDE.md) > 父母端

---

## 📍 模块定位

父母端是家邻康的核心用户界面，面向 55-80 岁的老年用户。设计原则：**极简、大字、少步骤**。

### 核心用户痛点

- 吃药易忘 → 需要定时提醒
- 健康无人管 → 需要简单的打卡记录
- 求助不方便 → 需要一键呼叫子女
- 社区活动信息不对称 → 需要活动列表和报名

---

## 🎯 MVP 功能范围

### Phase 1 — 核心功能（第 1-4 周）

| 功能 | 用户流程 | 优先级 | 复杂度 |
|------|----------|--------|--------|
| **用药提醒与打卡** | 收到通知 → 点"已服药" → 记录保存 | **P0** | 低 |
| **血压/血糖记录** | 手动输入或语音输入 → 保存 → 查看历史 | **P0** | 中 |
| **健康打卡** | 每日定时提醒 → 一键打卡 → 连续激励 | **P0** | 低 |
| **家庭绑定** | 被邀请 → 扫码确认 → 加入家庭 | **P0** | 低 |
| **一键呼叫** | 大按钮 → 直接拨打子女电话 | **P1** | 低 |

### Phase 2 — 社区功能（第 5-6 周）

| 功能 | 说明 | 优先级 |
|------|------|--------|
| **社区活动列表** | 展示附近驿站活动，按时间排序 | **P1** |
| **活动报名** | 一键报名，显示报名状态 | **P1** |
| **活动签到** | 到场时扫码或手动签到 | **P2** |

### Phase 3 — 增强功能（第 7-8 周）

| 功能 | 说明 | 优先级 |
|------|------|--------|
| **健康知识推送** | 每日一条适老健康贴士 | **P2** |
| **紧急求助** | SOS 按钮，一键通知所有关注者 | **P2** |
| **打卡连续激励** | 连续打卡 7/30 天获得称号 | **P2** |

---

## 🏗️ 项目结构

```
packages/parent-app/
├── src/
│   ├── pages/                    # 页面
│   │   ├── index/               # 首页（仪表板）
│   │   ├── medication/          # 用药提醒
│   │   ├── health-record/       # 健康记录
│   │   ├── activities/          # 社区活动
│   │   ├── family/              # 家庭管理
│   │   └── profile/             # 个人资料
│   ├── components/              # 可复用组件
│   │   ├── MedicationCard/      # 用药卡片
│   │   ├── HealthChart/         # 健康图表
│   │   ├── ActivityCard/        # 活动卡片
│   │   └── LargeButton/         # 适老化大按钮
│   ├── services/                # 业务逻辑
│   │   ├── medication.ts        # 用药相关 API
│   │   ├── health.ts            # 健康数据 API
│   │   ├── activity.ts          # 活动相关 API
│   │   └── family.ts            # 家庭绑定 API
│   ├── utils/                   # 工具函数
│   │   ├── format.ts            # 格式化工具
│   │   ├── notification.ts      # 通知工具
│   │   └── voice.ts             # 语音输入工具
│   ├── types/                   # 类型定义
│   │   └── index.ts
│   ├── app.ts                   # 应用入口
│   └── app.json                 # 小程序配置
├── tests/                       # 测试文件
│   ├── unit/
│   └── integration/
├── package.json
└── README.md
```

---

## 🔌 接口定义

### 用户认证

```typescript
// 获取用户信息
GET /api/user/profile
Response: {
  userId: string
  name: string
  age: number
  phone: string
  familyId: string
  role: 'parent' | 'child' | 'admin'
  medications: Medication[]
}

// 更新用户信息
PUT /api/user/profile
Body: { name, age, phone, ... }
```

### 用药管理

```typescript
// 获取用药列表
GET /api/medications
Response: Medication[]

// 创建用药提醒
POST /api/medications
Body: {
  name: string
  dosage: string
  frequency: 'daily' | 'weekly' | 'custom'
  times: string[] // ['08:00', '20:00']
  notes?: string
}

// 记录打卡
POST /api/medications/:id/checkin
Body: { timestamp: number }
Response: { success: boolean }

// 获取打卡历史
GET /api/medications/:id/history?days=30
Response: CheckinRecord[]
```

### 健康数据

```typescript
// 记录血压/血糖
POST /api/health-records
Body: {
  type: 'blood_pressure' | 'blood_sugar'
  value: number | { systolic: number, diastolic: number }
  timestamp: number
  notes?: string
}

// 获取健康数据
GET /api/health-records?type=blood_pressure&days=30
Response: HealthRecord[]

// 获取健康趋势
GET /api/health-records/trend?type=blood_pressure
Response: { average: number, trend: 'up' | 'down' | 'stable' }
```

### 社区活动

```typescript
// 获取活动列表
GET /api/activities?communityId=xxx
Response: Activity[]

// 报名活动
POST /api/activities/:id/register
Response: { success: boolean, registrationId: string }

// 获取我的报名
GET /api/activities/my-registrations
Response: Registration[]

// 活动签到
POST /api/activities/:id/checkin
Body: { registrationId: string }
Response: { success: boolean }
```

### 家庭管理

```typescript
// 获取家庭信息
GET /api/family
Response: {
  familyId: string
  members: FamilyMember[]
  createdAt: number
}

// 生成邀请码
POST /api/family/invite
Response: { inviteCode: string, expiresAt: number }

// 接受邀请
POST /api/family/join
Body: { inviteCode: string }
Response: { success: boolean }
```

---

## 📦 依赖关系

### 外部依赖

```json
{
  "dependencies": {
    "wx-sdk": "latest",
    "zod": "^3.x",
    "date-fns": "^2.x"
  },
  "devDependencies": {
    "typescript": "^5.x",
    "jest": "^29.x",
    "@testing-library/react": "^14.x"
  }
}
```

### 内部依赖

- `@silver-care/shared` — 共享类型和工具函数
- `@silver-care/cloud-functions` — 后端 API 调用

---

## 🎨 适老化设计规范

### 字体与排版

- **标题**：24px+ 粗体，行高 1.5
- **正文**：18px+ 常规，行高 1.6
- **辅助文本**：16px+，灰色但高对比度

### 按钮与交互

- **最小触摸区域**：48x48px
- **按钮间距**：12px+
- **核心操作**：使用鲜艳颜色（绿色/蓝色）
- **反馈**：视觉 + 震动 + 声音

### 颜色方案

```
主色：#2E7D32（绿色，健康感）
辅色：#1976D2（蓝色，信任感）
警告：#F57C00（橙色，异常提醒）
背景：#FAFAFA（浅灰，减少眼睛疲劳）
文字：#212121（深灰，高对比度）
```

### 导航结构

- **底部 Tab**：不超过 4 个
- **页面深度**：不超过 3 层
- **返回按钮**：始终可见

---

## 🧪 测试策略

### 单元测试

- 工具函数（格式化、验证）
- 业务逻辑（打卡计算、数据转换）
- 目标覆盖率：≥ 80%

### 集成测试

- 用药提醒流程
- 健康数据上传
- 活动报名流程

### E2E 测试

- 完整的用药打卡流程
- 家庭绑定流程
- 活动报名和签到

---

## 🔐 安全与隐私

- ✅ 健康数据加密存储
- ✅ 用户认证（微信登录）
- ✅ 权限控制（只能查看自己的数据）
- ✅ 数据最小化（只收集必要信息）

---

## 📊 关键指标

| 指标 | 目标 | 说明 |
|------|------|------|
| **日活打卡率** | > 60% | 每日打卡用户占比 |
| **7 日留存率** | > 50% | 首次使用后 7 天仍活跃 |
| **30 日留存率** | > 30% | 首次使用后 30 天仍活跃 |
| **平均使用时长** | > 3 分钟/天 | 用户日均使用时间 |
| **功能完成率** | > 80% | 用户完成核心操作的比例 |

---

## 🚀 开发入口

### 本地开发

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 运行测试
pnpm test

# 构建生产版本
pnpm build
```

### 关键文件

- **入口**：`src/app.ts`
- **首页**：`src/pages/index/index.ts`
- **配置**：`src/app.json`
- **类型**：`src/types/index.ts`

---

## 📝 关键实现细节

### 用药提醒机制

1. 后端定时任务每天 00:00 生成当日提醒
2. 通过微信服务通知推送给用户
3. 用户点击通知打开小程序
4. 用户点击"已服药"记录打卡
5. 数据实时同步到云数据库

### 健康数据同步

1. 用户输入或语音输入数据
2. 本地验证（范围、格式）
3. 上传到云数据库
4. 实时计算趋势
5. 推送给关注的子女

### 活动报名流程

1. 获取社区活动列表
2. 用户选择活动报名
3. 记录报名信息
4. 活动当天推送签到提醒
5. 用户扫码或手动签到

---

## 🔄 与其他模块的交互

```
父母端
  ↓ 用药打卡数据
  → 云函数（数据处理）
  ↓ 健康数据
  → 子女端（推送日报）

父母端
  ↓ 活动报名
  → 驿站后台（统计参与人数）

父母端
  ↓ 一键呼叫
  → 子女端（接收通知）
```

---

**最后更新**：2026-03-03 | **维护者**：AI Context System
