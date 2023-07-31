import image from "../../../img/savings.svg"
import Container from "../../layouts/Container/Container"
import LinkButton from "../../layouts/LinkButton/LinkButton"
import styles from "./Home.module.css"

function Home () {
    return (
    <Container customClass="min-height">
        <section className={styles.home_container}>
            <h1>Bem-vindo ao <span>Costs</span></h1>
            <p>Comece a gerenciar os seus projetos agora mesmo!</p>
            <LinkButton to="/newproject" text="Criar Projeto"/>
            <img src={image} alt="Costs"/>
        </section>
    </Container>
    )
}

export default Home

