import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UserList = ({ userRole }) => {
    const [users, setUsers] = useState([]);
    const { id } = useParams();
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${API_BASE_URL}/api/family/family-members/${id}`)
            .then(response => setUsers(response.data))
            .catch(error => console.error("Error fetching users:", error));
    }, []);

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        return date.toLocaleDateString("en-GB");
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this family member?")) {
            try {
                await axios.delete(`${API_BASE_URL}/api/family/delete/${id}`);
                setUsers(users.filter(user => user._id !== id));
                alert("Family member deleted successfully!");
            } catch (error) {
                console.error("Error deleting family member:", error);
                alert("Failed to delete family member.");
            }
        }
    };

    const handleNextForm = () => {
        navigate(`/home`);
    };

    const handleAddNewForm = () => {
        navigate(`/add-family-member/${id}`);
    }

    const handleGoBack = () => {
        navigate("/user-list");
    };

    return (
        <div className="container mx-auto p-6">
            <div className="flex gap-4 justify-center">
                <button
                    type="button"
                    onClick={handleGoBack}
                    className="w-60 my-4 bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg"
                >
                    Go to Previous Page
                </button>
                <button
                    type="button"
                    onClick={handleNextForm}
                    className="w-60 my-4 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
                >
                    Go to Home Page
                </button>
            </div>
            <h2 className="text-2xl font-semibold mb-4 text-center">Family Members List</h2>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                    <thead className="bg-blue-100 sticky top-0">
                        <tr className="bg-blue-100">
                            <th className="border p-2">Relation</th>
                            <th className="border p-2">Photo</th>
                            <th className="border p-2">Name</th>
                            <th className="border p-2">Sex</th>
                            <th className="border p-2">Birth Date</th>
                            <th className="border p-2">Blood Group</th>
                            <th className="border p-2">Contact No.</th>
                            <th className="border p-2">Maritial Status</th>
                            <th className="border p-2">Date of Marriage</th>
                            <th className="border p-2">Education</th>
                            <th className="border p-2">Occupation</th>
                            <th className="border p-2">Name of the Company</th>
                            <th className="border p-2">Designation</th>
                            <th className="border p-2">Monthly Income in INR (In Lacs)</th>
                            <th className="border p-2">Ways to Help Darji Samaj</th>
                            {userRole === 'admin' && (
                                <th className="border p-2">Actions</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {users.length === 0 ? (
                            <tr>
                                <td colSpan="16" className="border p-4 text-center text-gray-500">
                                    No family members found.
                                </td>
                            </tr>
                        ) : (
                            users.map(user => (
                                <tr key={user._id} className="text-center border-b">
                                    <td className="border p-2">{user.relation}</td>
                                    <td className="border p-2">
                                        {user.passportPhoto ? (
                                            <img
                                                src={`data:image/png;base64,${user.passportPhoto}`}
                                                alt="Passport"
                                                className="w-24 h-24 max-w-none mx-auto border border-gray-300"
                                            />
                                        ) : (
                                            <span>No Photo</span>
                                        )}
                                    </td>
                                    <td className="border p-2">{user.name} {user.middleName} {user.surname}</td>
                                    <td className="border p-2">{user.sex}</td>
                                    <td className="border p-2">{formatDate(user.birthday)}</td>
                                    <td className="border p-2">{user.bloodGroup}</td>
                                    <td className="border p-2">{user.contactNo}</td>
                                    <td className="border p-2">{user.maritalStatus}</td>
                                    <td className="border p-2">{formatDate(user.marriageDate)}</td>
                                    <td className="border p-2">{user.education}</td>
                                    <td className="border p-2">{user.occupation}</td>
                                    <td className="border p-2">{user.companyName}</td>
                                    <td className="border p-2">{user.designation}</td>
                                    <td className="border p-2">{user.monthlyIncome}</td>
                                    <td className="border p-2">{user.helpDarjiSamaj}</td>
                                    <td className="border p-2">
                                        {userRole === 'admin' && (
                                            <button className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                                                onClick={() => navigate(`/edit-family-member/${user._id}`)}>Edit</button>
                                        )}
                                        {userRole === 'admin' && (
                                            <button className="bg-red-500 text-white px-2 py-1 rounded"
                                                onClick={() => handleDelete(user._id)}>Delete</button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            {userRole === 'admin' && (
                <button
                    type="button"
                    onClick={handleAddNewForm}
                    className="w-60 my-4 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
                >
                    Add new family member
                </button>
            )}
        </div>
    );
};

export default UserList;