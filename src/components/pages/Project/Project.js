import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Container from "../../layouts/Container/Container";
import styles from "./Project.module.css";

function Porject() {
  const { id } = useParams();
  const [project, setProject] = useState();
  useEffect(() => {
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
  }, [id]);

  return (
    <Container customClass="min-height">
      <div>
        <h1>{project && project.name}</h1>
      </div>
    </Container>
  );
}

export default Porject;
