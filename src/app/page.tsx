import Image from "next/image";
import Loginpage from "./auth/pos/page";
import { Toaster } from 'react-hot-toast';
export default function Home() {
  return (
    <div>
      <Loginpage />
      <Toaster position="top-right" />
    </div>
  );
}
