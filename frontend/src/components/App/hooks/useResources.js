import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getResourcesSelector } from 'store/selectors/resources';
import { getVocabularyResourcesEffect } from 'store/effects/resources';
import { PENDING, IDLE } from 'settings/constants/apiState';

const useResources = () => {
    const dispatch = useDispatch();
    const resources = useSelector(getResourcesSelector);

    useEffect(() => dispatch(getVocabularyResourcesEffect()), []); // eslint-disable-line

    return { isPending: resources?.state === IDLE || resources?.state === PENDING };
};

export default useResources;
