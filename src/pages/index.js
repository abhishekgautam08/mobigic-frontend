import NavbarComponent from "@/Components/Navbar";
import HomeContainer from "@/Containers/HomeContainer";
import { whoAmI } from "@/api/auth";
import { COOKIE_TOKEN_KEY } from "@/utils/constants";
import Cookies from "js-cookie";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Dashboad</title>
      </Head>
      <main>
        <NavbarComponent />
        <HomeContainer />
      </main>
    </>
  );
}

export async function getServerSideProps(context) {
  const authToken = context.req.cookies[COOKIE_TOKEN_KEY];

  if (!authToken) {
    return {
      redirect: {
        permanent: true,
        destination: "/login",
      },
      props: {},
    };
  }

  const myDetails = await whoAmI(authToken);

  if (!myDetails) {
    Cookies.remove(COOKIE_TOKEN_KEY);
    return {
      redirect: {
        permanent: true,
        destination: "/login",
      },
      props: {},
    };
  }

  return {
    props: {
      user: myDetails.user,
    },
  };
}
