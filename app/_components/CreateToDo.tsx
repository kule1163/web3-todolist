"use client";

import { useAtom } from "jotai";
import {
  toDoAtom,
  currentToDoAtom,
  loadingAtom,
  toDoListAtom,
} from "@/store/store";
import { toDoListContract } from "@/helpers/createContract";

const CreateToDo = () => {
  const [toDo, setToDo] = useAtom(toDoAtom);
  const [currentToDo, setCurrentToDo] = useAtom(currentToDoAtom);
  const [, setLoading] = useAtom(loadingAtom);
  const [, setToDoList] = useAtom(toDoListAtom);

  const handleToDo = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Set input(to do) value
    setToDo(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Create todo list smart contract
    const ToDoListContract = await toDoListContract();

    if (ToDoListContract) {
      if (toDo) {
        setLoading(true);

        if (currentToDo) {
          const { id } = currentToDo;

          // Update function from our contract
          const transaction = await ToDoListContract.updateToDoContent(
            Number(id),
            toDo.toString()
          );

          // Waiting for the completion of the transaction
          const tx = await transaction.wait();

          // Get the to do item ID from the transaction data
          const itemId = Number(tx?.logs[0].data);

          // Update to do list to show frontend after successfully updated in blockchain
          if (itemId) {
            setToDoList((prev) =>
              prev.map((item) =>
                item.id == itemId ? { ...item, content: toDo } : item
              )
            );
          }

          // Clearing loading state, 'currentToDo', and'toDo'
          setLoading(false);
          setCurrentToDo(null);
          setToDo("");
        } else {
          // Create function from our contract
          const transaction = await ToDoListContract.createTodo(
            toDo.toString()
          );

          // Waiting for the completion of the transaction
          const tx = await transaction.wait();

          // Get the to do item ID from the transaction data
          const itemId = Number(tx?.logs[0].data);

          // Update to do list to show frontend successfully created in blockchain
          if (itemId) {
            setToDoList((prev) => [
              ...prev,
              { id: itemId, content: toDo, completed: false },
            ]);
          }

          // Clearing loading state, and'toDo'
          setLoading(false);
          setToDo("");
        }
      } else {
        alert("U have to enter something");
      }
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="mb-[20px]">
      <div className="relative flex flex-col">
        <input
          type="text"
          className="py-[6px] px-[12px] rounded-md w-full border-[1px] border-gray-600 focus:outline-blue-500"
          placeholder="New Task..."
          value={toDo.toString()}
          onChange={(e) => handleToDo(e)}
        />
        <button
          disabled={toDo ? false : true}
          className={` px-12 py-1 mx-auto mt-[10px] border-2 rounded-md ${
            toDo
              ? "border-blue-500 hover:bg-blue-500 hover:text-white"
              : "border-red-500"
          }`}
          type="submit"
        >
          {currentToDo ? "Update" : "Create"}
        </button>
      </div>
    </form>
  );
};

export default CreateToDo;
