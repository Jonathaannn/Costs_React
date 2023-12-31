import { useState } from "react";
import Input from "../../Form/Input/Input";
import SubmitButton from "../../Form/SubmitButton/SubmitButton";
import styles from "../../project/ProjectForm/ProjectForm.module.css";

function ServiceForm({ handleSubmit, textButton, projectData }) {
  const [service, setService] = useState([]);

  function submit(e) {
    e.preventDefault();
    projectData.services.push(service);
    handleSubmit(projectData);
  }

  function handleChange(e) {
    setService({ ...service, [e.target.name]: e.target.value });
  }

  return (
    <form className={styles.form} onSubmit={submit}>
      <Input
        type="text"
        text="Nome do serviço"
        name="name"
        placeholder="Insira o nome do serviço"
        handleOnChange={handleChange}
      />
      <Input
        type="number"
        text="Custo do serviço"
        name="cost"
        placeholder="Insira o valor do serviço"
        handleOnChange={handleChange}
      />
      <Input
        type="text"
        text="Descrição do serviço"
        name="description"
        placeholder="Descreva o serviço"
        handleOnChange={handleChange}
      />
      <SubmitButton text={textButton} />
    </form>
  );
}

export default ServiceForm;
