import React, {useState} from "react";
import {
    IonButton,
    IonCol,
    IonContent,
    IonGrid,
    IonInput,
    IonModal,
    IonRow,
    IonSpinner,
    IonTitle,
    useIonToast
} from "@ionic/react";
import {Redirect} from "react-router";
import {useAppDispatch, useAppSelector} from "../../../../store/hooks";
import {alertOutline, checkmarkOutline} from "ionicons/icons";
import {setEmployerId} from "../../../../store/store";
import {loginEmployer} from "../../../../service/employer.service";

export default function Login() {
    const dispatch = useAppDispatch();
    const employerId = useAppSelector((state) => state.employer.id);
    const [present] = useIonToast();
    const [isLogging, setIsLogging] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        setIsLogging(true);
        loginEmployer(email, password).then((data) => {
            if (data === 0) {
                setTimeout(async () => {
                    setIsLogging(false);
                    await present({
                        message: "E-Posta ya da parola yanlış girildi",
                        duration: 3000,
                        position: "bottom",
                        icon: alertOutline,
                        color: "danger"
                    });
                }, 1500);
                return;
            }
            setTimeout(async () => {
                await present({
                    message: "Giriş yapıldı.",
                    duration: 5000,
                    position: "bottom",
                    icon: checkmarkOutline,
                    color: "success"
                });
                dispatch(setEmployerId(data));
            }, 1500);
        });
    };

    return (
        <>
            <IonModal trigger="open-modal" isOpen={true}>
                <IonContent className="ion-padding">
                    {
                        (employerId !== 0) && <Redirect to="/employer/feed"/>
                    }
                    <IonGrid className="ion-padding-top">
                        <IonRow style={{paddingTop: 150}}>
                            <IonCol>
                                <IonTitle size="large">
                                    Giriş yapın
                                </IonTitle>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol className="ion-padding">
                                <IonInput
                                    disabled={isLogging}
                                    className="ion-text-left"
                                    type="email"
                                    fill="solid"
                                    label="e-posta"
                                    labelPlacement="floating"
                                    helperText="örnek: misal@alan.com"
                                    onIonInput={(ev) => setEmail(ev.detail.value as string)}
                                />
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol className="ion-padding">
                                <IonInput
                                    disabled={isLogging}
                                    className="ion-text-left"
                                    type="password"
                                    fill="solid"
                                    label="parola"
                                    labelPlacement="floating"
                                    helperText="parolanızı girin"
                                    onIonInput={(ev) => setPassword(ev.detail.value as string)}
                                />
                            </IonCol>
                        </IonRow>
                        <IonRow className="ion-align-items-center">
                            <IonCol>
                                <IonButton
                                    style={{width: 100}}
                                    onClick={handleLogin}
                                    disabled={isLogging}
                                    fill="outline">
                                    {
                                        (isLogging) ? (
                                            <IonSpinner/>
                                        ) : (
                                            "Giriş Yap"
                                        )
                                    }
                                </IonButton>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonContent>
            </IonModal>
        </>
    );
}