import Personal from "./personal";
import PhoneList from "./phone-list";
import EducationList from "./education-list";
import ExperienceList from "./experience-list";
import LanguageList from "./language-list";

export default function Details() {
    return (
        <>
            <Personal/>
            <PhoneList/>
            <EducationList/>
            <ExperienceList/>
            <LanguageList/>
        </>
    );
}