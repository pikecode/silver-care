export type HealthRecordType = 'blood_pressure' | 'blood_sugar' | 'checkin';
export interface BloodPressure {
    systolic: number;
    diastolic: number;
}
export interface HealthRecord {
    _id: string;
    userId: string;
    type: HealthRecordType;
    value: number | BloodPressure;
    timestamp: number;
    notes?: string;
    createdAt: number;
}
export interface Medication {
    _id: string;
    userId: string;
    name: string;
    dosage: string;
    frequency: 'daily' | 'weekly' | 'custom';
    times: string[];
    notes?: string;
    active: boolean;
    createdAt: number;
    updatedAt: number;
}
export interface MedicationCheckin {
    _id: string;
    userId: string;
    medicationId: string;
    timestamp: number;
    createdAt: number;
}
export interface HealthTrend {
    data: {
        date: string;
        value: number;
    }[];
    average: number;
    trend: 'up' | 'down' | 'stable';
    abnormalDays: string[];
}
export interface DailyReport {
    date: string;
    userId: string;
    summary: {
        medicationCheckinRate: number;
        bloodPressure?: BloodPressure;
        bloodSugar?: number;
        mood?: 'good' | 'normal' | 'bad';
        notes?: string;
    };
    alerts: Alert[];
}
export interface Alert {
    _id: string;
    userId: string;
    type: 'missed_checkin' | 'high_blood_pressure' | 'low_blood_sugar' | 'consecutive_anomalies';
    severity: 'low' | 'medium' | 'high';
    message: string;
    read: boolean;
    createdAt: number;
}
