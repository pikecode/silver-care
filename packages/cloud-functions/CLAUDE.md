# 云函数（cloud-functions）— 模块上下文

> 后端业务逻辑与数据处理 | 核心功能：用户系统、健康数据、通知引擎、服务系统、活动系统

**面包屑**：[🏠 根目录](../CLAUDE.md) > 云函数

---

## 📍 模块定位

云函数是家邻康的**后端核心**，基于微信云开发（云函数 + 数据库 + 存储）。负责所有业务逻辑、数据处理、通知推送等。

### 核心职责

- 用户认证与权限管理
- 健康数据的收集、处理、分析
- 定时任务（用药提醒、日报生成）
- 通知推送（服务通知、异常预警）
- 服务工单管理
- 活动管理与统计

---

## 🏗️ 项目结构

```
packages/cloud-functions/
├── functions/                   # 云函数
│   ├── auth/
│   │   ├── login.ts            # 微信登录
│   │   ├── logout.ts           # 登出
│   │   └── getUser.ts          # 获取用户信息
│   ├── user/
│   │   ├── getProfile.ts       # 获取用户资料
│   │   ├── updateProfile.ts    # 更新用户资料
│   │   ├── bindFamily.ts       # 绑定家庭
│   │   └── getFamily.ts        # 获取家庭信息
│   ├── health/
│   │   ├── recordMedication.ts # 记录用药打卡
│   │   ├── getMedications.ts   # 获取用药列表
│   │   ├── recordHealth.ts     # 记录血压/血糖
│   │   ├── getHealthRecords.ts # 获取健康记录
│   │   ├── getTrend.ts         # 获取趋势分析
│   │   ├── generateDailyReport.ts # 生成日报
│   │   └── checkAnomalies.ts   # 检测异常
│   ├── notification/
│   │   ├── sendMedicationReminder.ts # 发送用药提醒
│   │   ├── sendDailyReport.ts  # 发送日报
│   │   ├── sendAlert.ts        # 发送异常预警
│   │   └── sendNotification.ts # 发送通用通知
│   ├── activity/
│   │   ├── createActivity.ts   # 创建活动
│   │   ├── getActivities.ts    # 获取活动列表
│   │   ├── registerActivity.ts # 报名活动
│   │   ├── checkinActivity.ts  # 活动签到
│   │   └── getActivityStats.ts # 获取活动统计
│   ├── service/
│   │   ├── createOrder.ts      # 创建服务订单
│   │   ├── getOrders.ts        # 获取订单列表
│   │   ├── updateOrderStatus.ts # 更新订单状态
│   │   ├── reviewService.ts    # 评价服务
│   │   └── getServiceStats.ts  # 获取服务统计
│   ├── subscription/
│   │   ├── getPlans.ts         # 获取订阅套餐
│   │   ├── createSubscription.ts # 创建订阅
│   │   ├── cancelSubscription.ts # 取消订阅
│   │   └── getSubscriptionStatus.ts # 获取订阅状态
│   ├── payment/
│   │   ├── createPayment.ts    # 创建支付
│   │   ├── verifyPayment.ts    # 验证支付
│   │   └── handlePaymentCallback.ts # 支付回调
│   ├── report/
│   │   ├── generateMonthlyReport.ts # 生成月报
│   │   ├── getDashboardData.ts # 获取仪表板数据
│   │   └── exportReport.ts     # 导出报表
│   └── scheduled/
│       ├── dailyReminder.ts    # 每日用药提醒
│       ├── dailyReport.ts      # 每日日报生成
│       └── weeklyReport.ts     # 每周报告
├── db/                          # 数据库模式
│   ├── users.ts                # 用户表
│   ├── families.ts             # 家庭表
│   ├── medications.ts          # 用药表
│   ├── health-records.ts       # 健康记录表
│   ├── activities.ts           # 活动表
│   ├── activity-registrations.ts # 活动报名表
│   ├── services.ts             # 服务表
│   ├── service-orders.ts       # 服务订单表
│   ├── subscriptions.ts        # 订阅表
│   ├── notifications.ts        # 通知表
│   └── alerts.ts               # 预警表
├── utils/                       # 工具函数
│   ├── db.ts                   # 数据库操作
│   ├── auth.ts                 # 认证工具
│   ├── validation.ts           # 数据验证
│   ├── notification.ts         # 通知工具
│   ├── error.ts                # 错误处理
│   └── logger.ts               # 日志工具
├── types/                       # 类型定义
│   └── index.ts
├── config/                      # 配置文件
│   ├── database.ts             # 数据库配置
│   ├── notification.ts         # 通知配置
│   └── payment.ts              # 支付配置
├── tests/                       # 测试文件
│   ├── unit/
│   └── integration/
├── package.json
└── README.md
```

---

## 🗄️ 数据库模式

### users 表

```typescript
interface User {
  _id: string
  openId: string                 // 微信 openId
  unionId?: string               // 微信 unionId
  nickname: string
  avatar?: string
  phone?: string
  role: 'parent' | 'child' | 'admin'
  familyId?: string              // 所属家庭
  createdAt: number
  updatedAt: number
  lastLoginAt?: number
}
```

### families 表

```typescript
interface Family {
  _id: string
  name: string
  createdBy: string              // 创建者 userId
  members: {
    userId: string
    role: 'parent' | 'child'
    joinedAt: number
  }[]
  createdAt: number
  updatedAt: number
}
```

### medications 表

```typescript
interface Medication {
  _id: string
  userId: string                 // 老人 userId
  name: string
  dosage: string
  frequency: 'daily' | 'weekly' | 'custom'
  times: string[]                // ['08:00', '20:00']
  notes?: string
  active: boolean
  createdAt: number
  updatedAt: number
}
```

### health-records 表

```typescript
interface HealthRecord {
  _id: string
  userId: string                 // 老人 userId
  type: 'blood_pressure' | 'blood_sugar' | 'checkin'
  value: number | { systolic: number, diastolic: number }
  timestamp: number
  notes?: string
  createdAt: number
}
```

### activities 表

```typescript
interface Activity {
  _id: string
  stationId: string              // 所属驿站
  title: string
  description: string
  date: string                   // YYYY-MM-DD
  time: string                   // HH:mm
  location: string
  capacity: number
  category: 'health' | 'social' | 'education' | 'entertainment'
  image?: string
  status: 'draft' | 'published' | 'ongoing' | 'completed' | 'cancelled'
  createdBy: string              // 创建者 userId
  createdAt: number
  updatedAt: number
}
```

### service-orders 表

```typescript
interface ServiceOrder {
  _id: string
  parentId: string               // 老人 userId
  childId: string                // 子女 userId
  serviceId: string
  preferredDate: string
  preferredTime: string
  notes?: string
  status: 'pending' | 'assigned' | 'in_progress' | 'completed' | 'cancelled'
  providerId?: string            // 分配的服务商
  review?: {
    rating: 1-5
    comment: string
    createdAt: number
  }
  createdAt: number
  updatedAt: number
}
```

### subscriptions 表

```typescript
interface Subscription {
  _id: string
  userId: string                 // 子女 userId
  plan: 'free' | 'care' | 'premium'
  startDate: number
  endDate?: number
  autoRenew: boolean
  paymentMethod?: string
  createdAt: number
  updatedAt: number
}
```

---

## 🔌 核心函数接口

### 认证模块

```typescript
// 微信登录
export async function login(code: string): Promise<{
  token: string
  user: User
}>

// 获取用户信息
export async function getUser(userId: string): Promise<User>

// 更新用户信息
export async function updateUser(userId: string, data: Partial<User>): Promise<User>
```

### 健康数据模块

```typescript
// 记录用药打卡
export async function recordMedicationCheckin(
  userId: string,
  medicationId: string,
  timestamp: number
): Promise<{ success: boolean }>

// 获取用药列表
export async function getMedications(userId: string): Promise<Medication[]>

// 记录血压/血糖
export async function recordHealthData(
  userId: string,
  type: 'blood_pressure' | 'blood_sugar',
  value: any,
  notes?: string
): Promise<HealthRecord>

// 获取健康趋势
export async function getHealthTrend(
  userId: string,
  type: string,
  days: number
): Promise<{
  data: { date: string, value: number }[]
  average: number
  trend: 'up' | 'down' | 'stable'
}>

// 检测异常
export async function checkAnomalies(userId: string): Promise<Alert[]>

// 生成日报
export async function generateDailyReport(
  userId: string,
  date: string
): Promise<DailyReport>
```

### 通知模块

```typescript
// 发送用药提醒
export async function sendMedicationReminder(
  userId: string,
  medicationId: string
): Promise<{ success: boolean }>

// 发送日报
export async function sendDailyReport(
  userId: string,
  report: DailyReport
): Promise<{ success: boolean }>

// 发送异常预警
export async function sendAlert(
  userId: string,
  alert: Alert
): Promise<{ success: boolean }>

// 发送通用通知
export async function sendNotification(
  userId: string,
  title: string,
  content: string,
  data?: any
): Promise<{ success: boolean }>
```

### 活动模块

```typescript
// 创建活动
export async function createActivity(
  stationId: string,
  data: CreateActivityDto
): Promise<Activity>

// 获取活动列表
export async function getActivities(
  stationId: string,
  filters?: any
): Promise<Activity[]>

// 报名活动
export async function registerActivity(
  userId: string,
  activityId: string
): Promise<{ registrationId: string }>

// 活动签到
export async function checkinActivity(
  userId: string,
  activityId: string
): Promise<{ success: boolean }>

// 获取活动统计
export async function getActivityStats(
  activityId: string
): Promise<{
  totalRegistrations: number
  checkins: number
  participationRate: number
}>
```

### 服务模块

```typescript
// 创建服务订单
export async function createServiceOrder(
  parentId: string,
  childId: string,
  data: CreateOrderDto
): Promise<ServiceOrder>

// 获取订单列表
export async function getServiceOrders(
  userId: string,
  filters?: any
): Promise<ServiceOrder[]>

// 更新订单状态
export async function updateOrderStatus(
  orderId: string,
  status: string
): Promise<ServiceOrder>

// 评价服务
export async function reviewService(
  orderId: string,
  rating: number,
  comment: string
): Promise<{ success: boolean }>
```

### 订阅模块

```typescript
// 获取订阅套餐
export async function getSubscriptionPlans(): Promise<Plan[]>

// 创建订阅
export async function createSubscription(
  userId: string,
  planId: string
): Promise<{ paymentUrl: string }>

// 获取订阅状态
export async function getSubscriptionStatus(
  userId: string
): Promise<Subscription>

// 取消订阅
export async function cancelSubscription(userId: string): Promise<{ success: boolean }>
```

---

## 📦 依赖关系

### 外部依赖

```json
{
  "dependencies": {
    "wx-server-sdk": "latest",
    "zod": "^3.x",
    "date-fns": "^2.x",
    "node-cron": "^3.x"
  },
  "devDependencies": {
    "typescript": "^5.x",
    "jest": "^29.x",
    "@types/node": "^20.x"
  }
}
```

### 内部依赖

- `@silver-care/shared` — 共享类型和工具函数

---

## 🔐 安全规范

- ✅ 所有输入验证（使用 Zod）
- ✅ 权限检查（基于 userId 和 role）
- ✅ 数据加密（敏感字段加密存储）
- ✅ 错误处理（不泄露内部错误信息）
- ✅ 日志记录（记录所有重要操作）
- ✅ 速率限制（防止滥用）

---

## 🧪 测试策略

### 单元测试

- 数据验证函数
- 业务逻辑（趋势计算、异常检测）
- 工具函数
- 目标覆盖率：≥ 80%

### 集成测试

- 用户认证流程
- 健康数据记录和查询
- 活动创建和报名
- 服务订单创建和更新
- 通知发送

### E2E 测试

- 完整的用药打卡流程
- 完整的活动报名流程
- 完整的服务预约流程

---

## 📊 关键指标

| 指标 | 目标 | 说明 |
|------|------|------|
| **API 响应时间** | < 500ms | 平均响应时间 |
| **系统可用性** | > 99.9% | 正常运行时间 |
| **错误率** | < 0.1% | 请求错误比例 |
| **数据一致性** | 100% | 数据准确性 |

---

## 🚀 开发入口

### 本地开发

```bash
# 安装依赖
pnpm install

# 启动本地云开发环境
pnpm dev

# 运行测试
pnpm test

# 部署到云开发
pnpm deploy
```

### 关键文件

- **认证**：`functions/auth/login.ts`
- **健康数据**：`functions/health/recordHealth.ts`
- **通知**：`functions/notification/sendNotification.ts`
- **定时任务**：`functions/scheduled/dailyReminder.ts`
- **数据库**：`db/`
- **类型**：`types/index.ts`

---

## 📝 关键实现细节

### 用药提醒机制

```typescript
// 每天 00:00 执行
export async function dailyReminder() {
  // 1. 获取所有活跃用户
  // 2. 获取用户的用药列表
  // 3. 为每个用药生成提醒任务
  // 4. 在指定时间推送通知
}
```

### 日报生成机制

```typescript
// 每天 20:00 执行
export async function generateDailyReport() {
  // 1. 获取所有老人用户
  // 2. 收集当日健康数据
  // 3. 计算打卡完成率
  // 4. 检测异常数据
  // 5. 生成报告
  // 6. 推送给所有关注的子女
}
```

### 异常检测机制

```typescript
export async function checkAnomalies(userId: string): Promise<Alert[]> {
  const alerts: Alert[] = []

  // 检测 1：漏打卡
  const todayCheckins = await getTodayCheckins(userId)
  if (todayCheckins.length === 0) {
    alerts.push({ type: 'missed_checkin', severity: 'medium' })
  }

  // 检测 2：血压异常
  const latestBP = await getLatestBloodPressure(userId)
  if (latestBP && (latestBP.systolic > 160 || latestBP.diastolic > 100)) {
    alerts.push({ type: 'high_blood_pressure', severity: 'high' })
  }

  // 检测 3：连续异常
  const recentRecords = await getRecentHealthRecords(userId, 7)
  if (hasConsecutiveAnomalies(recentRecords)) {
    alerts.push({ type: 'consecutive_anomalies', severity: 'high' })
  }

  return alerts
}
```

### 权限检查机制

```typescript
export async function checkPermission(
  userId: string,
  targetUserId: string,
  action: string
): Promise<boolean> {
  // 1. 获取用户信息
  const user = await getUser(userId)

  // 2. 检查是否是自己
  if (userId === targetUserId) return true

  // 3. 检查是否是家庭成员
  if (user.familyId) {
    const family = await getFamily(user.familyId)
    if (family.members.some(m => m.userId === targetUserId)) {
      return true
    }
  }

  // 4. 检查是否是管理员
  if (user.role === 'admin') return true

  return false
}
```

---

## 🔄 与其他模块的交互

```
云函数
  ← 父母端（上传打卡数据）
  ← 子女端（查询健康数据）
  ← 驿站后台（创建活动、查询数据）

  ↓ 处理数据
  ↓ 生成报告
  ↓ 检测异常

  → 推送通知给父母端
  → 推送日报给子女端
  → 推送预警给子女端
```

---

**最后更新**：2026-03-03 | **维护者**：AI Context System
