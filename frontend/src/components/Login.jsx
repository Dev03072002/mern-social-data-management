import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ handleLogin }) => {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center bg-white p-6">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-8 w-full max-w-3xl border border-blue-300">
        <h2 className="text-2xl font-semibold mb-6 text-center text-blue-700">Login</h2>
        
        <div className="grid grid-cols-1 gap-4">
            
            <div>
                <label className="form-label">Mobile No.</label>
                <input type="text" value={mobile} onChange={(e) => setMobile(e.target.value)} className="input-field" required />
            </div>

            <div>
                <label className="form-label">Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input-field" required />
            </div>

        </div>

        <button type="submit" className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg">Login</button>
      </form>
    </div>
  );
};

export default Login;
