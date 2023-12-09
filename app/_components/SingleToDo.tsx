"use client";

import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineEdit } from "react-icons/md";
import { useAtom } from "jotai";
import {
  ToDoItem,
  currentToDoAtom,
  loadingAtom,
  toDoAtom,
  toDoListAtom,
} from "@/store/store";
import { toDoListContract } from "@/helpers/createContract";

interface Props {
  toDoItem: ToDoItem;
}

const SingleToDo = ({ toDoItem }: Props) => {
  const [, setCurrentToDo] = useAtom(currentToDoAtom);
  const [, setLoading] = useAtom(loadingAtom);
  const [, setToDoList] = useAtom(toDoListAtom);
  const [, setToDo] = useAtom(toDoAtom);

  // Handle updating the completion status of a to do item
  const handleCompleted = async () => {
    // Create todo list smart contract
    const ToDoListContract = await toDoListContract();

    if (ToDoListContract) {
      // Set loading state to indicate that data is being updated
      setLoading(true);

      // Update status function from our contract
      const transaction = await ToDoListContract.updateToDoStatus(
        Number(toDoItem.id)
      );

      // Wait for the completion of the transaction
      const tx = await transaction.wait();

      // Get the to do item ID from the transaction data
      const itemId = Number(tx?.logs[0].data);

      // Update to do list to show frontend after successfully updated status in blockchain
      if (itemId) {
        setToDoList((prev) =>
          prev.map((item) =>
            item.id == itemId ? { ...item, completed: !item.completed } : item
          )
        );
      }

      // Clear the loading state as data updating is complete
      setLoading(false);
    }
  };

  // Handle updating a to do item
  const handleUpdate = () => {
    // Set the current to do state to the selected to do item
    setCurrentToDo(toDoItem);

    // Set the to do input state to the content of the selected to do item
    setToDo(toDoItem.content);
  };

  // Handle deleting a to do item
  const handleDelete = async () => {
    // Create todo list smart contract
    const ToDoListContract = await toDoListContract();

    if (ToDoListContract) {
      // Set loading state to indicate that data is being deleted
      setLoading(true);

      // Delete function from our contract
      const transaction = await ToDoListContract.deleteToDoItem(
        Number(toDoItem.id)
      );

      // Wait for the completion of the transaction
      const tx = await transaction.wait();

      // Extract the deleted item's ID from the transaction data
      const itemId = Number(tx?.logs[0].data);

      // Update to do list to show frontend after successfully deleted in blockchain
      if (itemId) {
        setToDoList((prev) => prev.filter((item) => item.id !== itemId));
      }

      // Clear the loading state as data deletion is complete
      setLoading(false);
    }
  };

  return (
    <div className="px-[15px] py-[10px] flex items-center justify-between bg-gray-100 rounded-md relative overflow-hidden">
      <div className="flex items-center gap-[10px]">
        <input
          name={`"isCompleted-"${toDoItem.id}`}
          id={`"isCompleted-"${toDoItem.id}`}
          onChange={handleCompleted}
          checked={Boolean(toDoItem.completed)}
          type="checkbox"
          className="cursor-pointer"
        />

        <label
          className="cursor-pointer"
          htmlFor={`"isCompleted-"${toDoItem.id}`}
        >
          {toDoItem.content}
        </label>
      </div>
      <div className="flex gap-[10px]">
        <button onClick={handleUpdate}>
          <MdOutlineEdit color="green" />
        </button>
        <button onClick={handleDelete}>
          <RiDeleteBin6Line color="red" />
        </button>
      </div>
    </div>
  );
};

export default SingleToDo;
