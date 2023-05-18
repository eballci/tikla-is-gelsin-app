import {Education} from "../model";
import axios from "axios";

export const createEducation = async (seekerId: number, education: Education): Promise<boolean> => {
    try {
        const response = await axios.post(
            "http://localhost:8080/education/",
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