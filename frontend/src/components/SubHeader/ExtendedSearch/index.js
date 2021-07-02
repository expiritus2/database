import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';

import { openApplicantSearchDrawerEffect } from 'store/effects/drawers';
import { GiHamburgerMenu } from 'react-icons/gi';

import styles from './styles.module.scss';

const ExtendedSearch = (props) => {
    const { className } = props;
    const dispatch = useDispatch();

    const onClick = () => {
        dispatch(openApplicantSearchDrawerEffect({ open: true }));
    };

    return (
        <div className={classNames(styles.extendedSearch, className)}>
            <GiHamburgerMenu onClick={onClick} className={styles.icon} />
        </div>
    );
};

ExtendedSearch.propTypes = {
    className: PropTypes.string,
};

ExtendedSearch.defaultProps = {
    className: '',
};

export default ExtendedSearch;
