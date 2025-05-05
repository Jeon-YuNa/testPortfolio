"use client";
import FadeInWrapper from "../components/FadeInWrapper";
import MainPage from "../components/main/Main";

export default function Home() {
  return (
    <div id="container">
      <FadeInWrapper>
        <MainPage />
      </FadeInWrapper>
    </div>
  );
}
