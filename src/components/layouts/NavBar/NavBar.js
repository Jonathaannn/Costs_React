import { Link } from "react-router-dom"
import styles from "./NavBar.module.css"
import Container from "../Container/Container"
import logo from "../../../img/costs_logo.png"

function NavBar () {
    return (
    <>
        <nav className={styles.navbar}>
        <Container>
            <Link to="/"><img src={logo} alt="Logo do Costs"/></Link>
            <ul className={styles.list}>
                <li className={styles.item}><Link to="/">Início</Link></li>
                <li className={styles.item}><Link to="/project">Projetos</Link></li>
                <li className={styles.item}><Link to="/company">Empresa</Link></li>
                <li className={styles.item}><Link to="/contact">Contato</Link></li>
            </ul>
        </Container>
        </nav>
    </>
    )
}

export default NavBar

// <Link to="/newproject">New Project</Link>