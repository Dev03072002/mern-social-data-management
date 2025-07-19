import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const RequiredAsterisk = () => <span className="text-red-500 ml-1">*</span>;

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
            yearlyIncome: "",
            passportPhoto: null,
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
                navigate(`/add-daughter-family-member/${response.data.marriedDaughterId}`);
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
                        <label className="form-label">First Name <RequiredAsterisk /> </label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} className="input-field" required />
                    </div>

                    <div>
                        <label className="form-label">Middle Name <RequiredAsterisk /> </label>
                        <input type="text" name="middleName" value={formData.middleName} onChange={handleChange} className="input-field" required/>
                    </div>

                    <div>
                        <label className="form-label">Surname <RequiredAsterisk /> </label>
                        <input type="text" name="surname" value={formData.surname} onChange={handleChange} className="input-field" required />
                    </div>

                    <div>
                        <label className="form-label">Sex <RequiredAsterisk /> </label>
                        <select name="sex" value={formData.sex} onChange={handleChange} className="input-field" required>
                            <option value="Female">Female</option>
                        </select>
                    </div>

                    <div>
                        <label className="form-label">Birthday <RequiredAsterisk /> </label>
                        <input type="date" name="birthday" value={formData.birthday} onChange={handleChange} className="input-field" required />
                    </div>

                    <div>
                        <label className="form-label">Blood Group </label>
                        <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} className="input-field">
                            <option value="">Select</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                        </select>
                    </div>

                    <div>
                        <label className="form-label">House No. <RequiredAsterisk /> </label>
                        <input type="text" name="houseNo" onChange={handleChange} className="input-field" required/>
                    </div>

                    <div>
                        <label className="form-label">Society/Faliya Name <RequiredAsterisk /> </label>
                        <input type="text" name="society" onChange={handleChange} className="input-field" required/>
                    </div>

                    <div>
                        <label className="form-label">Landmark <RequiredAsterisk /> </label>
                        <input type="text" name="landmark" onChange={handleChange} className="input-field" required/>
                    </div>

                    <div>
                        <label className="form-label">Taluka</label>
                        <input type="text" name="taluka" onChange={handleChange} className="input-field" />
                    </div>

                    <div>
                        <label className="form-label">District <RequiredAsterisk /> </label>
                        <input type="text" name="district" onChange={handleChange} className="input-field" required/>
                    </div>

                    <div>
                        <label className="form-label">Pincode <RequiredAsterisk /> </label>
                        <input type="number" name="pincode" onChange={handleChange} className="input-field" required/>
                    </div>

                    <div>
                        <label className="form-label">Contact No. <RequiredAsterisk /> </label>
                        <input type="number" name="contactNo" value={formData.contactNo} onChange={handleChange} className="input-field" required/>
                    </div>

                    <div>
                        <label className="form-label">WhatsApp No.</label>
                        <input type="number" name="whatsappNo" value={formData.whatsappNo} onChange={handleChange} className="input-field" />
                    </div>

                    <div>
                        <label className="form-label">Maritial Status <RequiredAsterisk /> </label>
                        <select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} className="input-field" required>
                            <option value="">Select</option>
                            <option value="Married">Married</option>
                            <option value="Widow">Widow</option>
                            <option value="Divorce">Divorce</option>
                        </select>
                    </div>

                    <div>
                        <label className="form-label">Date of Marriage <RequiredAsterisk /> </label>
                        <input type="date" name="marriageDate" value={formData.marriageDate} onChange={handleChange} className="input-field" required/>
                    </div>

                    <div>
                        <label className="form-label">Darji God <RequiredAsterisk /> </label>
                        <input type="text" name="darjiGod" value={formData.darjiGod} onChange={handleChange} className="input-field" required/>
                    </div>

                    <div>
                        <label className="form-label">Education <RequiredAsterisk /> </label>
                        <input type="text" name="education" value={formData.education} onChange={handleChange} className="input-field" required/>
                    </div>

                    <div>
                        <label className="form-label">Occupation <RequiredAsterisk /> </label>
                        <select name="occupation" value={formData.occupation} onChange={handleChange} className="input-field" required>
                            <option value="">Select</option>
                            <option value="Business">Business</option>
                            <option value="Healthcare">Healthcare</option>
                            <option value="Finance">Finance</option>
                            <option value="It & Software Development">It & Software Development</option>
                            <option value="Engineering">Engineering</option>
                            <option value="Education & Research">Education & Research</option>
                            <option value="Government & Public Services">Government & Public Services</option>
                            <option value="Legal & Law Enforcement">Legal & Law Enforcement</option>
                            <option value="Sales & Marketing">Sales & Marketing</option>
                            <option value="Manufacturing & Trades">Manufacturing & Trades</option>
                            <option value="Entrepreneur">Entrepreneur</option>
                            <option value="Freelancer">Freelancer</option>
                            <option value="Media - Journalist">Media - Journalist</option>
                            <option value="Tailoring">Tailoring</option>
                            <option value="Salaried">Salaried</option>
                            <option value="House Wife">House Wife</option>
                            <option value="Student">Student</option>
                            <option value="CA">CA</option>
                            <option value="Retired">Retired</option>
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
                        <label className="form-label">Yearly Income in INR (In Lacs)</label>
                        <input type="number" name="yearlyIncome" value={formData.yearlyIncome} onChange={handleChange} className="input-field" />
                    </div>

                    <div>
                        <label className="form-label">Upload Photo <RequiredAsterisk /> </label>
                        <input type="file" name="passportPhoto" onChange={handleChange} className="input-field" accept="image/*" />
                    </div>

                    <div className="md:col-span-2">
                        <label className="form-label">Ways to Help Darji Samaj <RequiredAsterisk /> </label>
                        <textarea name="helpDarjiSamaj" value={formData.helpDarjiSamaj} onChange={handleChange} className="input-field" required></textarea>
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
