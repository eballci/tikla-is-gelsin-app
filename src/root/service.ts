enum PageType {
    GREETING = "GREETING",
    SEEKER = "SEEKER",
    EMPLOYER = "EMPLOYER"
}

const pageTypeKey = "type";

const retrievePageType = (): PageType => {
    const pageType = localStorage.getItem(pageTypeKey);

    if (pageType === null) return PageType.GREETING;
    if (pageType === PageType.GREETING.toString()) return PageType.GREETING;
    if (pageType === PageType.SEEKER.toString()) return PageType.SEEKER;
    if (pageType === PageType.EMPLOYER.toString()) return PageType.EMPLOYER;
    throw new Error("The page type is not conventional.");
}

const savePageType = (type: PageType): void => {
    localStorage.clear();
    localStorage.setItem(pageTypeKey, type.toString());
}

export {
    PageType,
    retrievePageType,
    savePageType
}