import { useState } from 'react'
import { db } from './firebaseconection'
import { doc, setDoc } from 'firebase/firestore' 

import './app.css'

function App() {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');

  async function handleAdd(){
    await setDoc(doc(db, "posts", "12345"), {
      titulo: titulo,
      autor: autor,
    })
    .then(() => {
      console.log('Dados registrado no banco')
    })
    .catch((error) => {
      console.log('GEROU ERRO' + error)
    })
  }

  return (
    <div>
      <h1>ReactJS + FireBase :(</h1>

      <div className='container'>
        <label>Titulo</label>
        <textarea 
          placeholder='Digite o titulo'
          type='text'
          value={titulo}
          onChange={ (e)=> setTitulo(e.target.value) }
        />

        <label>Autor:</label>
        <input 
          type='text' 
          placeholder='autor do post'
          value={autor}
          onChange={ (e)=> setAutor(e.target.value) }
        />

        <button onClick={handleAdd}>Cadastrar</button>
      </div>
    </div>
  );
}

export default App;
