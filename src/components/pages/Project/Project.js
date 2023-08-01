import { useLocation } from "react-router-dom";
import Container from "../../layouts/Container/Container";
import Message from "../../layouts/Message/Message";
import styles from "./Project.module.css";

function Project() {
  const location = useLocation();
  let message = "";
  if (location.state) {
    message = location.state.message;
  }

  return (
    <>
      <Container customClass="min-height">
        <div>
          <h1>Projects</h1>
          {message && <Message type="succes" text={message} />}
        </div>
      </Container>
    </>
  );
}

export default Project;
