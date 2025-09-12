export interface DailyReportDTO {
    totalUsers: number;
    totalPosts: number;
    date: string;
}

export interface MonthlyReportDTO {
    totalUsers: number;
    totalPosts: number;
    month: string;
    year: string;
}

export interface YearlyReportDTO {
    totalUsers: number;
    totalPosts: number;
    year: string;
}

// Union type: laporan bisa salah satu dari tiga
export type ReportDTO = DailyReportDTO | MonthlyReportDTO | YearlyReportDTO;
