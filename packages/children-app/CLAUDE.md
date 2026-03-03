# 子女端（children-app）— 模块上下文

> 子女使用的微信小程序 | 核心功能：健康日报、异常预警、远程代约、服务管理

**面包屑**：[🏠 根目录](../CLAUDE.md) > 子女端

---

## 📍 模块定位

子女端是家邻康的**第一付费用户**界面，面向 25-45 岁的上班族。设计原则：**信息密集、决策快速、行动便捷**。

### 核心用户痛点

- 不在身边 → 需要每日健康报告
- 不了解父母状况 → 需要异常预警
- 担心又帮不上 → 需要远程代约服务
- 服务质量难以保证 → 需要评价反馈系统

---

## 🎯 MVP 功能范围

### Phase 1 — 核心功能（第 1-4 周）

| 功能 | 用户流程 | 优先级 | 复杂度 |
|------|----------|--------|--------|
| **家庭绑定** | 扫码 → 选择父母 → 确认 → 绑定成功 | **P0** | 低 |
| **健康日报** | 每晚推送 → 查看详情 → 了解父母状况 | **P0** | 中 |
| **异常预警** | 漏打卡/数据异常 → 实时推送 → 一键查看 | **P0** | 中 |
| **打卡记录查看** | 查看父母打卡历史 → 趋势分析 | **P0** | 低 |
| **血压/血糖趋势** | 图表展示 → 周/月对比 → 异常标记 | **P0** | 中 |

### Phase 2 — 服务功能（第 5-6 周）

| 功能 | 说明 | 优先级 |
|------|------|--------|
| **远程代约** | 子女代父母预约上门服务 | **P1** |
| **服务列表** | 展示可用的上门服务（护理、陪伴等） | **P1** |
| **订单管理** | 查看预约状态、服务进度、评价 | **P1** |

### Phase 3 — 增强功能（第 7-8 周）

| 功能 | 说明 | 优先级 |
|------|------|--------|
| **会员订阅** | 升级到关怀版/尊享版 | **P2** |
| **健康分析** | AI 生成的健康建议 | **P2** |
| **多人关注** | 邀请其他子女共同关注 | **P2** |
| **紧急求助** | 接收父母 SOS 通知 | **P2** |

---

## 🏗️ 项目结构

```
packages/children-app/
├── src/
│   ├── pages/                    # 页面
│   │   ├── index/               # 首页（仪表板）
│   │   ├── health-report/       # 健康日报
│   │   ├── health-detail/       # 健康详情
│   │   ├── services/            # 服务预约
│   │   ├── orders/              # 订单管理
│   │   ├── family/              # 家庭管理
│   │   ├── subscription/        # 会员订阅
│   │   └── profile/             # 个人资料
│   ├── components/              # 可复用组件
│   │   ├── HealthCard/          # 健康卡片
│   │   ├── TrendChart/          # 趋势图表
│   │   ├── ServiceCard/         # 服务卡片
│   │   ├── OrderCard/           # 订单卡片
│   │   └── AlertBanner/         # 异常预警横幅
│   ├── services/                # 业务逻辑
│   │   ├── health.ts            # 健康数据 API
│   │   ├── service.ts           # 服务预约 API
│   │   ├── order.ts             # 订单管理 API
│   │   ├── family.ts            # 家庭管理 API
│   │   └── subscription.ts      # 订阅管理 API
│   ├── utils/                   # 工具函数
│   │   ├── format.ts            # 格式化工具
│   │   ├── chart.ts             # 图表数据处理
│   │   └── notification.ts      # 通知工具
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

### 家庭管理

```typescript
// 获取绑定的父母列表
GET /api/family/parents
Response: {
  familyId: string
  parents: {
    parentId: string
    name: string
    age: number
    phone: string
    avatar?: string
    status: 'active' | 'inactive'
  }[]
}

// 生成邀请码（父母端使用）
POST /api/family/invite
Response: { inviteCode: string, expiresAt: number }

// 接受邀请（子女端使用）
POST /api/family/join
Body: { inviteCode: string }
Response: { success: boolean, parentId: string }

// 移除家庭成员
DELETE /api/family/members/:memberId
Response: { success: boolean }
```

### 健康数据查询

```typescript
// 获取健康日报
GET /api/health/daily-report?parentId=xxx&date=2026-03-03
Response: {
  date: string
  parentId: string
  summary: {
    medicationCheckinRate: number // 0-100
    bloodPressure?: { systolic: number, diastolic: number }
    bloodSugar?: number
    mood?: 'good' | 'normal' | 'bad'
    notes?: string
  }
  alerts: Alert[]
}

// 获取健康趋势
GET /api/health/trend?parentId=xxx&type=blood_pressure&days=30
Response: {
  type: string
  data: { date: string, value: number }[]
  average: number
  trend: 'up' | 'down' | 'stable'
  abnormalDays: string[]
}

// 获取打卡记录
GET /api/health/checkins?parentId=xxx&days=30
Response: {
  parentId: string
  checkins: {
    date: string
    medications: { name: string, checked: boolean }[]
  }[]
}

// 获取异常预警
GET /api/health/alerts?parentId=xxx
Response: Alert[]

// 标记预警已读
PUT /api/health/alerts/:alertId
Body: { read: true }
Response: { success: boolean }
```

### 服务预约

```typescript
// 获取可用服务列表
GET /api/services?communityId=xxx
Response: Service[]

// 创建服务预约
POST /api/services/orders
Body: {
  parentId: string
  serviceId: string
  preferredDate: string
  preferredTime: string
  notes?: string
}
Response: { orderId: string, status: 'pending' }

// 获取订单列表
GET /api/services/orders?parentId=xxx
Response: Order[]

// 获取订单详情
GET /api/services/orders/:orderId
Response: Order

// 取消订单
DELETE /api/services/orders/:orderId
Response: { success: boolean }

// 评价服务
POST /api/services/orders/:orderId/review
Body: {
  rating: 1-5
  comment: string
}
Response: { success: boolean }
```

### 会员订阅

```typescript
// 获取订阅信息
GET /api/subscription/status
Response: {
  userId: string
  plan: 'free' | 'care' | 'premium'
  expiresAt?: number
  features: string[]
}

// 获取订阅套餐
GET /api/subscription/plans
Response: Plan[]

// 创建订阅
POST /api/subscription/create
Body: { planId: string }
Response: { paymentUrl: string }

// 取消订阅
DELETE /api/subscription
Response: { success: boolean }
```

### 通知与提醒

```typescript
// 获取通知列表
GET /api/notifications?limit=20
Response: Notification[]

// 标记通知已读
PUT /api/notifications/:notificationId
Body: { read: true }
Response: { success: boolean }

// 清空所有通知
DELETE /api/notifications
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
    "date-fns": "^2.x",
    "recharts": "^2.x"
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

- **首页**：关键指标卡片 + 异常预警 + 快速操作
- **健康报告**：日报 → 周报 → 月报 → 趋势分析
- **服务**：服务列表 → 预约 → 订单跟踪 → 评价
- **账户**：家庭管理 → 订阅管理 → 设置

### 颜色方案

```
主色：#1976D2（蓝色，信任感）
成功：#2E7D32（绿色，健康）
警告：#F57C00（橙色，异常）
危险：#D32F2F（红色，紧急）
背景：#FAFAFA（浅灰）
文字：#212121（深灰）
```

### 图表设计

- **折线图**：展示血压/血糖趋势
- **柱状图**：展示打卡完成率
- **饼图**：展示服务类型分布
- **卡片**：展示关键指标

---

## 🧪 测试策略

### 单元测试

- 数据格式化函数
- 趋势计算逻辑
- 订阅状态判断
- 目标覆盖率：≥ 80%

### 集成测试

- 家庭绑定流程
- 健康数据查询
- 服务预约流程
- 订阅支付流程

### E2E 测试

- 完整的家庭绑定流程
- 查看健康日报并响应异常预警
- 预约服务并评价

---

## 🔐 安全与隐私

- ✅ 用户认证（微信登录）
- ✅ 权限控制（只能查看自己绑定的父母数据）
- ✅ 支付安全（使用微信支付）
- ✅ 数据加密（HTTPS + 字段加密）

---

## 📊 关键指标

| 指标 | 目标 | 说明 |
|------|------|------|
| **周活跃率** | > 40% | 每周至少打开一次 |
| **日均使用时长** | > 5 分钟 | 用户日均使用时间 |
| **付费转化率** | > 8% | 免费用户转化为付费用户 |
| **续费率** | > 60% | 付费用户续费比例 |
| **服务预约率** | > 20% | 付费用户预约服务的比例 |

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

### 健康日报生成

1. 每晚 20:00 后端生成日报
2. 收集当日所有健康数据
3. 计算打卡完成率、数据异常
4. 推送给所有关注的子女
5. 子女打开小程序查看详情

### 异常预警机制

1. 实时监控父母的健康数据
2. 检测异常：漏打卡、数据超出范围、连续异常
3. 立即推送给子女
4. 子女可一键查看详情或联系父母

### 服务预约流程

1. 子女浏览可用服务
2. 选择服务和时间
3. 提交预约请求
4. 驿站确认预约
5. 服务前推送提醒
6. 服务完成后请求评价

### 订阅支付

1. 子女选择订阅套餐
2. 点击"立即订阅"
3. 调起微信支付
4. 支付成功后激活功能
5. 定期推送续费提醒

---

## 🔄 与其他模块的交互

```
子女端
  ↓ 查询父母健康数据
  → 云函数（数据聚合）
  ← 父母端（实时数据）

子女端
  ↓ 预约服务
  → 驿站后台（订单派发）

子女端
  ↓ 支付订阅
  → 支付系统（微信支付）
  → 云函数（激活功能）

子女端
  ← 接收异常预警
  ← 云函数（实时推送）
```

---

**最后更新**：2026-03-03 | **维护者**：AI Context System
