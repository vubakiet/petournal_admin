"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import logo from "../img/logo.png";
import Image from "next/image";
import { useState } from "react";
import AuthService from "@/core/service/auth.service";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const { data } = await AuthService.login({ email, password });
    if (data) {
    }
  };

  const { push } = useRouter();
  function handleClick() {
    push("/dashboard");
  }
  return (
    <div className="">
      <section className="bg-gray-200 dark:bg-gray-900">
        <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
          <a
            href="#"
            className="mb-6 flex items-center text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <Image className="mr-2 h-16 w-16" src={logo} alt="logo" />
            Administration
          </a>
          <div className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
            <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
                Đăng nhập
              </h1>
              <div className="space-y-4 md:space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-violet-600 focus:ring-violet-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-violet-500 dark:focus:ring-violet-500 sm:text-sm"
                    placeholder="name@company.com"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Mật khẩu
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-violet-600 focus:ring-violet-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-violet-500 dark:focus:ring-violet-500 sm:text-sm"
                    required=""
                  />
                </div>

                <button
                  onClick={handleClick}
                  className="w-full rounded-lg bg-violet-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-violet-700 focus:outline-none focus:ring-violet-400 dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-violet-800"
                >
                  Đăng nhập
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
