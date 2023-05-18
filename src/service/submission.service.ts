import {Submission} from "../model";
import axios from "axios";

export const removeOffer = async (submission: Submission): Promise<boolean> => {
    try {
        const response = await axios.delete(
            `http://localhost:8080/submission/${submission.id}`
        );

        return response.status === 200;
    } catch (exception) {
        return false;
    }
};

export const acceptOffer = async (submission: Submission): Promise<boolean> => {
    try {
        const response = await axios.get(
            `http://localhost:8080/submission/accept/${submission.id}`
        );

        return response.status === 200;
    } catch (exception) {
        return false;
    }
};

export const refuseOffer = async (submission: Submission): Promise<boolean> => {
    try {
        const response = await axios.get(
            `http://localhost:8080/submission/refuse/${submission.id}`
        );

        return response.status === 200;
    } catch (exception) {
        return false;
    }
};

export const readAllOffers = async (employerId: number): Promise<boolean> => {
    try {
        const response = await axios.get(
            `http://localhost:8080/submission/read/${employerId}`
        );

        return response.status === 200;
    } catch (exception) {
        return false;
    }
};