import React from 'react';
import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonContent,
    IonIcon,
    IonModal,
    IonToolbar
} from "@ionic/react";
import {star, trash} from "ionicons/icons";
import AppContext from "../data/context";

export default class ComicDetail extends React.Component<any, any>{
    static contextType = AppContext;
    state = {
        alreadyFavorite: false
    }

    componentDidMount() {
        let self = this;
        if(!self.props.hasOwnProperty('alreadyFavorite'))
            self.context.api.favorites(self.props.comic.comicId).then(
                (res: Response) => {
                    self.setState({
                        alreadyFavorite: res.ok
                    });
                }
            );
        else
            self.setState({
                alreadyFavorite: self.props.alreadyFavorite
            });
    }


    addFavorite(){
        let self = this;
        self.context.api.addFavorite(self.props.comic).then((request:any)=>{
            if(request.ok) {
                self.context.setToast({
                    msg: 'Success!',
                    color: 'success'
                });
            }else{
                self.context.setToast({
                    msg: 'Something went wrong',
                    color: 'danger'
                });
            }
            self.context.setFetchFavorites(true);
            self.props.dismiss();
        })
    }

    deleteFavorite(){
        let self=this;
        self.context.api.deleteFavorite(self.props.comic.comicId).then((request:any)=>{
            if(request.ok) {
                self.context.setToast({
                    msg: 'Deleted succesfully',
                    color: 'success'
                });
            }else{
                self.context.setToast({
                    msg: 'Something went wrong',
                    color: 'danger'
                });
            }
            self.context.setFetchFavorites(true);
            self.props.dismiss();
        })
    }

    render(){
        let self=this;
        return (
            <IonModal isOpen={self.props.showDetail}  onDidDismiss={self.props.dismiss}>
                <IonContent>
                    <IonCard className="m-0 ion-padding-bottom">
                        <IonToolbar>
                            <IonButton slot="end"
                                       fill="clear"
                                       expand="block"
                                       color="dark"
                                       onClick={self.props.dismiss}>
                                Close
                            </IonButton>
                        </IonToolbar>
                        <img className="w-100"
                             alt="thumbnail"
                             src={self.props.comic.thumbnail}/>
                        <IonCardHeader>
                            <h2>{self.props.comic.title}</h2>
                        </IonCardHeader>
                        <IonCardContent>
                            <p>{self.props.comic.description}</p>
                            {(!self.state.alreadyFavorite)?(
                                <IonButton className="ion-padding"
                                           fill="outline"
                                           expand="block"
                                           onClick={()=>self.addFavorite()}>
                                    Add to Favorites
                                    <IonIcon color="warning" icon={star} />
                                </IonButton>
                            ):(
                                <IonButton className="ion-padding"
                                           fill="outline"
                                           color="danger"
                                           expand="block"
                                           onClick={()=>self.deleteFavorite()}>
                                    Remove from Favorites
                                    <IonIcon color="danger" icon={trash} />
                                </IonButton>
                            )}
                        </IonCardContent>

                    </IonCard>
                </IonContent>

            </IonModal>
        );
    }
}
