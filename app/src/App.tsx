import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonLoading,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import SignOut from "./pages/auth/SignOut";
import Library from "./pages/library/Library";
import {Comics} from "./pages/library/Comics";

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

import {bookOutline, enterOutline, lockClosedOutline, logOutOutline, searchOutline} from "ionicons/icons";
import AppContext from "./data/context";
import {http404} from "./pages/fallback/404";


class App extends React.Component<any,any> {
  static contextType = AppContext;
  state = {
    loading:true,
  }

  componentDidMount() {
    let self = this;
    self.context.api.loggedIn().then((res:boolean)=>{
      self.context.validJwt = res;
    }).finally(()=>{
      self.setState({
        loading:false
      })
    });
  }

  publicRoutes(){
    return (
        <IonReactRouter>
          <IonTabs>
            <IonRouterOutlet>
              <Switch>
                <Route component={http404}/>
              </Switch>
              <Route path="/signin" component={SignIn} exact={true} />
              <Route path="/signup" component={SignUp} exact={true} />
              <Route path="/" render={() => <Redirect to="/signin" />} exact={true} />
              <Route path="/404" component={http404}/>
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
              <IonTabButton key="tab1" tab="tab1" href="/signin">
                <IonIcon icon={lockClosedOutline} />
                <IonLabel>Sign In</IonLabel>
              </IonTabButton>,
              <IonTabButton key="tab2" tab="tab2" href="/signup">
                <IonIcon icon={enterOutline} />
                <IonLabel>Sign Up</IonLabel>
              </IonTabButton>,
            </IonTabBar>
          </IonTabs>
        </IonReactRouter>
    );
  }

  privateRoutes(){
    return (
        <IonReactRouter>
          <IonTabs>
            <IonRouterOutlet>
              <Switch>
                <Route component={http404}/>
              </Switch>
              <Route path="/library" component={Library} exact={true} />
              <Route path="/comics" component={Comics} exact={true} />
              <Route path="/exit" component={SignOut} exact={true} />
              <Route path="/" render={() => <Redirect to="/library" />} exact={true} />
              <Route path="/404" component={http404}/>
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
              <IonTabButton key="tab3" tab="tab3" href="/library">
                <IonIcon icon={bookOutline} />
                <IonLabel>Library</IonLabel>
              </IonTabButton>,
              <IonTabButton key="tab4" tab="tab4" href="/comics">
                <IonIcon icon={searchOutline} />
                <IonLabel>Comics</IonLabel>
              </IonTabButton>
              <IonTabButton key="tab5" tab="tab5" href="/exit">
                <IonIcon icon={logOutOutline} />
                <IonLabel>Sign Out</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonReactRouter>
    );
  }

  render() {
    let self = this;

    if(self.state.loading)
      return (<IonApp><IonLoading isOpen={true} message="Starting App..." /></IonApp>)
    else
      return (
          <IonApp>
            {self.context.validJwt? self.privateRoutes() : self.publicRoutes()}
          </IonApp>
      );
  }
}

export default App;
