import Container from "../../layouts/Container/Container";
import ProjectForm from "../../project/ProjectForm";
import styles from "./NewProject.module.css"

function NewProject () {
    return (
    <Container customClass="min-height">
        <div className={styles.newproject_container}>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviços</p>
            <ProjectForm buttonText="Criar projeto"/>
        </div>
    </Container>
    )
}

export default NewProject