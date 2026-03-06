# 驿站后台（station-admin）— 模块上下文

> 社区驿站工作人员使用的管理后台 | 核心功能：居民档案、活动管理、服务工单、数据统计

**面包屑**：[🏠 根目录](../CLAUDE.md) > 驿站后台

---

## 📍 模块定位

驿站后台是家邻康的**运营管理中枢**，面向社区驿站工作人员（通常是 1-2 名社区工作者）。设计原则：**高效、清晰、易用**。

### 核心用户痛点

- 居民信息分散 → 需要统一的居民档案管理
- 活动组织低效 → 需要活动管理和签到系统
- 服务派单混乱 → 需要工单管理系统
- 数据无法统计 → 需要数据分析和报表

---

## 🎯 MVP 功能范围

### Phase 1 — 核心功能（第 1-4 周）

| 功能 | 用户流程 | 优先级 | 复杂度 |
|------|----------|--------|--------|
| **居民档案管理** | 导入/手动添加 → 查看 → 编辑 → 删除 | **P0** | 低 |
| **居民健康数据查看** | 查看打卡记录 → 健康趋势 → 异常标记 | **P0** | 中 |
| **活动创建与管理** | 创建活动 → 设置时间地点 → 发布 | **P0** | 低 |
| **活动签到** | 扫码签到 / 手动签到 → 统计参与人数 | **P0** | 低 |
| **基础数据统计** | 居民总数、活动参与率、打卡完成率 | **P0** | 中 |

### Phase 2 — 服务功能（第 5-6 周）

| 功能 | 说明 | 优先级 |
|------|------|--------|
| **服务工单管理** | 查看预约单 → 分配服务商 → 跟踪进度 | **P1** |
| **服务商管理** | 添加服务商 → 设置服务类型 → 评分管理 | **P1** |
| **订单评价查看** | 查看用户对服务的评价 | **P1** |

### Phase 3 — 增强功能（第 7-8 周）

| 功能 | 说明 | 优先级 |
|------|------|--------|
| **月度报表** | 自动生成月度运营报表 | **P2** |
| **异常预警** | 居民异常数据提醒 | **P2** |
| **消息通知** | 接收订单、评价等实时通知 | **P2** |
| **权限管理** | 多角色权限控制 | **P2** |

---

## 🏗️ 项目结构

```
packages/station-admin/
├── src/
│   ├── pages/                    # 页面
│   │   ├── dashboard/           # 仪表板
│   │   ├── residents/           # 居民管理
│   │   ├── resident-detail/     # 居民详情
│   │   ├── activities/          # 活动管理
│   │   ├── activity-detail/     # 活动详情
│   │   ├── services/            # 服务工单
│   │   ├── service-providers/   # 服务商管理
│   │   ├── reports/             # 数据报表
│   │   ├── settings/            # 设置
│   │   └── profile/             # 个人资料
│   ├── components/              # 可复用组件
│   │   ├── ResidentCard/        # 居民卡片
│   │   ├── ActivityCard/        # 活动卡片
│   │   ├── OrderCard/           # 工单卡片
│   │   ├── DataTable/           # 数据表格
│   │   ├── Chart/               # 图表组件
│   │   └── Modal/               # 模态框
│   ├── services/                # 业务逻辑
│   │   ├── resident.ts          # 居民管理 API
│   │   ├── activity.ts          # 活动管理 API
│   │   ├── service.ts           # 服务工单 API
│   │   ├── provider.ts          # 服务商管理 API
│   │   ├── report.ts            # 报表 API
│   │   └── auth.ts              # 认证 API
│   ├── utils/                   # 工具函数
│   │   ├── format.ts            # 格式化工具
│   │   ├── export.ts            # 导出工具（Excel/PDF）
│   │   ├── chart.ts             # 图表数据处理
│   │   └── validation.ts        # 数据验证
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

### 认证与授权

```typescript
// 登录
POST /api/auth/login
Body: { stationId: string, password: string }
Response: { token: string, user: User }

// 获取当前用户信息
GET /api/auth/me
Response: User

// 登出
POST /api/auth/logout
Response: { success: boolean }
```

### 居民管理

```typescript
// 获取居民列表
GET /api/residents?stationId=xxx&page=1&limit=20
Response: {
  total: number
  residents: Resident[]
}

// 获取居民详情
GET /api/residents/:residentId
Response: Resident

// 创建居民
POST /api/residents
Body: {
  name: string
  age: number
  phone: string
  idCard: string
  address: string
  emergencyContact: string
  diseases?: string[]
  medications?: string[]
}
Response: { residentId: string }

// 更新居民信息
PUT /api/residents/:residentId
Body: { name, age, phone, ... }
Response: { success: boolean }

// 删除居民
DELETE /api/residents/:residentId
Response: { success: boolean }

// 批量导入居民
POST /api/residents/import
Body: FormData (CSV/Excel)
Response: { imported: number, failed: number, errors: string[] }

// 获取居民健康数据
GET /api/residents/:residentId/health
Response: {
  residentId: string
  latestBloodPressure?: { systolic, diastolic, date }
  latestBloodSugar?: { value, date }
  medicationCheckinRate: number
  lastCheckinDate: string
  alerts: Alert[]
}
```

### 活动管理

```typescript
// 获取活动列表
GET /api/activities?stationId=xxx&status=all
Response: Activity[]

// 创建活动
POST /api/activities
Body: {
  title: string
  description: string
  date: string
  time: string
  location: string
  capacity: number
  category: 'health' | 'social' | 'education' | 'entertainment'
  image?: string
}
Response: { activityId: string }

// 更新活动
PUT /api/activities/:activityId
Body: { title, description, date, ... }
Response: { success: boolean }

// 删除活动
DELETE /api/activities/:activityId
Response: { success: boolean }

// 获取活动详情
GET /api/activities/:activityId
Response: Activity

// 获取活动参与者
GET /api/activities/:activityId/participants
Response: Participant[]

// 活动签到
POST /api/activities/:activityId/checkin
Body: { residentId: string }
Response: { success: boolean }

// 生成签到二维码
GET /api/activities/:activityId/qrcode
Response: { qrcodeUrl: string }
```

### 服务工单管理

```typescript
// 获取工单列表
GET /api/services/orders?stationId=xxx&status=pending
Response: Order[]

// 获取工单详情
GET /api/services/orders/:orderId
Response: Order

// 分配服务商
PUT /api/services/orders/:orderId/assign
Body: { providerId: string }
Response: { success: boolean }

// 更新工单状态
PUT /api/services/orders/:orderId/status
Body: { status: 'pending' | 'assigned' | 'in_progress' | 'completed' | 'cancelled' }
Response: { success: boolean }

// 获取工单评价
GET /api/services/orders/:orderId/review
Response: Review

// 导出工单列表
GET /api/services/orders/export?format=excel
Response: File
```

### 服务商管理

```typescript
// 获取服务商列表
GET /api/providers?stationId=xxx
Response: Provider[]

// 添加服务商
POST /api/providers
Body: {
  name: string
  phone: string
  serviceTypes: string[]
  qualifications?: string[]
  rating?: number
}
Response: { providerId: string }

// 更新服务商信息
PUT /api/providers/:providerId
Body: { name, phone, serviceTypes, ... }
Response: { success: boolean }

// 删除服务商
DELETE /api/providers/:providerId
Response: { success: boolean }

// 获取服务商评分
GET /api/providers/:providerId/rating
Response: { rating: number, reviewCount: number }
```

### 数据报表

```typescript
// 获取仪表板数据
GET /api/reports/dashboard?stationId=xxx
Response: {
  totalResidents: number
  activeResidents: number
  medicationCheckinRate: number
  activityParticipationRate: number
  serviceOrdersThisMonth: number
  averageServiceRating: number
}

// 获取月度报表
GET /api/reports/monthly?stationId=xxx&month=2026-03
Response: {
  month: string
  residents: { total: number, new: number, active: number }
  activities: { total: number, participants: number, avgRating: number }
  services: { total: number, completed: number, avgRating: number }
  health: { checkinRate: number, abnormalCount: number }
}

// 获取居民活跃度报表
GET /api/reports/resident-activity?stationId=xxx
Response: {
  activeResidents: number
  inactiveResidents: number
  checkinTrend: { date: string, count: number }[]
}

// 获取服务质量报表
GET /api/reports/service-quality?stationId=xxx
Response: {
  totalOrders: number
  completedOrders: number
  averageRating: number
  topProviders: Provider[]
  lowRatedProviders: Provider[]
}
```

---

## 📦 依赖关系

### 外部依赖

```json
{
  "dependencies": {
    "wx-sdk": "latest",
    "zod": "^3.x",
    "date-fns": "^2.x",
    "recharts": "^2.x",
    "xlsx": "^0.18.x"
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

## 🎨 UI/UX 设计规范

### 信息架构

- **仪表板**：关键指标 + 最近活动 + 待处理工单
- **居民管理**：列表 → 详情 → 编辑 / 健康数据查看
- **活动管理**：列表 → 创建/编辑 → 签到 → 统计
- **服务工单**：列表 → 详情 → 分配 → 跟踪
- **报表**：月度报表 + 自定义查询

### 颜色方案

```
主色：#1976D2（蓝色，专业感）
成功：#2E7D32（绿色，完成）
警告：#F57C00（橙色，待处理）
危险：#D32F2F（红色，异常）
背景：#FAFAFA（浅灰）
文字：#212121（深灰）
```

### 表格设计

- **列宽**：自适应内容
- **排序**：支持多列排序
- **筛选**：支持按状态、日期、类型筛选
- **分页**：每页 20 条，支持跳转
- **操作**：编辑、删除、详情等操作按钮

---

## 🧪 测试策略

### 单元测试

- 数据验证函数
- 报表计算逻辑
- 权限检查
- 目标覆盖率：≥ 80%

### 集成测试

- 居民导入流程
- 活动创建和签到
- 工单分配和跟踪
- 报表生成

### E2E 测试

- 完整的活动管理流程
- 工单分配和完成流程
- 月度报表生成

---

## 🔐 安全与隐私

- ✅ 用户认证（账号密码 + 微信登录）
- ✅ 权限控制（基于角色的访问控制）
- ✅ 数据加密（HTTPS + 字段加密）
- ✅ 操作日志（记录所有重要操作）
- ✅ 数据备份（定期备份）

---

## 📊 关键指标

| 指标 | 目标 | 说明 |
|------|------|------|
| **居民管理效率** | > 90% | 居民信息完整率 |
| **活动参与率** | > 30% | 活动参与居民占比 |
| **工单完成率** | > 95% | 已分配工单的完成率 |
| **服务满意度** | > 4.0/5 | 平均服务评分 |
| **系统可用性** | > 99% | 系统正常运行时间 |

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
- **仪表板**：`src/pages/dashboard/index.ts`
- **配置**：`src/app.json`
- **类型**：`src/types/index.ts`

---

## 📝 关键实现细节

### 居民档案管理

1. 支持手动添加和批量导入（CSV/Excel）
2. 自动关联微信小程序账户
3. 记录健康档案和紧急联系人
4. 实时同步健康数据

### 活动管理流程

1. 驿站工作人员创建活动
2. 设置时间、地点、容量
3. 生成二维码供签到使用
4. 活动当天扫码或手动签到
5. 自动统计参与人数和完成率

### 工单分配机制

1. 子女预约服务后生成工单
2. 驿站工作人员查看待分配工单
3. 选择合适的服务商分配
4. 服务商接单并完成服务
5. 用户评价后工单关闭

### 数据报表生成

1. 每月自动生成月度报表
2. 收集活动、服务、健康数据
3. 计算关键指标
4. 支持导出为 Excel/PDF
5. 可视化展示趋势

---

## 🔄 与其他模块的交互

```
驿站后台
  ↓ 创建活动
  → 父母端（展示活动列表）
  → 子女端（展示活动列表）

驿站后台
  ↓ 查看工单
  ← 子女端（预约服务）

驿站后台
  ↓ 分配工单
  → 服务商系统（派单）

驿站后台
  ↓ 查看居民数据
  ← 父母端（打卡数据）
  ← 云函数（数据聚合）
```

---

**最后更新**：2026-03-03 | **维护者**：AI Context System
