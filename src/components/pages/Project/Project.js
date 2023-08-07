import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Container from "../../layouts/Container/Container";
import Loading from "../../layouts/Loading/Loading";
import Message from "../../layouts/Message/Message";
import ProjectForm from "../../project/ProjectForm/ProjectForm";
import ServiceForm from "../../service/ServiceForm/ServiceForm";
import ServiceCard from "../../service/ServiceCard/ServiceCard";
import styles from "./Project.module.css";

function Project() {
  const { id } = useParams();
  const [project, setProject] = useState([]);
  const [services, setServices] = useState([]);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showServiceForm, setShowServiceForm] = useState(false);
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
          setServices(data.services);
        })
        .catch((err) => console.log(err));
    }, 300);
  }, [id]);

  function createService(project) {
    setMessage("");
    const lastservice = project.services[project.services.length - 1];
    lastservice.id = uuidv4();
    const lastServiceCost = lastservice.cost;
    const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost);
    if (newCost > parseFloat(project.budget)) {
      setMessage("Orçamento estorou, verifique o valor do serviço");
      setType("error");
      project.services.pop();
      return false;
    }
    project.cost = newCost;
    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((res) => res.json())
      .then((data) => {
        setShowServiceForm(false);
        setMessage("Serviço adicionado com sucesso!");
        setType("succes");
        clearMessage();
      })
      .catch((error) => console.log(error));
  }

  function removeService() {}

  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm);
  }

  function toggleServiceForm() {
    setShowServiceForm(!showServiceForm);
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
                  {!showProjectForm ? "Editar" : "Fechar"}
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
              <div className={styles.service_form_container}>
                <h2>Adicione os serviços: </h2>
                <button className={styles.button} onClick={toggleServiceForm}>
                  {!showServiceForm ? "Adicionar" : "Fechar"}
                </button>
                <div className={styles.project_info}>
                  {showServiceForm && (
                    <ServiceForm
                      handleSubmit={createService}
                      textButton="Adicionar"
                      projectData={project}
                    />
                  )}
                </div>
              </div>
              <h2>Serviços: </h2>
              <Container customClass="start">
                {services.length > 0 &&
                  services.map((service) => (
                    <ServiceCard
                      id={service.id}
                      name={service.name}
                      description={service.description}
                      cost={service.cost}
                      key={service.id}
                      handleRemvove={removeService}
                    />
                  ))}
                {services.length === 0 && <h3>Sem serviços cadastrados :)</h3>}
              </Container>
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
