import { useNavigate } from "react-router-dom";

const Home = ({ userRole, userName }) => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h2>Welcome to Home, {userName || 'User'}!</h2>
      <p>This is the homepage after login.</p>
      {(userRole === 'admin' || userRole === 'superadmin') && (
        <button
          onClick={() => navigate("/add-main-family-member")}
          className="m-2 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg shadow transition duration-150 ease-in-out"
        >
          Add Main Family Member Detail
        </button>
      )}
      <button onClick={() => navigate("/user-list")} className="m-4 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg">View All Main Family Member Details</button>
    </div>
  );
};

export default Home;
