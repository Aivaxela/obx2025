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
  const [selectedPicture, setSelectedPicture] = useState(null);

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

    if (file.size > 50 * 1024 * 1024) {
      alert("Image size must be less than 50MB");
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "obx_photos");

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/da9ius80j/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Cloudinary upload failed");
      }

      const result = await response.json();
      const cloudinaryUrl = result.secure_url;

      await addDoc(collection(db, "pictures"), {
        url: cloudinaryUrl,
        fileName: file.name,
        uploadedBy: userName || "Anonymous",
        uploadedAt: new Date().toLocaleString(),
        cloudinaryId: result.public_id,
      });
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
        await deleteDoc(doc(db, "pictures", picture.id));
        if (selectedPicture && selectedPicture.id === picture.id) {
          setSelectedPicture(null);
        }
      } catch (error) {
        console.error("Error deleting image:", error);
        alert("Failed to delete image. Please try again.");
      }
    }
  };

  const openModal = (picture) => {
    setSelectedPicture(picture);
  };

  const closeModal = () => {
    setSelectedPicture(null);
  };

  const goToNext = () => {
    const currentIndex = pictures.findIndex(
      (pic) => pic.id === selectedPicture.id
    );
    const nextIndex = (currentIndex + 1) % pictures.length;
    setSelectedPicture(pictures[nextIndex]);
  };

  const goToPrevious = () => {
    const currentIndex = pictures.findIndex(
      (pic) => pic.id === selectedPicture.id
    );
    const previousIndex =
      currentIndex === 0 ? pictures.length - 1 : currentIndex - 1;
    setSelectedPicture(pictures[previousIndex]);
  };

  return (
    <>
      <div className="flex-col flex">
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
            className={`w-full py-16 text-5xl cursor-pointer transition-all text-center ${
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
        <p className="text-xl mb-10 text-gray-600">Max file size: 50MB</p>

        {pictures.length === 0 ? (
          <div className="text-center text-3xl text-gray-600 py-8">
            No photos yet! Upload some images to get started.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {pictures.map((picture) => (
              <div
                key={picture.id}
                className="relative bg-white overflow-hidden cursor-pointer"
                onClick={() => openModal(picture)}
              >
                <img
                  src={picture.url}
                  alt={picture.fileName}
                  className="w-full h-96 object-cover"
                  loading="lazy"
                />
                <div className="absolute bottom-4 left-4">
                  <p className="text-white text-xl font-semibold drop-shadow-lg">
                    {picture.uploadedBy}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedPicture && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div className="flex flex-col items-center relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-6xl font-bold cursor-pointer hover:text-gray-300 transition-colors z-10 opacity-60 hover:opacity-100"
              title="Previous image"
            >
              ‹
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-6xl font-bold cursor-pointer hover:text-gray-300 transition-colors z-10 opacity-60 hover:opacity-100"
              title="Next image"
            >
              ›
            </button>

            <img
              src={selectedPicture.url}
              alt={selectedPicture.fileName}
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="flex justify-between items-center w-full mt-4 px-4">
              <button
                onClick={() => deletePicture(selectedPicture)}
                className="text-red-500 text-2xl cursor-pointer"
              >
                Delete
              </button>
              <span className="text-white text-2xl font-semibold">
                {selectedPicture.uploadedBy}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
