import {Language} from "../model";
import axios from "axios";

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