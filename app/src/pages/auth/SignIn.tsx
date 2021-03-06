import React from 'react';
import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonGrid,
    IonRow,
    IonCol,
    IonIcon,
    IonItem, IonButton, IonInput, IonLabel
} from '@ionic/react';
import {lockClosedOutline, personCircle} from "ionicons/icons";
import AppContext from "../../data/context";
import Cookies from 'js-cookie';

export default class SignIn extends React.Component<any,any>{
    static contextType = AppContext
    state = {
        username:'',
        password:''
    }

    submitForm(e:any){
        let self = this;
        e.preventDefault();
        e.stopPropagation();
        self.context.api.signIn(self.state.username, self.state.password)
            .then((res:Response)=>{
                res.json().then((data:any)=>{
                    if(res.ok){
                        Cookies.set('jwt',data.access);
                        window.location.href='/';
                    }else{
                        self.context.setToast({
                            msg:data.detail,
                            color:'danger'
                        });
                    }
                });
            });
    }

    render(){
        let self = this;
        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar className="ion-text-center">
                        <IonTitle>Sign In</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent fullscreen>
                    <IonGrid>
                        <IonRow className="ion-padding ion-justify-content-center ion-text-center">
                            <IonCol size="12" sizeLg="8" sizeXl="6">
                                <IonIcon
                                    style={{fontSize: "70px", color: "#0040ff"}}
                                    icon={personCircle}
                                />
                            </IonCol>
                        </IonRow>
                        <IonRow className="ion-padding ion-justify-content-center">
                            <IonCol size="12" sizeLg="8" sizeXl="6">
                                <form onSubmit={(e) => {
                                    self.submitForm(e);
                                }}>
                                    <IonItem lines="full">
                                        <IonLabel position="floating">Username</IonLabel>
                                        <IonInput type="text" required
                                                  value={self.state.username}
                                                  onIonChange={e => self.setState({"username": e.detail.value!})}/>
                                    </IonItem>
                                    <IonItem lines="full">
                                        <IonLabel position="floating">Password</IonLabel>
                                        <IonInput type="password" required
                                                  value={self.state.password}
                                                  onIonChange={e => self.setState({"password": e.detail.value!})}/>
                                    </IonItem>
                                    <IonButton type="submit" color="primary" expand="block">
                                        <IonIcon icon={lockClosedOutline}/>
                                        Sign In
                                    </IonButton>
                                </form>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonContent>
            </IonPage>
        );
    }
}
