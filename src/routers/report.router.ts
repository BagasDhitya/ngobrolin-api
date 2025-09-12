import { Router } from "express";
import { ReportController } from "../controllers/report.controller";

export class ReportRouter {
    private router: Router;
    private reportController: ReportController;

    constructor() {
        this.router = Router();
        this.reportController = new ReportController();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.get("/daily", this.reportController.getDailyReport.bind(this.reportController));
        this.router.get("/monthly", this.reportController.getMonthlyReport.bind(this.reportController));
        this.router.get("/yearly", this.reportController.getYearlyReport.bind(this.reportController));
    }

    getRouter(): Router {
        return this.router;
    }
}
