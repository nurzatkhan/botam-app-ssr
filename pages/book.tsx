import Head from "next/head";
import Header from "@/component/Header";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import s from "../styles/IndexPage.module.scss";
import boy from "@/asset/boy.png";
import useBabyData from "@/store/store";
import axios from "axios";
import { baby, baby_book_example, book_example } from "@prisma/client";

export default function Create() {
  const router = useRouter();
  const id = router.query.id as string;
  const setBabyData = useBabyData();
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState<
    {
      bookName: string;
      coverUrl: string;
      bookId: string;
    }[]
  >();

  useEffect(() => {
    if (!setBabyData.data?.sesion) {
      const localStorData = localStorage.getItem("items");
      if (localStorData) {
        setBabyData.set(JSON.parse(localStorData));
      }
    }
  }, []);
  useEffect(() => {
    if (setBabyData.data) {
      setLoader(true);
      axios
        .get<
          | (baby & {
              baby_book_example: (baby_book_example & {
                book_example: book_example;
              })[];
            })
          | null
        >(`http://localhost:3000/api/baby`, {
          params: { sesion_id: setBabyData.data.sesion },
        })
        .then(
          (value) => {
            setData(
              value.data?.baby_book_example.map((value) => {
                return {
                  bookName: value.book_example.name,
                  coverUrl: value.cover_url,
                  bookId: value.book_example_id,
                };
              })
            );
          },
          (data) => {
            console.log(data);
          }
        )
        .catch(() => {
          console.log("hello world");
        })
        .finally(() => {
          setLoader(false);
        });
    }
  }, [setBabyData]);
  return (
    <>
      <>
        <Head>
          <title>botam BOOKS</title>
          <meta name="description" content="botam книга для детей" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header centerContent={loader ? "Загрузка" : "Сказка"} />
      </>
      <main className="main">
        <h1 className={s.allbooksH1}>Все книги</h1>
        <div className="box__flex-wrap">
          {data &&
            data.map((item) => (
              <>
                <div className={s.block__book}>
                  <div className={s.block_img}>
                    <Image
                      loader={() => item.coverUrl}
                      src={boy}
                      onClick={() => {
                        router.push("books/" + item.bookId);
                      }}
                      alt={"bookPrice"}
                    />
                  </div>
                  <h2>{item.bookName}</h2>
                </div>
              </>
            ))}
        </div>
        <h1 className={s.allbooksH1}>О семье:</h1>
        <div className="box__flex-wrap">
          {data &&
            data.map((item) => (
              <>
                <div className={s.block__book}>
                  <div className={s.block_img}>
                    <Image
                      loader={() => item.coverUrl}
                      src={boy}
                      alt={"bookPrice"}
                      onClick={() => {
                        router.push("books/" + item.bookId);
                      }}
                    />
                  </div>
                  <h2>{item.bookName}</h2>
                </div>
              </>
            ))}
        </div>

        <div
          className={`box_colum align_center ${s.continue__button}`}
          style={{ margin: "15px" }}
        >
          <button className={s.create_button}>продолжить</button>
        </div>
      </main>
    </>
  );
}
