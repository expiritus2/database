import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getVocabularySelector } from 'store/selectors/vocabulary';
import { getVocabularyResourcesEffect } from 'store/effects/vocabulary';
import { PENDING, IDLE } from 'settings/constants/apiState';

const useResources = () => {
    const dispatch = useDispatch();
    const resources = useSelector(getVocabularySelector);

    useEffect(() => dispatch(getVocabularyResourcesEffect()), []); // eslint-disable-line

    return { isPending: resources?.state === IDLE || resources?.state === PENDING };
};

export default useResources;
