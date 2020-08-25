import { createContext } from 'react';
import {RouteComponentProps} from './';

const RouterContext = createContext<RouteComponentProps>({});

export default RouterContext;