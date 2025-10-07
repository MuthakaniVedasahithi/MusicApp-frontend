import React, { useEffect, useState } from "react";
import "./YourLibrary.css";

const YourLibrary = () => {
  const [playlists, setPlaylists] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [newName, setNewName] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("playlists")) || [];
    setPlaylists(saved);
  }, []);

  const saveToLocalStorage = (updatedList) => {
    localStorage.setItem("playlists", JSON.stringify(updatedList));
    setPlaylists(updatedList);
  };

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this playlist?")) {
      const updated = playlists.filter((_, i) => i !== index);
      saveToLocalStorage(updated);
    }
  };

  const handleRename = (index) => {
    setEditingIndex(index);
    setNewName(playlists[index]);
  };

  const saveRename = (index) => {
    if (!newName.trim()) {
      alert("Please enter a valid name.");
      return;
    }

    const updated = [...playlists];
    updated[index] = newName.trim();
    saveToLocalStorage(updated);
    setEditingIndex(null);
    setNewName("");
  };

  return (
    <div className="library-page">
      <h2>Your Library</h2>

      <div className="library-section">
        <h3>Liked Songs</h3>
        <p>(This section can later show your liked songs)</p>
      </div>

      <div className="library-section">
        <h3>Your Playlists</h3>

        {playlists.length === 0 ? (
          <p>No playlists yet. Go create one!</p>
        ) : (
          <ul className="playlist-list">
            {playlists.map((pl, index) => (
              <li key={index} className="playlist-item">
                {editingIndex === index ? (
                  <>
                    <input
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="rename-input"
                    />
                    <button
                      className="save-btn"
                      onClick={() => saveRename(index)}
                    >
                      Save
                    </button>
                    <button
                      className="cancel-btn"
                      onClick={() => setEditingIndex(null)}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <span className="playlist-name">{pl}</span>
                    <div className="playlist-actions">
                      <button
                        className="rename-btn"
                        onClick={() => handleRename(index)}
                      >
                        Rename
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(index)}
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default YourLibrary;