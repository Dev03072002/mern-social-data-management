import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./UserForm.css";

const UserForm = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        middleName: "",
        surname: "",
        sex: "",
        birthday: "",
        bloodGroup: "",
        nativePlace: "",
        totalMembers: "",
        houseNo: "",
        society: "",
        landmark: "",
        area: "",
        taluka: "",
        district: "",
        pincode: "",
        contactNo: "",
        whatsappNo: "",
        maritalStatus: "",
        marriageDate: "",
        email: "",
        education: "",
        occupation: "",
        companyName: "",
        designation: "",
        monthlyIncome: "",
        passportPhoto: null,
        aadhaarNo: "",
        helpDarjiSamaj: "",
    });

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        if (type === "file") {
            setFormData({ ...formData, [name]: e.target.files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            Object.keys(formData).forEach((key) => {
                formDataToSend.append(key, formData[key]);
            });

            const response = await axios.post(`${API_BASE_URL}/api/users/register`, formDataToSend, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (response.data.success) {
                alert("Main family member added successfully!");
                navigate(`/add-family-member/${response.data.userId}`);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Failed to submit form.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-white p-6">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded-lg p-8 w-full max-w-3xl border border-blue-300"
            >
                <h2 className="text-2xl font-semibold mb-6 text-center text-blue-700">
                    Main Family Member Form
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="form-label">First Name</label>
                        <input type="text" name="name" onChange={handleChange} className="input-field" required />
                    </div>

                    <div>
                        <label className="form-label">Middle Name</label>
                        <input type="text" name="middleName" onChange={handleChange} className="input-field" />
                    </div>

                    <div>
                        <label className="form-label">Surname</label>
                        <input type="text" name="surname" onChange={handleChange} className="input-field" required />
                    </div>

                    <div>
                        <label className="form-label">Sex</label>
                        <select name="sex" onChange={handleChange} className="input-field" required>
                            <option value="">Select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>

                    <div>
                        <label className="form-label">Birthday</label>
                        <input type="date" name="birthday" onChange={handleChange} className="input-field" required />
                    </div>

                    <div>
                        <label className="form-label">Blood Group</label>
                        <input type="text" name="bloodGroup" onChange={handleChange} className="input-field" />
                    </div>

                    <div>
                        <label className="form-label">Native Place</label>
                        <input type="text" name="nativePlace" onChange={handleChange} className="input-field" />
                    </div>

                    <div>
                        <label className="form-label">Total Family Members</label>
                        <input type="number" name="totalMembers" onChange={handleChange} className="input-field" />
                    </div>

                    <div>
                        <label className="form-label">House No.</label>
                        <input type="text" name="houseNo" onChange={handleChange} className="input-field" />
                    </div>

                    <div>
                        <label className="form-label">Society/Faliya Name</label>
                        <input type="text" name="society" onChange={handleChange} className="input-field" />
                    </div>

                    <div>
                        <label className="form-label">Landmark</label>
                        <input type="text" name="landmark" onChange={handleChange} className="input-field" />
                    </div>

                    <div>
                        <label className="form-label">Taluka</label>
                        <input type="text" name="taluka" onChange={handleChange} className="input-field" />
                    </div>

                    <div>
                        <label className="form-label">District</label>
                        <input type="text" name="district" onChange={handleChange} className="input-field" />
                    </div>

                    <div>
                        <label className="form-label">Pincode</label>
                        <input type="number" name="pincode" onChange={handleChange} className="input-field" />
                    </div>

                    <div>
                        <label className="form-label">Contact No.</label>
                        <input type="number" name="contactNo" onChange={handleChange} className="input-field" />
                    </div>

                    <div>
                        <label className="form-label">WhatsApp No.</label>
                        <input type="number" name="whatsappNo" onChange={handleChange} className="input-field" />
                    </div>

                    <div>
                        <label className="form-label">Maritial Status</label>
                        <select name="maritalStatus" onChange={handleChange} className="input-field" >
                            <option value="">Select</option>
                            <option value="married">Married</option>
                            <option value="unmarried">Unmarried</option>
                        </select>
                    </div>

                    <div>
                        <label className="form-label">Date of Marriage</label>
                        <input type="date" name="marriageDate" onChange={handleChange} className="input-field" />
                    </div>

                    <div>
                        <label className="form-label">Email ID</label>
                        <input type="email" name="email" onChange={handleChange} className="input-field" />
                    </div>

                    <div>
                        <label className="form-label">Education</label>
                        <input type="text" name="education" onChange={handleChange} className="input-field" />
                    </div>

                    <div>
                        <label className="form-label">Occupation</label>
                        <select name="occupation" onChange={handleChange} className="input-field" >
                            <option value="">Select</option>
                            <option value="job">Job</option>
                            <option value="business">Business</option>
                        </select>
                    </div>

                    <div>
                        <label className="form-label">Name of the Company</label>
                        <input type="text" name="companyName" onChange={handleChange} className="input-field" />
                    </div>

                    <div>
                        <label className="form-label">Designation</label>
                        <input type="text" name="designation" onChange={handleChange} className="input-field" />
                    </div>

                    <div>
                        <label className="form-label">Monthly Income in Rs.</label>
                        <input type="number" name="monthlyIncome" onChange={handleChange} className="input-field" />
                    </div>

                    <div>
                        <label className="form-label">Upload Photo</label>
                        <input type="file" name="passportPhoto" onChange={handleChange} className="input-field" accept="image/*" />
                    </div>

                    <div className="md:col-span-2">
                        <label className="form-label">Ways to Help Darji Samaj</label>
                        <textarea name="helpDarjiSamaj" onChange={handleChange} className="input-field"></textarea>
                    </div>
                </div>

                <button type="submit" className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default UserForm;
