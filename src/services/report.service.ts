import { PrismaClient } from "@prisma/client";
import { DailyReportDTO, MonthlyReportDTO, YearlyReportDTO } from "../dto/report.dto";

const prisma = new PrismaClient();

export class ReportService {
    public async getDailyReport(date: Date): Promise<DailyReportDTO> {
        const start = new Date(date);
        start.setHours(0, 0, 0, 0);

        const end = new Date(date);
        end.setHours(23, 59, 59, 999);

        const totalUsers = await prisma.profile.count({
            where: { createdAt: { gte: start, lte: end } },
        });

        const totalPosts = await prisma.post.count({
            where: { createdAt: { gte: start, lte: end } },
        });

        return {
            date: start.toISOString().split("T")[0],
            totalUsers: totalUsers,
            totalPosts: totalPosts
        };
    }

    public async getMonthlyReport(year: number, month: number): Promise<MonthlyReportDTO> {
        const start = new Date(year, month - 1, 1);
        const end = new Date(year, month, 0, 23, 59, 59, 999);

        const totalUsers = await prisma.profile.count({
            where: { createdAt: { gte: start, lte: end } },
        });

        const totalPosts = await prisma.post.count({
            where: { createdAt: { gte: start, lte: end } },
        });

        return {
            year: year.toString(),
            month: month.toString(),
            totalUsers: totalUsers,
            totalPosts: totalPosts
        };
    }

    public async getYearlyReport(year: number): Promise<YearlyReportDTO> {
        const start = new Date(year, 0, 1);
        const end = new Date(year, 11, 31, 23, 59, 59, 999);

        const totalUsers = await prisma.profile.count({
            where: { createdAt: { gte: start, lte: end } },
        });

        const totalPosts = await prisma.post.count({
            where: { createdAt: { gte: start, lte: end } },
        });

        return {
            year: year.toString(),
            totalUsers: totalUsers,
            totalPosts: totalPosts
        };
    }
}
