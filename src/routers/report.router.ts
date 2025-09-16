import { Router } from "express";
import { ReportController } from "../controllers/report.controller";
import { authenticate, authorize } from "../middlewares/auth.middleware";

export class ReportRouter {
    private router: Router;
    private reportController: ReportController;

    constructor() {
        this.router = Router();
        this.reportController = new ReportController();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.get("/daily", authenticate, this.reportController.getDailyReport.bind(this.reportController));
        this.router.get("/monthly", authenticate, this.reportController.getMonthlyReport.bind(this.reportController));
        this.router.get("/yearly", authenticate, this.reportController.getYearlyReport.bind(this.reportController));
    }

    getRouter(): Router {
        return this.router;
    }
}
