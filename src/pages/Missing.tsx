import { useNavigate } from "react-router-dom";

const Missing = () => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <section aria-describedby="page-title">
      <h1 id="page-title">Missing</h1>
      <p style={{ marginBlockEnd: "8rem" }}>
        The requested page is not found.
      </p>
      <button onClick={handleGoBack}>Go Back</button>
    </section>
  );
};

export default Missing;
