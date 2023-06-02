import {Position} from '../../../../model';
import {IonAvatar, IonCol, IonGrid, IonRow} from '@ionic/react';
import {Positions} from '../../../../data/presetData';
import React from 'react';
import styles from './position-card.module.css';

export default function PositionInCard({position}: { position: Position }) {
    return (
        <>
            <IonGrid>
                <IonRow className='ion-align-items-center'>
                    <IonCol
                        size='auto'
                        className='ion-no-padding ion-padding-end ion-align-self-center'
                    >
                        <IonAvatar className={styles.avatar}>
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
                        <IonRow className={styles['position-title']}>
                            {Positions.filter((p) => p.value === position.title)[0].visual}
                        </IonRow>
                        <IonRow className={styles['employer-title']}>
                            {position.employer.name}
                        </IonRow>
                    </IonCol>
                </IonRow>
                <IonRow className={styles['job-description']}>
                    {position.description.slice(0, 200)}
                    {position.description.length > 200 && '...'}
                </IonRow>
            </IonGrid>
        </>
    );
}
