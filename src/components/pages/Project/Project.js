import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import LinkButton from "../../layouts/LinkButton/LinkButton";
import Container from "../../layouts/Container/Container";
import Message from "../../layouts/Message/Message";
import Loading from "../../layouts/Loading/Loading";
import styles from "./Project.module.css";
import ProjectCard from "../../project/ProjectCard/ProjectCard";

function Project() {
  const [projects, setProjects] = useState([]);
  const [removeLoader, setRemoveLoader] = useState(false);

  const location = useLocation();
  let message = "";
  if (location.state) {
    message = location.state.message;
  }

  useEffect(() => {
    setTimeout(() => {
      fetch("http://localhost:5000/projects", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setProjects(data);
          setRemoveLoader(true);
        })
        .catch((error) => console.log(error));
    }, 300);
  }, []);

  return (
    <>
      <Container customClass="min-height">
        <div className={styles.project_container}>
          <div className={styles.title_container}>
            <h1>Projects</h1>
            <LinkButton to="/newproject" text="Criar projeto" />
          </div>
          {message && <Message type="succes" text={message} />}
          <Container customClass="start">
            {projects.length > 0 &&
              projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  id={project.id}
                  name={project.name}
                  budget={project.budget}
                  category={project.category.name}
                />
              ))}
            {!removeLoader && <Loading />}
            {removeLoader && projects.length === 0 && (
              <h2>Sem projetos no momento :)</h2>
            )}
          </Container>
        </div>
      </Container>
    </>
  );
}

export default Project;
