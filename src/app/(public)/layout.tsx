"use client";

import Footer from "@/components/layout/footer";
import UpperNav from "@/components/layout/uppernav";




export default function Layout({ children }: { children: React.ReactNode }) {


  return (
    <div className=" flex-col">
     
       <UpperNav />
        <main className="flex-2">{children}</main>
        <Footer />
      </div>
 
  );
}
