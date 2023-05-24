import {Employer, Position, VisitEmployer, VisitSeeker} from "../model";
import axios from "axios";
import {getPosition} from "./position.service";
import {toOfferSuggestionStatus} from "./utils";
import {visitSeeker} from "./seeker.service";
import {apiUrl} from "../../environment/environment";

export const visitEmployer = async (id: number): Promise<VisitEmployer> => {
    try {
        const response = await axios.get(`${apiUrl}/employer/${id}`);
        const data = response.data;

        return {
            id: data.id,
            avatar: data.avatar,
            name: data.name,
            description: data.description,
            webSite: data.webSite,
            scale: data.scale
        };

    } catch (exception) {
        throw new Error("The requested employer couldn't found");
    }
};

export const getEmployer = async (id: number): Promise<Employer> => {
    try {
        const response = await axios.get(`${apiUrl}/employer/me/${id}`);
        const data = response.data;
        const requestedPositions: Array<Position> = [];
        const requestedSeekers: Array<VisitSeeker> = [];
        const requestedPositionIds = new Set([
            ...data.openPositions.map((position: any) => position.id)
        ]);
        const requestedSeekerIds = new Set([
            ...data.submissions.map((submission: any) => submission.seekerId),
            ...data.offers.map((offer: any) => offer.seekerId),
            ...data.suggestions.map((suggestion: any) => suggestion.seekerId),
        ]);

        for (let id of requestedPositionIds) {
            requestedPositions.push(await getPosition(id));
        }

        for (let id of requestedSeekerIds) {
            requestedSeekers.push(await visitSeeker(id));
        }

        return {
            id: data.id,
            avatar: data.avatar,
            name: data.name,
            description: data.description,
            email: data.email,
            webSite: data.webSite,
            scale: data.scale,
            openPositions: requestedPositions,
            submissions: [
                ...data.submissions.map((submission: any) => ({
                    id: submission.id,
                    seeker: requestedSeekers.filter(s => s.id === submission.seekerId)[0],
                    position: requestedPositions.filter(p => p.id === submission.positionId)[0],
                    status: toOfferSuggestionStatus(submission.status),
                    createdAt: new Date(submission.createdAt)
                }))
            ],
            offers: [
                ...data.offers.map((offer: any) => ({
                    id: offer.id,
                    seeker: requestedSeekers.filter(s => s.id === offer.seekerId)[0],
                    position: requestedPositions.filter(p => p.id === offer.positionId)[0],
                    status: toOfferSuggestionStatus(offer.status),
                    createdAt: new Date(offer.createdAt)
                }))
            ],
            suggestions: [
                ...data.suggestions.map((suggestion: any) => ({
                    id: suggestion.id,
                    seeker: requestedSeekers.filter(s => s.id === suggestion.seekerId)[0],
                    position: requestedPositions.filter(p => p.id === suggestion.positionId)[0],
                    matchRate: suggestion.matchRate,
                    createdAt: new Date(suggestion.createdAt)
                }))
            ]

        };
    } catch (exception) {
        throw new Error("The requested employer couldn't found");
    }
};

export const updateEmployer = async (employer: Employer): Promise<boolean> => {
    try {
        const response = await axios.patch(
            `${apiUrl}/employer/`,
            employer
        );
        return response.status === 200;
    } catch (exception) {
        return false;
    }
};

export const loginEmployer = async (email: string, password: string): Promise<number> => {
    try {
        const response = await axios.post(
            `${apiUrl}/employer/login`,
            {email, password}
        );
        const data = response.data;

        return parseInt(data);
    } catch (exception) {
        return 0;
    }
}

export const registerEmployer = async (
    email: string, password: string, name: string,
): Promise<boolean> => {
    try {
        const response = await axios.post(
            `${apiUrl}/employer/`,
            {email, password, name}
        );

        return response.status === 201;
    } catch (exception) {
        return false;
    }
}