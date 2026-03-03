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
