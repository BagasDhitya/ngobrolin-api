export interface ReportDTO {
    totalUsers: number;
    totalPosts: number;
    date: string;   // untuk daily
    month?: string; // untuk monthly
    year?: string;  // untuk yearly
}
