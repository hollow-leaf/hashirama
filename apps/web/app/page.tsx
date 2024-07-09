"use client"
import { Task } from "@/components/Task/Task";
import { useLoginStore } from "@/stores/useUserStore";
import Explore from "./explore/page";

export default function Page(): JSX.Element {

  const {ethUserInfo, userInfo, loginByJwt} = useLoginStore();

  return (
    <main className="">
      {ethUserInfo.jwt == "" ? <Explore /> : <Task />}
    </main>
  );
}
