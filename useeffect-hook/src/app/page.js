"use client";
import EffectWithState from "./components/useEffectWithState";
import { useEffect } from "react";
export default function Home() {
  useEffect(()=>{
    console.log('Page Loaded')
  },[])
  return (
    <>
      <div>
        <h1>Home PAge</h1>
      </div>
      <div><EffectWithState/></div>
      </>
  );
}
