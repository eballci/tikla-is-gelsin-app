import {IonButton, IonContent, IonPage,} from "@ionic/react";
import {PageType, savePageType} from "./service";
import {useHistory} from "react-router-dom";
import useCheckPageType from "./use-check-page-type";

export default function Greeting() {
    const history = useHistory();
    const handlePageSelection = (pageType: PageType): void => {
        savePageType(pageType);
        history.push(`/${pageType.toString()}`);
    };

    useCheckPageType();

    return (
        <IonPage>
            <IonContent>
                <IonButton expand="block" onClick={() => handlePageSelection(PageType.SEEKER)}>İş Arayanlar</IonButton>
                <IonButton expand="block" onClick={() => handlePageSelection(PageType.SEEKER)}>İş Verenler</IonButton>
            </IonContent>
        </IonPage>
    );
}