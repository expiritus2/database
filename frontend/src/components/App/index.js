import React from 'react';
import * as toastr from 'toastr';

import { useResize } from 'hooks';
import ScreenContext from 'contexts/screen';

import { AppRouter } from 'components';
import Hint from './Hint';

import 'toastr/build/toastr.css';
import 'styles/global.scss';

toastr.options = {
    positionClass: 'toast-bottom-right',
};

const App = () => {
    const { screen } = useResize();

    return (
        <ScreenContext.Provider value={{ screen }}>
            <AppRouter />
            <Hint />
        </ScreenContext.Provider>
    );
};

export default App;
