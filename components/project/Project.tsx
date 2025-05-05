"use client";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import TabBtn from "./subcomponents/TabBtn";
import Article from "./subcomponents/Article";
import { ProjectDataTest } from "./data/projectData";
import "../../css/project.css";

const Project = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  useEffect(() => {
    AOS.refresh();
  }, [activeTab]);

  return (
    <section id="project" className="flex">
      <aside className="flex flex-col gap-4 pt-10 w-[25%]">
        {ProjectDataTest.length > 0 &&
          ProjectDataTest.map((v) => (
            <TabBtn
              key={v.id}
              text={v.title}
              event={() => setActiveTab(v.id)}
            />
          ))}
        {ProjectDataTest.length === 0 && (
          <p>프로젝트 정보를 불러오는 중이거나 정보가 없습니다.</p>
        )}
      </aside>

      <div className="flex-1">
        {ProjectDataTest ? (
          <Article
            key={activeTab}
            {...ProjectDataTest.find((v) => v.id === activeTab)!}
          />
        ) : (
          ProjectDataTest == false && <p>프로젝트를 선택해주세요.</p>
        )}
      </div>
    </section>
  );
};

export default Project;
