import axios from "axios";
import {EducationCriteria, ExperienceCriteria, LanguageCriteria, Position} from "../model";
import {visitEmployer} from "./employer.service";
import {toEducationLevel, toLanguageLevel} from "./utils";
import {apiUrl} from "../../environment/environment";

export const getPosition = async (id: number): Promise<Position> => {
    try {
        const response = await axios.get(`${apiUrl}/position/${id}`);
        const data = response.data;
        const employer = await visitEmployer(data.employerId);

        const educationCriteriaList: Array<EducationCriteria> = [];
        const experienceCriteriaList: Array<ExperienceCriteria> = [];
        const languageCriteriaList: Array<LanguageCriteria> = [];

        if (data.criteriaList!.education) {
            data.criteriaList.education.forEach((educationCriteria: any) => {
                const criteria: EducationCriteria = {
                    study: educationCriteria.study,
                    minEducationLevel: toEducationLevel(
                        educationCriteria.minEducationLevel
                    )
                };

                educationCriteriaList.push(criteria);
            });
        }

        if (data.criteriaList!.experience) {
            data.criteriaList.experience.forEach((experienceCriteria: any) => {
                const criteria: ExperienceCriteria = {
                    minimumYears: experienceCriteria.minimumYears,
                    title: experienceCriteria.title
                };

                experienceCriteriaList.push(criteria);
            });
        }

        if (data.criteriaList!.language) {
            data.criteriaList.language.forEach((languageCriteria: any) => {
                const criteria: LanguageCriteria = {
                    expectedLanguage: languageCriteria.expectedLanguage,
                    expectedLevel: toLanguageLevel(
                        languageCriteria.expectedLevel
                    )
                }

                languageCriteriaList.push(criteria);
            });
        }

        return {
            id: data.id,
            employer,
            title: data.title,
            description: data.description,
            educationCriteriaList,
            experienceCriteriaList,
            languageCriteriaList
        };

    } catch (exception) {
        throw new Error("The requested position couldn't found");
    }
}

export const createPosition = async (position: Position): Promise<boolean> => {
    try {
        const request: any = {
            employerId: position.employer.id,
            title: position.title,
            description: position.description,
            criteriaList: [
                ...position.educationCriteriaList.map(criteria => ({
                    type: "education",
                    data: {
                        study: criteria.study,
                        minEducationLevel: criteria.minEducationLevel
                    }
                })),
                ...position.experienceCriteriaList.map(criteria => ({
                    type: "experience",
                    data: {
                        title: criteria.title,
                        minimumYears: criteria.minimumYears
                    }
                })),
                ...position.languageCriteriaList.map(criteria => ({
                    type: "language",
                    data: {
                        expectedLanguage: criteria.expectedLanguage,
                        expectedLevel: criteria.expectedLevel
                    }
                })),
            ]
        };

        const response = await axios.post(
            `${apiUrl}/position/`,
            request
        );

        return response.status === 201;
    } catch (exception) {
        return false;
    }
}

export const updatePosition = async (position: Position): Promise<boolean> => {
    try {
        const request: any = {
            positionId: position.id,
            title: position.title,
            description: position.description,
            criteriaList: [
                ...position.educationCriteriaList.map(criteria => ({
                    type: "education",
                    data: {
                        study: criteria.study,
                        minEducationLevel: criteria.minEducationLevel
                    }
                })),
                ...position.experienceCriteriaList.map(criteria => ({
                    type: "experience",
                    data: {
                        title: criteria.title,
                        minimumYears: criteria.minimumYears
                    }
                })),
                ...position.languageCriteriaList.map(criteria => ({
                    type: "language",
                    data: {
                        expectedLanguage: criteria.expectedLanguage,
                        expectedLevel: criteria.expectedLevel
                    }
                })),
            ]
        };

        await axios.patch(
            `${apiUrl}/position/`,
            request
        );

        return true;
    } catch (exception) {
        return false;
    }
}

export const removePosition = async (position: Position): Promise<boolean> => {
    try {
        await axios.delete(
            `${apiUrl}/position/${position.id}`
        );

        return true;
    } catch (exception) {
        return false;
    }
}