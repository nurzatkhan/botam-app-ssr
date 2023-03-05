import Head from 'next/head'
import Header from '@/component/Header'
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import Image from 'next/image';
import s from '../../styles/IndexPage.module.scss'
import boy from "@/asset/boy.png";

export default function Create() {

    const router = useRouter();
    const id = router.query.id as string
    const data = [
        {
            bookName: 'Меруерт және домбыра',
            coverUrl: "https://m.media-amazon.com/images/I/91qeS3NLeSL.jpg"
        },
        {
            bookName: 'Батыр Диас',
            coverUrl: "https://m.media-amazon.com/images/I/91qeS3NLeSL.jpg"
        }
    ]
    return (
        <>
            <>
                <Head>
                    <title>botam BOOKS</title>
                    <meta name="description" content="botam книга для детей" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <Header centerContent='Сказка' />
            </>
            <main className='main'>
                <h1 className={s.allbooksH1}>Все книги</h1>
                <div className='box__flex-wrap'>
                    {data.map((item) => (
                        <div className={s.block__book} >
                            <div className={s.block_img}>
                                <Image loader={() => item.coverUrl} src={boy} alt={"bookPrice"} />
                            </div>
                            <h2>{item.bookName}</h2>
                        </div>
                    ))}
                </div>
                <h1 className={s.allbooksH1}>О семье:</h1>
                <div className='box__flex-wrap'>
                    {data.map((item) => (
                        <div className={s.block__book} >
                            <div className={s.block_img}>
                                <Image loader={() => item.coverUrl} src={boy} alt={"bookPrice"} />
                            </div>
                            <h2>{item.bookName}</h2>
                        </div>
                    ))}
                </div>

                <div className={`box_colum align_center ${s.continue__button}`} style={{ margin: '15px' }}>
                    <button className={s.create_button}>продолжить</button>
                </div>
            </main>
        </>
    )
}
