import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const MarriedDaughterFamilyForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        relation: "", 
        name: "", 
        middleName: "", 
        surname: "", 
        sex: "", 
        birthday: "", 
        bloodGroup: "", 
        contactNo: "",
        maritalStatus: "", 
        marriageDate:"", 
        education: "", 
        occupation: "", 
        companyName: "", 
        designation: "",
        monthlyIncome: "", 
        passportPhoto: null,
        helpDarjiSamaj: ""
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

            formDataToSend.append("daughterId", id);

            await axios.post(`${API_BASE_URL}/api/family/add-daughter-family-member`, formDataToSend, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            alert("Family member added successfully!");

            setFormData({
                relation: "", 
                name: "", 
                middleName: "", 
                surname: "", 
                sex: "", 
                birthday: "", 
                bloodGroup: "", 
                contactNo: "",
                maritalStatus: "", 
                marriageDate:"", 
                education: "", 
                occupation: "", 
                companyName: "", 
                designation: "",
                monthlyIncome: "", 
                passportPhoto: null,
                helpDarjiSamaj: ""
            });
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to add family member.");
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
                    Add Daughter Family Member Form
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="form-label">Relation</label>
                        <select name="relation" value={formData.relation} onChange={handleChange} className="input-field" required >
                            <option value="">Select</option>
                            <option value="Son In Law">Son in Law</option>
                            <option value="Son">Son</option>
                            <option value="Daughter">Daughter</option>
                            <option value="Grand Son">Grand Son</option>
                            <option value="Grand Daughter">Grand Daughter</option>
                        </select>
                    </div>

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
                            <option value="">Select</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>

                    <div>
                        <label className="form-label">Birthday</label>
                        <input type="date" name="birthday" value={formData.birthday} onChange={handleChange} className="input-field" required />
                    </div>

                    <div>
                        <label className="form-label">Blood Group</label>
                        <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} className="input-field" >
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
                            <option value="Married">Married</option>
                            <option value="Unmarried">Unmarried</option>
                            <option value="Ready For Marriage">Ready for marriage</option>
                            <option value="Widow">Widow</option>
                            <option value="Divorce">Divorce</option>
                            <option value="Widower">Widower</option>
                        </select>
                    </div>

                    <div>
                        <label className="form-label">Date of Marriage</label>
                        <input type="date" name="marriageDate" value={formData.marriageDate} onChange={handleChange} className="input-field" />
                    </div>

                    <div>
                        <label className="form-label">Education</label>
                        <input type="text" name="education" value={formData.education} onChange={handleChange} className="input-field" />
                    </div>

                    <div>
                        <label className="form-label">Occupation</label>
                        <select name="occupation" value={formData.occupation} onChange={handleChange} className="input-field" >
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
                            <option value="House Wife">House Wife</option>
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
                        <label className="form-label">Monthly Income in INR (In Lacs)</label>
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
                    Go to Home Page
                </button>
            </form>
        </div>
    );
};

export default MarriedDaughterFamilyForm;
