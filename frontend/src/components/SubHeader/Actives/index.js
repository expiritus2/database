import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';

import { Checkbox } from 'components';
import { setSearchEffect } from 'store/effects/app';
import { getSearchSelector } from 'store/selectors/app';

import styles from './styles.module.scss';

const Actives = (props) => {
    const { className } = props;
    const dispatch = useDispatch();
    const search = useSelector(getSearchSelector);

    return (
        <div className={classNames(styles.actives, className)}>
            <Checkbox
                onChange={(e, val) => {
                    dispatch(setSearchEffect({ active: val }));
                }}
                checked={search?.active}
            />
        </div>
    );
};

Actives.propTypes = {
    className: PropTypes.string,
};

Actives.defaultProps = {
    className: '',
};

export default Actives;
