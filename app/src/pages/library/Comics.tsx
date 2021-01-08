import React from "react";
import {
    IonButton,
    IonCol,
    IonContent,
    IonGrid, IonIcon,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonItem, IonLabel,
    IonPage,
    IonRow,
    IonSearchbar,
    IonThumbnail
} from "@ionic/react";
import {starOutline} from "ionicons/icons";


export class Comics extends React.Component<any, any>{
    state = {
        title:'',
        offset:0,
        limit:20,
        total:1,
        disableLoad:false,
        doSearch:false,
        comics: [],
        searchComics: []
    }

    componentDidMount() {
        console.log("did mount!!!", this.state);
        this.fetchData().then(()=>{
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

    async fetchData(){
        let self = this;
        console.log("fetching data from", self.state.offset, "to",self.state.limit, "disableLoad",self.state.disableLoad);
        let ts = "111111";
        let key = "57422c4803fb8c8b6625b7f8b6151a6f";
        let hash = "91147ef574e2e6026efd61f501616305";
        let url = `http://gateway.marvel.com/v1/public/comics?ts=${ts}&apikey=${key}&hash=${hash}`;

        if (self.state.offset) url += '&offset=' + self.state.offset;
        if (self.state.limit) url += '&limit=' + self.state.limit;
        const comics = await fetch(url);
        comics
            .json()
            .then(async (response:any)=>{
                self.setState({
                    total:response.data.total,
                    offset: self.state.offset+self.state.limit,
                    comics:[
                        ...self.state.comics,
                        ...response.data.results
                    ]
                });
                console.log("data fetched");
            })
            .catch(err => console.error(err));
    }

    async fetchNext($event: CustomEvent<void>) {
        let self=this;
        if (self.state.offset < self.state.total) {
            await this.fetchData();
        }else{
            self.state.disableLoad=true;
        }

        await ($event.target as HTMLIonInfiniteScrollElement).complete();
    }

    render() {
        let self = this;
        //<React.Fragment>
        //             </React.Fragment>
        return (
            <IonPage>
                <IonContent fullscreen>
                    <IonGrid>
                        <IonRow className="ion-padding ion-justify-content-center">
                            <IonCol size="12" sizeLg="8" sizeXl="6">
                                <IonSearchbar placeholder="Search Comics"
                                              value={self.state.title}
                                              onIonChange={e => self.setState({
                                                  doSearch:true,
                                                  title:e.detail.value!
                                              })}
                                              showCancelButton="focus" />
                                {(!self.state.title? self.state.comics :self.state.searchComics).map((comic:any, i:number)=>(
                                    <IonItem key={i}>
                                        <IonThumbnail slot="start">
                                            <img alt={"thumbnail_"+i} src={comic.thumbnail.path+'.'+comic.thumbnail.extension} />
                                        </IonThumbnail>
                                        <IonLabel>
                                            <h3>{comic.title}</h3>
                                            <p>Page count: {comic.pageCount}</p>
                                        </IonLabel>
                                        <IonButton color="secondary">
                                            <IonIcon icon={starOutline}/>
                                        </IonButton>
                                    </IonItem>
                                ))}
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                    <IonInfiniteScroll threshold="0px"
                                       disabled={self.state.disableLoad}
                                       onIonInfinite={(e: CustomEvent<void>) => self.fetchNext(e)}>
                        <IonInfiniteScrollContent
                            loadingSpinner="bubbles"
                            loadingText="Loading more comics...">
                        </IonInfiniteScrollContent>
                    </IonInfiniteScroll>
                </IonContent>
            </IonPage>

        );
    }
}


//
// export const Comics: React.FC = () => {
//     const [disableLoad, setDisableLoad]=useState<boolean>(false);
//     const [offset, setOffset] = useState<number>(0);
//     const [limit, setLimit] = useState<number>(5);
//     const [title,setTitle]=useState<string>('');
//     const [favorites,setFavorites]=useState<any[]>([]);
//
//     async function fetchData(title:string){
//         if (limit < users.length) {
//             console.log('Loading data...');
//             await wait(500);
//             // infiniteScroll.complete();
//             let favs = users.slice(offset,limit);
//             setFavorites([...favs]);
//             setDisableLoad(false);
//             setOffset(offset+5);
//             setLimit(limit+5);
//             console.log('Done');
//         } else {
//             console.log('No More Data');
//             setDisableLoad(true);
//         }
//         // let ts = "111111";
//         // let key = "57422c4803fb8c8b6625b7f8b6151a6f";
//         // let hash = "91147ef574e2e6026efd61f501616305";
//         // let url = `http://gateway.marvel.com/v1/public/comics?ts=${ts}&apikey=${key}&hash=${hash}`;
//         // if (title) url += '&title=' + title;
//         // if (offset) url += '&offset=' + offset;
//         // if (limit) url += '&limit=' + limit;
//         // console.log(url);
//         // const comics = await fetch(url);
//         // comics
//         //     .json()
//         //     .then(async (response:any)=>{
//         //         console.log(offset,limit, response.data.total);
//         //         setFavorites([...response.data.results]);
//         //         setDisableLoad(limit < response.data.total);
//         //         setOffset(offset+20);
//         //         setLimit(limit+20);
//         //         console.log(offset,limit);
//         //     })
//         //     .catch(err => console.error(err));
//         // setFavorites(favs.slice(offset, limit));
//
//     }
//
//     useIonViewWillEnter(async () => {
//         await fetchData(title);
//     });
//
//     async function searchNext($event: CustomEvent<void>) {
//         await fetchData(title);
//         await ($event.target as HTMLIonInfiniteScrollElement).complete();
//     }
//
//     return (
//         <React.Fragment>
//             <IonPage>
//                 <IonContent>
//                     <IonSearchbar placeholder="Search Comics"
//                                   value={title}
//                                   onIonChange={e => setTitle(e.detail.value!)}
//                                   showCancelButton="focus" />
//                     <IonGrid>
//                         <IonRow className="ion-padding ion-justify-content-center">
//                             <IonCol size="12" sizeLg="8" sizeXl="6">
//                                 {favorites.map((comic:any, i:number)=>(
//                                     <IonItem key={i}>
//                                         {comic.title}
//                                     </IonItem>
//                                 ))}
//                             </IonCol>
//                         </IonRow>
//                     </IonGrid>
//                     <IonInfiniteScroll threshold="100px"
//                                        disabled={disableLoad}
//                                        onIonInfinite={(e: CustomEvent<void>) => searchNext(e)}>
//                         <IonInfiniteScrollContent
//                             loadingSpinner="bubbles"
//                             loadingText="Loading more comics...">
//                         </IonInfiniteScrollContent>
//                     </IonInfiniteScroll>
//                 </IonContent>
//             </IonPage>
//         </React.Fragment>
//     );
// }