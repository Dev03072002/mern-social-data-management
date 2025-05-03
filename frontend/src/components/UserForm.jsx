import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./UserForm.css";

const RequiredAsterisk = () => <span className="text-red-500 ml-1">*</span>;

const UserForm = ({ initialData = null, userId = null }) => {
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
        helpDarjiSamaj: "",
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                ...initialData,
                birthday: initialData.birthday ? initialData.birthday.split("T")[0] : "",
                marriageDate: initialData.marriageDate ? initialData.marriageDate.split("T")[0] : "",
                houseNo: initialData.address?.houseNo || "",
                society: initialData.address?.society || "",
                landmark: initialData.address?.landmark || "",
                area: initialData.address?.area || "",
                taluka: initialData.address?.taluka || "",
                district: initialData.address?.district || "",
                pincode: initialData.address?.pincode || "",
            });
        }
    }, [initialData]);

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
            const fieldsToSanitize = ["birthday", "marriageDate", "monthlyIncome", "totalMembers"];
            const address = {
                houseNo: formData.houseNo || "",
                society: formData.society || "",
                landmark: formData.landmark || "",
                area: formData.area || "",
                taluka: formData.taluka || "",
                district: formData.district || "",
                pincode: formData.pincode || "",
            };

             // Remove address fields from formData
            ["houseNo", "society", "landmark", "area", "taluka", "district", "pincode"].forEach(key => delete formData[key]);
            formDataToSend.set("address", JSON.stringify(address));

            Object.keys(formData).forEach((key) => {
                let value = formData[key];

                // Sanitize specific fields
                if (fieldsToSanitize.includes(key) && (value === "null" || value === null)) {
                    value = "";
                }

                if (key === "houseNo" || key === "society" || key === "landmark" || key === "area" || key === "taluka" || key === "district" || key === "pincode" || key === "address") {
                    return;
                }

                formDataToSend.append(key, value);
            });

            let response;
            if (userId) {
                response = await axios.put(`${API_BASE_URL}/api/users/${userId}`, formDataToSend, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            } else {
                response = await axios.post(`${API_BASE_URL}/api/users/register`, formDataToSend, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            }

            if (response.data.success) {
                alert(userId ? "User updated successfully!" : "Main family member added successfully!");
                navigate(userId ? `/user-list` : `/add-family-member/${response.data.userId}`);
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
                        <label className="form-label">First Name <RequiredAsterisk /> </label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} className="input-field" required />
                    </div>

                    <div>
                        <label className="form-label">Middle Name <RequiredAsterisk /> </label>
                        <input type="text" name="middleName" value={formData.middleName} onChange={handleChange} className="input-field" required />
                    </div>

                    <div>
                        <label className="form-label">Surname <RequiredAsterisk /> </label>
                        <input type="text" name="surname" value={formData.surname} onChange={handleChange} className="input-field" required />
                    </div>

                    <div>
                        <label className="form-label">Sex <RequiredAsterisk /> </label>
                        <select name="sex"  value={formData.sex} onChange={handleChange} className="input-field" required>
                            <option value="">Select</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>

                    <div>
                        <label className="form-label">Birthday <RequiredAsterisk /> </label>
                        <input type="date" name="birthday"  value={formData.birthday} onChange={handleChange} className="input-field" required />
                    </div>

                    <div>
                        <label className="form-label">Blood Group <RequiredAsterisk /> </label>
                        <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} className="input-field" required>
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
                        <label className="form-label">Native Place <RequiredAsterisk /> </label>
                        <input type="text" name="nativePlace"  value={formData.nativePlace} onChange={handleChange} className="input-field" required/>
                    </div>

                    <div>
                        <label className="form-label">Total Family Members <RequiredAsterisk /> </label>
                        <input type="number" name="totalMembers"  value={formData.totalMembers} onChange={handleChange} className="input-field" required/>
                    </div>

                    <div>
                        <label className="form-label">House No. <RequiredAsterisk /> </label>
                        <input type="text" name="houseNo"  value={formData.houseNo} onChange={handleChange} className="input-field" required/>
                    </div>

                    <div>
                        <label className="form-label">Society/Faliya Name <RequiredAsterisk /> </label>
                        <input type="text" name="society"  value={formData.society} onChange={handleChange} className="input-field" required/>
                    </div>

                    <div>
                        <label className="form-label">Landmark <RequiredAsterisk /> </label>
                        <input type="text" name="landmark"  value={formData.landmark} onChange={handleChange} className="input-field" required/>
                    </div>

                    <div>
                        <label className="form-label">Area <RequiredAsterisk /> </label>
                        <input type="text" name="area"  value={formData.area} onChange={handleChange} className="input-field" required/>
                    </div>

                    <div>
                        <label className="form-label">Taluka</label>
                        <input type="text" name="taluka"  value={formData.taluka} onChange={handleChange} className="input-field" />
                    </div>

                    <div>
                        <label className="form-label">District <RequiredAsterisk /> </label>
                        <input type="text" name="district"  value={formData.district} onChange={handleChange} className="input-field" required/>
                    </div>

                    <div>
                        <label className="form-label">Pincode <RequiredAsterisk /> </label>
                        <input type="number" name="pincode"  value={formData.pincode} onChange={handleChange} className="input-field" required/>
                    </div>

                    <div>
                        <label className="form-label">Contact No. <RequiredAsterisk /> </label>
                        <input type="number" name="contactNo"  value={formData.contactNo} onChange={handleChange} className="input-field" required/>
                    </div>

                    <div>
                        <label className="form-label">WhatsApp No.</label>
                        <input type="number" name="whatsappNo"  value={formData.whatsappNo} onChange={handleChange} className="input-field" />
                    </div>

                    <div>
                        <label className="form-label">Maritial Status <RequiredAsterisk /> </label>
                        <select name="maritalStatus"  value={formData.maritalStatus} onChange={handleChange} className="input-field" required>
                            <option value="">Select</option>
                            <option value="Married">Married</option>
                            <option value="Unmarried">Unmarried</option>
                        </select>
                    </div>

                    <div>
                        <label className="form-label">Date of Marriage</label>
                        <input type="date" name="marriageDate"  value={formData.marriageDate} onChange={handleChange} className="input-field" />
                    </div>

                    <div>
                        <label className="form-label">Email ID <RequiredAsterisk /> </label>
                        <input type="email" name="email"  value={formData.email} onChange={handleChange} className="input-field" required/>
                    </div>

                    <div>
                        <label className="form-label">Education <RequiredAsterisk /> </label>
                        <input type="text" name="education"  value={formData.education} onChange={handleChange} className="input-field" required/>
                    </div>

                    <div>
                        <label className="form-label">Occupation <RequiredAsterisk /> </label>
                        <select name="occupation"  value={formData.occupation} onChange={handleChange} className="input-field" required>
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
                            <option value="Student">Student</option>
                        </select>
                    </div>

                    <div>
                        <label className="form-label">Name of the Company</label>
                        <input type="text" name="companyName"  value={formData.companyName} onChange={handleChange} className="input-field" />
                    </div>

                    <div>
                        <label className="form-label">Designation</label>
                        <input type="text" name="designation"  value={formData.designation} onChange={handleChange} className="input-field" />
                    </div>

                    <div>
                        <label className="form-label">Monthly Income in INR (In Lacs)</label>
                        <input type="number" name="monthlyIncome"  value={formData.monthlyIncome} onChange={handleChange} className="input-field" />
                    </div>

                    <div>
                        <label className="form-label">Upload Photo <RequiredAsterisk /> </label>
                        {formData.passportPhoto && typeof formData.passportPhoto === "string" ? (
                            <img 
                                src={`data:image/png;base64,${formData.passportPhoto}`} 
                                alt="Current Passport" 
                                className="w-24 h-24 border border-gray-300"
                            />
                        ) : null}
                        <input type="file" name="passportPhoto" onChange={handleChange} className="input-field" accept="image/*" />
                    </div>

                    <div className="md:col-span-2">
                        <label className="form-label">Ways to Help Darji Samaj <RequiredAsterisk /> </label>
                        <textarea name="helpDarjiSamaj"  value={formData.helpDarjiSamaj} onChange={handleChange} className="input-field" required></textarea>
                    </div>
                </div>

                <button type="submit" className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg">
                    {userId ? "Update" : "Submit"}
                </button>
            </form>
        </div>
    );
};

export default UserForm;
