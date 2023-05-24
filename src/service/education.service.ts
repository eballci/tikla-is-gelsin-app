import {Education} from "../model";
import axios from "axios";
import {apiUrl} from "../../environment/environment";

export const createEducation = async (seekerId: number, education: Education): Promise<boolean> => {
    try {
        const response = await axios.post(
            `${apiUrl}/education/`,
            {
                ...education,
                seekerId,
                gpa: education.GPA
            }
        );

        return response.status === 201;
    } catch (exception) {
        return false;
    }
};

export const updateEducation = async (education: Education): Promise<boolean> => {
    try {
        const response = await axios.patch(
            `${apiUrl}/education/`,
            {
                ...education,
                gpa: education.GPA
            }
        );

        return response.status === 200;
    } catch (exception) {
        return false;
    }
};

export const removeEducation = async (education: Education): Promise<boolean> => {
    try {
        const response = await axios.delete(
            `${apiUrl}/education/${education.id}`
        );

        return response.status === 200;
    } catch (exception) {
        return false;
    }
};