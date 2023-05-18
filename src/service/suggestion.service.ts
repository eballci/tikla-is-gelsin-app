import axios from "axios";
import {PositionSuggestion, SeekerSuggestion} from "../model";

export const ignoreSuggestion = async (suggestion: PositionSuggestion | SeekerSuggestion): Promise<boolean> => {
    try {
        const response = await axios.get(
            `http://localhost:8080/suggestion/ignore/${suggestion.id}`
        );

        return response.status === 200;
    } catch (exception) {
        return false;
    }
};

export const offerSuggestion = async (suggestion: SeekerSuggestion): Promise<boolean> => {
    try {
        const response = await axios.get(
            `http://localhost:8080/suggestion/offer/${suggestion.id}`
        );

        return response.status === 200;
    } catch (exception) {
        return false;
    }
};

export const submitSuggestion = async (suggestion: PositionSuggestion): Promise<boolean> => {
    try {
        const response = await axios.get(
            `http://localhost:8080/suggestion/submit/${suggestion.id}`
        );

        return response.status === 200;
    } catch (exception) {
        return false;
    }
};