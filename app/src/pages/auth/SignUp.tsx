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
import {enterOutline, personCircle} from "ionicons/icons";
import AppContext from "../../data/context";

export default class SignUp extends React.Component<any,any>{
    static contextType = AppContext;
    state = {
        error:false,
        errorMsg:'',
        username:'',
        email:'',
        password:'',
        confirm_password:'',
    }

    error(){
        return (
            <IonItem color="danger">
                <IonLabel>{this.state.errorMsg}</IonLabel>
            </IonItem>
        );
    }

    submitForm(e:any){
        let self = this;
        e.preventDefault();
        e.stopPropagation();

        if(self.state.password !== self.state.confirm_password)
            self.setState({
                error:true,
                errorMsg:"Password confirmation does not match"
            })
        else
            self.context.api.signUp({
                username:self.state.username,
                email:self.state.email,
                password:self.state.password
            }).then((success:boolean)=>{
                console.log("success",success);
                if(success){
                    self.props.history.push('/signin');
                }else{
                    self.setState({
                        error:true,
                        errorMsg:'Something went wrong, try again!',
                    })

                }
            })
    }

    render(){
        let self = this;
        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Sign Up</IonTitle>
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
                                    {self.state.error && self.error()}
                                    <IonItem lines="full">
                                        <IonLabel position="floating">Username</IonLabel>
                                        <IonInput type="text" required
                                                  value={self.state.username}
                                                  onIonChange={e => self.setState({"username": e.detail.value!})}/>
                                    </IonItem>
                                    <IonItem lines="full">
                                        <IonLabel position="floating">Email</IonLabel>
                                        <IonInput type="text" required
                                                  value={self.state.email}
                                                  onIonChange={e => self.setState({"email": e.detail.value!})}/>
                                    </IonItem>
                                    <IonItem lines="full">
                                        <IonLabel position="floating">Password</IonLabel>
                                        <IonInput type="password" required
                                                  value={self.state.password}
                                                  onIonChange={e => self.setState({"password": e.detail.value!})}/>
                                    </IonItem>
                                    <IonItem lines="full">
                                        <IonLabel position="floating">Confirm Password</IonLabel>
                                        <IonInput type="password" required
                                                  value={self.state.confirm_password}
                                                  onIonChange={e => self.setState({"confirm_password": e.detail.value!})}/>
                                    </IonItem>
                                    <IonButton type="submit" color="primary" expand="block">
                                        <IonIcon icon={enterOutline}/>
                                        Sign Up
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
