import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }) {
  return(

  <>
    <Component {...pageProps} />
    <ToastContainer position="top-right" closeOnClick={false} />
  </>
  )
}
