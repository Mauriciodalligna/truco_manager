import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isLogin = router.pathname === "/login";

  useEffect(() => {
    const isLogged = localStorage.getItem("isLogged");
    if (!isLogged && router.pathname !== "/login") {
      router.push("/login");
    }
  }, [router]);

  return (
    <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
      {!isLogin && <NavBar></NavBar>}
      <main className="flex-grow-1">
        <Component {...pageProps} />
      </main>
      {!isLogin && <Footer></Footer>}
    </div>
  );
}
