"use client";

import "../../../css/visitors.css";
import { firstNames, lastNames } from "@/components/visitor/data/nicknameData";
import { createVisitors } from "@/utils/api";
import { useRouter } from "next/navigation";
import { useState } from "react";

const getRandomElement = (arr: string[]) => {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
};

const generateRandomNickname = () => {
  const firstName = getRandomElement(firstNames);
  const lastName = getRandomElement(lastNames);
  return `${firstName} ${lastName}`;
};

const Write = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nickname: "",
    content: "",
  });

  const handleGenerateNickname = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const randomName = generateRandomNickname();
    setFormData((prev) => ({
      ...prev,
      nickname: randomName,
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const stored = localStorage.getItem("guestbooks");
    const guestbooks = stored ? JSON.parse(stored) : [];

    const newEntry = {
      nickname: formData.nickname,
      content: formData.content,
    };

    guestbooks.unshift(newEntry); // 최신순으로 넣기

    localStorage.setItem("guestbooks", JSON.stringify(guestbooks));
    router.push("/visitors");
  };

  return (
    <div className="input px-10 py-15">
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
        <div className="mb-6 flex gap-3">
          <input
            type="text"
            id="nickname"
            name="nickname"
            required
            value={formData.nickname}
            onChange={handleChange}
            className="p-2"
            placeholder="버튼을 클릭해 닉네임을 생성하세요."
          />
          <button
            type="button"
            className="w-[50%] py-2 px-4"
            onClick={handleGenerateNickname}
          >
            닉네임 생성기
          </button>
        </div>

        <div className="mb-6">
          <textarea
            id="content"
            name="content"
            required
            rows={5}
            value={formData.content}
            onChange={handleChange}
            className="p-2"
            placeholder="방명록 내용을 입력해주세요"
          />
        </div>

        <button type="submit" className="w-full py-2 px-4">
          등록
        </button>
      </form>
    </div>
  );
};

export default Write;
