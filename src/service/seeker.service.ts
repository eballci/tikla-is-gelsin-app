import {Position, Seeker, VisitSeeker} from "../model";
import axios from "axios";
import {toEducationLevel, toLanguageLevel, toOfferSuggestionStatus} from "./utils";
import {getPosition} from "./position.service";

export const visitSeeker = async (id: number): Promise<VisitSeeker> => {
    try {
        const response = await axios.get(
            `http://localhost:8080/seeker/${id}`
        );
        const data = response.data;

        return {
            id: data.id,
            name: data.name,
            surname: data.surname,
            email: data.email,
            avatar: data.avatar,
            biography: data.biography,
            languages: [
                ...data.languages.map((language: any) => ({
                    id: language.id,
                    language: language.language,
                    level: toLanguageLevel(language.level)
                }))
            ],
            experiences: [
                ...data.experiences.map((experience: any) => ({
                    id: experience.id,
                    company: experience.company,
                    department: experience.department,
                    position: experience.position,
                    description: experience.description,
                    start: new Date(experience.start),
                    end: new Date(experience.end)
                }))
            ],
            educations: [
                ...data.educations.map((education: any) => ({
                    id: education.id,
                    study: education.study,
                    institution: education.institution,
                    description: education.description,
                    GPA: education.gpa,
                    start: new Date(education.start),
                    end: new Date(education.end),
                    educationLevel: toEducationLevel(education.educationLevel)
                }))
            ]
        };

    } catch (exception) {
        throw new Error("The requested seeker couldn't found");
    }
};

export const getSeeker = async (id: number): Promise<Seeker> => {
    try {
        const response = await axios.get(
            `http://localhost:8080/seeker/me/${id}`
        );
        const data = response.data;
        const requestedPositionIds = new Set([
            ...data.submissions.map((submission: any) => submission.positionId),
            ...data.offers.map((offer: any) => offer.positionId),
            ...data.suggestions.map((suggestion: any) => suggestion.positionId),
        ]);
        const requestedPositions: Array<Position> = [];

        for (let id of requestedPositionIds) {
            requestedPositions.push(await getPosition(id));
        }

        return {
            id: data.id,
            name: data.name,
            surname: data.surname,
            email: data.email,
            avatar: data.avatar,
            biography: data.biography,
            birth: new Date(data.birth),
            languages: [
                ...data.languages.map((language: any) => ({
                    id: language.id,
                    language: language.language,
                    level: toLanguageLevel(language.level)
                }))
            ],
            experiences: [
                ...data.experiences.map((experience: any) => ({
                    id: experience.id,
                    company: experience.company,
                    department: experience.department,
                    position: experience.position,
                    description: experience.description,
                    start: new Date(experience.start),
                    end: new Date(experience.end)
                }))
            ],
            educations: [
                ...data.educations.map((education: any) => ({
                    id: education.id,
                    study: education.study,
                    institution: education.institution,
                    description: education.description,
                    GPA: education.gpa,
                    start: new Date(education.start),
                    end: new Date(education.end),
                    educationLevel: toEducationLevel(education.educationLevel)
                }))
            ],
            phones: [
                ...data.phones.map((phone: any) => ({
                    id: phone.id,
                    prefix: phone.prefix,
                    number: phone.number
                }))
            ],
            submissions: [
                ...data.submissions.map((submission: any) => ({
                    id: submission.id,
                    seeker: null,
                    position: requestedPositions.filter(p => p.id === submission.positionId)[0],
                    status: toOfferSuggestionStatus(submission.status),
                    createdAt: new Date(submission.createdAt)
                }))
            ],
            offers: [
                ...data.offers.map((offer: any) => ({
                    id: offer.id,
                    seeker: null,
                    position: requestedPositions.filter(p => p.id === offer.positionId)[0],
                    status: toOfferSuggestionStatus(offer.status),
                    createdAt: new Date(offer.createdAt)
                }))
            ],
            suggestions: [
                ...data.suggestions.map((suggestion: any) => ({
                    id: suggestion.id,
                    position: requestedPositions.filter(p => p.id === suggestion.positionId)[0],
                    matchRate: suggestion.matchRate,
                    createdAt: new Date(suggestion.createdAt)
                }))
            ]
        };

    } catch (exception) {
        throw new Error("The requested seeker couldn't found");
    }
};