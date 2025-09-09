import { Link } from "react-router-dom";

const Editor = () => {
  return (
    <section>
      <h1>Editor</h1>
      <p style={{ marginBlockEnd: "8rem" }}>
        You must have been assigned an Editor role.
      </p>
      <p>
        <Link to={`/`}>Home</Link>
      </p>
    </section>
  );
};

export default Editor;
