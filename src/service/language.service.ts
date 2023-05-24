import {Language} from "../model";
import axios from "axios";
import {apiUrl} from "../../environment/environment";

export const createLanguage = async (seekerId: number, language: Language): Promise<boolean> => {
    try {
        const response = await axios.post(
            `${apiUrl}/language/`,
            {
                ...language,
                seekerId
            }
        );
        return response.status === 201;
    } catch (exception) {
        return false;
    }
};

export const updateLanguage = async (language: Language): Promise<boolean> => {
    try {
        const response = await axios.patch(
            `${apiUrl}/language/`,
            language
        );
        return response.status === 200;
    } catch (exception) {
        return false;
    }
};

export const removeLanguage = async (language: Language): Promise<boolean> => {
    try {
        const response = await axios.delete(
            `${apiUrl}/language/${language.id}`
        );
        return response.status === 200;
    } catch (exception) {
        return false;
    }
};