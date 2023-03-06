import Head from "next/head";
import Header from "@/component/Header";
import Image from "next/image";
import boy from "@/asset/boy.png";
import woman from "@/asset/woman.png";
import s from "../styles/IndexPage.module.scss";
import { useRef, useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import { useRouter } from "next/router";

export default function CreateForm() {
  const router = useRouter();
  const [part, setPart] = useState(true);
  const [isMan, setIsMan] = useState(true);
  const [name, setName] = useState("");
  const [loader, setLoader] = useState(false);
  const webcamRef = useRef<any>(null);

  const capture = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (name && imageSrc) {
      setLoader(true);
      const data = await axios
        .post(`http://localhost:3000/api/baby`, {
          firstname: name,
          lastname: name,
          surname: name,
          is_boy: isMan,
          face_url: "test",
        })
        .finally(() => {
          setLoader(false);
        });
      localStorage.setItem("items", JSON.stringify(data.data));
      console.log(data.data);
      router.push("/book");
    }
  };
  function setContinue() {
    if (name) {
      setPart(false);
    } else {
      console.log("name is not null");
    }
  }

  return (
    <>
      <Header centerContent={loader ? "ЗАГРУЗКА..." : undefined} />
      <main className="main justify__space-around">
        {part ? (
          <>
            <div className={`box justify__center`}>
              <p className={s.addGender_P}>Выберите пол:</p>
            </div>

            <div className={`box align_center justify__space-around`}>
              <div
                className={`${s.add_gender_block} ${s.man} ${
                  isMan && s.active
                }`}
                onClick={() => {
                  setIsMan(true);
                }}
              >
                <div className={s.block_img}>
                  <Image src={boy} alt={"bookPrice"} />
                </div>
              </div>
              <div
                className={`${s.add_gender_block} ${s.woman} ${
                  !isMan && s.active
                }`}
                onClick={() => {
                  setIsMan(false);
                }}
              >
                <div className={s.block_img}>
                  <Image src={woman} alt={"bookPrice"} />
                </div>
              </div>
            </div>

            <div className={`box_colum align_center ${s.addName}`}>
              <p>введите имя</p>
              <input onChange={(e) => setName(e.target.value)} value={name} />
            </div>

            <div className={`box_colum align_center ${s.continue__button}`}>
              <button onClick={setContinue} className={s.create_button}>
                продолжить
              </button>
            </div>
          </>
        ) : (
          <>
            <div className={`box_colum justify__center`}>
              <p className={s.addGender_P}>upload or take a photo</p>
              <Webcam
                style={{ margin: "15px" }}
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
              />
            </div>
            <div className={`box_colum justify__center align_center`}>
              <button
                className={s.capture_photo}
                disabled={loader}
                onClick={capture}
              >
                Capture photo
              </button>
              <button className={s.upload} disabled={loader} onClick={capture}>
                upload
              </button>
            </div>
          </>
        )}
      </main>
    </>
  );
}
