import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getUserSelector } from 'store/selectors/auth';
import { getCurrentUserEffect } from 'store/effects/auth';
import { PENDING, IDLE } from 'settings/constants/apiState';

const useAuth = () => {
    const dispatch = useDispatch();
    const user = useSelector(getUserSelector);

    useEffect(() => dispatch(getCurrentUserEffect()), []); // eslint-disable-line

    return { isPending: user?.state === IDLE || user?.state === PENDING };
};

export default useAuth;
