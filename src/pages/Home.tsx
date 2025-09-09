import type { AppDispatch } from "@/app/store";
import { logout } from "@/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <section aria-describedby="home-title">
      <h1 id="home-title">Home</h1>
      <p>You are logged in!</p>
      <p>
        <Link to={`/editor`}>Go to Editor page</Link>
      </p>
      <p>
        <Link to={`/admin`}>Go to Admin page</Link>
      </p>
      <p>
        <Link to={`/Lounge`}>Go to the Lounge</Link>
      </p>
      <p>
        <Link to={`/linkpage`}>Go to link page</Link>
      </p>
      <button onClick={handleLogout}>Sign Out</button>
    </section>
  );
};

export default Home;
