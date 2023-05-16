import {PageType, retrievePageType} from "../../root/service";
import {useEffect} from "react";
import {useHistory} from "react-router-dom";

export default function useCheckPageType() {
    const history = useHistory();
    const pageType = retrievePageType();

    useEffect(() => {
        if (pageType === PageType.GREETING) return;
        history.push(`/${pageType.toString().toLowerCase()}`);
    }, []);
}