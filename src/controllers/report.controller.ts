import { Request, Response, NextFunction } from "express";
import { ReportService } from "../services/report.service";
import { DailyReportDTO, MonthlyReportDTO, YearlyReportDTO } from "../dto/report.dto";
import { successResponse, AppError } from "../helpers/response.helper";

export class ReportController {
    private reportService: ReportService;

    constructor() {
        this.reportService = new ReportService();
    }

    public async getDailyReport(req: Request, res: Response, next: NextFunction) {
        const date = new Date();
        const report: DailyReportDTO = await this.reportService.getDailyReport(date);

        if (!report || !report.date) {
            throw new AppError("Daily report data not available", 404);
        }

        return successResponse(res, report, "Daily report retrieved");
    }

    public async getMonthlyReport(req: Request, res: Response, next: NextFunction) {
        const year = parseInt(req.query.year as string) || new Date().getFullYear();
        const month = parseInt(req.query.month as string) || new Date().getMonth() + 1;

        if (isNaN(year) || isNaN(month) || month < 1 || month > 12) {
            throw new AppError("Invalid year or month parameter", 400);
        }

        const report: MonthlyReportDTO = await this.reportService.getMonthlyReport(year, month);

        if (!report || !report.month || !report.year) {
            throw new AppError("Monthly report data not available", 404);
        }

        return successResponse(res, report, "Monthly report retrieved");
    }

    public async getYearlyReport(req: Request, res: Response, next: NextFunction) {
        const year = parseInt(req.query.year as string) || new Date().getFullYear();

        if (isNaN(year)) {
            throw new AppError("Invalid year parameter", 400);
        }

        const report: YearlyReportDTO = await this.reportService.getYearlyReport(year);

        if (!report || !report.year) {
            throw new AppError("Yearly report data not available", 404);
        }

        return successResponse(res, report, "Yearly report retrieved");
    }
}
