export function formatDate(timestamp, format = 'YYYY-MM-DD') {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    if (format === 'YYYY-MM-DD')
        return `${year}-${month}-${day}`;
    return format;
}
export function formatTime(timestamp, format = 'HH:mm') {
    const date = new Date(timestamp);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    if (format === 'HH:mm')
        return `${hours}:${minutes}`;
    return format;
}
export function formatDateTime(timestamp, format = 'YYYY-MM-DD HH:mm') {
    return `${formatDate(timestamp)} ${formatTime(timestamp)}`;
}
export function formatNumber(value, decimals = 2) {
    return value.toFixed(decimals);
}
export function formatCurrency(value, currency = '¥') {
    return `${currency}${value.toFixed(2)}`;
}
export function formatPercentage(value, decimals = 0) {
    return `${(value * 100).toFixed(decimals)}%`;
}
export function formatPhone(phone) {
    return phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1 $2 $3');
}
export function maskPhone(phone) {
    return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
}
export function formatBloodPressure(bp) {
    return `${bp.systolic}/${bp.diastolic} mmHg`;
}
export function formatBloodSugar(value) {
    return `${value} mg/dL`;
}
