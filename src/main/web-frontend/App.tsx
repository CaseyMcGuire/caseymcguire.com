import * as React from "react";
import * as ReactDOM from "react-dom";
import {QueryRenderer, graphql} from "react-relay";
import {RelayConfig} from "relay/RelayConfig";
import {AppQuery} from "__generated__/AppQuery.graphql";
import {BrowserRouter, Switch, Route, Link} from "react-router-dom";
import {createUseStyles} from "react-jss";
import Foo from "pages/Foo";
import Page from "./pages/Page/Page";
import ResumePage from "./pages/Resume/Resume";


const styles = createUseStyles({
  foo: {
    color: 'blue',
    margin: '10px'
  },
  bar: {
    color: 'green',
    margin: '20px'
  },
  baz: {
    color: 'grey',
  }
});

export class App extends React.Component<{}> {
    render() {
        const query = graphql`
            query AppQuery {
                foo
            }
        `;

      return <QueryRenderer<AppQuery>
        environment={RelayConfig.getEnvironment()}
        query={query}
        variables={{}}
        render={({error, props}) => {
          if (props) {
            return <Body/>
          }
          return <div/>;
        }
        }
      />;
    }
}

const Body = () => {
  return (
    <BrowserRouter>
      <Page>
        <Switch>
          <Route exact path="/" component={Foo}/>
          <Route exact path="/there" component={Bar}/>
          <Route exact path="/foo_bar" component={Baz}/>
          <Route exact path="/resume" component={ResumePage} />
          <Route component={Forohfor}/>
        </Switch>
      </Page>
    </BrowserRouter>
  );
};

const Bar = () => {
  return <div className={styles().bar}>there</div>;
};

const Baz = () => {
  return <div className={styles().baz}>baz</div>;
};

const Forohfor = () => {
  return <div>404</div>;
};

ReactDOM.render(
  <App/>,
  document.getElementById("root")
);
