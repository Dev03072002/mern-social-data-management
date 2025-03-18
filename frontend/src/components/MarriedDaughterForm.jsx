import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const MarriedDaughterForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
            name: "",
            middleName: "",
            surname: "",
            sex: "",
            birthday: "",
            bloodGroup: "",
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
            darjiGod: "",
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

            formDataToSend.append("mainMemberId", id);

            const response =  await axios.post(`${API_BASE_URL}/api/family/add-daughter-detail`, formDataToSend, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            if (response.data.success) {
                alert("Daughter details added successfully!");
                navigate(`/add-daughter-family-member/${response.data.userId}`);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to add details.");
        }
    };

    const handleNextForm = () => {
        navigate(`/home`);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-white p-6">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded-lg p-8 w-full max-w-3xl border border-blue-300"
            >
                <h2 className="text-2xl font-semibold mb-6 text-center text-blue-700">
                    Married Daughter Detail Form
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <div>
                        <label className="form-label">First Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} className="input-field" required />
                    </div>

                    <div>
                        <label className="form-label">Middle Name</label>
                        <input type="text" name="middleName" value={formData.middleName} onChange={handleChange} className="input-field" />
                    </div>

                    <div>
                        <label className="form-label">Surname</label>
                        <input type="text" name="surname" value={formData.surname} onChange={handleChange} className="input-field" required />
                    </div>

                    <div>
                        <label className="form-label">Sex</label>
                        <select name="sex" value={formData.sex} onChange={handleChange} className="input-field" required>
                            <option value="female">Female</option>
                        </select>
                    </div>

                    <div>
                        <label className="form-label">Birthday</label>
                        <input type="date" name="birthday" value={formData.birthday} onChange={handleChange} className="input-field" required />
                    </div>

                    <div>
                        <label className="form-label">Blood Group</label>
                        <input type="text" name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} className="input-field" />
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
                        <input type="number" name="contactNo" value={formData.contactNo} onChange={handleChange} className="input-field" />
                    </div>

                    <div>
                        <label className="form-label">WhatsApp No.</label>
                        <input type="number" name="whatsappNo" value={formData.whatsappNo} onChange={handleChange} className="input-field" />
                    </div>

                    <div>
                        <label className="form-label">Maritial Status</label>
                        <select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} className="input-field" >
                            <option value="">Select</option>
                            <option value="married">Married</option>
                            <option value="widow">Widow</option>
                            <option value="divorce">Divorce</option>
                        </select>
                    </div>

                    <div>
                        <label className="form-label">Date of Marriage</label>
                        <input type="date" name="marriageDate" value={formData.marriageDate} onChange={handleChange} className="input-field" />
                    </div>

                    <div>
                        <label className="form-label">Darji God</label>
                        <input type="date" name="darjiGod" value={formData.darjiGod} onChange={handleChange} className="input-field" />
                    </div>

                    <div>
                        <label className="form-label">Education</label>
                        <input type="text" name="education" value={formData.education} onChange={handleChange} className="input-field" />
                    </div>

                    <div>
                        <label className="form-label">Occupation</label>
                        <select name="occupation" value={formData.occupation} onChange={handleChange} className="input-field" >
                            <option value="">Select</option>
                            <option value="job">Job</option>
                            <option value="business">Business</option>
                        </select>
                    </div>

                    <div>
                        <label className="form-label">Name of the Company</label>
                        <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} className="input-field" />
                    </div>

                    <div>
                        <label className="form-label">Designation</label>
                        <input type="text" name="designation" value={formData.designation} onChange={handleChange} className="input-field" />
                    </div>

                    <div>
                        <label className="form-label">Monthly Income in Rs.</label>
                        <input type="number" name="monthlyIncome" value={formData.monthlyIncome} onChange={handleChange} className="input-field" />
                    </div>

                    <div>
                        <label className="form-label">Upload Photo</label>
                        <input type="file" name="passportPhoto" onChange={handleChange} className="input-field" accept="image/*" />
                    </div>

                    <div className="md:col-span-2">
                        <label className="form-label">Ways to Help Darji Samaj</label>
                        <textarea name="helpDarjiSamaj" value={formData.helpDarjiSamaj} onChange={handleChange} className="input-field"></textarea>
                    </div>
                </div>

                <button type="submit" className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg">
                    Submit
                </button>

                <button 
                    type="button"
                    onClick={handleNextForm}
                    className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
                >
                    Go to Home page
                </button>
            </form>
        </div>
    );
};

export default MarriedDaughterForm;
