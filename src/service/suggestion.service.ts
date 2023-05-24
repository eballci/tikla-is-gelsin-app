import axios from "axios";
import {PositionSuggestion, SeekerSuggestion} from "../model";
import {apiUrl} from "../../environment/environment";

export const ignoreSuggestion = async (suggestion: PositionSuggestion | SeekerSuggestion): Promise<boolean> => {
    try {
        const response = await axios.get(
            `${apiUrl}/suggestion/ignore/${suggestion.id}`
        );

        return response.status === 200;
    } catch (exception) {
        return false;
    }
};

export const offerSuggestion = async (suggestion: SeekerSuggestion): Promise<boolean> => {
    try {
        const response = await axios.get(
            `${apiUrl}/suggestion/offer/${suggestion.id}`
        );

        return response.status === 200;
    } catch (exception) {
        return false;
    }
};

export const submitSuggestion = async (suggestion: PositionSuggestion): Promise<boolean> => {
    try {
        const response = await axios.get(
            `${apiUrl}/suggestion/submit/${suggestion.id}`
        );

        return response.status === 200;
    } catch (exception) {
        return false;
    }
};