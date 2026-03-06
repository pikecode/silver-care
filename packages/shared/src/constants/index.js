export * from './roles';
export * from './status';
export * from './errors';
export * from './messages';
// 适老化设计常量
export const ELDERLY_UI = {
    MIN_FONT_SIZE: 18,
    KEY_FONT_SIZE: 24,
    MIN_BUTTON_SIZE: 48,
    BUTTON_SPACING: 12,
};
// 健康数据类型
export const HEALTH_RECORD_TYPES = {
    MEDICATION: 'medication',
    BLOOD_PRESSURE: 'bloodPressure',
    BLOOD_SUGAR: 'bloodSugar',
};
// 提醒频率
export const REMINDER_FREQUENCY = {
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
};
