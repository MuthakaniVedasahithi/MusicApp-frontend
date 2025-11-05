import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./CreatePlaylist.css";

const CreatePlaylist = () => {
  const [playlistName, setPlaylistName] = useState("");
  const [popup, setPopup] = useState({ visible: false, type: "", message: "" });

  const handleSave = () => {
    const name = playlistName.trim();

    if (!name) {
      showPopup("warning", "Please enter a playlist name.");
      return;
    }

    // ✅ Fetch existing playlists (object format)
    const existing = JSON.parse(localStorage.getItem("playlists")) || {};

    if (existing[name]) {
      showPopup("warning", "Playlist name already exists!");
      return;
    }

    // ✅ Add new playlist as empty array
    existing[name] = [];
    localStorage.setItem("playlists", JSON.stringify(existing));

    showPopup("success", `Playlist "${name}" created successfully!`);
    setPlaylistName("");
  };

  const showPopup = (type, message) => {
    setPopup({ visible: true, type, message });
    setTimeout(() => setPopup({ visible: false, type: "", message: "" }), 2500);
  };

  return (
    <div className="create-playlist">
      <h2>Create New Playlist</h2>
      <input
        type="text"
        placeholder="Enter playlist name"
        value={playlistName}
        onChange={(e) => setPlaylistName(e.target.value)}
      />
      <button onClick={handleSave}>Save Playlist</button>

      <AnimatePresence>
        {popup.visible && (
          <motion.div
            className={`popup ${popup.type}`}
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div className="popup-content">
              {popup.type === "success" ? (
                <span className="popup-icon">✅</span>
              ) : (
                <span className="popup-icon">⚠</span>
              )}
              <p>{popup.message}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CreatePlaylist;
