import React, { useState } from "react";

import './Sidebar.css';


const Sidebar = ({ groups = [], onGroupsSelect, onAddGroup }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  const handleCreatedGroup = () => {
    if (newGroupName && selectedColor) {
      onAddGroup({ name: newGroupName, color: selectedColor, notes: [] });
      setNewGroupName("");
      setSelectedColor("");
      setShowPopup(false);

    }
  };
  return (
    <div className="sidebar">

      <p>Pocket Notes</p>
      <button onClick={() => setShowPopup(true)}>+ Create Notes Group </button>
      
      {groups.map((group) => (
        <div
          key={group.name}
          className="group"
          style={{ backgroundColor: group.color }}
          onClick={() => onGroupsSelect(group.name)}
          
        >
          {group.name}
        </div>
      ))}

      {showPopup && (
        <div className="popup" onClick={() => setShowPopup(false)}>
          <div className="pop-content" onClick={(e) => e.stopPropagation()}>
            <h3> Create New Notes Group</h3>
            <p className="group-name">
              Group                                                                                                  
            </p>
            <input
              type="text"
              value={newGroupName}
              
              onChange={(e) => setNewGroupName(e.target.value)}
              placeholder="Enter your group name"
        
            />
           
            <div className="colors">
              <p className="choose-color">Choose color</p>
              {["#8e44ad", "#ff8c00", "yellow", "#f39c12", "#3498db"].map(
                (color) => (
                  <div
                    key={color}
                    className="color"
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedColor(color)}
                  ></div>
                )
              )}
            

              <button className="create-note-btn" onClick={handleCreatedGroup}>Create</button>
            
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
