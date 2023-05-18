import {Experience} from "../model";
import axios from "axios";

export const createExperience = async (seekerId: number, experience: Experience): Promise<boolean> => {
    try {
        const response = await axios.post(
            "http://localhost:8080/experience/",
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