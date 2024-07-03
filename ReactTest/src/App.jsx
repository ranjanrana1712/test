import react, { useState, useEffect } from "react";

import NoteArea from "../src/components/NoteArea/NoteArea.jsx";
import SideBar from "../src/components/SideBar/Sidebar.jsx";

import "./App.css";

const App = () => {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);

  useEffect(() => {
    const savedGroups = JSON.parse(localStorage.getItem("groups")) || [];
    setGroups(savedGroups);
  }, []);
  const handleAddGroup = (newGroup) => {
    const updatedGroups = [...groups, newGroup];
    setGroups(updatedGroups);
    localStorage.setItem("groups", JSON.stringify(updatedGroups));
  };


  const handleGroupSelect = (groupName) => {
    setSelectedGroup(groupName);
  };

  const handleAddNote = (note) => {
    const updatedGroups = groups.map((group) => {
      if (group.name === selectedGroup) {
        return { ...group, notes: [...group.notes, note] };
      }
      return group;
    });
    setGroups(updatedGroups);
    localStorage.setItem("groups", JSON.stringify(updatedGroups));
  };
  return(
    <div className="container">
      <SideBar groups={groups} onGroupsSelect = {handleGroupSelect} onAddGroup={handleAddGroup} />
      <NoteArea group={selectedGroup} onAddNote={handleAddNote} />
    </div>
  )
};

export default App;
