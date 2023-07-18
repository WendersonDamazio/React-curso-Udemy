import { useState } from 'react'
import { db } from './firebaseconection'
import { doc, setDoc, collection, addDoc, getDoc, getDocs, updateDoc } from 'firebase/firestore'

import './app.css'

function App() {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [idPost, setIdPost] = useState('');

  const [posts, setPosts] = useState([]);

  async function handleAdd() {
    // await setDoc(doc(db, "posts", "12345"), {
    // titulo: titulo,
    // autor: autor,
    // })
    // .then(() => {
    // console.log('Dados registrado no banco')
    // })
    // .catch((error) => {
    // console.log('GEROU ERRO' + error)
    // })
    await addDoc(collection(db, "posts"), {
      titulo: titulo,
      autor: autor,
    })
      .then(() => {
        console.log("CADASTRADO COM SUCESSO")
        setAutor('');
        setTitulo('')
      })
      .catch((error) => {
        console.log("ERROR " + error)
      })

  }

  async function buscarPost() {
    //const postRef = doc(db, "posts", "RIaZnMrfURv6QP4tMeHH")

    //await getDoc(postRef)
    //.then((snapshat) => {
    //setAutor(snapshat.data().autor)
    //setTitulo(snapshat.data().titulo)

    //})
    //.catch(() => {
    //console.log("Ero ao buscar")
    //})

    const postRef = collection(db, "posts")
    await getDocs(postRef)
      .then((snapshat) => {
        let lista = [];

        snapshat.forEach((doc) => {
          lista.push({
            id: doc.id,
            titulo: doc.data().titulo,
            autor: doc.data().autor,
          })
        })

        setPosts(lista);

      })
      .catch((error) => {
        console.log("DEU ALGUM ERRO")
      })

  }

  async function editarPost(){
    const docRef = doc(db, "posts", idPost)
    await updateDoc(docRef, {
      titulo: titulo,
      autor: autor,
    })
    .then(() => {
      console.log("POST ATUALIZADO")
      setPosts('')
      setTitulo('')
      setAutor('')
    })
    .catch((error) =>{
      console.log("ERRO AO ATUALIZAR")
    })
  }

  return (
    <div>
      <h1>ReactJS + FireBase :(</h1>

      <div className='container'>

        <label>ID do Post: </label>
        <input
          placeholder='Digite o ID do post'
          value={idPost}
          onChange={(e) => setIdPost(e.target.value)}
        />

        <label>Titulo</label>
        <textarea
          placeholder='Digite o titulo'
          type='text'
          value={titulo}
          onChange={ (e) => setTitulo(e.target.value) }
        />

        <label>Autor:</label>
        <input
          placeholder='autor do post'
          value={autor}
          onChange={(e) => setAutor(e.target.value)}
        /><br/>

        <button onClick={handleAdd}>Cadastrar</button>
        <button onClick={buscarPost}>Buscar post</button> <br/>

        <button onClick={editarPost}>Atualizar post</button>

        <ul>
          {posts.map((post) => {
            return(
              <li key={post.id}>
                <strong>ID: {post.id}</strong> <br/>
                <span>Titulo: {post.titulo}</span> <br/>
                <span>Autor: {post.autor}</span><br/> <br></br>
              </li>
            )
          })}
        </ul>
      </div>

    </div>
  );
}

export default App;
