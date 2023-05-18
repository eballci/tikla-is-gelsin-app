import {Language} from "../model";
import axios from "axios";
import {language} from "ionicons/icons";

export const createLanguage = async (seekerId: number, language: Language): Promise<boolean> => {
    try {
        const response = await axios.post(
            "http://localhost:8080/language/",
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
            "http://localhost:8080/language/",
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
            `http://localhost:8080/language/${language.id}`
        );
        return response.status === 200;
    } catch (exception) {
        return false;
    }
};