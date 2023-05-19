import {IonButton, IonContent, IonModal} from "@ionic/react";
import React from "react";
import {useAppDispatch, useAppSelector} from "../../../../store/hooks";
import {setSeekerId} from "../../../../store/store";
import {Redirect} from "react-router";

export default function Login() {
    const dispatch = useAppDispatch();
    const seekerId = useAppSelector((state) => state.seeker.id);
    return (
        <IonModal trigger="open-modal" isOpen={true}>
            <IonContent className="ion-padding">
                {
                    (seekerId !== 0) && <Redirect to="/seeker/feed"/>
                }
                <h1>Lütfen giriş yapın</h1>
                <IonButton onClick={() => {
                    dispatch(setSeekerId(1))
                }}>Giriş Yap</IonButton>
            </IonContent>
        </IonModal>
    );
}