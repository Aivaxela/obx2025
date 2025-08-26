import { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";

export default function Pics() {
  const [pictures, setPictures] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [userName, setUserName] = useState("");
  const [showNameInput, setShowNameInput] = useState(false);

  useEffect(() => {
    const storedName = localStorage.getItem("obxUserName");
    if (storedName) {
      setUserName(storedName);
    } else {
      setShowNameInput(true);
    }

    const unsubscribe = onSnapshot(collection(db, "pictures"), (snapshot) => {
      const picturesList = [];
      snapshot.forEach((doc) => {
        picturesList.push({ id: doc.id, ...doc.data() });
      });
      setPictures(picturesList);
    });

    return () => unsubscribe();
  }, []);

  const handleNameSubmit = () => {
    if (userName.trim()) {
      localStorage.setItem("obxUserName", userName.trim());
      setShowNameInput(false);
    }
  };

  if (showNameInput) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <h3 className="text-4xl my-4 font-bold text-orange-600 text-center">
          Join
        </h3>
        <div className="bg-yellow-200/50 rounded-xl p-6 border-2 border-black">
          <p className="text-3xl mb-4 text-center">
            Please enter your name to add pics:
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

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert("Image size must be less than 10MB (Imgur limit)");
      return;
    }

    setUploading(true);
    try {
      // Create FormData for Imgur API
      const formData = new FormData();
      formData.append("image", file);

      // Upload to Imgur
      const response = await fetch("https://api.imgur.com/3/image", {
        method: "POST",
        headers: {
          Authorization: "Client-ID YOUR_IMGUR_CLIENT_ID_HERE",
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Imgur upload failed");
      }

      const result = await response.json();
      const imgurUrl = result.data.link;

      // Save to Firestore
      await addDoc(collection(db, "pictures"), {
        url: imgurUrl,
        fileName: file.name,
        uploadedBy: userName || "Anonymous",
        uploadedAt: new Date().toLocaleString(),
        imgurId: result.data.id,
        deleteHash: result.data.deletehash,
      });

      alert("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const deletePicture = async (picture) => {
    if (window.confirm("Are you sure you want to delete this image?")) {
      try {
        // Delete from Firestore
        await deleteDoc(doc(db, "pictures", picture.id));

        // Delete from Imgur if we have the delete hash
        if (picture.deleteHash) {
          try {
            await fetch(`https://api.imgur.com/3/image/${picture.deleteHash}`, {
              method: "DELETE",
              headers: {
                Authorization: "Client-ID YOUR_IMGUR_CLIENT_ID_HERE",
              },
            });
          } catch (imgurError) {
            console.log("Imgur deletion failed, but image removed from app");
          }
        }

        alert("Image deleted successfully!");
      } catch (error) {
        console.error("Error deleting image:", error);
        alert("Failed to delete image. Please try again.");
      }
    }
  };

  return (
    <>
      <h3 className="text-4xl my-4 font-bold text-orange-500">📸 Photos 🖼️</h3>
      <div className="flex-col flex gap-4 px-4">
        <div className="text-center border-2 border-black bg-yellow-200/50 rounded-xl p-6">
          <div className="flex flex-col items-center justify-center gap-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={uploading}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className={`px-8 py-8 text-3xl border-2 border-black rounded-lg cursor-pointer transition-all ${
                uploading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600 text-white font-semibold"
              }`}
            >
              {uploading ? "Uploading..." : "📸 Choose Photo"}
            </label>
            {uploading && (
              <span className="text-3xl text-orange-600">Please wait...</span>
            )}
          </div>
          <p className="text-xl text-gray-600 mt-2">
            Max file size: 10MB (Imgur limit)
          </p>
        </div>

        {pictures.length === 0 ? (
          <div className="text-center text-3xl text-gray-600 py-8">
            No photos yet! Upload some images to get started.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pictures.map((picture) => (
              <div
                key={picture.id}
                className="relative border-2 border-black bg-white rounded-xl overflow-hidden"
              >
                <img
                  src={picture.url}
                  alt={picture.fileName}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                <div className="p-3 bg-white">
                  <p className="text-3xl text-gray-600 truncate">
                    {picture.fileName}
                  </p>
                  <p className="text-xl text-gray-500">
                    By {picture.uploadedBy}
                  </p>
                  <p className="text-xl text-gray-500">{picture.uploadedAt}</p>
                </div>
                <button
                  onClick={() => deletePicture(picture)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition-colors"
                  title="Delete image"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
