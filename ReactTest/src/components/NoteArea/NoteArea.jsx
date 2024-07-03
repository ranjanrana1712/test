import React, { useState, useEffect } from "react";
import './NoteArea.css'

import picture from '../../assets/backgrdImage.png'
import lock from '../../assets/lock.png'

const NoteArea = ({ group, onAddNote }) => {
  const [notes, setNotes] = useState([]);

  const [noteText, setNoteText] = useState("");

  useEffect(() => {
    if (group) {
      //
      const savedGroup = JSON.parse(localStorage.getItem("group")) || [];
      const selectedGroup = savedGroup.find((g) => g.name === group);
      if (selectedGroup) {
        setNotes(selectedGroup.notes);
      }
    }
  }, [group]);

  const handleAddNote = () => {
    if (noteText.trim()) {
      const newNote = {
        text: noteText,
        createAt: new Date(),
        updateAt: new Date(),
      };
      onAddNote(newNote);
      setNotes([...notes, newNote]);
      setNoteText("");
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddNote();
    }
  };

  return (
    <div className="note-editor">
      {group ? (
        <>
          <h2 className="note-heading" >{group}</h2>
          <div className="notes">
            {notes.map((notes, index) => (
              <div className="note" key={index}>
                <p>{notes.text}</p>
                <small>
                  Created:{new Date(notes.createAt).toLocaleString()} <br />
                  Updated:{new Date(notes.updateAt).toLocaleString()}
                </small>
              </div>
            ))}
          </div>
          
          <textarea
            name=""
            id=""
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter your text area.."
          />
          <button onClick={handleAddNote}>Save</button>
        </>
      ) : (
        <> 
        <img src={picture} alt="picture" />
        <h2>Pocket Notes</h2>
        <p className="description">Send and receive messages without keeping your phone online.
        Use Pocket Notes on up to 4 linked devices and 1 mobile phone</p>
        <p className="footer">
          <img src={lock} alt=""  className="lock"/>
        end-to-end encrypted
        </p>
        
        </>
      )}
    </div>
  );
};
export default NoteArea;
