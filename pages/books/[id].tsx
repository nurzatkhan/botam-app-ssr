import Head from "next/head";
import Header from "@/component/Header";
import { useRouter } from "next/router";
import Image from "next/image";
import s from "../../styles/IndexPage.module.scss";
import boy from "@/asset/boy.png";
import { useEffect, useState } from "react";
import useBabyData from "@/store/store";
import axios from "axios";
import { baby_book_example, book_example } from "@prisma/client";

export default function Book() {
  const router = useRouter();
  const setBabyData = useBabyData();
  const [loader, setLoader] = useState(false);

  const [data, setData] = useState<{
    bookName: string;
    content: string;
    coverUrl: string;
  }>();
  console.log(router.query.id);
  useEffect(() => {
    if (!setBabyData.data?.sesion) {
      const localStorData = localStorage.getItem("items");
      if (localStorData) {
        setBabyData.set(JSON.parse(localStorData));
      }
    }
  }, []);

  useEffect(() => {
    if (setBabyData.data && router.query.id) {
      setLoader(true);
      axios
        .get(`http://localhost:3000/api/book`, {
          params: {
            id: router.query.id,
            baby_id: setBabyData.data.id,
          },
        })
        .then(
          (value) => {
            console.log("value.data", value.data);
            if (value.data) {
              setData({
                bookName: value.data.bookName,
                content: value.data.content,
                coverUrl: value.data.coverUrl,
              });
            }
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
  }, [setBabyData, router.query.id]);

  const id = router.query.id as string;
  // const data = {
  //   bookName: "Меруерт және домбыра",
  //   content:
  //     "Жил-был мальчик по имени Диас. Он рос в Астане, на бескрайних просторах Казахстана, где лошади были душой народа. Каждый день Диас наблюдал за местными жителями, как они скачут на лошадях и чувствуют свободу. Он мечтал о том же и решил научиться скакать. Диас ходил на все занятия по скаковому спорту, изучал каждое движение и пытался повторить его на лошади. На протяжении многих месяцев он упорно тренировался и наконец-то стал настоящим наездником. Однажды, когда Диас катался на своей любимой лошади по степи, он попал в портал времени и оказался в прошлом. Вокруг него были только суровые кочевники и джунгарские захватчики, которые жестоко обращались с местным населением. Диас понимал, что сейчас самое время для того, чтобы проявить свою силу и отвагу. Он взял свою лошадь и отправился на поиски помощи для местных жителей. Вскоре Диас встретил старого кочевника, который рассказал ему о планах джунгаров и о том, как они намерены уничтожить местное население. Диас решил действовать. Он встретился со своими соплеменниками и объединил их в боевой отряд. Вместе они сражались с джунгарами, используя свою силу и умение на лошадях. Битва была жестокой и кровопролитной, но",
  //   coverUrl: "https://m.media-amazon.com/images/I/91qeS3NLeSL.jpg",
  // };

  return (
    <>
      <>
        <Head>
          <title>Botam || {data?.bookName || "Загрузка"}</title>
          <meta name="description" content="botam книга для детей" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header centerContent={data?.bookName || "Загрузка"} />
      </>
      <main className="main p15">
        <div className={s.block_img}>
          <Image
            loader={() => data?.coverUrl || "Загрузка"}
            src={boy}
            alt={"bookPrice"}
          />
        </div>
        <p style={{ marginTop: "15px" }}>{data?.content || "Загрузка"} ...</p>
        <div className={s.orderbook__block}>
          <button>заказать книгу</button>
        </div>
      </main>
    </>
  );
}
