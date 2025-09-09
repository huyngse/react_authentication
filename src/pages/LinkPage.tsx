import { Link } from "react-router-dom";

const LinkPage = () => {
  return (
    <section aria-describedby="page-title">
      <h1 id="page-title">Links</h1>
      <h2>Public</h2>
      <p>
        <Link to={`/login`}>Login</Link>
      </p>
      <p>
        <Link to={`/register`}>Register</Link>
      </p>
      <h2>Private</h2>
      <p>
        <Link to={`/`}>Home</Link>
      </p>
      <p>
        <Link to={`/editor`}>Editor page</Link>
      </p>
      <p>
        <Link to={`/admin`}>Admin page</Link>
      </p>
    </section>
  );
};

export default LinkPage;
