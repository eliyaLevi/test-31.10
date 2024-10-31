import React, {useEffect, useState} from 'react'
import "./MissionList.module.css"
import axios from 'axios';
import MissionForm from '../MissionForm/MissionForm';


const BASE_URL = "https://reactexambackend.onrender.com/missions/8458978"


export interface Mission {
    id: string;
    name: string ;
    status:"Pending" | "in Progress" | "Completed" ;
    priority: string;
    description: string;
}
export const missionsList = () => {
    const [Missions, setMissions] = useState<Mission[]>([]);

    const getMissions = async () => {
        try {
            const response = await axios.get<Mission[]>(BASE_URL);
            setMissions(response.data);
            
        } catch (error) {
            console.error("error featching data", error);   
        } 
    };
    useEffect(() => {
        getMissions()
    }, [])

    const addMission = async (name: string , status:string, priority: string, description:string ): Promise<void> => {
        try { 
          const response = await axios.post<Mission>(BASE_URL, {
            name,
            status,
            priority,
            description
          });
          getMissions();
        } catch (error) {
          console.error("cant add Mission", error);
        }
      };

    
      const deleteMission = async (id: string): Promise<void> => {
        try {
          await axios.delete(`${BASE_URL}/${id}`);
          getMissions();
        } catch (error) {
          console.error("cant delete todo", error);
        }
      };

      const putStatus = async (id: string): Promise<void> => {
        try {
          const singleMission: Mission | undefined = Missions.find((mission) => mission.id === id);
          if (!singleMission) {
            throw new Error("cant find mission with this id");
          }
          await axios.put<Mission>(`${BASE_URL}/progress/${id}`, {
            ...singleMission,
            status:  singleMission.status === "in Progress"? "Completed" : "in Progress"
          });
          getMissions();
        } catch (error) {
          console.error("cant status mission", error);
        }
      };
    
      

  return (
    <div className="todo-list">
      <h1>ToDo List</h1>
      <MissionForm addMission={addMission}/>
    </div>
  )
}

export default missionsList;
