import { Link } from "react-router-dom";

const Admin = () => {
  return (
    <section aria-describedby="admin-title">
      <h1 id="admin-title">Admin</h1>
      <p style={{ marginBlockEnd: "8rem" }}>
        You must have been assigned an Admin role.
      </p>
      <p>
        <Link to={`/`}>Home</Link>
      </p>
    </section>
  );
};

export default Admin;
