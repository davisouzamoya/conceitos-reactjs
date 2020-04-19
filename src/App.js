import React,{useState, useEffect} from "react";
import api from './services/api'

import "./styles.css";

function App() {
    const [projects,setProjects]= useState([])

    useEffect(() =>{
      api.get('repositories').then(response =>{
        setProjects(response.data)
      })
    },[])

  async function handleAddRepository() {

    let response = await api.post('repositories',{
      title: "Projeto 3",
      url: "http://gith",
      techs: ["ReactJs"],
    })

    let project = response.data

      setProjects([...projects,project])
      
  }

  async function handleRemoveRepository(id) {
      
      await api.delete(`repositories/${id}`)
      
      setProjects(projects.filter(projects => projects.id != id))

    }

  return (
    <div>
      <ul data-testid="repository-list">
            {projects.map(projects => <li key={projects.id}>{projects.title}
             <button onClick={() => handleRemoveRepository(projects.id)}>
            Remover
          </button>
          </li>)}
        </ul>

         

      <button onClick={handleAddRepository}>Adicionar</button>
      
    </div>
  );
}

export default App;
