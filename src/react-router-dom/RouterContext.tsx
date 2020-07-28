import { createContext } from 'react';
import {RouterContextValue} from './';

const RouterContext = createContext<RouterContextValue>({});

export default RouterContext;