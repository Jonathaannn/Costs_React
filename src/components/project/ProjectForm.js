import { useState } from "react";
import { useEffect } from "react";
import Input from "../Form/Input/Input";
import Select from "../Form/Select/Select";
import SubmitButton from "../Form/SubmitButton/SubmitButton";
import styles from "./ProjectForm.module.css";

function ProjectForm({ buttonText, handleSubmit, projectData }) {
  const [categories, setCategories] = useState([]);
  const [project, setProject] = useState(projectData || {});

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

  const Submit = (e) => {
    e.preventDefault();
    handleSubmit(project);
  };

  function handleChange(e) {
    setProject({ ...project, [e.target.name]: e.target.value });
  }

  function handleCategory(e) {
    setProject({
      ...project,
      category: {
        id: e.target.value,
        name: e.target.options[e.target.selectedIndex].text,
      },
    });
  }

  return (
    <form onSubmit={Submit} className={styles.form}>
      <Input
        type="text"
        text="Nome do projeto"
        name="name"
        placeholder="Insira o nome do projeto"
        handleOnChange={handleChange}
        value={project.name ? project.name : ""}
      />
      <Input
        type="number"
        text="Orçamento do projeto"
        name="budget"
        placeholder="Insira o orçamento total"
        handleOnChange={handleChange}
        value={project.budget ? project.budget : ""}
      />
      <Select
        name="category_id"
        text="Selecione a cetegoria"
        options={categories}
        handleOnChange={handleCategory}
        value={project.category ? project.category.id : " "}
      />
      <SubmitButton text={buttonText} />
    </form>
  );
}

export default ProjectForm;
