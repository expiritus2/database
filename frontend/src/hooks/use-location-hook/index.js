import { LocationService } from 'services';
import { useLocation } from 'react-router-dom';

const locationSrv = new LocationService();

const useLocationHook = (options = {}) => {
    const location = useLocation();
    locationSrv.setLocation(location);

    return {
        location,
        query: locationSrv.getQuery(options),
        setQuery: locationSrv.setQuery,
        prepareSearch: locationSrv.prepareSearch,
        createUrlWithQuery: locationSrv.createUrlWithQuery,
    };
};

export default useLocationHook;
