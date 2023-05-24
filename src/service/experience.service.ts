import {Experience} from "../model";
import axios from "axios";
import {apiUrl} from "../../environment/environment";

export const createExperience = async (seekerId: number, experience: Experience): Promise<boolean> => {
    try {
        const response = await axios.post(
            `${apiUrl}/experience/`,
            {
                ...experience,
                seekerId
            }
        );
        return response.status === 201;
    } catch (exception) {
        return false;
    }
};

export const updateExperience = async (experience: Experience): Promise<boolean> => {
    try {
        const response = await axios.patch(
            `${apiUrl}/experience/`,
            experience
        );
        return response.status === 200;
    } catch (exception) {
        return false;
    }
};

export const removeExperience = async (experience: Experience): Promise<boolean> => {
    try {
        const response = await axios.delete(
            `${apiUrl}/experience/${experience.id}`
        );

        return response.status === 200;
    } catch (exception) {
        return false;
    }
};