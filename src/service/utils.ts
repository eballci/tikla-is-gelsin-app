import {EducationLevel, LanguageLevel, OfferSubmissionStatus} from "../model";

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

export const toOfferSuggestionStatus = (level: number): OfferSubmissionStatus => {
    if (level === 1) return OfferSubmissionStatus.ISSUED;
    if (level === 2) return OfferSubmissionStatus.IDLE;
    if (level === 3) return OfferSubmissionStatus.ACCEPTED;
    return OfferSubmissionStatus.REFUSED;
}