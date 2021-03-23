import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useDispatch, useSelector } from 'react-redux';
import { SubheaderWrapper } from 'components';

import Search from './Search';
import Active from './Active';
import Refresh from './Refresh';

import styles from './styles.module.scss';

const Header = (props) => {
    const { searchSelector, searchEffect, refreshEffect, className } = props;
    const dispatch = useDispatch();
    const search = useSelector(searchSelector);

    const onSearch = (event) => {
        const searchString = event.target.value;
        dispatch(searchEffect({ string: searchString }));
    };

    const onActive = (e, val) => {
        dispatch(searchEffect({ active: val }));
    };

    return (
        <SubheaderWrapper className={classNames(styles.header, className)}>
            <Search onSearch={onSearch} search={search} className={styles.search} />
            <Active onChange={onActive} search={search} className={styles.actives} />
            <Refresh refreshEffect={refreshEffect} />
        </SubheaderWrapper>
    );
};

Header.propTypes = {
    className: PropTypes.string,
    searchSelector: PropTypes.func.isRequired,
    searchEffect: PropTypes.func.isRequired,
    refreshEffect: PropTypes.func.isRequired,
};

Header.defaultProps = {
    className: '',
};

export default Header;
