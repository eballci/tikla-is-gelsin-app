import {
    IonAvatar,
    IonButton,
    IonButtons,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonIcon,
    IonItem,
    IonItemGroup,
    IonModal,
    IonRow,
    IonText,
    IonTitle,
    IonToolbar,
} from '@ionic/react';
import {Position} from '../../../../model';
import React, {useState} from 'react';
import {closeOutline, globeOutline, walkOutline} from 'ionicons/icons';
import styles from './position-modal.module.css';

export default function PositionInModal({position}: { position: Position }) {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <>
            <IonGrid className='ion-padding'>
                <IonButton
                    expand='full'
                    className={[
                        styles['company-button'],
                        'ion-no-margin',
                        'ion-no-padding',
                        'ion-margin-top',
                    ].join(' ')}
                    onClick={() => setModalOpen(true)}
                >
                    <IonRow
                        className={[
                            styles['w-100'],
                            'ion-no-padding',
                            'ion-align-items-center',
                        ].join(' ')}
                    >
                        <IonCol size='auto' className='ion-padding-end'>
                            <IonAvatar>
                                <img
                                    alt='Profile image of the employer'
                                    src={
                                        position.employer.avatar === ''
                                            ? 'https://ionicframework.com/docs/img/demos/avatar.svg'
                                            : 'data:image/png;base64,' + position.employer.avatar
                                    }
                                />
                            </IonAvatar>
                        </IonCol>
                        <IonCol className='ion-text-left ion-no-padding'>
                            {position.employer.name}
                        </IonCol>
                    </IonRow>
                </IonButton>

                <IonRow>
                    <IonCol className={styles.description} size='auto' width-100>
                        {position.description}
                    </IonCol>
                </IonRow>
            </IonGrid>
            <IonModal isOpen={modalOpen}>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot='start'>
                            <IonButton onClick={() => setModalOpen(false)}>
                                <IonIcon icon={closeOutline}/>
                            </IonButton>
                        </IonButtons>
                        <IonTitle>İşveren</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonItemGroup>
                        <IonItem lines='none'>
                            <IonAvatar>
                                <img
                                    alt='Profile image of the seeker'
                                    src={
                                        position.employer.avatar === ''
                                            ? 'https://ionicframework.com/docs/img/demos/avatar.svg'
                                            : 'data:image/png;base64,' + position.employer.avatar
                                    }
                                />
                            </IonAvatar>
                        </IonItem>
                        <IonItem lines='none' className='ion-no-padding'>
                            <IonTitle size='large'>{position.employer.name}</IonTitle>
                        </IonItem>
                        <IonItem lines='none'>
                            <IonIcon icon={walkOutline}/>
                            <IonText className='ion-padding-start'>
                                {position.employer.scale}
                            </IonText>
                        </IonItem>
                        <IonItem lines='none'>
                            <IonIcon icon={globeOutline}/>
                            <IonText className='ion-padding-start'>
                                {position.employer.webSite ?? '-'}
                            </IonText>
                        </IonItem>
                        <IonItem lines='none'>
                            <IonText className='ion-padding-start ion-padding-top'>
                                {position.employer.description}
                            </IonText>
                        </IonItem>
                    </IonItemGroup>
                </IonContent>
            </IonModal>
        </>
    );
}
