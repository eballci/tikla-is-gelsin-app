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
        visual: "İngilizce",
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

export const Positions: Array<{ visual: string, value: string }> = [
    {
        visual: "Bilgisayar Mühendisi",
        value: "computer engineer"
    },
    {
        visual: "Yazılım Mühendisi",
        value: "software engineer"
    },
    {
        visual:"Yapay Zeka Mühendisi",
        value:"artificial intelligence engineer"
    },
    {
        visual: "Test Mühendisi",
        value: "test engineer"
    },
    {
        visual:"Arka Plan Geliştirici",
        value:"backend developer"
    },
    {
        visual: "Java Geliştirici",
        value: "java developer"
    },
    {
        visual: "Ön Web Geliştirici",
        value: "frontend developer"
    },
    {
        visual: "Pythyon Mühendisi",
        value: "python engineer"
    },
    {
        visual: "React Geliştirici",
        value: "react developer"
    },
    {
        visual: "C Geliştirici",
        value: "c developer"
    },
    {
        visual: "C++ Geliştirici",
        value: "c++ developer"
    },
    {
        visual: "Oyun Tasarımcısı",
        value: "game designer"
    },
    {
        visual:"RPA Geliştiricisi",
        value:"RPA developer"
    },
    {
        visual:"IOS Geliştiricisi",
        value:"ios developer"
    },
    {
        visual: "Veri Tabanı Uzmanı",
        value: "database specialist"
    },
    {
        visual: "Bilgisayar Programcılığı",
        value: "computer programming"
    },
    {
        visual: "JavaScript Geliştiricisi",
        value: "javascript developer"
    },
    {
        visual:"Web Tasarımı ve Kodlama",
        value:"web design and coding"
    },
    {
        visual:"Veri Analisti",
        value:"data analyst"
    },
    {
        visual:"Web Geliştirme Uzmanı",
        value:"full stack developer"
    },
    {
        visual:"Mobil Mühendis",
        value:"mobile engineer"
    },
    {
        visual:"Node.js Geliştirici",
        value:"node.js developer"
    },
    {
        visual:"Bilgi İşlem Uzmanı",
        value:"computing expert"
    },

//diğer mühendisler
    {
        visual: "Elektrik-Elektronik Mühendisi",
        value: "electrical electronics engineer"
    },
    {
        visual:"Tekstil Mühendisi",
        value:"textile engineer"
    },
    {
        visual: "Endüstri Mühendisi",
        value: "industrial engineer"
    },
    {
        visual: "Makine Mühendisi",
        value: "mechanical engineer"
    },
    {
        visual: "İnşaat Mühendisi",
        value: "construction engineer"
    },
    {
        visual:"Ziraat Mühendisi",
        value:"agricultural engineer"
    },
    {
        visual:"Kimya Mühendisi",
        value:"chemical engineer"
    },
    {
        visual:"Matematik Mühendisi",
        value:"math engineer"
    },
    {
        visual:"Mekatronik Mühendisi",
        value:"mechatronics engineer"
    },
    {
        visual:"Biyosistem Mühendisi",
        value:"biosystems engineer"
    },
    {
        visual:"Gıda Mühendisi",
        value:"food engineer"
    },
    {
        visual:"Orman Mühendisi",
        value:"forest engineer"
    },
    {
      visual:"Havacılık Mühendisi",
      value:"aeronautical engineer"
    },
    {
        visual:"Harita Mühendisi",
        value:"map engineer"
    },
//karışık meslekler
    {
        visual: "Muhasebeci",
        value: "accounting"
    },
    {
      visual:"Maliye",
      value:"finance"
    },
    {
        visual:"Moda Tasarımı",
        value:"fashion design"
    },
    {
        visual: "İnsan Kaynakları Uzmanı",
        value: "human resources specialist"
    },
    {
        visual: "Bankacılık ve Sigorta",
        value: "banking and insurance"
    },
    {
      visual:"Bankacılık",
      value:"banking"
    },
    {
        visual:"Eczacılık",
        value:"pharmacy"
    },
    {
        visual:"Hemşirelik",
        value:"nursing"
    },
    {
        visual:"İç Mimar",
        value:"interior architect"
    },
    {
        visual:"Mimar",
        value:"architect"
    },
    {
        visual:"Gazetecilik",
        value:"journalism"
    },
//ögretmenler kismi
    {
        visual:"Matematik Öğretmeni",
        value:"math teacher"
    },
    {
        visual:"Fizik Öğretmeni",
        value:"physics teacher"
    },
    {
        visual:"Kimya Öğretmeni",
        value:"chemistry teacher"
    },
    {
        visual:"Biyoloji Öğretmeni",
        value:"biology teacher"
    },
    {
        visual: "Türkçe Öğretmeni",
        value: "turkish teacher"
    },
    {
        visual: "Almanca Öğretmeni",
        value: "teaching german"
    },
    {
        visual: "İngilizce Öğretmeni",
        value: "english teacher"
    },
    {
      visual:"Okul Öncesi Öğretmeni",
      value:"preschool teacher"
    },
];

export const Studies: Array<{ visual: string, value: string }> = [
    {
        visual: "Bilgisayar Mühendisliği",
        value: "computer engineering"
    },
    {
        visual: "Elektrik Mühendisliği",
        value: "eletricity engineering"
    },
    {
        visual: "Endüstri Mühendisliği",
        value: "industrial engineering"
    },
    {
        visual: "Kimya Mühendisliği",
        value: "chemistry engineering"
    },
    {
        visual: "Makine Mühendisliği",
        value: "mechanical engineering"
    },
    {
        visual: "Yazılım Mühendisliği",
        value: "software engineering"
    },
    {
        visual:"Tekstil Mühendisliği",
        value:"textile engineering"
    },
    {
        visual:"Biyosistem Mühendisliği",
        value:"biosystems engineering"
    },
    {
        visual: "Harita Mühendisliği",
        value: "map engineering"
    },
    {
        visual: "Ziraat Mühendisliği",
        value: "agricultural engineering"
    },
    {
        visual: "Matematik Mühendisliği",
        value: "math engineering"
    },
    {
        visual: "Mekatronik Mühendisliği",
        value: "mechatronic engineering"
    },
    {
        visual: "Orman Mühendisliği",
        value: "forest  engineering"
    },
    {
        visual: "Gıda Mühendisliği",
        value: "food engineering"
    },
    {
        visual: "İnşaat Mühendisliği",
        value: "construction engineering"
    },
    {
        visual: "Havacılık Mühendisliği",
        value: " aeronautical engineering"
    },

    {
        visual:"Hemşire",
        value:"nurse"
    },
    {
        visual:"Matematik Öğretmenliği",
        value:"math teaching"
    },
    {
        visual:"Fizik Öğretmenliği",
        value:"physics teaching"
    },
    {
        visual:"Kimya Öğretmenliği",
        value:"chemistry teaching"
    },
    {
        visual:"Biyoloji Öğretmenliği",
        value:"biology teaching"
    },
    {
        visual: "Türkçe Öğretmenliği",
        value: "turkish teaching"
    },
    {
        visual: "Almanca Öğretmenliği",
        value: "teaching german"
    },
    {
        visual: "İngilizce Öğretmenliği",
        value: "english teaching"
    },
    {
        visual:"Okul Öncesi Öğretmenliği",
        value:"preschool teaching"
    },
// 2 yıllıklar
    {
        visual: "Bilgisayar Programcılığı",
        value: "computer programming"
    },
    {
        visual: "Bilgisayar Teknolojisi",
        value: "computer technology"
    },
    {
        visual: "Bilişim Güvenliği Teknolojisi",
        value: "information security technology"
    },
    {
        visual: "Bankacılık ve Sigortacı",
        value: "banking and insurer"
    },
    {
        visual: "Eczane Hizmetleri",
        value: "pharmacy services"
    },
    {
        visual: "Elektrik",
        value: "electric"
    },
    {
        visual: "Gıda Teknolojisi ",
        value: "food technology"
    },
    {
        visual: "Harita Kadastro",
        value: "map cadastre"
    },
    {
        visual: "Uçak Teknolojisi",
        value: "aircraft technology"
    },
    {
        visual: "Siber Güvenlik",
        value: "cyber security"
    },
    {
        visual: "Makine",
        value: "machine"
    },
    {
        visual: " Biyokimya",
        value: "biochemistry"
    },
    {
        visual: "Muhasebe ve Vergi Uygulamaları",
        value: "accounting and tax practices"
    },
    {
        visual: "Mekatronik",
        value: "mechatronics"
    },
];