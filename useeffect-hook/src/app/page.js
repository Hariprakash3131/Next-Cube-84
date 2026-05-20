"use client";
// import ApiCall from "./components/page";
// import TimerExample from "./components/setInterval";
// // import Users from "./components/page";
// import EffectWithState from "./components/useEffectWithState";
// import { useEffect } from "react";
import TaskOne from "./components/taskOne";
export default function Home() {
  // useEffect(()=>{
  //   console.log('Page Loaded')
  // },[])
  return (
    <>
      {/* <div>
        <h1>Home PAge</h1>
      </div>
      <div><EffectWithState/></div>
       <div><ApiCall/></div>
        <TimerExample/> */}
        <TaskOne/>
      </>
  );
}
