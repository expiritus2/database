import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { FcSearch } from 'react-icons/fc';
import { useTranslate } from 'hooks';
import { Input } from 'components';

import styles from './styles.module.scss';

const Search = (props) => {
    const { search, onSearch, className } = props;
    const { translate } = useTranslate();

    return (
        <div className={classNames(styles.searchWrapper, className)}>
            <Input
                label={translate.Search}
                type="search"
                onChange={onSearch}
                value={search?.string || ''}
            />
            <FcSearch className={styles.searchIcon} />
        </div>
    );
};

Search.propTypes = {
    className: PropTypes.string,
    search: PropTypes.shape({
        string: PropTypes.string,
    }).isRequired,
    onSearch: PropTypes.func,
};

Search.defaultProps = {
    className: '',
    onSearch: () => {},
};

export default Search;
