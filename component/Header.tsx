import Image from "next/image";
import vector from "@/asset/Vector.svg";
import { useRouter } from "next/router";
import { Frank_Ruhl_Libre } from "next/font/google";
import Head from "next/head";

const Frank = Frank_Ruhl_Libre({
  weight: "700",
  subsets: ["latin-ext"],
  style: ["normal"],
});

type header_props = {
  centerContent?: string;
  backButton?: boolean;
  backButtonFunc?: () => void;
  rightContent?: JSX.Element;
};

export default function Header({
  backButton,
  centerContent,
  rightContent,
  backButtonFunc,
}: header_props) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>botam</title>
        <meta name="description" content="botam книга для детей" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="header__content">
        {!backButton && (
          <Image
            src={vector}
            alt="back button"
            onClick={backButtonFunc ? backButtonFunc : router.back}
          />
        )}
        {!!centerContent && (
          <h1 className={Frank.className}>{centerContent}</h1>
        )}
        {!!rightContent ? rightContent : <div />}
      </header>
    </>
  );
}
