import React, { useState } from 'react';
import * as toastr from 'toastr';

import LocaleContext from 'contexts/locale';
import { useResize } from 'hooks';
import ScreenContext from 'contexts/screen';
import { AppRouter, PendingWrapper } from 'components';
import { DEFAULT_LOCALE } from 'settings/constants/locale';
import useAuth from './hooks/useAuth';
import useResources from './hooks/useResources';

import Hint from './Hint';

import 'toastr/build/toastr.css';
import 'styles/global.scss';

import styles from './styles.module.scss';

toastr.options = {
    positionClass: 'toast-bottom-right',
};

const App = () => {
    const { screen } = useResize();
    const { isPending } = useAuth();
    const { isPending: isResourcesPending } = useResources();
    const [locale, setLocale] = useState(DEFAULT_LOCALE);

    if (isPending || isResourcesPending) {
        return <PendingWrapper className={styles.pendingWrapper} isPending={isPending} />;
    }

    return (
        <LocaleContext.Provider value={{ locale, setLocale }}>
            <ScreenContext.Provider value={{ screen }}>
                <AppRouter />
                <Hint />
            </ScreenContext.Provider>
        </LocaleContext.Provider>
    );
};

export default App;
