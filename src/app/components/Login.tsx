"use client";

import { useUserStore } from "../store/UserStore";

export default function Login() {
  const setUser = useUserStore((state) => state.setUser);

  const goLogin = async () => {
    // 1. API Post 로그인 호출
    const res = await fetch(" http://localhost:33000/api/v1/employees/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "hajin@naver.com",
        password: "1234",
      }),
    });

    // 2. 응답 받아서 zustand에 저장
    const json = await res.json();
    console.log("json >> ", json);

    setUser({
      accessToken: json?.data?.accessToken || "",
      id: 1,
      name: "admin",
    });
  };

  return (
    <div className="mx-auto max-w-md rounded-lg border bg-white p-6">
      <h1 className="mb-6 text-center text-2xl font-bold">로그인</h1>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="아이디"
          className="w-full rounded border px-3 py-2"
        />

        <input
          type="password"
          placeholder="비밀번호"
          className="w-full rounded border px-3 py-2"
        />

        <button
          className="w-full rounded bg-blue-600 py-2 text-white"
          onClick={goLogin}
        >
          로그인
        </button>
      </div>
    </div>
  );
}
