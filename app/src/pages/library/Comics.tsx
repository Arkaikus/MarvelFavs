import React from "react";
import {
    IonButton,
    IonButtons,
    IonCol,
    IonContent, IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonLoading,
    IonPage,
    IonRow,
    IonSearchbar,
    IonThumbnail, IonTitle,
    IonToolbar
} from "@ionic/react";
import {chevronBack, chevronForward, eyeOutline} from "ionicons/icons";
import AppContext from "../../data/context";
import ComicDetail from "../../components/ComicDetail";


export class Comics extends React.Component<any, any>{
    static contextType = AppContext;
    state = {
        title:'',
        offset:0,
        limit:20,
        page:1,
        total:1,
        totalPages:1,
        loading:true,
        disableLoad:false,
        doSearch:false,
        showDetail:false,
        selectedComic: {
            comicId:"",
            title:"",
            thumbnail:"",
            description:"",
        },
        toast:{
            msg:'',
            type:'primary'
        },
        alreadyFavorite:false,
        comics: [],
        searchComics: []
    }

    componentDidMount() {
        console.log("did mount!!!", this.state);
        this.fetchData(this.state.page).then(()=>{
            console.log("load finished");
        });
    }

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any) {
        if(!!this.state.title && this.state.doSearch){
            // console.log("Search title updated", this.state.title)
            this.filterData(this.state.title);
        }

        if(prevState.title !== this.state.title && !this.state.title){
            this.setState({
                disableLoad:false
            })
        }
    }

    filterData(title:string){
        let self = this;
        const search = this.state.comics.filter(function (el:any) {
            return el.title.match(new RegExp(`.*${title}.*`,'i')) !== null
        });
        self.setState({
            disableLoad:true,
            doSearch:false,
            searchComics:search
        });
    }

    async fetchData(page:number){
        let self = this;
        self.setState({
            loading:true,
        })

        let offset = Math.trunc((page-1)*self.state.limit)
        let params = {
            offset:offset,
            limit:self.state.limit
        }
        console.log("fetching data from", offset, "to",self.state.limit, "disableLoad",self.state.disableLoad);
        self.context.api.comics(params)
            .then(async (response:any)=>{
                let totalPages = Math.trunc(response.data.total/self.state.limit);
                self.setState({
                    loading:false,
                    offset:offset,
                    page:page,
                    total:response.data.total,
                    totalPages:totalPages,
                    comics:response.data.results
                });
                console.log("data fetched");
            })
            .catch((err:any) => console.error(err));
    }

    pagination(){
        let self=this;
        let buttons = [];

        let start = self.state.page - 5;
        if (start <= 0) start = 1;

        let end = start+10;
        if (end>=self.state.totalPages) {
            start = self.state.totalPages - 11;
            end = self.state.totalPages-1
        }

        for(let page=start; page<=end;page++){
            buttons.push(
                <IonButton key={page}
                           fill={(page===self.state.page)? 'solid':'clear'}
                           color="primary"
                           onClick={() => self.fetchData(page)}>
                    {page}
                </IonButton>
            )
        }
        buttons.push(
            <IonButton key={self.state.totalPages}
                       fill={(self.state.page===self.state.totalPages)? 'solid':'clear'}
                       color="primary"
                       onClick={() => self.fetchData(self.state.totalPages)}>
                {self.state.totalPages}
            </IonButton>
        )

        return (
            <IonToolbar>
                <IonButtons slot="start">
                    <IonButton onClick={()=>self.fetchData(1)}>
                        <IonIcon icon={chevronBack}/>
                        <IonIcon icon={chevronBack}/>
                    </IonButton>
                    <IonButton onClick={()=> {
                        if(self.state.page >= 2)
                            self.fetchData(self.state.page-1)
                    }}>
                        <IonIcon icon={chevronBack}/>
                    </IonButton>
                </IonButtons>
                <IonButtons className="ion-justify-content-center d-flex flex-wrap" >
                    {buttons}
                </IonButtons>
                <IonButtons slot="end">
                    <IonButton onClick={()=> {
                        if(self.state.page < self.state.totalPages)
                            self.fetchData(self.state.page+1)
                    }}>
                        <IonIcon icon={chevronForward}/>
                    </IonButton>
                    <IonButton onClick={()=>self.fetchData(self.state.totalPages)}>
                        <IonIcon icon={chevronForward}/>
                        <IonIcon icon={chevronForward}/>
                    </IonButton>
                </IonButtons>

            </IonToolbar>
        );
    }

    render() {
        let self = this;
        if(self.state.loading)
            return(
                <IonPage>
                    <IonContent fullscreen>
                        <IonLoading isOpen={true} message="Loading Comics..." />
                    </IonContent>
                </IonPage>
            );
        else
            return (
                <IonPage>
                    <IonHeader>
                        <IonToolbar className="ion-text-center">
                            <IonTitle>Comics</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent fullscreen>
                        {self.state.showDetail &&
                        <ComicDetail showDetail={self.state.showDetail}
                                     comic={self.state.selectedComic}
                                     dismiss={()=>self.setState({showDetail:false})} />}
                        <IonRow className="ion-padding ion-justify-content-center">
                            <IonCol size="12" sizeLg="8" sizeXl="6">
                                <IonSearchbar placeholder="Search Comics"
                                              value={self.state.title}
                                              onIonChange={e => self.setState({
                                                  doSearch:true,
                                                  title:e.detail.value!
                                              })}
                                              showCancelButton="focus" />
                                {self.pagination()}
                                {(!self.state.title? self.state.comics :self.state.searchComics).map((comic:any, i:number)=>(
                                    <IonItem key={i}>
                                        <IonThumbnail slot="start">
                                            <img alt={"thumbnail_"+i} src={comic.thumbnail.path+'.'+comic.thumbnail.extension} />
                                        </IonThumbnail>
                                        <IonLabel>
                                            <h3>{comic.title}</h3>
                                            <p>Page count: {comic.pageCount}</p>
                                        </IonLabel>
                                        <IonButton fill="clear" onClick={()=>self.setState({
                                            showDetail:true,
                                            selectedComic:{
                                                comicId: comic.id,
                                                title: comic.title,
                                                thumbnail:comic.thumbnail.path+'.'+comic.thumbnail.extension,
                                                description: (comic.description?comic.description:""),
                                            },
                                        })}>
                                            <IonIcon icon={eyeOutline} color="ternary"/>
                                        </IonButton>
                                    </IonItem>
                                ))}
                            </IonCol>
                        </IonRow>
                    </IonContent>
                </IonPage>
            );
    }
}