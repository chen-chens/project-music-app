interface BasicRoutes{
    path: string;
    element: JSX.Element;
}

export interface RoutesType extends BasicRoutes{
    children?: BasicRoutes[];
}