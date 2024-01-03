import axiosClient from "./base.js";

const ReportService = {
  getReports: async () => {
    return await axiosClient.get("/report/getReports");
  },
  getPostsReported: async () => {
    return await axiosClient.get("/report/getPostsReported");
  },
  getUsersReported: async () => {
    return await axiosClient.get("/report/getUsersReported");
  },
  getReportDetails: async (reportId) => {
    return await axiosClient.get(`/report/getReportDetails/${reportId}`);
  },
};

export default ReportService;
