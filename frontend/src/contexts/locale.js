import { createContext } from 'react';
import { DEFAULT_LOCALE } from 'settings/constants/locale';

export default createContext({ locale: DEFAULT_LOCALE, setLocale: () => {} });
