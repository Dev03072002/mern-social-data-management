import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import FamilyMemberForm from "./FamilyMemberForm";

const EditFamilyMember = () => {
    const { id } = useParams();
    const [memberData, setMemberData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        const fetchFamilyMemberData = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/family/${id}`);
                setMemberData(response.data);
            } catch (error) {
                console.error("Error fetching family member data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchFamilyMemberData();
    }, [id]);

    if (loading) {
        return <p className="text-center text-gray-700">Loading...</p>;
    }

    return (
        <div>
            <FamilyMemberForm initialData={memberData} familyMemberId={id} />
        </div>
    );
};

export default EditFamilyMember;
