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
    try {
      await deleteDoc(doc(db, "shoppingList", id));
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Failed to delete item. Please try again.");
    }
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
    <div className="max-w-4xl mx-auto p-4">
      <h3 className="text-4xl font-bold text-orange-500 text-center mb-6">
        🍔 Shopping List 🥕
      </h3>
      <div className="bg-yellow-200/50 rounded-xl p-4 border-2 border-black mb-6">
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Add new item..."
            className="flex-1 px-8 py-8 text-3xl border-2 border-black rounded-lg"
            onKeyDown={(e) => e.key === "Enter" && addItem()}
          />
          <button
            onClick={addItem}
            className="px-8 py-8 bg-green-500 text-white text-3xl font-semibold rounded-lg hover:bg-green-600 transition-colors"
          >
            Add
          </button>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="text-center text-3xl text-gray-600 py-8">
          No items yet! Add some items to get started.
        </div>
      ) : (
        <div className="space-y-2">
          {items.map((item) => (
            <div
              key={item.id}
              className={`flex items-center justify-between p-4 border-2 border-black rounded-xl transition-all text-3xl ${
                item.completed
                  ? "bg-green-200/50 line-through opacity-75 text-3xl"
                  : "bg-yellow-200/50 text-3xl "
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => toggleItem(item.id)}
                  className="w-10 h-10 text-3xl"
                />
                <span className="text-3xl">{item.text}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xl text-gray-600">
                  Added by {item.addedBy}
                </span>
                <button
                  onClick={() => deleteItem(item.id)}
                  className="bg-red-500 text-white text-3xl rounded-md hover:bg-red-600 transition-colors w-12 h-12 flex justify-center items-center leading-none"
                >
                  <span className="transform -translate-y-0.5">×</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
