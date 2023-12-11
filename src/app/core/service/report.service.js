import axiosClient from "./base.js";

const ReportService = {
    getReports: () => {
        return axiosClient.get("/report/getReports");
    },
};

export default ReportService;
