import Head from "next/head";
import Header from "@/component/Header";
import { Hanken_Grotesk } from "next/font/google";
import Image from "next/image";
import bookPrice from "@/asset/bookPrice.png";
import girl from "@/asset/girl.png";

import s from "../styles/IndexPage.module.scss";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Hanken = Hanken_Grotesk({
  weight: "400",
  subsets: ["latin"],
  style: "normal",
});

export default function Create() {
  const [sesion, setSesion] = useState();
  const router = useRouter();
  useEffect(() => {
    const localStorData = localStorage.getItem("items");
    if (localStorData) {
      setSesion(JSON.parse(localStorData).sesion);
    }
  }, []);
  return (
    <>
      <>
        <Head>
          <title>botam</title>
          <meta name="description" content="botam книга для детей" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />
      </>
      <main className="main justify__space-around">
        <div className={s.block_img}>
          <Image src={bookPrice} alt={"bookPrice"} />
        </div>
        <div className={`box_colum align_center ${s.create_button}`}>
          <button onClick={() => router.push("createForm")}>
            Создать книжку
          </button>
          <p>Просмотреть примеры книг</p>
        </div>
      </main>
    </>
  );
}
