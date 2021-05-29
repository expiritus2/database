import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { FcSearch } from 'react-icons/fc';
import { useTranslate } from 'hooks';
import { Input } from 'components/Form-NEW';

import styles from './styles.module.scss';

const Search = (props) => {
    const { search, onSearch, className } = props;
    const [searchString, setSearchString] = useState(search?.string || '');
    const { translate } = useTranslate();

    const onSearchHandler = (event) => {
        setSearchString(event.target.value);
    };

    const onSearchAction = () => {
        onSearch(searchString);
    };

    const onKeyPress = (event) => {
        if (event.key === 'Enter') {
            onSearch(event.target.value);
        }
    };

    return (
        <div className={classNames(styles.searchWrapper, className)}>
            <Input
                placeholder={translate.Search}
                type="text"
                onChange={onSearchHandler}
                value={searchString}
                onKeyPress={onKeyPress}
            />
            <FcSearch onClick={onSearchAction} className={styles.searchIcon} />
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
