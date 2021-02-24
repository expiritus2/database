import { NotFound } from 'pages';
import commonRoutesConfig from './common';
import protectedRoutesConfig from './protected';

export default [
    ...commonRoutesConfig,
    ...protectedRoutesConfig,
    { path: '*', component: NotFound },
];
