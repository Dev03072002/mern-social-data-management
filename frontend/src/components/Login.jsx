import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Login = ({ handleLogin }) => {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.signupSuccess) {
      setSuccessMessage(location.state.message || "Signup successful! Please log in.");
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);

    if (errorMessage) setErrorMessage("");
    if (successMessage) setSuccessMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    // Dummy authentication logic (Replace with actual API call)
    // if (mobile === "1234567890" && password === "password") {
    //     handleLogin();
    //     navigate("/home");
    // } else {
    //   alert("Invalid credentials");
    // }
    try {
      await handleLogin({ phoneNumber: mobile, password });
      navigate("/home");
    } catch (error) {
      // alert("Invalid credentials");
      const message = error.response?.data?.message || "Invalid Credentials";
      setErrorMessage(message);
      console.error("Error submitting form:", error);
    }
  };

  const closeSuccessMessage = () => {
    setSuccessMessage("");
  };

  // Function to close the error message
  const closeErrorMessage = () => {
    setErrorMessage("");
  };

  return (
    <div className="flex items-center justify-center bg-white p-6">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-8 w-full max-w-3xl border border-blue-300">
        <h2 className="text-2xl font-semibold mb-6 text-center text-blue-700">Login</h2>

        {successMessage && (
          <div className="flex items-center justify-between mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
            <span>{successMessage}</span>
            <button
              type="button"
              onClick={closeSuccessMessage}
              className="ml-4 text-green-700 hover:text-green-900 text-2xl font-bold leading-none flex-shrink-0 border-0"
              aria-label="Close message"
            >
              &times; {/* HTML entity for 'X' */}
            </button>
          </div>
        )}

        {errorMessage && (
          <div className="flex items-center justify-between mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            <span>{errorMessage}</span>
            <button
              type="button"
              onClick={closeErrorMessage}
              className="ml-4 text-red-700 hover:text-red-900 text-2xl font-bold leading-none flex-shrink-0 border-0"
              aria-label="Close message"
            >
              &times; {/* HTML entity for 'X' */}
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 gap-4">

          <div>
            <label className="form-label">Mobile No.</label>
            <input type="text" value={mobile} onChange={handleInputChange(setMobile)} className="input-field" required />
          </div>

          <div>
            <label className="form-label">Password</label>
            <input type="password" value={password} onChange={handleInputChange(setPassword)} className="input-field" required />
          </div>

        </div>

        <button type="submit" className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg">Login</button>
      </form>
    </div>
  );
};

export default Login;
