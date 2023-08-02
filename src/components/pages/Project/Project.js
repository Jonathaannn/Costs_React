import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Container from "../../layouts/Container/Container";
import Loading from "../../layouts/Loading/Loading";
import styles from "./Project.module.css";

function Porject() {
  const { id } = useParams();
  const [project, setProject] = useState([]);
  const [showProjectForm, setShowProjectForm] = useState(false);

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

  return (
    <>
      <Container customClass="min-height">
        {project?.name ? (
          <div className={styles.project_details}>
            <Container customClass="column">
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
                    <p>Informações</p>
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

export default Porject;
