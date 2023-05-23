import { Link } from 'react-router-dom';

function Contato(){
    return(
        <div>
            <h1>Contato</h1><br/>
            <span>Contato da empresa (dd) xxxx-xxxx</span><br/>
            <Link to='/'>Pagina Home</Link><br/>
            <Link to='/sobre'>Sobre</Link><br/>
            
        </div>
    )
}

export default Contato;