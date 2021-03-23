import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useDispatch } from 'react-redux';
import { PendingWrapper } from 'components';
import { MdRefresh } from 'react-icons/md';

import styles from './styles.module.scss';

const Refresh = (props) => {
    const { refreshEffect, className } = props;
    const [isPending, setIsPending] = useState(false);
    const dispatch = useDispatch();

    const onRefresh = () => {
        if (typeof refreshEffect === 'function') {
            setIsPending(true);
            dispatch(refreshEffect({}, {}, () => {
                setIsPending(false);
            }));
        }
    };

    return (
        <div onClick={onRefresh} className={classNames(styles.refresh, className)}>
            <PendingWrapper isPending={isPending} className={styles.pendingWrapper} loaderClassName={styles.loader}>
                <MdRefresh className={styles.icon} />
            </PendingWrapper>
        </div>
    );
};

Refresh.propTypes = {
    className: PropTypes.string,
    refreshEffect: PropTypes.func,
};

Refresh.defaultProps = {
    className: '',
    refreshEffect: undefined,
};

export default Refresh;
