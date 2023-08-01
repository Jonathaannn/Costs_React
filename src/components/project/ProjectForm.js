import { useState } from "react";
import Input from "../Form/Input/Input";
import Select from "../Form/Select/Select";
import SubmitButton from "../Form/SubmitButton/SubmitButton";
import styles from "./ProjectForm.module.css";
import { useEffect } from "react";

function ProjectForm({ buttonText }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/category", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <form className={styles.form}>
      <Input
        type="text"
        text="Nome do projeto"
        name="name"
        placeholder="Insira o nome do projeto"
      />
      <Input
        type="number"
        text="Orçamento do projeto"
        name="budget"
        placeholder="Insira o orçamento total"
      />
      <Select
        name="category_id"
        text="Selecione a cetegoria"
        options={categories}
      />
      <SubmitButton text={buttonText} />
    </form>
  );
}

export default ProjectForm;
