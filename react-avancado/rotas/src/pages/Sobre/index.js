import { Link } from 'react-router-dom';

function Sobre() {
    return (
      <div>
        <h1>Pagina Sobre a empresa</h1><br/>
        <Link to='/'>Pagina Home</Link><br/>
        <Link to='/contato'>contatos</Link>
      </div>
    );
  }
  
  export default Sobre;