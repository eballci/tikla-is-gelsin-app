import {EducationLevel, LanguageLevel} from "../model";

export const toLanguageLevel = (level: number): LanguageLevel => {
    if (level === 1) return LanguageLevel.BEGINNER;
    if (level === 2) return LanguageLevel.INTERMEDIATE;
    if (level === 3) return LanguageLevel.PROFESSIONAL;
    return LanguageLevel.NATIVE
}

export const toEducationLevel = (level: number): EducationLevel => {
    if (level === 1) return EducationLevel.ASSOCIATE;
    if (level === 2) return EducationLevel.BACHELORS;
    if (level === 3) return EducationLevel.MASTERS;
    return EducationLevel.DOCTORAL;
}