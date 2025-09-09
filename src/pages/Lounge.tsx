import { Link } from "react-router-dom";

const Lounge = () => {
  return (
    <section aria-describedby="lounge-title">
      <h1 id="lounge-title">Lounge</h1>
      <p style={{ marginBlockEnd: "8rem" }}>
        Admins and Editors can hang out here.
      </p>
      <p>
        <Link to={`/`}>Home</Link>
      </p>
    </section>
  );
};

export default Lounge;
