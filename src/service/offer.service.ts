import {Offer} from "../model";
import axios from "axios";

export const removeOffer = async (offer: Offer): Promise<boolean> => {
    try {
        const response = await axios.delete(
            `http://localhost:8080/offer/${offer.id}`
        );

        return response.status === 200;
    } catch (exception) {
        return false;
    }
};

export const acceptOffer = async (offer: Offer): Promise<boolean> => {
    try {
        const response = await axios.get(
            `http://localhost:8080/offer/accept/${offer.id}`
        );

        return response.status === 200;
    } catch (exception) {
        return false;
    }
};

export const refuseOffer = async (offer: Offer): Promise<boolean> => {
    try {
        const response = await axios.get(
            `http://localhost:8080/offer/refuse/${offer.id}`
        );

        return response.status === 200;
    } catch (exception) {
        return false;
    }
};

export const readAllOffers = async (seekerId: number): Promise<boolean> => {
    try {
        const response = await axios.get(
            `http://localhost:8080/offer/read/${seekerId}`
        );

        return response.status === 200;
    } catch (exception) {
        return false;
    }
};