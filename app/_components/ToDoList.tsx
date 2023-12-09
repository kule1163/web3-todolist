"use client";

import { ToDoList as ToDoListContractType } from "@/typechain-types";
import { useEffect } from "react";
import SingleToDo from "./SingleToDo";
import { useAtom } from "jotai";
import { loadingAtom, toDoListAtom } from "@/store/store";
import { toDoListContract } from "@/helpers/createContract";

const ToDoList = () => {
  const [, setLoading] = useAtom(loadingAtom);
  const [toDoList, setToDoList] = useAtom(toDoListAtom);

  // Handle fetching to do items
  const handleGetToDo = async (status: Status) => {
    // Create todo list smart contract
    const ToDoListContract = await toDoListContract();

    if (ToDoListContract) {
      // Set loading state to indicate that data is being fetched
      setLoading(true);

      // Helper function to create a standardized to do list from raw data
      const createToDoList = (
        toDos: ToDoListContractType.ToDoItemStructOutput[]
      ) => {
        // Items to to do list
        const items = toDos.map((toDo) => ({
          id: Number(toDo.itemId),
          content: toDo.content,
          completed: toDo.completed,
        }));

        setToDoList(items);

        // Clear the loading state as data fetching is complete
        setLoading(false);
      };

      // Fetch to do items based on the specified status
      if (status === "all") {
        const toDos = await ToDoListContract.getToDos();
        createToDoList(toDos);

        return;
      }
      if (status === "active") {
        const toDos = await ToDoListContract.getActiveToDo();
        createToDoList(toDos);

        return;
      }
      if (status === "completed") {
        const toDos = await ToDoListContract.getCompletedToDo();
        createToDoList(toDos);

        return;
      }
    }
  };

  useEffect(() => {
    //When page load fetch to do items
    handleGetToDo("all");
  }, []);

  return (
    <div className="max-h-[400px] overflow-y-auto">
      <ul className="flex">
        <li role="presentation">
          <button
            onClick={() => handleGetToDo("all")}
            className="py-[8px] px-[16px] text-blue-500 rounded-md"
          >
            All
          </button>
        </li>
        <li role="presentation">
          <button
            onClick={() => handleGetToDo("active")}
            className="py-[8px] px-[16px] text-blue-500 rounded-md"
          >
            Active
          </button>
        </li>
        <li role="presentation">
          <button
            onClick={() => handleGetToDo("completed")}
            className="py-[8px] px-[16px] text-blue-500 rounded-md"
          >
            Completed
          </button>
        </li>
      </ul>
      <div className="flex flex-col mt-[15px] gap-[10px]">
        {toDoList &&
          toDoList.map((toDoItem) => (
            <SingleToDo key={Number(toDoItem.id)} toDoItem={toDoItem} />
          ))}
      </div>
    </div>
  );
};

export default ToDoList;

export type Status = "all" | "active" | "completed";
