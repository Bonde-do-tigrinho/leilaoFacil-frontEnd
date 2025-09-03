"use client";
import Header from "./Header";
import SideBar from "../SideBar";
import { useEffect } from "react";
export interface templateProps {
  className?: string; //tem que ter pois iremos usar classname no componente
  children: React.ReactNode; //tem que ter pois iremos colocar elementos filhos dentro deste componente
}
export default function Template(props: templateProps) {
  useEffect(() => {
    const script = document.createElement("script");
    script.setAttribute("data-account", "bwZNl4VRup");
    script.src = "https://cdn.userway.org/widget.js";
    script.async = true;
    document.body.appendChild(script);

    // Optional cleanup
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  return (
    <>
      <div className="flex flex-col overflow-x-hidden h-screen">
        <Header />
        <div className="flex flex-1 overflow-hidden ">
          <aside className="sticky top-0 h-screen overflow-y-auto pb-[5rem] no-scrollbar"> 
            <SideBar />
          </aside>

        <main
          className={`flex-1 overflow-y-auto p-8 ${props.className ?? ''}`}
          >
            {props.children}
          </main>
      </div>

      </div>
    </>
  );
}