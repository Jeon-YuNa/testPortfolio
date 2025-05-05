"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import "../../css/visitors.css";
import TextBox from "../main/subcomponents/TextBox";

interface Guestbook {
  nickname: string;
  content: string;
}

const Visitors = () => {
  // ✅ 임시 방명록 데이터
  const [guestbooks, setGuestbooks] = useState<Guestbook[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("guestbooks");
    if (stored) {
      setGuestbooks(JSON.parse(stored));
    }
  }, []);

  return (
    <section id="visitor" className="p-5">
      <a className="writeBtn" href="/visitors/write">
        <TextBox text="write" />
      </a>

      <div className="mt-10 listWrap gap-6 pr-6">
        <div className="mb-5 p-3 border rounded">
          <div className="font-bold">전유나</div>
          <div>포트폴리오에대한 감상평과 피드백을 편하게 남겨주세요🤗</div>
        </div>
        {guestbooks.map((item, index) => (
          <div key={index} className="mb-5 p-3 border rounded">
            <div className="font-bold">{item.nickname}</div>
            <div>{item.content}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Visitors;
