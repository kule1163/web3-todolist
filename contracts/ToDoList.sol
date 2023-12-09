// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.3;

contract ToDoList {
    // Counter for assigning unique IDs to ToDoItems
    uint256 id = 0;

    // Counters to keep track of ToDoItem statistics
    uint256 totalCount = 0;
    uint256 completedCount = 0;
    uint256 activeCount = 0;
    uint256 deletedCount = 0;

    // Struct to represent a ToDoItem
    struct ToDoItem {
        uint256 itemId;
        string content;
        bool completed;
        bool deleted;
    }

    // Event emitted when a ToDoItem is created or updated
    event ToDoItemId (
        uint256 id
    );

    // Mapping to store ToDoItems with their IDs
    mapping (uint256 => ToDoItem) public toDoItems;

    // Function to create a new ToDoItem
    function createTodo(string memory _content) public {
        id++;
        totalCount++;
        activeCount++;

        // Creating a new ToDoItem and storing it in the mapping
        toDoItems[id] = ToDoItem(id, _content, false, false);

        // Emitting the ID of the created ToDoItem
        emit ToDoItemId(id);
    }

    // Function to update the content of a ToDoItem
    function updateToDoContent(uint256 _id, string memory _content) public {
        ToDoItem storage currentItem = toDoItems[_id];

        // Updating the content of the specified ToDoItem
        currentItem.content = _content;

        // Emitting the ID of the updated ToDoItem
        emit ToDoItemId(_id);
    }

    // Function to update the completion status of a ToDoItem
    function updateToDoStatus(uint256 _id) public {
        ToDoItem storage currentItem = toDoItems[_id];

        // Updating the completion status of the specified ToDoItem
        currentItem.completed = !currentItem.completed;

        // Adjusting completedCount based on the completion status
        if (currentItem.completed) {
            completedCount++;
            activeCount--;
        } else {
            completedCount--;
            activeCount++;
        }

        // Emitting the ID of the updated ToDoItem
        emit ToDoItemId(_id);
    }

    // Function to mark a ToDoItem as deleted
    function deleteToDoItem(uint256 _id) public {
        ToDoItem storage currentItem = toDoItems[_id];

        // Marking the ToDoItem as deleted
        currentItem.deleted = true;

        // Decrementing counters based on the completion and deletion status
        if (currentItem.completed) {
            completedCount--;
        } else {
            activeCount--;
        }

        // Incrementing deletedCount
        deletedCount++;

        // Emitting the ID of the deleted ToDoItem
        emit ToDoItemId(_id);
    }

    // Function to get all active ToDoItems (not deleted)
    function getToDos() public view returns (ToDoItem[] memory) {
        uint256 currentIndex = 0;

        // Creating an array to store active ToDoItems
        ToDoItem[] memory items = new ToDoItem[](totalCount - deletedCount);
        
        // Iterating through all ToDoItems
        for (uint256 i = 0; i < totalCount; i++) {
            uint256 itemId = i + 1;

            // Checking if the ToDoItem is not deleted
            if (!toDoItems[itemId].deleted) {
                ToDoItem memory newTodo = toDoItems[itemId];
                items[currentIndex] = newTodo;
                currentIndex++;
            }
        }

        return items;
    }

    // Function to get all active ToDoItems (not completed and not deleted)
    function getActiveToDo() public view returns (ToDoItem[] memory) {
        uint256 currentIndex = 0;

        // Creating an array to store active ToDoItems
        ToDoItem[] memory items = new ToDoItem[](totalCount - completedCount - deletedCount);

        // Iterating through all ToDoItems
        for (uint256 i = 0; i < totalCount; i++) {
            uint256 itemId = i + 1;

            // Checking if the ToDoItem is not completed and not deleted
            if (!toDoItems[itemId].completed && !toDoItems[itemId].deleted) {
                ToDoItem memory currentItem = toDoItems[itemId];
                items[currentIndex] = currentItem;
                currentIndex++;
            }
        }

        return items;
    }

    // Function to get all completed ToDoItems (completed and not deleted)
    function getCompletedToDo() public view returns (ToDoItem[] memory) {
        uint256 currentIndex = 0;

        // Creating an array to store completed ToDoItems
        ToDoItem[] memory items = new ToDoItem[](totalCount - activeCount - deletedCount);

        // Iterating through all ToDoItems
        for (uint256 i = 0; i < totalCount; i++) {
            uint256 itemId = i + 1;

            // Checking if the ToDoItem is completed and not deleted
            if (toDoItems[itemId].completed && !toDoItems[itemId].deleted) {
                ToDoItem memory currentItem = toDoItems[itemId];
                items[currentIndex] = currentItem;
                currentIndex++;
            }
        }

        return items;
    }
}
