import Head from 'next/head'
import Header from '@/component/Header'
import { useRouter } from 'next/router';
import Image from 'next/image';
import s from '../../styles/IndexPage.module.scss'
import boy from "@/asset/boy.png";

export default function book() {

    const router = useRouter();
    const id = router.query.id as string
    const data = {
        bookName: 'Меруерт және домбыра',
        content: "Жил-был мальчик по имени Диас. Он рос в Астане, на бескрайних просторах Казахстана, где лошади были душой народа. Каждый день Диас наблюдал за местными жителями, как они скачут на лошадях и чувствуют свободу. Он мечтал о том же и решил научиться скакать. Диас ходил на все занятия по скаковому спорту, изучал каждое движение и пытался повторить его на лошади. На протяжении многих месяцев он упорно тренировался и наконец-то стал настоящим наездником. Однажды, когда Диас катался на своей любимой лошади по степи, он попал в портал времени и оказался в прошлом. Вокруг него были только суровые кочевники и джунгарские захватчики, которые жестоко обращались с местным населением. Диас понимал, что сейчас самое время для того, чтобы проявить свою силу и отвагу. Он взял свою лошадь и отправился на поиски помощи для местных жителей. Вскоре Диас встретил старого кочевника, который рассказал ему о планах джунгаров и о том, как они намерены уничтожить местное население. Диас решил действовать. Он встретился со своими соплеменниками и объединил их в боевой отряд. Вместе они сражались с джунгарами, используя свою силу и умение на лошадях. Битва была жестокой и кровопролитной, но",
        coverUrl: 'https://m.media-amazon.com/images/I/91qeS3NLeSL.jpg'
    }
    return (
        <>
            <>
                <Head>
                    <title>Botam || {data.bookName}</title>
                    <meta name="description" content="botam книга для детей" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <Header centerContent='Котакбас диас' />
            </>
            <main className='main p15'>
                <div className={s.block_img}>
                    <Image loader={() => data.coverUrl} src={boy} alt={"bookPrice"} />
                </div>
                <p style={{ marginTop: '15px' }}>{data.content} ...</p>
                <div className={s.orderbook__block}>
                    <button >заказать книгу</button>
                </div>
            </main>
        </>
    )
}
