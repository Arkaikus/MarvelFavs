import React from "react";
import {
    IonButton,
    IonCol,
    IonContent, IonGrid,
    IonHeader, IonIcon,
    IonItem, IonLabel,
    IonPage,
    IonRow, IonThumbnail,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import AppContext from "../../data/context";
import {star} from "ionicons/icons";
import ComicDetail from "../../components/ComicDetail";

export default class Library extends React.Component{
    static contextType = AppContext;

    state={
        loading:false,
        showDetail:false,
        selectedComic: {
            comicId:"",
            title:"",
            thumbnail:"",
            description:"",
        },
        favorites:[],
    }

    updateFavorites(){
        let self = this;
        self.setState({ loading:true })
        self.context.api.favorites().then((request: any) => {
            if(!request.ok)
                self.context.setToast({
                    msg:'Something went wrong',
                    color:'danger'
                });
            else
                request.json().then((data:any)=>{
                    self.setState({
                        favorites: data.results
                    });
                    self.context.setFetchFavorites(false);
                });

            self.setState({ loading:false });
        })
    }

    componentDidMount() {
        this.updateFavorites();
    }

    componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<{}>, snapshot?: any) {
        if(this.context.fetchFavorites && !this.state.loading) {
            this.updateFavorites();
        }
    }

    render() {
        let self = this;
        return (
            <React.Fragment>
                <IonPage>
                    <IonHeader>
                        <IonToolbar className="ion-text-center">
                            <IonTitle>Library</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent fullscreen>
                        {self.state.showDetail &&
                        <ComicDetail showDetail={self.state.showDetail}
                                     comic={self.state.selectedComic}
                                     dismiss={()=>{
                                         self.setState({ showDetail:false })
                                         self.updateFavorites();
                                     }} />}
                        <IonGrid>
                            <IonRow className="ion-padding ion-justify-content-center">
                                <IonCol size="12" sizeLg="8" sizeXl="6">
                                    {this.state.favorites.length?
                                        this.state.favorites.map((comic:any, i:number)=>(
                                            <IonItem key={i}>
                                                <IonThumbnail slot="start">
                                                    <img alt={"thumbnail_"+i} src={comic.thumbnail} />
                                                </IonThumbnail>
                                                <IonLabel>
                                                    <h3>{comic.title}</h3>
                                                    <p>Page count: {comic.pageCount}</p>
                                                </IonLabel>
                                                <IonButton fill="clear" onClick={()=>self.setState({
                                                    showDetail:true,
                                                    selectedComic:comic
                                                })}>
                                                    <IonIcon icon={star} color="warning"/>
                                                </IonButton>
                                            </IonItem>
                                        ))
                                        :(
                                            <IonItem color="secondary">
                                                No Favorite Comics Yet!
                                            </IonItem>
                                        )}
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonContent>
                </IonPage>
            </React.Fragment>
        );
    }
}