enum PageType {
    GREETING = "GREETING",
    SEEKER = "SEEKER",
    EMPLOYER = "EMPLOYER"
}

const pageTypeKey = "type";
const userIdentifierKey = "id";

const retrievePageType = (): PageType => {
    const pageType = localStorage.getItem(pageTypeKey);

    if (pageType === null) return PageType.GREETING;
    if (pageType === PageType.GREETING.toString()) return PageType.GREETING;
    if (pageType === PageType.SEEKER.toString()) return PageType.SEEKER;
    if (pageType === PageType.EMPLOYER.toString()) return PageType.EMPLOYER;
    throw new Error("The page type is not conventional.");
}

const retrieveUserId = (): number => {
    return parseInt(localStorage.getItem(userIdentifierKey) ?? "0");
}

const savePageType = (type: PageType): void => {
    localStorage.setItem(pageTypeKey, type.toString());
}

const saveUserId = (id: number): void => {
    localStorage.setItem(userIdentifierKey, id.toString());
}

const clearPersistentDataStore = () => {
    localStorage.clear();
};

export {
    PageType,
    retrievePageType,
    retrieveUserId,
    savePageType,
    saveUserId,
    clearPersistentDataStore
}