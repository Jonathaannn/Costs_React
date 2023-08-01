import { useLocation } from "react-router-dom";
import Container from "../../layouts/Container/Container";
import Message from "../../layouts/Message/Message";
import styles from "./Project.module.css";
import LinkButton from "../../layouts/LinkButton/LinkButton";

function Project() {
  const location = useLocation();
  let message = "";
  if (location.state) {
    message = location.state.message;
  }

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
            <p>Projetos...</p>
          </Container>
        </div>
      </Container>
    </>
  );
}

export default Project;
