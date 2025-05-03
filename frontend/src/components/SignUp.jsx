import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);

    if (errorMessage) setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }
    if (!/^\d{10}$/.test(mobile)) {
      setErrorMessage("Please enter a valid 10-digit mobile number.");
      return;
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/sign-up`,
        { phoneNumber: mobile, password }
      );
      navigate("/", {
        state: {
          signupSuccess: true,
          message: "Sign up successful! Please log in.",
        },
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      const message = error.response?.data?.message || "Sign up failed. Please try again later.";
      setErrorMessage(message);
    }
  };

  const closeErrorMessage = () => {
    setErrorMessage("");
  };

  return (
    <div className="flex items-center justify-center bg-white p-6">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-8 w-full max-w-3xl border border-blue-300">
        <h2 className="text-2xl font-semibold mb-6 text-center text-blue-700">Sign Up</h2>

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
            <input type="password" value={password} onChange={handleInputChange(setPassword)} className="input-field" minLength="6" required />
          </div>

        </div>

        <button type="submit" className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
