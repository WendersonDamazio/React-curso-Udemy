import { useState, useEffect } from 'react'
import { db, auth } from './firebaseconection'
import {
  doc,
  setDoc,
  collection,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  onSnapshot
} from 'firebase/firestore'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth"

import './app.css'

function App() {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [idPost, setIdPost] = useState('');

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const [user, setUser] = useState(false);
  const [userDatail, setUserDatail] = useState('');

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function loadPosts() {
      const unsob = onSnapshot(collection(db, "posts"), (snapshat) => {
        let listaPost = [];

        snapshat.forEach((doc) => {
          listaPost.push({
            id: doc.id,
            titulo: doc.data().titulo,
            autor: doc.data().autor,
          })
        })

        setPosts(listaPost);
      })
    }
    loadPosts();
  }, [])

  useEffect(() => {
    async function checkLoging(){
        onAuthStateChanged(auth, (user) => {
          if(user){
            console.log(user)
            setUser(true)
            setUserDatail({
              uid: user.uid,
              email: user.email
            })
          }else{
            setUser(false)
            setUserDatail([])
          }
        })
    }
    checkLoging();
  }, [])

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

  async function editarPost() {
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
      .catch((error) => {
        console.log("ERRO AO ATUALIZAR")
      })
  }

  async function excluirPost(id) {
    const docRef = doc(db, "posts", id)
    await deleteDoc(docRef)
      .then(() => {
        alert("DELETADO COM SUCESSO")
      })
  }

  async function novoUsuario(){
    await createUserWithEmailAndPassword(auth, email, senha)
    .then(() => {
      	console.log("CADASTRAdo COM SUCESSO")
        setEmail('')
        setSenha('')
    })
    .catch((error) => {

      if(error.code === 'auth/weak-password'){
        alert("Senha muito fraca")
      }else if(error.code === 'auth/email-already-in-use'){
        alert("email já exite")
      }
    })
  }

  async function logarUsuario(){
    await signInWithEmailAndPassword(auth, email, senha)
    .then((value) => {
      console.log("User logado com sucesso")
      console.log(value.user)

      setUserDatail({
        uid: value.user.uid,
        email: value.user.email
      })
      setUser(true);
      
      setEmail('')
      setSenha('')
    })
    .catch(() => {
      console.log("ERRO AO FAZER O LOGIN")
    })
  }

  async function fazerLogout(){
    await signOut(auth)
    setUser(false);
    setUserDatail([])
  }

  return (
    <div>
      <h1>ReactJS + FireBase :</h1>

      { user && (
        <div>
          <strong>Seja bem vindo(a) (VOCE ESTA LOGADO)</strong> <br/>
          <span>ID: {userDatail.uid} - Email: {userDatail.email}</span>
          <button onClick={fazerLogout}>Sai da conta</button>
          <br/> <br/>
        </div>
      )}

      <div className='container'>
        <h2>Usuarios</h2>
        <label>Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Digite seu email'
        /> <br />
        <label>Senha</label>
        <input
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder='Digite senha'
        /><br />
        <button onClick={novoUsuario}>Cadastrar</button>
        <button onClick={logarUsuario}>Fazer Login</button>
      </div>
      
      <hr/>

      <div className='container'>
        <h2>POSTS</h2>
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
          onChange={(e) => setTitulo(e.target.value)}
        />

        <label>Autor:</label>
        <input
          placeholder='autor do post'
          value={autor}
          onChange={(e) => setAutor(e.target.value)}
        /><br />

        <button onClick={handleAdd}>Cadastrar</button>
        <button onClick={buscarPost}>Buscar post</button> <br />

        <button onClick={editarPost}>Atualizar post</button>

        <ul>
          {posts.map((post) => {
            return (
              <li key={post.id}>
                <strong>ID: {post.id}</strong> <br />
                <span>Titulo: {post.titulo}</span> <br />
                <span>Autor: {post.autor}</span><br />
                <button onClick={() => excluirPost(post.id)}>Excluir</button> <br /><br />
              </li>
            )
          })}
        </ul>
      </div>

    </div>
  );
}

export default App;
