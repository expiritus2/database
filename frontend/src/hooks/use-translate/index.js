import { useContext } from 'react';

import translation from 'settings/translation';
import LocaleContext from 'contexts/locale';

const useTranslate = () => {
    const { locale, setLocale } = useContext(LocaleContext);

    return { translate: translation[locale], setLocale };
};

export default useTranslate;
