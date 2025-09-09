import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };
  
  return (
    <section aria-describedby="page-title">
      <h1 id="page-title">Unauthorized</h1>
      <p style={{ marginBlockEnd: "8rem" }}>
        You do not have access to the requested page.
      </p>
      <button onClick={handleGoBack}>Go Back</button>
    </section>
  );
};

export default Unauthorized;
