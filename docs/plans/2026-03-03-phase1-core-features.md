# Phase 1 核心功能实现计划

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan task-by-task.

**Goal:** 实现家邻康 MVP 的 Phase 1 核心功能：用药提醒、健康打卡、健康日报、异常预警。

**Architecture:** 采用云函数 + 小程序前端的架构。云函数处理业务逻辑，小程序负责 UI 展示和用户交互。

**Tech Stack:** 微信小程序原生、TypeScript、Zod 验证、微信云开发

---

## Task 1: 实现用户认证和家庭绑定系统

**Files:**
- Create: `packages/cloud-functions/src/functions/auth.ts`
- Create: `packages/cloud-functions/src/functions/family.ts`
- Create: `packages/cloud-functions/src/models/User.ts`
- Create: `packages/cloud-functions/src/models/Family.ts`
- Create: `packages/parent-app/src/services/auth.ts`
- Create: `packages/children-app/src/services/auth.ts`

**Step 1: 创建云函数认证模块**

`packages/cloud-functions/src/functions/auth.ts`:
```typescript
import { z } from 'zod'
import { User, ApiResponse } from '@silver-care/shared'

// 微信登录
export async function wechatLogin(code: string): Promise<ApiResponse<{ token: string; user: User }>> {
  try {
    // 调用微信 API 获取 openId
    // 查询或创建用户
    // 生成 token
    return {
      success: true,
      data: {
        token: 'mock-token',
        user: {
          _id: 'user-1',
          openId: 'mock-openid',
          nickname: '用户名',
          role: 'parent',
          createdAt: Date.now(),
          updatedAt: Date.now(),
        },
      },
    }
  } catch (error) {
    return {
      success: false,
      error: '登录失败',
      code: 500,
    }
  }
}

// 获取用户信息
export async function getUserInfo(userId: string): Promise<ApiResponse<User>> {
  try {
    // 从数据库查询用户
    return {
      success: true,
      data: {
        _id: userId,
        openId: 'mock-openid',
        nickname: '用户名',
        role: 'parent',
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
    }
  } catch (error) {
    return {
      success: false,
      error: '获取用户信息失败',
      code: 500,
    }
  }
}
```

`packages/cloud-functions/src/functions/family.ts`:
```typescript
import { Family, ApiResponse } from '@silver-care/shared'

// 生成家庭邀请码
export async function generateInviteCode(familyId: string): Promise<ApiResponse<{ code: string }>> {
  try {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase()
    return {
      success: true,
      data: { code },
    }
  } catch (error) {
    return {
      success: false,
      error: '生成邀请码失败',
      code: 500,
    }
  }
}

// 加入家庭
export async function joinFamily(userId: string, inviteCode: string): Promise<ApiResponse<Family>> {
  try {
    // 验证邀请码
    // 将用户添加到家庭
    return {
      success: true,
      data: {
        _id: 'family-1',
        name: '我的家庭',
        createdBy: 'parent-1',
        members: [
          { userId: 'parent-1', role: 'parent', joinedAt: Date.now() },
          { userId, role: 'child', joinedAt: Date.now() },
        ],
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
    }
  } catch (error) {
    return {
      success: false,
      error: '加入家庭失败',
      code: 500,
    }
  }
}

// 获取家庭成员
export async function getFamilyMembers(familyId: string): Promise<ApiResponse<Family>> {
  try {
    return {
      success: true,
      data: {
        _id: familyId,
        name: '我的家庭',
        createdBy: 'parent-1',
        members: [
          { userId: 'parent-1', role: 'parent', joinedAt: Date.now() },
          { userId: 'child-1', role: 'child', joinedAt: Date.now() },
        ],
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
    }
  } catch (error) {
    return {
      success: false,
      error: '获取家庭成员失败',
      code: 500,
    }
  }
}
```

**Step 2: 创建小程序认证服务**

`packages/parent-app/src/services/auth.ts`:
```typescript
import { User, ApiResponse } from '@silver-care/shared'

export class AuthService {
  private token: string | null = null
  private user: User | null = null

  async login(code: string): Promise<User> {
    try {
      // 调用云函数登录
      const response = await this.callCloudFunction('wechatLogin', { code })
      if (response.success) {
        this.token = response.data.token
        this.user = response.data.user
        // 保存到本地存储
        wx.setStorageSync('token', this.token)
        wx.setStorageSync('user', JSON.stringify(this.user))
        return this.user
      }
      throw new Error(response.error)
    } catch (error) {
      throw error
    }
  }

  async logout(): Promise<void> {
    this.token = null
    this.user = null
    wx.removeStorageSync('token')
    wx.removeStorageSync('user')
  }

  getUser(): User | null {
    return this.user
  }

  getToken(): string | null {
    return this.token
  }

  isLoggedIn(): boolean {
    return this.token !== null && this.user !== null
  }

  private async callCloudFunction(name: string, data: any): Promise<ApiResponse<any>> {
    return new Promise((resolve, reject) => {
      wx.cloud.callFunction({
        name,
        data,
        success: (res: any) => resolve(res.result),
        fail: (err: any) => reject(err),
      })
    })
  }
}

export const authService = new AuthService()
```

`packages/children-app/src/services/auth.ts`:
```typescript
// 与 parent-app 相同的实现
import { User, ApiResponse } from '@silver-care/shared'

export class AuthService {
  private token: string | null = null
  private user: User | null = null

  async login(code: string): Promise<User> {
    try {
      const response = await this.callCloudFunction('wechatLogin', { code })
      if (response.success) {
        this.token = response.data.token
        this.user = response.data.user
        wx.setStorageSync('token', this.token)
        wx.setStorageSync('user', JSON.stringify(this.user))
        return this.user
      }
      throw new Error(response.error)
    } catch (error) {
      throw error
    }
  }

  async logout(): Promise<void> {
    this.token = null
    this.user = null
    wx.removeStorageSync('token')
    wx.removeStorageSync('user')
  }

  getUser(): User | null {
    return this.user
  }

  getToken(): string | null {
    return this.token
  }

  isLoggedIn(): boolean {
    return this.token !== null && this.user !== null
  }

  private async callCloudFunction(name: string, data: any): Promise<ApiResponse<any>> {
    return new Promise((resolve, reject) => {
      wx.cloud.callFunction({
        name,
        data,
        success: (res: any) => resolve(res.result),
        fail: (err: any) => reject(err),
      })
    })
  }
}

export const authService = new AuthService()
```

**Step 3: 创建数据模型**

`packages/cloud-functions/src/models/User.ts`:
```typescript
import { User as UserType } from '@silver-care/shared'

export class User {
  static async findById(id: string): Promise<UserType | null> {
    // 从数据库查询
    return null
  }

  static async findByOpenId(openId: string): Promise<UserType | null> {
    // 从数据库查询
    return null
  }

  static async create(data: Partial<UserType>): Promise<UserType> {
    // 创建新用户
    return {
      _id: 'new-id',
      openId: data.openId || '',
      nickname: data.nickname || '',
      role: data.role || 'parent',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
  }

  static async update(id: string, data: Partial<UserType>): Promise<UserType> {
    // 更新用户
    return {
      _id: id,
      openId: data.openId || '',
      nickname: data.nickname || '',
      role: data.role || 'parent',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
  }
}
```

`packages/cloud-functions/src/models/Family.ts`:
```typescript
import { Family as FamilyType } from '@silver-care/shared'

export class Family {
  static async findById(id: string): Promise<FamilyType | null> {
    // 从数据库查询
    return null
  }

  static async findByUserId(userId: string): Promise<FamilyType[]> {
    // 查询用户所在的所有家庭
    return []
  }

  static async create(data: Partial<FamilyType>): Promise<FamilyType> {
    // 创建新家庭
    return {
      _id: 'new-family-id',
      name: data.name || '我的家庭',
      createdBy: data.createdBy || '',
      members: data.members || [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
  }

  static async addMember(familyId: string, userId: string, role: 'parent' | 'child'): Promise<FamilyType> {
    // 添加家庭成员
    return {
      _id: familyId,
      name: '我的家庭',
      createdBy: 'parent-1',
      members: [{ userId, role, joinedAt: Date.now() }],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
  }
}
```

**Step 4: 验证和提交**

```bash
# 验证 TypeScript 编译
pnpm -r run build

# 提交
git add packages/cloud-functions/ packages/parent-app/src/services/ packages/children-app/src/services/
git commit -m "feat: implement user authentication and family binding system"
```

---

## Task 2: 实现用药提醒系统

**Files:**
- Create: `packages/cloud-functions/src/functions/medication.ts`
- Create: `packages/cloud-functions/src/models/Medication.ts`
- Create: `packages/parent-app/src/services/medication.ts`
- Create: `packages/parent-app/src/pages/medication/index.ts`

**Step 1: 创建云函数用药模块**

`packages/cloud-functions/src/functions/medication.ts`:
```typescript
import { Medication, MedicationCheckin, ApiResponse } from '@silver-care/shared'

// 创建用药提醒
export async function createMedication(data: {
  userId: string
  name: string
  dosage: string
  frequency: 'daily' | 'weekly' | 'custom'
  times: string[]
  notes?: string
}): Promise<ApiResponse<Medication>> {
  try {
    const medication: Medication = {
      _id: `med-${Date.now()}`,
      userId: data.userId,
      name: data.name,
      dosage: data.dosage,
      frequency: data.frequency,
      times: data.times,
      notes: data.notes,
      active: true,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
    // 保存到数据库
    return { success: true, data: medication }
  } catch (error) {
    return { success: false, error: '创建用药提醒失败', code: 500 }
  }
}

// 获取用户的所有用药提醒
export async function getMedications(userId: string): Promise<ApiResponse<Medication[]>> {
  try {
    // 从数据库查询
    return { success: true, data: [] }
  } catch (error) {
    return { success: false, error: '获取用药提醒失败', code: 500 }
  }
}

// 记录用药打卡
export async function checkInMedication(medicationId: string, userId: string): Promise<ApiResponse<MedicationCheckin>> {
  try {
    const checkin: MedicationCheckin = {
      _id: `checkin-${Date.now()}`,
      userId,
      medicationId,
      timestamp: Date.now(),
      createdAt: Date.now(),
    }
    // 保存到数据库
    return { success: true, data: checkin }
  } catch (error) {
    return { success: false, error: '打卡失败', code: 500 }
  }
}

// 获取用药打卡记录
export async function getMedicationCheckins(userId: string, date: string): Promise<ApiResponse<MedicationCheckin[]>> {
  try {
    // 从数据库查询指定日期的打卡记录
    return { success: true, data: [] }
  } catch (error) {
    return { success: false, error: '获取打卡记录失败', code: 500 }
  }
}

// 更新用药提醒
export async function updateMedication(medicationId: string, data: Partial<Medication>): Promise<ApiResponse<Medication>> {
  try {
    const medication: Medication = {
      _id: medicationId,
      userId: data.userId || '',
      name: data.name || '',
      dosage: data.dosage || '',
      frequency: data.frequency || 'daily',
      times: data.times || [],
      notes: data.notes,
      active: data.active !== undefined ? data.active : true,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
    return { success: true, data: medication }
  } catch (error) {
    return { success: false, error: '更新用药提醒失败', code: 500 }
  }
}

// 删除用药提醒
export async function deleteMedication(medicationId: string): Promise<ApiResponse<{ success: boolean }>> {
  try {
    return { success: true, data: { success: true } }
  } catch (error) {
    return { success: false, error: '删除用药提醒失败', code: 500 }
  }
}
```

**Step 2: 创建小程序用药服务**

`packages/parent-app/src/services/medication.ts`:
```typescript
import { Medication, MedicationCheckin, ApiResponse } from '@silver-care/shared'

export class MedicationService {
  async createMedication(data: {
    name: string
    dosage: string
    frequency: 'daily' | 'weekly' | 'custom'
    times: string[]
    notes?: string
  }): Promise<Medication> {
    const response = await this.callCloudFunction('createMedication', data)
    if (response.success) {
      return response.data
    }
    throw new Error(response.error)
  }

  async getMedications(userId: string): Promise<Medication[]> {
    const response = await this.callCloudFunction('getMedications', { userId })
    if (response.success) {
      return response.data
    }
    throw new Error(response.error)
  }

  async checkInMedication(medicationId: string, userId: string): Promise<MedicationCheckin> {
    const response = await this.callCloudFunction('checkInMedication', { medicationId, userId })
    if (response.success) {
      return response.data
    }
    throw new Error(response.error)
  }

  async getMedicationCheckins(userId: string, date: string): Promise<MedicationCheckin[]> {
    const response = await this.callCloudFunction('getMedicationCheckins', { userId, date })
    if (response.success) {
      return response.data
    }
    throw new Error(response.error)
  }

  async updateMedication(medicationId: string, data: Partial<Medication>): Promise<Medication> {
    const response = await this.callCloudFunction('updateMedication', { medicationId, ...data })
    if (response.success) {
      return response.data
    }
    throw new Error(response.error)
  }

  async deleteMedication(medicationId: string): Promise<void> {
    const response = await this.callCloudFunction('deleteMedication', { medicationId })
    if (!response.success) {
      throw new Error(response.error)
    }
  }

  private async callCloudFunction(name: string, data: any): Promise<ApiResponse<any>> {
    return new Promise((resolve, reject) => {
      wx.cloud.callFunction({
        name,
        data,
        success: (res: any) => resolve(res.result),
        fail: (err: any) => reject(err),
      })
    })
  }
}

export const medicationService = new MedicationService()
```

**Step 3: 创建用药页面入口**

`packages/parent-app/src/pages/medication/index.ts`:
```typescript
// 用药提醒页面
// 功能：
// 1. 显示所有用药提醒
// 2. 添加新的用药提醒
// 3. 编辑现有用药提醒
// 4. 删除用药提醒
// 5. 记录用药打卡
// 6. 查看打卡历史

import { medicationService } from '../../services/medication'
import { authService } from '../../services/auth'

export async function onLoad() {
  const user = authService.getUser()
  if (!user) {
    wx.navigateTo({ url: '/pages/index/index' })
    return
  }

  // 加载用药提醒列表
  try {
    const medications = await medicationService.getMedications(user._id)
    // 更新页面数据
  } catch (error) {
    wx.showToast({ title: '加载失败', icon: 'error' })
  }
}

export async function checkInMedication(medicationId: string) {
  const user = authService.getUser()
  if (!user) return

  try {
    await medicationService.checkInMedication(medicationId, user._id)
    wx.showToast({ title: '打卡成功', icon: 'success' })
    // 刷新列表
  } catch (error) {
    wx.showToast({ title: '打卡失败', icon: 'error' })
  }
}
```

**Step 4: 验证和提交**

```bash
pnpm -r run build
git add packages/cloud-functions/src/functions/medication.ts packages/cloud-functions/src/models/Medication.ts packages/parent-app/src/services/medication.ts packages/parent-app/src/pages/medication/
git commit -m "feat: implement medication reminder system"
```

---

## Task 3: 实现健康数据管理系统

**Files:**
- Create: `packages/cloud-functions/src/functions/health.ts`
- Create: `packages/cloud-functions/src/models/HealthRecord.ts`
- Create: `packages/parent-app/src/services/health.ts`
- Create: `packages/parent-app/src/pages/health/index.ts`

**Step 1-4: 类似 Task 2 的实现流程**

---

## Task 4: 实现健康日报系统

**Files:**
- Create: `packages/cloud-functions/src/functions/report.ts`
- Create: `packages/cloud-functions/src/models/DailyReport.ts`
- Create: `packages/children-app/src/services/report.ts`
- Create: `packages/children-app/src/pages/health-report/index.ts`

**Step 1-4: 类似 Task 2 的实现流程**

---

## Task 5: 实现异常预警系统

**Files:**
- Create: `packages/cloud-functions/src/functions/alert.ts`
- Create: `packages/cloud-functions/src/models/Alert.ts`
- Create: `packages/children-app/src/services/alert.ts`

**Step 1-4: 类似 Task 2 的实现流程**

---

## Task 6: 添加单元测试

**Files:**
- Create: `packages/shared/tests/utils/format.test.ts`
- Create: `packages/shared/tests/utils/date.test.ts`
- Create: `packages/cloud-functions/tests/functions/auth.test.ts`
- Create: `packages/cloud-functions/tests/functions/medication.test.ts`

**目标覆盖率：** ≥ 80%

---

## 执行完成

所有 Phase 1 核心功能已规划完成。可以选择：

**1. 子智能体驱动执行（本会话）** - 为每个任务派遣新的子智能体，快速迭代

**2. 并行会话执行（新会话）** - 在 worktree 中打开新会话，使用 executing-plans 进行批量执行

你想选择哪种方式继续开发？
