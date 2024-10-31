import React, { useState } from "react";
import "./MissionForm.module.css";
import { Mission } from "../MissionList/MissionList";


interface MissionFormProps {
  addMission: (name: string, status:string, priority: string, description:string) => Promise<void>;
}
const MissionForm: React.FC<MissionFormProps> = ({ addMission }) => {
  const [newMission, setNewMission] = useState<Mission>({id:"0",name: "" , status: "Completed" ,priority: "", description:""});
  const [name, setNewName] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [priority, setPriority] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    addMission(name ,status, priority, description);
   

  };
  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setNewName(e.target.value)}
        placeholder="Add new Todo"
      />
       <input
        type="text"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        placeholder="Add new Todo"
      />
       <input
        type="text"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        placeholder="Add new Todo"
      />
       <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Add new Todo"
      />
      
      <button type="submit">Add</button>
    </form>
  );
};

export default MissionForm;