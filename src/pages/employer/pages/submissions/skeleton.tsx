import {IonItem, IonLabel, IonList, IonSkeletonText, IonThumbnail} from "@ionic/react";

export default function Skeleton() {
    return (
        <IonList>
            <IonItem>
                <IonThumbnail slot="start">
                    <IonSkeletonText animated={true}></IonSkeletonText>
                </IonThumbnail>
                <IonLabel>
                    <h3>
                        <IonSkeletonText animated={true} style={{width: '80%'}}></IonSkeletonText>
                    </h3>
                    <p>
                        <IonSkeletonText animated={true} style={{width: '60%'}}></IonSkeletonText>
                    </p>
                    <p>
                        <IonSkeletonText animated={true} style={{width: '30%'}}></IonSkeletonText>
                    </p>
                </IonLabel>
            </IonItem>
            <IonItem>
                <IonThumbnail slot="start">
                    <IonSkeletonText animated={true}></IonSkeletonText>
                </IonThumbnail>
                <IonLabel>
                    <h3>
                        <IonSkeletonText animated={true} style={{width: '80%'}}></IonSkeletonText>
                    </h3>
                    <p>
                        <IonSkeletonText animated={true} style={{width: '60%'}}></IonSkeletonText>
                    </p>
                    <p>
                        <IonSkeletonText animated={true} style={{width: '30%'}}></IonSkeletonText>
                    </p>
                </IonLabel>
            </IonItem>
            <IonItem>
                <IonThumbnail slot="start">
                    <IonSkeletonText animated={true}></IonSkeletonText>
                </IonThumbnail>
                <IonLabel>
                    <h3>
                        <IonSkeletonText animated={true} style={{width: '80%'}}></IonSkeletonText>
                    </h3>
                    <p>
                        <IonSkeletonText animated={true} style={{width: '60%'}}></IonSkeletonText>
                    </p>
                    <p>
                        <IonSkeletonText animated={true} style={{width: '30%'}}></IonSkeletonText>
                    </p>
                </IonLabel>
            </IonItem>
            <IonItem>
                <IonThumbnail slot="start">
                    <IonSkeletonText animated={true}></IonSkeletonText>
                </IonThumbnail>
                <IonLabel>
                    <h3>
                        <IonSkeletonText animated={true} style={{width: '80%'}}></IonSkeletonText>
                    </h3>
                    <p>
                        <IonSkeletonText animated={true} style={{width: '60%'}}></IonSkeletonText>
                    </p>
                    <p>
                        <IonSkeletonText animated={true} style={{width: '30%'}}></IonSkeletonText>
                    </p>
                </IonLabel>
            </IonItem>
            <IonItem>
                <IonThumbnail slot="start">
                    <IonSkeletonText animated={true}></IonSkeletonText>
                </IonThumbnail>
                <IonLabel>
                    <h3>
                        <IonSkeletonText animated={true} style={{width: '80%'}}></IonSkeletonText>
                    </h3>
                    <p>
                        <IonSkeletonText animated={true} style={{width: '60%'}}></IonSkeletonText>
                    </p>
                    <p>
                        <IonSkeletonText animated={true} style={{width: '30%'}}></IonSkeletonText>
                    </p>
                </IonLabel>
            </IonItem>
        </IonList>
    );
}