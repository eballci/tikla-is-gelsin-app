import {Offer} from "../model";
import axios from "axios";
import {apiUrl} from "../../environment/environment";

export const removeOffer = async (offer: Offer): Promise<boolean> => {
    try {
        const response = await axios.delete(
            `${apiUrl}/offer/${offer.id}`
        );

        return response.status === 200;
    } catch (exception) {
        return false;
    }
};

export const acceptOffer = async (offer: Offer): Promise<boolean> => {
    try {
        const response = await axios.get(
            `${apiUrl}/offer/accept/${offer.id}`
        );

        return response.status === 200;
    } catch (exception) {
        return false;
    }
};

export const refuseOffer = async (offer: Offer): Promise<boolean> => {
    try {
        const response = await axios.get(
            `${apiUrl}/offer/refuse/${offer.id}`
        );

        return response.status === 200;
    } catch (exception) {
        return false;
    }
};

export const readAllOffers = async (seekerId: number): Promise<boolean> => {
    try {
        const response = await axios.get(
            `${apiUrl}/offer/read/${seekerId}`
        );

        return response.status === 200;
    } catch (exception) {
        return false;
    }
};