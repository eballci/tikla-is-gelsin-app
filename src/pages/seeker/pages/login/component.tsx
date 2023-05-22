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
import React, {useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../../store/hooks";
import {Redirect} from "react-router";
import Register from "./register";
import {loginSeeker} from "../../../../service/seeker.service";
import {alertOutline, checkmarkOutline} from "ionicons/icons";
import {setSeekerId} from "../../../../store/store";

export default function Login() {
    const dispatch = useAppDispatch();
    const seekerId = useAppSelector((state) => state.seeker.id);
    const [present] = useIonToast();
    const [modalOpen, setModalOpen] = useState(false);
    const [isLogging, setIsLogging] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        setIsLogging(true);
        loginSeeker(email, password).then((data) => {
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
                dispatch(setSeekerId(data));
            }, 1500);
        });
    };

    return (
        <>
            <IonModal trigger="open-modal" isOpen={true}>
                <IonContent className="ion-padding">
                    {
                        (seekerId !== 0) && <Redirect to="/seeker/feed"/>
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
                        <IonRow className="ion-align-items-center">
                            <IonCol>
                                <IonButton
                                    style={{width: 100}}
                                    onClick={() => setModalOpen(true)}
                                    disabled={isLogging}
                                    color="dark">
                                    Kayıt Ol
                                </IonButton>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonContent>
            </IonModal>
            <Register modalOpen={modalOpen} setModalOpen={setModalOpen}/>
        </>
    );
}