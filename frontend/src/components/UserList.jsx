import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";

const UserList = ({ userRole }) => {
    const [users, setUsers] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const limit = 10;
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const pageFromUrl = parseInt(searchParams.get("page") || "1", 10);
    const [currentPage, setCurrentPage] = useState(pageFromUrl);

    useEffect(() => {
        setLoading(true);
        axios.get(`${API_BASE_URL}/api/users/list-main-members?page=${currentPage}&limit=${limit}`)
            .then(response => {
                setUsers(response.data.users);
                setTotalPages(response.data.totalPages);
                setCurrentPage(response.data.page);
            })
            .catch(error => console.error("Error fetching users:", error))
            .finally(() => setLoading(false));

        setSearchParams({ page: currentPage });
    }, [currentPage]);

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        return date.toLocaleDateString("en-GB");
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                await axios.delete(`${API_BASE_URL}/api/users/delete/${id}`);
                setUsers(users.filter(user => user._id !== id));
                alert("User and associated family members deleted successfully!");
            } catch (error) {
                console.error("Error deleting user:", error);
                alert("Failed to delete user.");
            }
        }
    };

    const handleNextForm = () => {
        navigate(`/home`);
    };

    return (
        <div className="container mx-auto p-6">
            <button
                type="button"
                onClick={handleNextForm}
                className="w-60 my-4 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
            >
                Go to Home page
            </button>
            <h2 className="text-2xl font-semibold mb-4 text-center">Main Family Members List</h2>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                    <thead className="bg-blue-100 sticky top-0">
                        <tr className="bg-blue-100">
                            <th className="border p-2">Photo</th>
                            <th className="border p-2">Name</th>
                            <th className="border p-2">Sex</th>
                            <th className="border p-2">Birth Date</th>
                            <th className="border p-2">Blood Group</th>
                            <th className="border p-2">Native Place</th>
                            <th className="border p-2">Total Family Members</th>
                            <th className="border p-2">Address</th>
                            <th className="border p-2">Contact No.</th>
                            <th className="border p-2">WhatsApp No.</th>
                            <th className="border p-2">Maritial Status</th>
                            <th className="border p-2">Date of Marriage</th>
                            <th className="border p-2">Email ID</th>
                            <th className="border p-2">Education</th>
                            <th className="border p-2">Occupation</th>
                            <th className="border p-2">Name of the Company</th>
                            <th className="border p-2">Designation</th>
                            <th className="border p-2">Yearly Income in INR (In Lacs)</th>
                            <th className="border p-2">Ways to Help Darji Samaj</th>
                            <th className="border p-2">Actions</th>
                            {userRole === 'superadmin' && (
                                <th className="border p-2">Created By</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="21" className="text-center py-6 text-blue-600 font-semibold">
                                    Loading...
                                </td>
                            </tr>
                        ) : users.length === 0 ? (
                            <tr>
                                <td colSpan="16" className="border p-4 text-center text-gray-500">
                                    No family members found.
                                </td>
                            </tr>
                        ) : (
                            users.map(user => (
                                <tr key={user._id} className="text-center border-b">
                                    <td className="border p-2">
                                        {user.passportPhoto ? (
                                            <img
                                                src={user.passportPhoto}
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
                                    <td className="border p-2">{user.nativePlace}</td>
                                    <td className="border p-2">{user.totalMembers}</td>
                                    <td className="border p-2">
                                        {user.address ? (
                                            `${user.address.houseNo || ''} ${user.address.society || ''} ${user.address.landmark || ''} 
                                    ${user.address.area || ''} ${user.address.taluka || ''} ${user.address.district || ''} ${user.address.pincode || ''}`
                                        ) : "N/A"}
                                    </td>
                                    <td className="border p-2">{user.contactNo}</td>
                                    <td className="border p-2">{user.whatsappNo}</td>
                                    <td className="border p-2">{user.maritalStatus}</td>
                                    <td className="border p-2">{formatDate(user.marriageDate)}</td>
                                    <td className="border p-2">{user.email}</td>
                                    <td className="border p-2">{user.education}</td>
                                    <td className="border p-2">{user.occupation}</td>
                                    <td className="border p-2">{user.companyName}</td>
                                    <td className="border p-2">{user.designation}</td>
                                    <td className="border p-2">{user.yearlyIncome}</td>
                                    <td className="border p-2">{user.helpDarjiSamaj}</td>
                                    <td className="border p-2">
                                        <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                                            onClick={() => navigate(`/family-members/${user._id}?parentPage=${currentPage}`)}>
                                            View Family Members
                                        </button>
                                        {(userRole === 'admin' || userRole === 'superadmin') && (
                                            <button className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                                                onClick={() => navigate(`/edit-user/${user._id}`)}>Edit</button>
                                        )}
                                        {(userRole === 'superadmin') && (
                                            <button className="bg-red-500 text-white px-2 py-1 rounded"
                                                onClick={() => handleDelete(user._id)}>Delete</button>
                                        )}
                                    </td>
                                    {userRole === 'superadmin' && (
                                        <td className="border p-2">{user.createdBy?.name || 'N/A'}</td>
                                    )}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center mt-6 space-x-2">
                <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 rounded border border-gray-400 hover:bg-gray-100 disabled:opacity-50"
                >
                    Prev
                </button>

                {[...Array(totalPages)].map((_, index) => {
                    const page = index + 1;
                    return (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-3 py-1 rounded border border-gray-400 ${
                                page === currentPage ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'
                            }`}
                        >
                            {page}
                        </button>
                    );
                })}

                <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 rounded border border-gray-400 hover:bg-gray-100 disabled:opacity-50"
                >
                    Next
                </button>
            </div>

        </div>
    );
};

export default UserList;