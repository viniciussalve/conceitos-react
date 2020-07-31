import React, { useEffect, useState } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(repository => {
      setRepositories(repository.data)
    })
  }, [])

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Novo projeto ${Date.now()}`,
      url: "https://github.com/viniciussalve/Blog",
      techs: ["Js", "React"]
    });

    const { data } = response;
    setRepositories([...repositories, data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    const newRepositories = repositories.filter(repository => repository.id !== id);
    setRepositories(newRepositories)
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
