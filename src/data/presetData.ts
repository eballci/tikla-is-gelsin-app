import {EducationLevel, LanguageLevel} from "../model";

export const LanguageLevelTranslation: Array<{ visual: string, value: LanguageLevel }> = [
    {
        visual: "Başlangıç",
        value: LanguageLevel.BEGINNER
    },
    {
        visual: "Orta",
        value: LanguageLevel.INTERMEDIATE
    },
    {
        visual: "İleri",
        value: LanguageLevel.PROFESSIONAL
    },
    {
        visual: "Ana dil",
        value: LanguageLevel.NATIVE
    }
];

export const EducationLevelTranslation: Array<{ visual: string, value: EducationLevel }> = [
    {
        visual: "Önlisans",
        value: EducationLevel.ASSOCIATE
    },
    {
        visual: "Lisans",
        value: EducationLevel.BACHELORS
    },
    {
        visual: "Master",
        value: EducationLevel.MASTERS
    },
    {
        visual: "Doktora",
        value: EducationLevel.DOCTORAL
    }
];

export const Languages: Array<{ visual: string, value: string }> = [
    {
        visual: "İnigilizce",
        value: "english"
    },
    {
        visual: "Almanca",
        value: "german"
    },
    {
        visual: "İspanyolca",
        value: "spanish"
    },
    {
        visual: "İtalyanca",
        value: "italian"
    },
    {
        visual: "Rusça",
        value: "russian"
    },
    {
        visual: "Çince",
        value: "chinese"
    },
    {
        visual: "Japonca",
        value: "japanese"
    },
    {
        visual: "Arapça",
        value: "arabic"
    },
    {
        visual: "Fransızca",
        value: "french"
    },
    {
        visual: "Portekizce",
        value: "portuguese"
    },
    {
        visual: "Hintçe",
        value: "hindi"
    },
    {
        visual: "Korece",
        value: "korean"
    },
];

export const positionTitles: Array<{ visual: string, value: string }> = [
    {
        visual: "Bilgisayar Mühendisi",
        value: "computer engineer"
    },
    {
        visual: "Yazılım Mühendisi",
        value: "software engineer"
    },
    {
        visual: "Test Mühendisi",
        value: "test engineer"
    },
];

