import {Submission} from "../model";
import axios from "axios";
import {apiUrl} from "../../environment/environment";

export const removeSubmission = async (submission: Submission): Promise<boolean> => {
    try {
        const response = await axios.delete(
            `${apiUrl}/submission/${submission.id}`
        );

        return response.status === 200;
    } catch (exception) {
        return false;
    }
};

export const acceptSubmission = async (submission: Submission): Promise<boolean> => {
    try {
        const response = await axios.get(
            `${apiUrl}/submission/accept/${submission.id}`
        );

        return response.status === 200;
    } catch (exception) {
        return false;
    }
};

export const refuseSubmission = async (submission: Submission): Promise<boolean> => {
    try {
        const response = await axios.get(
            `${apiUrl}/submission/refuse/${submission.id}`
        );

        return response.status === 200;
    } catch (exception) {
        return false;
    }
};

export const readAllSubmissions = async (employerId: number): Promise<boolean> => {
    try {
        const response = await axios.get(
            `${apiUrl}/submission/read/${employerId}`
        );

        return response.status === 200;
    } catch (exception) {
        return false;
    }
};