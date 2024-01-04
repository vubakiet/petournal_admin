"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { initFlowbite } from "flowbite";
import Image from "next/image";
import logo from "../../img/logo.png";
import { BsFilePostFill } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { MdOutlineReport } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { resetUserState } from "@/core/store/feature/user-slice";

export default function DashboardSidebarLayout({ children }) {
  const userStore = useSelector((state) => state.user);

  const [activeLink, setActiveLink] = useState("");
  const pathname = usePathname();
  useEffect(() => {
    //get current url path
    setActiveLink(pathname);
    //init flowbite
    initFlowbite();
  }, [pathname]);

  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userStore.accessToken) {
      const timeoutId = setTimeout(() => {
        router.push("/");
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [userStore.accessToken, router]);

  const handleLogout = useCallback(async () => {
    dispatch(resetUserState());
    router.refresh();
  }, [dispatch, router]);

  return (
    <div>
      <nav className="fixed top-0 z-50 w-full border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 ">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 sm:hidden"
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="h-6 w-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <Link href="https://flowbite.com" className="ml-2 flex md:mr-24">
                <Image
                  src={logo}
                  className="mr-3 h-8 w-8"
                  alt="FlowBite Logo"
                />
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white sm:text-2xl">
                  Petournal
                </span>
              </Link>
            </div>
            <div className="flex items-center">
              <div className="ml-3 flex items-center">
                <div>
                  <button
                    type="button"
                    className="flex rounded-full bg-gray-800 text-sm focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    aria-expanded="false"
                    data-dropdown-toggle="dropdown-user"
                  >
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full"
                      src={userStore.avatar}
                      alt="user photo"
                    />
                  </button>
                </div>
                <div
                  className="z-50 my-4 hidden list-none divide-y divide-gray-100 rounded bg-white text-base shadow dark:divide-gray-600 dark:bg-gray-700"
                  id="dropdown-user"
                >
                  <div className="px-4 py-3" role="none">
                    <p
                      className="text-sm text-gray-900 dark:text-white"
                      role="none"
                    >
                      {userStore.fullName}
                    </p>
                    <p
                      className="truncate text-sm font-medium text-gray-900 dark:text-gray-300"
                      role="none"
                    >
                      {userStore.email}
                    </p>
                  </div>
                  <ul className="py-1" role="none">
                    <li>
                      <button
                        onClick={handleLogout}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Sign out
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <aside
        id="logo-sidebar"
        className="fixed left-0 top-0 z-40 h-screen w-64 -translate-x-full border-r border-gray-200 bg-white pt-20 transition-transform dark:border-gray-700 dark:bg-gray-800 sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full overflow-y-auto bg-white px-3 pb-4 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li
              className={`py-1 ${
                activeLink === "/dashboard/users"
                  ? "rounded-lg bg-violet-50 text-violet-500"
                  : "bg-white text-gray-700"
              }`}
            >
              <Link
                href="/dashboard/users"
                className="flex items-center space-x-4 rounded-lg p-2 dark:text-white  dark:hover:bg-gray-700"
              >
                <FaUserCircle className="h-6 w-6" />
                <span
                // className={`py-1 ${activeLink === "/dashboard/users" ? "text-vioml-3" : "ml-3"}`}
                >
                  Users
                </span>
              </Link>
            </li>

            <li
              className={`mt-10 py-1 ${
                activeLink === "/dashboard/posts"
                  ? "rounded-lg bg-violet-50 text-violet-500"
                  : "bg-white text-gray-700"
              }`}
            >
              <Link
                href="/dashboard/posts"
                className="p-2rounded-lg flex items-center space-x-4 p-2 dark:text-white  dark:hover:bg-gray-700"
              >
                <BsFilePostFill className="h-6 w-6" />
                <span className="py-1">Posts</span>
              </Link>
            </li>

            <li
              className={`mt-10 py-1 ${
                activeLink === "/dashboard/reports"
                  ? "rounded-lg bg-violet-50 text-violet-500"
                  : "bg-white text-gray-700"
              }`}
            >
              <Link
                href="/dashboard/reports"
                className="ounded-lg flex items-center space-x-4 p-2 dark:text-white  dark:hover:bg-gray-700"
              >
                <MdOutlineReport className="h-8 w-8" />
                <span className={`py-1`}>Reports</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
      <div className="mt-14 p-2 sm:ml-64">{children}</div>
    </div>
  );
}
