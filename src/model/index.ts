export enum EducationLevel {
    ASSOCIATE = 1, BACHELORS = 2, MASTERS = 3, DOCTORAL = 4
}

export enum LanguageLevel {
    BEGINNER = 1, INTERMEDIATE = 2, PROFESSIONAL = 3, NATIVE = 4
}

export type EducationCriteria = {
    study: string; minEducationLevel: EducationLevel;
}

export type ExperienceCriteria = {
    minimumYears: number; titles: Array<string>;
}

export type LanguageCriteria = {
    expectedLanguage: string; expectedLevel: LanguageLevel;
}

export type VisitEmployer = {
    id: number; avatar: string; name: string; description: string; webSite: string; scale: number;
}

export type Education = {
    id: number; study: string; institution: string; description: string; GPA: number; start: Date; end: Date; educationLevel: EducationLevel;
}

export type Experience = {
    id: number; company: string; department: string; position: string; description: string; start: Date; end: Date;
}

export type Language = {
    id: number; language: string; level: LanguageLevel;
}

export type Phone = {
    id: number; prefix: string; number: string;
}

export type VisitSeeker = {
    id: number; name: string; surname: string; email: string; avatar: string; biography: string; languages: Array<Language>; experiences: Array<Experience>; educations: Array<Education>;
}

export type Position = {
    id: number; employer: VisitEmployer; title: string; description: string; educationCriteriaList: Array<EducationCriteria>; experienceCriteriaList: Array<ExperienceCriteria>; languageCriteriaList: Array<LanguageCriteria>;
}

export enum OfferSubmissionStatus {
    ISSUED = 1, IDLE = 2, ACCEPTED = 3, REFUSED = 4
}

export type Offer = {
    id: number; seeker: VisitSeeker; position: Position; status: OfferSubmissionStatus; createdAt: Date
}

export type Submission = {
    id: number; seeker: VisitSeeker; position: Position; status: OfferSubmissionStatus; createdAt: Date
}

export type SeekerSuggestion = {
    id: number; seeker: VisitSeeker; position: Position; matchRate: number; createdAd: Date;
}

export type PositionSuggestion = {
    id: number; position: Position; matchRate: number; createdAd: Date;
}

export type Employer = {
    id: number; avatar: string; name: string; description: string; email: string; webSite: string; scale: number; openPositions: Array<Position>; submissions: Array<Submission>; offers: Array<Offer>; suggestions: Array<SeekerSuggestion>;
}

export type Seeker = {
    id: number; name: string; surname: string; avatar: string; email: string; biography: string; birth: Date; phones: Array<Phone>; languages: Array<Language>; experiences: Array<Experience>; educations: Array<Education>; suggestions: Array<PositionSuggestion>; submissions: Array<Submission>; offers: Array<Submission>;
}