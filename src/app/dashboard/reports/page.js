"use client";
import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { ImBlocked } from "react-icons/im";
import ReportService from "@/core/service/report.service";
import { Tab, TabList, Tabs } from "@chakra-ui/react";
import convertDateFormat from "@/core/utils/formatDate";
import UserService from "@/core/service/user.service";
import PostService from "@/core/service/post.service";
import toast from "react-hot-toast";

export default function Page() {
  const [showModal, setShowModal] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [reportData, setReportData] = useState(null);
  const [existsPostReport, setExistsPostReport] = useState(false);
  const [existsUserReport, setExistsUserReport] = useState(false);
  const [reportId, setReportId] = useState("");

  const loadingRowsCount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [reports, setReports] = useState([]);
  const [type, setType] = useState("all");

  useEffect(() => {
    getReports();
  }, []);

  const getReportDetails = async (reportId) => {
    const { data } = await ReportService.getReportDetails(reportId);
    if (data) {
      setReportData(data);
    }
  };

  const changeStatusPost = async (postId) => {
    try {
      const body = { postId, status: 0 };
      const { data } = await PostService.changeStatusPost(body);
      console.log(data);
      if (data) {
        setShowPopup(false);
        toast.success("Đã chặn");
        getReports();
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const changeStatusUser = async (userId) => {
    try {
      const body = { userId, status: 0 };
      const { data } = await UserService.changeStatusUser(body);
      console.log(data);
      if (data) {
        setShowPopup(false);
        toast.success("Đã chặn");
        getReports();
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const getReports = async () => {
    const { data } = await ReportService.getReports();
    setReports(data.reports);
    setExistsPostReport(data.existsPostReport);
    setExistsUserReport(data.existsUserReport);
  };
  const getPostsReported = async () => {
    const { data } = await ReportService.getPostsReported();
    if (data?.length > 0) {
      setReports(data);
    }
  };

  const getUsersReported = async () => {
    const { data } = await ReportService.getUsersReported();
    if (data?.length > 0) {
      setReports(data);
    }
  };

  useEffect(() => {
    if (type === "post") {
      getPostsReported();
    }
    if (type === "user") {
      getUsersReported();
    }
    if (type === "all") {
      getReports();
    }
  }, [type]);

  const ItemsTable = ({ items }) => {
    const handleWatch = async (reportId) => {
      await getReportDetails(reportId);
      setShowModal(true);
    };

    const handleBlock = async (reportId) => {
      await getReportDetails(reportId);
      setShowPopup(true);
    };

    return (
      <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="p-4">
              STT
            </th>
            <th scope="col" className="px-6 py-3">
              {type === "post"
                ? "Bài viết"
                : type === "user"
                  ? "Người dùng"
                  : "Đối tượng bị báo cáo"}
            </th>
            {type === "all" && (
              <th scope="col" className="px-6 py-3">
                Kiểu
              </th>
            )}
            <th scope="col" className="px-6 py-3">
              Lý do
            </th>
            {type !== "all" && (
              <th scope="col" className="px-6 py-3">
                Người báo cáo
              </th>
            )}
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr
              key={`${item._id}`}
              className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
            >
              <td className="w-4 p-4">
                <div className="flex items-center justify-center text-xl">
                  {index + 1}
                </div>
              </td>
              <th
                scope="row"
                className="flex items-center whitespace-nowrap px-6 py-4 text-gray-900 dark:text-white"
              >
                {item.post?.imageUrl ||
                  (item.user?.avatar && (
                    <img
                      className="h-10 w-10 rounded-md"
                      src={
                        item.post
                          ? item.post.imageUrl
                          : item.user
                            ? item.user.avatar
                            : null
                      }
                      alt="Jese image"
                      width={100}
                      height={100}
                    />
                  ))}

                <div className="pl-3">
                  <div className="text-base font-semibold">
                    {item.post
                      ? item.post.content
                      : item.user
                        ? item.user.firstName
                        : null}
                  </div>
                </div>
              </th>
              {type === "all" && (
                <td className="px-6 py-4">
                  {item.type == "POST"
                    ? "Bài viết"
                    : item.type == "USER"
                      ? "Người dùng"
                      : null}
                </td>
              )}

              <td className="px-6 py-4">
                <div className="flex flex-col">
                  {item.reasons?.map((reason, index) => {
                    return <div key={index}>{reason}</div>;
                  })}
                </div>
              </td>
              {type !== "all" && (
                <td className="px-6 py-4 text-gray-900 dark:text-white">
                  <div className="flex items-center">
                    {item.reporter?.avatar && (
                      <img
                        className="h-10 w-10 rounded-md"
                        src={item.reporter.avatar}
                        alt="Jese image"
                        width={100}
                        height={100}
                      />
                    )}

                    <div className="pl-3 text-base font-semibold">
                      {item.reporter.lastName + " " + item.reporter.firstName}
                    </div>
                  </div>
                </td>
              )}
              <td className="flex items-center px-6 py-4">
                <button
                  type="button"
                  className="font-medium text-violet-600 hover:underline"
                  onClick={() => handleWatch(item._id)}
                >
                  <FaEye className="h-6 w-6" />
                </button>

                <button
                  type="button"
                  className="ml-4 font-medium text-red-500 hover:underline"
                  onClick={() => handleBlock(item._id)}
                >
                  <ImBlocked className="h-6 w-6" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  const ItemsModal = () => {
    return (
      showModal && (
        <div
          className={`fixed left-0 right-0 top-0 z-50 mx-auto  flex h-[calc(100%-1rem)] max-h-full  w-full items-center justify-center overflow-y-auto overflow-x-hidden p-4 md:inset-0`}
        >
          <div
            className={`${
              showModal ? "drop-shadow-sm" : ""
            }  relative mx-auto max-h-full w-full  max-w-xl`}
          >
            <form
              action="#"
              className="relative rounded-lg bg-white shadow dark:bg-gray-700"
            >
              <div className="flex items-start justify-between rounded-t border-b p-4 dark:border-gray-600">
                <h3 className="flex w-full items-center justify-center text-xl font-semibold text-gray-900 dark:text-white">
                  Chi tiết báo cáo
                </h3>
                <button
                  type="button"
                  className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => setShowModal(false)}
                >
                  <svg
                    aria-hidden="true"
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>

              <div className="space-y-6 p-6">
                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="first-name"
                      className="mb-2 block text-base font-medium text-gray-900 dark:text-white"
                    >
                      Người báo cáo:{" "}
                      <span className="text-gray-600">
                        {reportData?.reporter.lastName +
                          " " +
                          reportData?.reporter.firstName}
                      </span>
                    </label>
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="last-name"
                      className="mb-2 block text-base font-medium text-gray-900 dark:text-white"
                    >
                      Ngày báo cáo:{" "}
                      <span className="text-gray-600">
                        {convertDateFormat(reportData?.createdAt)}
                      </span>
                    </label>
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="email"
                      className="mb-2 block text-base font-medium text-gray-900 dark:text-white"
                    >
                      Đối tượng bị báo cáo:{" "}
                      <span className="text-gray-600">
                        {reportData.type === "POST"
                          ? "Bài viết"
                          : reportData.type === "USER"
                            ? "Người dùng"
                            : ""}
                      </span>
                    </label>
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="email"
                      className="mb-2 flex text-base font-medium text-gray-900 dark:text-white"
                    >
                      Lý do:{" "}
                      <span className="text-gray-600">
                        {reportData?.reasons?.map((reason) => (
                          <div key={reason} className="ml-4 flex flex-col">
                            <span className="text-gray-600">{reason}</span>
                          </div>
                        ))}
                      </span>
                    </label>
                  </div>
                  {reportData.type === "POST" && (
                    <div className="col-span-6 flex h-auto w-[100%] justify-center rounded-lg border-2 border-gray-300 bg-gray-50 p-2 sm:col-span-3">
                      <div className="flex flex-col items-center justify-center">
                        <h1 className="p-4 text-base font-medium text-gray-900 dark:text-white">
                          Nội dung:{" "}
                          <span className="text-gray-600">
                            {reportData.post?.content}
                          </span>
                        </h1>
                        <img src={reportData.post?.imageUrl} className="p-4" />
                      </div>
                    </div>
                  )}
                  {reportData.type === "USER" && (
                    <div className="col-span-6 flex h-auto w-[100%] justify-center rounded-lg border-2 border-gray-300 bg-gray-50 p-2 sm:col-span-3">
                      <div className="flex items-center justify-center">
                        <img src={reportData.user?.avatar} className="w-24" />
                        <div>
                          <p className="p-4 text-base font-medium text-gray-900 dark:text-white">
                            {reportData.user?.lastName +
                              " " +
                              reportData.user?.firstName}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-end justify-end space-x-2 rounded-b border-t border-gray-200 p-6 dark:border-gray-600">
                <button
                  type="button"
                  className="rounded-lg bg-red-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                  onClick={() => setShowModal(false)}
                >
                  Đóng
                </button>
              </div>
            </form>
          </div>
        </div>
      )
    );
  };
  const PopupConfirm = () => {
    const handleConfirm = async () => {
      if (reportData.type === "POST") {
        await changeStatusPost(reportData?.post._id);
      }
      if (reportData.type === "USER") {
        await changeStatusUser(reportData?.user._id);
      }
    };

    return (
      showPopup && (
        <div
          className={`fixed left-0 right-0 top-0 z-50 mx-auto  flex h-[calc(100%-1rem)] max-h-full  w-full items-center justify-center overflow-y-auto overflow-x-hidden p-4 md:inset-0`}
        >
          <div
            className={`${
              showPopup ? "drop-shadow-sm" : ""
            }  relative mx-auto max-h-full w-full  max-w-xl`}
          >
            <form
              action="#"
              className="relative rounded-lg bg-white shadow dark:bg-gray-700"
            >
              <div className="flex items-start justify-between rounded-t border-b p-4 dark:border-gray-600">
                <h3 className="flex w-full items-center justify-center text-xl font-semibold text-gray-900 dark:text-white">
                  Xác nhận khoá
                </h3>
                <button
                  type="button"
                  className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => setShowPopup(false)}
                >
                  <svg
                    aria-hidden="true"
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>

              <div className="flex w-full  justify-center p-10">
                <button
                  type="button"
                  onClick={() => setShowPopup(false)}
                  className=" mr-4 rounded-lg bg-red-700 px-5 py-2.5 text-center text-xl font-medium text-white hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                >
                  Huỷ
                </button>
                <button
                  type="button"
                  onClick={handleConfirm}
                  className=" ml-4 rounded-lg bg-violet-700 px-5 py-2.5 text-center text-xl font-medium text-white hover:bg-violet-800 focus:ring-4 focus:ring-violet-300 dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-violet-800"
                >
                  Xác nhận
                </button>
              </div>
            </form>
          </div>
        </div>
      )
    );
  };
  const TableActions = ({ searchTerm, handleSearch }) => {
    return (
      <div className="flex flex-col items-center justify-between space-y-3 p-4 md:flex-row md:space-x-4 md:space-y-0">
        <div className="w-full md:w-1/2">
          <form className="flex items-center">
            <label htmlFor="simple-search" className="sr-only">
              Search
            </label>
            <div className="relative w-full">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  aria-hidden="true"
                  className="h-5 w-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                id="simple-search"
                className="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 pl-10 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                placeholder="Search"
                required=""
              />
            </div>
          </form>
        </div>
      </div>
    );
  };
  const TableFooter = ({ totalPages, handleChangePage, currentPage }) => {
    return (
      <nav
        className="flex flex-col items-start justify-between space-y-3 p-4 md:flex-row md:items-center md:space-y-0"
        aria-label="Table navigation"
      >
        <span className="space-x-2 text-sm font-normal text-gray-500 dark:text-gray-400">
          Showing&nbsp;
          <span className="font-semibold text-gray-900 dark:text-white">
            {currentPage}
          </span>
          &nbsp;of
          <span className="font-semibold text-gray-900 dark:text-white">
            {totalPages}
          </span>
        </span>
        <ul className="inline-flex items-stretch -space-x-px">
          <li>
            <a
              href="#"
              className="ml-0 flex h-full items-center justify-center rounded-l-lg border border-gray-300 bg-white px-3 py-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="sr-only">Previous</span>
              <svg
                className="h-5 w-5"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </li>
          {Array.from({ length: totalPages }).map((_, index) => (
            <li key={index}>
              <button
                onClick={() => handleChangePage(index + 1)}
                disabled={currentPage === index + 1}
                type="button"
                className={`flex items-center justify-center px-3 py-2 text-sm leading-tight ${
                  currentPage === index + 1
                    ? "bg-violet-700 text-white"
                    : "bg-white text-gray-500"
                } border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
              >
                {index + 1}
              </button>
            </li>
          ))}
          {/* <li>
            <a
              href="#"
              className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              2
            </a>
          </li>
          <li>
            <a
              href="#"
              aria-current="page"
              className="flex items-center justify-center text-sm z-10 py-2 px-3 leading-tight text-primary-600 bg-primary-50 border border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
            >
              3
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              ...
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              100
            </a>
          </li> */}
          <li>
            <a
              href="#"
              className="flex h-full items-center justify-center rounded-r-lg border border-gray-300 bg-white px-3 py-1.5 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="sr-only">Next</span>
              <svg
                className="h-5 w-5"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </li>
        </ul>
      </nav>
    );
  };
  const ItemsTableContainer = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");

    const handlePostsReported = () => {
      if (existsPostReport) {
        setType("post");
      } else {
        toast.error("Danh sách báo cáo bài viết trống");
      }
    };

    const handleUsersReported = () => {
      if (existsUserReport) {
        setType("user");
      } else {
        toast.error("Danh sách báo cáo người dùng trống");
      }
    };

    const handleAllReported = () => {
      setType("all");
    };

    const handleChangePage = (page) => {
      setCurrentPage(page);
    };
    let pageSize = 10;
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const totalPages = Math.ceil(reports.length / pageSize);
    //const  currentData = reports.slice(startIndex, endIndex);

    //search filter
    const handleSearch = (event) => {
      setSearchTerm(event.target.value);
      setCurrentPage(1);
    };

    const filteredData = reports.filter((item) =>
      item.reasons.some((reason) =>
        reason.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    );

    const currentData = filteredData.slice(startIndex, endIndex);

    return (
      <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
        <TableActions searchTerm={searchTerm} handleSearch={handleSearch} />
        <div className="overflow-x-auto">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <Tabs className="pb-4">
              <TabList className="flex w-full items-center">
                <Tab className="w-[15%] pl-4" onClick={handleAllReported}>
                  <p
                    className={`w-full rounded-lg  border-2 p-4 ${
                      type === "all"
                        ? "bg-violet-500 text-white"
                        : "hover:bg-violet-100"
                    }`}
                  >
                    Tất cả
                  </p>
                </Tab>
                <Tab className="w-[15%]" onClick={handlePostsReported}>
                  <p
                    className={`w-full rounded-lg  border-2 p-4 ${
                      type === "post"
                        ? "bg-violet-500 text-white"
                        : "hover:bg-violet-100"
                    }`}
                  >
                    Bài viết
                  </p>
                </Tab>
                <Tab className="w-[15%]" onClick={handleUsersReported}>
                  <p
                    className={`w-full rounded-lg  border-2 p-4 ${
                      type === "user"
                        ? "bg-violet-500 text-white"
                        : "hover:bg-violet-100"
                    }`}
                  >
                    Người dùng
                  </p>
                </Tab>
              </TabList>
            </Tabs>

            <ItemsTable items={currentData} />
          </div>
        </div>
        <TableFooter
          totalPages={totalPages}
          handleChangePage={handleChangePage}
          currentPage={currentPage}
        />
        {/* <DeleteToast /> */}
      </div>
    );
  };
  const LoadingTable = () => {
    return (
      <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
        <div className="overflow-x-auto">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
              <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="p-4">
                    <div className="flex items-center">
                      <input
                        id="checkbox-all-search"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-violet-600 focus:ring-2 focus:ring-violet-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-violet-600 dark:focus:ring-offset-gray-800"
                      />
                      <label htmlFor="checkbox-all-search" className="sr-only">
                        checkbox
                      </label>
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Position
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {loadingRowsCount.map((product, index) => (
                  <tr
                    key={index}
                    className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
                  >
                    <td className="w-4 p-4">
                      <div className="flex items-center">
                        <input
                          id="checkbox-table-search-1"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-violet-600 focus:ring-2 focus:ring-violet-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-violet-600 dark:focus:ring-offset-gray-800"
                        />
                        <label
                          htmlFor="checkbox-table-search-1"
                          className="sr-only"
                        >
                          <div className="mb-2.5 h-2.5 w-24 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                        </label>
                      </div>
                    </td>
                    <th
                      scope="row"
                      className="flex items-center whitespace-nowrap px-6 py-4 text-gray-900 dark:text-white"
                    >
                      <div className="pl-3">
                        <div className="mb-2.5 h-2.5 w-24 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                      </div>
                    </th>
                    <td className="px-6 py-4">
                      {" "}
                      <div className="mb-2.5 h-2.5 w-24 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="mb-2.5 h-2.5 w-24 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="mb-2.5 h-2.5 w-24 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  //main
  return (
    <section className="p-2">
      <div
        className={`mx-auto max-w-screen-xl px-2 lg:px-12 ${
          showModal || showPopup ? "blur-lg" : ""
        }`}
      >
        {reports.length > 0 ? <ItemsTableContainer /> : <LoadingTable />}
      </div>
      <ItemsModal />
      <PopupConfirm />
    </section>
  );
}
