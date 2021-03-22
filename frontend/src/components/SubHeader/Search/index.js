import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { FcSearch } from 'react-icons/fc';
import { useDispatch } from 'react-redux';
import { setSearchEffect } from 'store/effects/app';
import { useLocation, useHistory } from 'react-router-dom';
import { LocationService } from 'services';
import { useTranslate } from 'hooks';
import { Input } from 'components';

import styles from './styles.module.scss';

const locationService = new LocationService();

const Search = (props) => {
    const { className } = props;
    const { translate } = useTranslate();
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();

    useEffect(() => {
        dispatch(setSearchEffect({ string: locationService.getQuery()?.search || '' }));
    }, []); // eslint-disable-line

    locationService.setLocation(location);

    const onSearch = (event) => {
        const searchString = event.target.value;
        const urlWithQuery = locationService.setQuery({ search: searchString });
        dispatch(setSearchEffect({ string: searchString }));
        history.replace(urlWithQuery);
    };

    return (
        <div className={classNames(styles.searchWrapper, className)}>
            <Input
                label={translate.Search}
                type="search"
                onChange={onSearch}
                value={locationService.getQuery()?.search || ''}
            />
            <FcSearch className={styles.searchIcon} />
        </div>
    );
};

Search.propTypes = {
    className: PropTypes.string,
};

Search.defaultProps = {
    className: '',
};

export default Search;
