import {
    Route,
    Switch,
} from "react-router-dom";


interface RoutesProps {
    routes: any;
}

function Routes(props: RoutesProps) {
    const { routes } = props;
    console.log("routesroutes",routes)
    return (
        <Switch>
            {routes.map((route: any, i: any) => (
                <RouteWithSubRoutes key={i} {...route} />
            ))}
        </Switch>
    );
}

export default Routes;

function RouteWithSubRoutes(route: any) {
    console.log('route.path',route.path);
    return (
        <Route
            path={route.path}
            render={props => (
                // pass the sub-routes down to keep nesting
                <route.component {...props} routes={route.routes} />
            )}
        />
    );
}

