import Input from "../Form/Input/Input"
import Select from "../Form/Select/Select"
import SubmitButton from "../Form/SubmitButton/SubmitButton"
import styles from "./ProjectForm.module.css"

function ProjectForm ({buttonText}) {
    return (
        <form className={styles.form}>
            <Input type="text" text="Nome do projeto" name="name" placeholder="Insira o nome do projeto"/>
            <Input type="number" text="Orçamento do projeto" name="budget" placeholder="Insira o orçamento total"/>
            <Select name="category_id" text="Selecione a cetegoria"/>
            <SubmitButton text={buttonText}/>
        </form>
    )
}

export default ProjectForm