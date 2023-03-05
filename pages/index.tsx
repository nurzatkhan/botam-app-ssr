import Head from "next/head";
import Header from "@/component/Header";
import { Hanken_Grotesk } from "next/font/google";
import Image from "next/image";
import goyAndHorse from "@/asset/goyAndHorse.png";
import girl from "@/asset/girl.png";

import s from "../styles/IndexPage.module.scss";
import { useState } from "react";
import { useRouter } from "next/router";

const Hanken = Hanken_Grotesk({
  weight: "400",
  subsets: ["latin"],
  style: "normal",
});

export default function Home() {
  const router = useRouter();
  const [count, setCount] = useState(0);
  function ClickNavigate(Skip: boolean) {
    if (Skip) {
      if (count < 1) {
        setCount((prev) => prev + 1);
      } else {
        router.push("create");
      }
    } else {
      if (count === 1) {
        setCount((prev) => prev - 1);
        return;
      } else {
        router.back();
      }
    }
  }
  return (
    <>
      <>
        <Head>
          <title>botam</title>
          <meta name="description" content="botam книга для детей" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header
          rightContent={
            <div
              className={Hanken.className}
              style={{ fontSize: "16px" }}
              onClick={() => {
                ClickNavigate(true);
              }}
            >
              Skip
            </div>
          }
          backButtonFunc={() => ClickNavigate(false)}
        />
      </>
      <main className="main justify__space-around">
        <div className={s.block_img}>
          <Image
            src={count === 0 ? goyAndHorse : girl}
            alt={count === 0 ? "goyAndHorse" : "girl"}
          />
        </div>
        <div
          className={`box_colum align_center ${s.content} ${Hanken.className}`}
        >
          <h1>Only Books Can Help You</h1>
          <p>
            Books can help you to increase your knowledge and become more
            successfully.
          </p>
        </div>
        <div className={s.progress}>
          <div className={count === 0 ? s.active : s.disabled}></div>
          <div className={count === 1 ? s.active : s.disabled}></div>
          <div className={s.disabled}></div>
        </div>
      </main>
    </>
  );
}
