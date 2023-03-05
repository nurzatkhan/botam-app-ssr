import Head from 'next/head'
import Header from '@/component/Header'
import { Hanken_Grotesk } from 'next/font/google'
import Image from 'next/image'
import boy from "@/asset/boy.png";
import woman from "@/asset/woman.png";
import s from '../styles/IndexPage.module.scss'
import { useRouter } from 'next/router';
import { use, useCallback, useRef, useState } from 'react';
import Webcam from 'react-webcam';

export default function CreateForm() {
    const [part, setPart] = useState(false)

    const [isMan, setIsMan] = useState(true)
    const [name, setName] = useState('')
    const router = useRouter();
    const webcamRef = useRef<any>(null);
    const capture = useCallback(
        () => {
            const imageSrc = webcamRef.current.getScreenshot();
            console.log(imageSrc)
        },
        [webcamRef]
    );
    const submit = useCallback(() => {
        console.log({
            isMan,
            name
        })
    }, [isMan, name])
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
            <main className='main justify__space-around'>
                {
                    part ? (
                        <>
                            <div className={`box justify__center`}>
                                <p className={s.addGender_P}>Выберите пол:</p>
                            </div>

                            <div className={`box align_center justify__space-around`}>
                                <div className={`${s.add_gender_block} ${s.man} ${isMan && s.active}`} onClick={() => { setIsMan(true) }}>
                                    <div className={s.block_img}>
                                        <Image src={boy} alt={"bookPrice"} />
                                    </div>
                                </div>
                                <div className={`${s.add_gender_block} ${s.woman} ${!isMan && s.active}`} onClick={() => { setIsMan(false) }}>
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
                                <button
                                    onClick={submit}
                                    className={s.create_button}
                                >
                                    продолжить
                                </button>
                            </div>

                        </>
                    )
                        :
                        (
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
                                    <button className={s.capture_photo} onClick={capture}>Capture photo</button>
                                    <button className={s.upload} onClick={capture} >upload</button>
                                </div>


                            </>
                        )

                }

            </main>
        </>
    )
}
