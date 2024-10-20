'use client'

import Image from "next/image";
import Navbar from "./components/Navbar";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()
  router.replace('/register')
  return (
    <div>
        <main>
          <Navbar/>
        </main>
    </div>
  );
}
