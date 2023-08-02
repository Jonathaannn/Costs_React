import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Container from "../../layouts/Container/Container";
import Loading from "../../layouts/Loading/Loading";
import Message from "../../layouts/Message/Message";
import ProjectForm from "../../project/ProjectForm/ProjectForm";
import styles from "./Project.module.css";

function Project() {
  const { id } = useParams();
  const [project, setProject] = useState([]);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [message, setMessage] = useState();
  const [type, setType] = useState();

  useEffect(() => {
    setTimeout(() => {
      fetch(`http://localhost:5000/projects/${id}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setProject(data);
        })
        .catch((err) => console.log(err));
    }, 300);
  }, [id]);

  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm);
  }

  function editPost(project) {
    if (project.budget < project.cost && project.budget < 0) {
      setMessage("O orçamento não pode ser menor que o custo do projeto!");
      setType("error");
      return false;
    }
    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((res) => res.json())
      .then((data) => {
        setProject(data);
        setShowProjectForm(!showProjectForm);
        setMessage("Informações do projeto alteradas com sucesso!");
        setType("succes");
        clearMessage();
      })
      .catch((err) => console.log(err));
  }

  function clearMessage() {
    setTimeout(() => {
      setMessage(null);
      setType(null);
    }, 3001);
  }

  return (
    <>
      <Container customClass="min-height">
        {project?.name ? (
          <div className={styles.project_details}>
            <Container customClass="column">
              {message && <Message type={type} text={message} />}
              <div className={styles.details_container}>
                <h1>{project.name}</h1>
                <button className={styles.button} onClick={toggleProjectForm}>
                  {!showProjectForm ? "Editar projeto" : "Fechar"}
                </button>
                {!showProjectForm ? (
                  <div className={styles.project_info}>
                    <p>
                      <span>Categoria: </span>
                      {project.category.name}
                    </p>
                    <p>
                      <span>Orçamento: </span>R${project.budget}
                    </p>
                    <p>
                      <span>Total Utilizado: </span>R${project.cost}
                    </p>
                  </div>
                ) : (
                  <div className={styles.project_info}>
                    <ProjectForm
                      buttonText="Salvar"
                      projectData={project}
                      handleSubmit={editPost}
                    />
                  </div>
                )}
              </div>
            </Container>
          </div>
        ) : (
          <Loading />
        )}
      </Container>
    </>
  );
}

export default Project;
