import { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase";

export default function ShoppingList() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [userName, setUserName] = useState("");
  const [showNameInput, setShowNameInput] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  useEffect(() => {
    const storedName = localStorage.getItem("obxUserName");
    if (storedName) {
      setUserName(storedName);
    } else {
      setShowNameInput(true);
    }

    const unsubscribe = onSnapshot(
      collection(db, "shoppingList"),
      (snapshot) => {
        const itemsList = [];
        snapshot.forEach((doc) => {
          itemsList.push({ id: doc.id, ...doc.data() });
        });
        setItems(itemsList);
      }
    );

    return () => unsubscribe();
  }, []);

  const addItem = async () => {
    if (newItem.trim()) {
      const item = {
        text: newItem.trim(),
        addedBy: userName || "Anonymous",
        addedAt: new Date().toLocaleString(),
        completed: false,
      };

      try {
        await addDoc(collection(db, "shoppingList"), item);
        setNewItem("");
      } catch (error) {
        console.error("Error adding item:", error);
        alert("Failed to add item. Please try again.");
      }
    }
  };

  const toggleItem = async (id) => {
    const item = items.find((item) => item.id === id);
    if (item) {
      try {
        await updateDoc(doc(db, "shoppingList", id), {
          completed: !item.completed,
        });
      } catch (error) {
        console.error("Error toggling item:", error);
        alert("Failed to update item. Please try again.");
      }
    }
  };

  const deleteItem = async (id) => {
    const item = items.find((item) => item.id === id);
    setItemToDelete(item);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (itemToDelete) {
      try {
        await deleteDoc(doc(db, "shoppingList", itemToDelete.id));
      } catch (error) {
        console.error("Error deleting item:", error);
        alert("Failed to delete item. Please try again.");
      }
    }
    setShowDeleteConfirm(false);
    setItemToDelete(null);
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setItemToDelete(null);
  };

  const handleNameSubmit = () => {
    if (userName.trim()) {
      localStorage.setItem("obxUserName", userName.trim());
      setShowNameInput(false);
    }
  };

  if (showNameInput) {
    return (
      <div className="max-w-2xl p-6 mx-auto">
        <h3 className="text-4xl my-4 font-bold text-orange-600 text-center">
          Join
        </h3>
        <div className="bg-yellow-200/50 rounded-xl p-6 border-2 border-black">
          <p className="text-3xl mb-4 text-center">
            Please enter your name to add items:
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Your name"
              className="flex-1 px-4 py-2 text-3xl border-2 border-black rounded-lg"
              onKeyDown={(e) => e.key === "Enter" && handleNameSubmit()}
            />
            <button
              onClick={handleNameSubmit}
              className="px-8 py-8 bg-orange-500 text-white text-3xl font-semibold rounded-lg hover:bg-orange-600 transition-colors"
            >
              Start
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto py-4">
        <div className="flex mb-10">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Add new item..."
            className="flex-1 px-8 py-8 w-10/12 text-3xl"
            onKeyDown={(e) => e.key === "Enter" && addItem()}
          />
          <button
            onClick={addItem}
            className="px-8 py-8 bg-green-500 w-2/12 text-white text-3xl font-semibold hover:bg-green-600 transition-colors"
          >
            Add
          </button>
        </div>

        {items.length === 0 ? (
          <div className="text-center text-3xl text-gray-600 py-8">
            No items yet! Add some items to get started.
          </div>
        ) : (
          <div className="space-y-2">
            {items
              .sort((a, b) => {
                if (a.completed && !b.completed) return 1;
                if (!a.completed && b.completed) return -1;
                return 0;
              })
              .map((item, index) => (
                <div
                  key={item.id}
                  className={`flex justify-between items-center text-3xl w-full gap-6 text-left p-4 transition-all duration-500 ease-in-out transform ${
                    item.completed
                      ? "bg-gray-400/50 scale-95"
                      : index % 2 === 0
                      ? "bg-yellow-400/50 scale-100"
                      : "bg-yellow-100/50 scale-100"
                  } ${item.completed ? "line-through opacity-75" : ""}`}
                  style={{
                    transitionDelay: item.completed ? "0ms" : "0ms",
                    transform: item.completed
                      ? "translateY(0) scale(0.95)"
                      : "translateY(0) scale(1)",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={item.completed}
                      onChange={() => toggleItem(item.id)}
                      className="w-10 h-10 text-3xl transition-transform duration-200 hover:scale-110"
                    />
                    <span className="text-3xl">{item.text}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xl text-gray-600">
                      Added by {item.addedBy}
                    </span>
                    <button
                      onClick={() => deleteItem(item.id)}
                      className="bg-red-500 text-white text-3xl rounded-md hover:bg-red-600 transition-all duration-200 w-12 h-12 flex justify-center items-center leading-none hover:scale-110"
                    >
                      <span className="transform -translate-y-0.5">×</span>
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md mx-4">
            <h3 className="text-3xl font-bold text-gray-900 mb-4 text-center">
              Delete Item?
            </h3>
            <p className="text-xl text-gray-600 mb-8 text-center">
              Are you sure you want to delete "{itemToDelete?.text}"? This
              action cannot be undone.
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={cancelDelete}
                className="px-8 py-4 bg-gray-500 text-white text-2xl font-semibold rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-8 py-4 bg-red-500 text-white text-2xl font-semibold rounded-lg hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
