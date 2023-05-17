import {VisitSeeker} from "../model";
import axios from "axios";
import {toEducationLevel, toLanguageLevel} from "./utils";

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