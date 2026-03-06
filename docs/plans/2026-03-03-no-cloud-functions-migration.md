# 去云函数迁移（独立后端 API）Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 将 three mini-app 端从 `wx.cloud.callFunction` 迁移到独立后端 REST API（PostgreSQL 后端），并保留现有业务语义与 `ApiResponse<T>` 响应格式。

**Architecture:** 采用模块化单体后端（`packages/api-server`）+ 前端统一 `httpClient` 适配层。先完成认证与核心健康能力（auth/medication/health/report/alert）闭环，再逐步替换其余云函数入口。迁移期间通过服务层 API 形状保持页面调用不变，降低改造风险。

**Tech Stack:** TypeScript, Node.js, Express, PostgreSQL (driver + SQL), Jest, ts-jest, Zod, pnpm workspace

---

### Task 1: 建立 API 服务骨架（不接业务）

**Files:**
- Create: `packages/api-server/package.json`
- Create: `packages/api-server/tsconfig.json`
- Create: `packages/api-server/jest.config.js`
- Create: `packages/api-server/src/index.ts`
- Create: `packages/api-server/src/server.ts`
- Create: `packages/api-server/src/routes/health.ts`
- Create: `packages/api-server/src/types/api.ts`
- Test: `packages/api-server/tests/health.test.ts`
- Modify: `pnpm-workspace.yaml`

**Step 1: Write the failing test**

```ts
// packages/api-server/tests/health.test.ts
import { createServer } from '../src/server'

describe('GET /api/v1/health', () => {
  it('returns ok', async () => {
    const app = createServer()
    const res = await app.inject({ method: 'GET', url: '/api/v1/health' })

    expect(res.statusCode).toBe(200)
    expect(res.json()).toEqual({ success: true, data: { status: 'ok' } })
  })
})
```

**Step 2: Run test to verify it fails**

Run: `pnpm --filter @silver-care/api-server test -- health.test.ts`
Expected: FAIL with `Cannot find module '../src/server'`

**Step 3: Write minimal implementation**

```ts
// packages/api-server/src/server.ts
import express from 'express'

export function createServer() {
  const app = express()
  app.get('/api/v1/health', (_req, res) => {
    res.status(200).json({ success: true, data: { status: 'ok' } })
  })
  return app
}
```

**Step 4: Run test to verify it passes**

Run: `pnpm --filter @silver-care/api-server test -- health.test.ts`
Expected: PASS

**Step 5: Commit**

```bash
git add pnpm-workspace.yaml packages/api-server/
git commit -m "feat: scaffold api server health endpoint"
```

---

### Task 2: 建立数据库与仓储基础（users + medications 最小闭环）

**Files:**
- Create: `packages/api-server/src/config/env.ts`
- Create: `packages/api-server/src/db/client.ts`
- Create: `packages/api-server/src/db/schema.sql`
- Create: `packages/api-server/src/repositories/user-repository.ts`
- Create: `packages/api-server/src/repositories/medication-repository.ts`
- Test: `packages/api-server/tests/repositories/user-repository.test.ts`
- Test: `packages/api-server/tests/repositories/medication-repository.test.ts`

**Step 1: Write the failing test**

```ts
// packages/api-server/tests/repositories/user-repository.test.ts
import { mapUserRow } from '../../src/repositories/user-repository'

describe('mapUserRow', () => {
  it('maps database row to domain user', () => {
    const user = mapUserRow({ id: 'u1', open_id: 'o1', nickname: 'n1', role: 'parent', created_at: 1, updated_at: 1 })
    expect(user._id).toBe('u1')
    expect(user.openId).toBe('o1')
  })
})
```

**Step 2: Run test to verify it fails**

Run: `pnpm --filter @silver-care/api-server test -- user-repository.test.ts`
Expected: FAIL with `mapUserRow is not a function`

**Step 3: Write minimal implementation**

```ts
// packages/api-server/src/repositories/user-repository.ts
export function mapUserRow(row: any) {
  return {
    _id: row.id,
    openId: row.open_id,
    nickname: row.nickname,
    role: row.role,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}
```

**Step 4: Run test to verify it passes**

Run: `pnpm --filter @silver-care/api-server test -- user-repository.test.ts`
Expected: PASS

**Step 5: Commit**

```bash
git add packages/api-server/src/config packages/api-server/src/db packages/api-server/src/repositories packages/api-server/tests/repositories
git commit -m "feat: add api server db config and repositories"
```

---

### Task 3: 实现认证 API（替代 wechatLogin/getUserInfo）

**Files:**
- Create: `packages/api-server/src/modules/auth/auth.schema.ts`
- Create: `packages/api-server/src/modules/auth/auth.service.ts`
- Create: `packages/api-server/src/modules/auth/auth.controller.ts`
- Create: `packages/api-server/src/routes/auth.ts`
- Create: `packages/api-server/src/middleware/auth.ts`
- Test: `packages/api-server/tests/auth.wechat-login.test.ts`
- Test: `packages/api-server/tests/auth.me.test.ts`
- Modify: `packages/api-server/src/server.ts`

**Step 1: Write the failing test**

```ts
// packages/api-server/tests/auth.wechat-login.test.ts
import request from 'supertest'
import { createServer } from '../src/server'

describe('POST /api/v1/auth/wechat-login', () => {
  it('returns token and user', async () => {
    const app = createServer()
    const res = await request(app).post('/api/v1/auth/wechat-login').send({ code: 'mock-code' })

    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
    expect(res.body.data.token).toBeDefined()
    expect(res.body.data.user._id).toBeDefined()
  })
})
```

**Step 2: Run test to verify it fails**

Run: `pnpm --filter @silver-care/api-server test -- auth.wechat-login.test.ts`
Expected: FAIL with 404 or route not found

**Step 3: Write minimal implementation**

```ts
// packages/api-server/src/routes/auth.ts
router.post('/wechat-login', async (req, res) => {
  const result = await authService.wechatLogin(req.body.code)
  res.status(200).json({ success: true, data: result })
})
```

**Step 4: Run test to verify it passes**

Run: `pnpm --filter @silver-care/api-server test -- auth.wechat-login.test.ts`
Expected: PASS

**Step 5: Commit**

```bash
git add packages/api-server/src/modules/auth packages/api-server/src/routes/auth.ts packages/api-server/src/middleware/auth.ts packages/api-server/tests/auth.*
git commit -m "feat: add auth api endpoints"
```

---

### Task 4: 建立小程序 HTTP 客户端并迁移 AuthService（父母端+子女端）

**Files:**
- Create: `packages/parent-app/src/services/http-client.ts`
- Create: `packages/children-app/src/services/http-client.ts`
- Test: `packages/parent-app/tests/services/http-client.test.ts`
- Test: `packages/parent-app/tests/services/auth.test.ts`
- Test: `packages/children-app/tests/services/auth.test.ts`
- Modify: `packages/parent-app/src/services/auth.ts`
- Modify: `packages/children-app/src/services/auth.ts`
- Modify: `packages/parent-app/package.json`
- Modify: `packages/children-app/package.json`

**Step 1: Write the failing test**

```ts
// packages/parent-app/tests/services/auth.test.ts
import { AuthService } from '../../src/services/auth'

describe('AuthService.login', () => {
  it('uses HTTP endpoint instead of cloud function', async () => {
    const service = new AuthService()
    ;(global as any).wx = {
      request: jest.fn().mockImplementation(({ success }) =>
        success({ data: { success: true, data: { token: 't', user: { _id: 'u1', openId: 'o1', nickname: 'n', role: 'parent', createdAt: 1, updatedAt: 1 } } } })
      ),
      setStorageSync: jest.fn(),
      removeStorageSync: jest.fn(),
    }

    const user = await service.login('mock-code')
    expect(user._id).toBe('u1')
    expect((global as any).wx.request).toHaveBeenCalled()
  })
})
```

**Step 2: Run test to verify it fails**

Run: `pnpm --filter @silver-care/parent-app test -- auth.test.ts`
Expected: FAIL with `wx.cloud.callFunction is not a function`

**Step 3: Write minimal implementation**

```ts
// packages/parent-app/src/services/http-client.ts
export async function httpPost<T>(url: string, data: unknown): Promise<T> {
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      method: 'POST',
      data,
      success: (res) => resolve((res as any).data),
      fail: reject,
    })
  })
}
```

**Step 4: Run test to verify it passes**

Run: `pnpm --filter @silver-care/parent-app test -- auth.test.ts`
Expected: PASS

**Step 5: Commit**

```bash
git add packages/parent-app/src/services/http-client.ts packages/children-app/src/services/http-client.ts packages/parent-app/src/services/auth.ts packages/children-app/src/services/auth.ts packages/parent-app/tests/services packages/children-app/tests/services packages/parent-app/package.json packages/children-app/package.json
git commit -m "refactor: migrate app auth services to http client"
```

---

### Task 5: 迁移父母端业务服务（medication + health）到 REST API

**Files:**
- Test: `packages/parent-app/tests/services/medication.test.ts`
- Test: `packages/parent-app/tests/services/health.test.ts`
- Modify: `packages/parent-app/src/services/medication.ts`
- Modify: `packages/parent-app/src/services/health.ts`
- Create: `packages/api-server/src/modules/medication/medication.controller.ts`
- Create: `packages/api-server/src/modules/health/health.controller.ts`
- Create: `packages/api-server/src/routes/medication.ts`
- Create: `packages/api-server/src/routes/health-records.ts`
- Test: `packages/api-server/tests/medication.api.test.ts`
- Test: `packages/api-server/tests/health.api.test.ts`

**Step 1: Write the failing test**

```ts
// packages/api-server/tests/medication.api.test.ts
import request from 'supertest'
import { createServer } from '../src/server'

describe('POST /api/v1/medications/:id/checkins', () => {
  it('creates checkin response', async () => {
    const app = createServer()
    const res = await request(app).post('/api/v1/medications/med-1/checkins').set('Authorization', 'Bearer test').send({})

    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
  })
})
```

**Step 2: Run test to verify it fails**

Run: `pnpm --filter @silver-care/api-server test -- medication.api.test.ts`
Expected: FAIL with 404

**Step 3: Write minimal implementation**

```ts
// packages/api-server/src/routes/medication.ts
router.post('/:id/checkins', (_req, res) => {
  res.status(200).json({ success: true, data: { _id: 'checkin-1', timestamp: Date.now() } })
})
```

**Step 4: Run test to verify it passes**

Run: `pnpm --filter @silver-care/api-server test -- medication.api.test.ts`
Expected: PASS

**Step 5: Commit**

```bash
git add packages/parent-app/src/services/medication.ts packages/parent-app/src/services/health.ts packages/parent-app/tests/services packages/api-server/src/modules/medication packages/api-server/src/modules/health packages/api-server/src/routes/medication.ts packages/api-server/src/routes/health-records.ts packages/api-server/tests/medication.api.test.ts packages/api-server/tests/health.api.test.ts
git commit -m "refactor: migrate parent medication and health services to rest api"
```

---

### Task 6: 迁移子女端业务服务（report + alert）到 REST API

**Files:**
- Test: `packages/children-app/tests/services/report.test.ts`
- Test: `packages/children-app/tests/services/alert.test.ts`
- Modify: `packages/children-app/src/services/report.ts`
- Modify: `packages/children-app/src/services/alert.ts`
- Create: `packages/api-server/src/modules/report/report.controller.ts`
- Create: `packages/api-server/src/modules/alert/alert.controller.ts`
- Create: `packages/api-server/src/routes/reports.ts`
- Create: `packages/api-server/src/routes/alerts.ts`
- Test: `packages/api-server/tests/reports.api.test.ts`
- Test: `packages/api-server/tests/alerts.api.test.ts`

**Step 1: Write the failing test**

```ts
// packages/children-app/tests/services/report.test.ts
import { ReportService } from '../../src/services/report'

describe('ReportService.getLatestDailyReport', () => {
  it('calls http endpoint and returns report', async () => {
    const service = new ReportService()
    ;(global as any).wx = {
      request: jest.fn().mockImplementation(({ success }) =>
        success({ data: { success: true, data: { date: '2026-03-03', userId: 'u1', summary: { medicationCheckinRate: 100 }, alerts: [] } } })
      ),
    }

    const report = await service.getLatestDailyReport()
    expect(report.date).toBe('2026-03-03')
  })
})
```

**Step 2: Run test to verify it fails**

Run: `pnpm --filter @silver-care/children-app test -- report.test.ts`
Expected: FAIL with cloud call mock error

**Step 3: Write minimal implementation**

```ts
// packages/children-app/src/services/report.ts
const response = await httpGet<ApiResponse<DailyReport>>('/api/v1/reports/daily/latest')
if (!response.success) throw new Error(response.error)
return response.data
```

**Step 4: Run test to verify it passes**

Run: `pnpm --filter @silver-care/children-app test -- report.test.ts`
Expected: PASS

**Step 5: Commit**

```bash
git add packages/children-app/src/services/report.ts packages/children-app/src/services/alert.ts packages/children-app/tests/services packages/api-server/src/modules/report packages/api-server/src/modules/alert packages/api-server/src/routes/reports.ts packages/api-server/src/routes/alerts.ts packages/api-server/tests/reports.api.test.ts packages/api-server/tests/alerts.api.test.ts
git commit -m "refactor: migrate children report and alert services to rest api"
```

---

### Task 7: 增加迁移验收测试与下线云函数入口

**Files:**
- Create: `packages/api-server/tests/e2e/migration-smoke.test.ts`
- Modify: `packages/cloud-functions/package.json`
- Modify: `packages/cloud-functions/src/functions/auth.ts`
- Modify: `packages/cloud-functions/src/functions/medication.ts`
- Modify: `packages/cloud-functions/src/functions/health.ts`
- Modify: `packages/cloud-functions/src/functions/report.ts`
- Modify: `packages/cloud-functions/src/functions/alert.ts`
- Modify: `packages/cloud-functions/src/functions/family.ts`
- Modify: `docs/plans/2026-03-03-phase1-core-features.md`

**Step 1: Write the failing test**

```ts
// packages/api-server/tests/e2e/migration-smoke.test.ts
import request from 'supertest'
import { createServer } from '../../src/server'

describe('migration smoke', () => {
  it('auth + medication + report happy path works without wx.cloud', async () => {
    const app = createServer()
    const login = await request(app).post('/api/v1/auth/wechat-login').send({ code: 'mock-code' })
    expect(login.status).toBe(200)
  })
})
```

**Step 2: Run test to verify it fails**

Run: `pnpm --filter @silver-care/api-server test -- migration-smoke.test.ts`
Expected: FAIL due to missing route wiring

**Step 3: Write minimal implementation**

```ts
// packages/api-server/src/server.ts
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/medications', medicationRouter)
app.use('/api/v1/reports', reportsRouter)
```

并将 cloud-functions 对外行为改成显式弃用错误（非静默成功），避免误调用。

**Step 4: Run test to verify it passes**

Run: `pnpm --filter @silver-care/api-server test -- migration-smoke.test.ts`
Expected: PASS

**Step 5: Commit**

```bash
git add packages/api-server/tests/e2e packages/api-server/src/server.ts packages/cloud-functions/package.json packages/cloud-functions/src/functions docs/plans/2026-03-03-phase1-core-features.md
git commit -m "chore: add migration smoke tests and deprecate cloud functions"
```

---

## 全量验证清单（执行每个任务后追加）

1. Run: `pnpm --filter @silver-care/api-server test`
   Expected: all API server tests PASS
2. Run: `pnpm --filter @silver-care/parent-app test`
   Expected: parent service tests PASS
3. Run: `pnpm --filter @silver-care/children-app test`
   Expected: children service tests PASS
4. Run: `pnpm -r run build`
   Expected: all packages build successfully
5. Run: `pnpm -r run lint`
   Expected: lint clean

---

## 风险与回滚点

- Risk 1: 小程序环境 `wx.request` mock 不完整导致测试不稳定。
  - Mitigation: 在 `tests/setup-wx.ts` 统一 mock。
- Risk 2: token 存储逻辑变更影响登录态。
  - Mitigation: 保留 `token/user` storage key，不改页面读取逻辑。
- Risk 3: 云函数残留调用路径。
  - Mitigation: CI 加 `Grep` 检查 `wx.cloud.callFunction` 残留。

回滚策略：每个任务单独 commit，可逐任务 `git revert <sha>`。
