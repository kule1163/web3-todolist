"use client";

import ToDoList from "./_components/ToDoList";
import WalletConnection from "./_components/WalletConnection";
import CreateToDo from "./_components/CreateToDo";
import Spinner from "./_components/Spinner";
import { useAtom } from "jotai";
import { isConnectedAtom, loadingAtom } from "@/store/store";

export default function Home() {
  const [loading] = useAtom(loadingAtom);
  const [isConnected] = useAtom(isConnectedAtom);

  return (
    <main className="min-w-[100vw] min-h-[100vh] flex relative">
      <div className="w-full lg:w-[1000px] p-[15px] md:p-[30px] mx-auto lg:p-0">
        <div className="p-[25px] w-full bg-white  mt-[150px] h-fit rounded-xl shadow-md relative overflow-hidden">
          <div className="w-100 flex justify-center">
            <WalletConnection />
          </div>
          {isConnected && (
            <>
              <CreateToDo />
              <ToDoList />
            </>
          )}
          <div>
            {loading && (
              <div className="w-full h-full inset-0 absolute flex items-center justify-center z-10 bg-slate-400 bg-opacity-70">
                <Spinner width="w-10" height="h-10" />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
