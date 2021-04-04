import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useSelector } from 'react-redux';
import { SubheaderWrapper } from 'components';

import Search from './Search';
import Active from './Active';
import Refresh from './Refresh';

import styles from './styles.module.scss';

const Header = (props) => {
    const { searchSelector, refreshEffect, className, onSearch, onActive } = props;
    const search = useSelector(searchSelector);

    const onSearchHandler = (searchString) => {
        onSearch({ string: searchString });
    };

    const onActiveHandler = (e, val) => {
        onActive({ active: val });
    };

    return (
        <SubheaderWrapper className={classNames(styles.header, className)}>
            <Search onSearch={onSearchHandler} search={search} className={styles.search} />
            <Active onChange={onActiveHandler} search={search} className={styles.actives} />
            <Refresh refreshEffect={refreshEffect} />
        </SubheaderWrapper>
    );
};

Header.propTypes = {
    className: PropTypes.string,
    searchSelector: PropTypes.func.isRequired,
    onSearch: PropTypes.func,
    onActive: PropTypes.func,
    refreshEffect: PropTypes.func.isRequired,
};

Header.defaultProps = {
    className: '',
    onSearch: () => {},
    onActive: () => {},
};

export default Header;
