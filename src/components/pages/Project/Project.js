import { useLocation } from "react-router-dom";
import Container from "../../layouts/Container/Container";
import Message from "../../layouts/Message/Message";
import styles from "./Project.module.css";
import LinkButton from "../../layouts/LinkButton/LinkButton";
import ProjectCard from "../../project/ProjectCard/ProjectCard";
import { useState, useEffect } from "react";

function Project() {
  const [projects, setProjects] = useState([]);

  const location = useLocation();
  let message = "";
  if (location.state) {
    message = location.state.message;
  }

  useEffect(() => {
    fetch("http://localhost:5000/projects", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
      })
      .catch((error) => console.log(error));
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
          </Container>
        </div>
      </Container>
    </>
  );
}

export default Project;
