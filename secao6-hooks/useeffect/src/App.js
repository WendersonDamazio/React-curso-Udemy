import React, { useState, useEffect } from 'react';

function App() {

  const[tarefas, setTarefas] = useState([
    'Pagar a conta de luz',
    'Estudar React Hooks'
  ]);

  const [input, setInput] = useState('');

  useEffect(() => {
    const tarefasStoge = localStorage.getItem('tarefas')

    if(tarefasStoge){
      setTarefas(JSON.parse(tarefasStoge))
    }
;
  }, []);

  useEffect(() => {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
  }, [tarefas]);

  function handleAdd(){
    setTarefas([...tarefas, input])
    setInput('');
  }


  return (
    <div>
      <ul>
        {tarefas.map(tarefa => (
          <li key={tarefa}>{tarefa}</li>
        ))}
      </ul>
      
      <input type='text' value={input} onChange={e => setInput(e.target.value)}/>
      <button type='button' onClick={handleAdd}>Adicionar</button>
    </div>
  );
}

export default App;
