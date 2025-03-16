import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h2>Welcome to Home</h2>
      <p>This is the homepage after login.</p>
      <button onClick={() => navigate("/add-main-family-member")}>Add Main Family Member Detail</button>
    </div>
  );
};

export default Home;
