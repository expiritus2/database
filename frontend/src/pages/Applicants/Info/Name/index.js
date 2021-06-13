import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Avatar } from 'components';

import { useTranslate } from 'hooks';
import styles from './styles.module.scss';

const Name = (props) => {
    const { name, nameLat, photos, sex, inActiveSearch, className } = props;
    const { translate } = useTranslate();

    return (
        <div className={classNames(styles.name, className)}>
            <Avatar src={photos?.[0]?.url} />
            <div className={styles.texts}>
                <h2 className={styles.nameText}>{name}</h2>
                <p className={styles.nameLat}>{nameLat}</p>
                <p className={styles.inActiveSearch}>
                    {inActiveSearch ? translate.InActiveSearch : translate.InNotActiveSearch}
                </p>
                <p className={styles.sex}>{sex?.label}</p>
            </div>
        </div>
    );
};

Name.propTypes = {
    className: PropTypes.string,
    name: PropTypes.string,
    nameLat: PropTypes.string,
    sex: PropTypes.shape({
        label: PropTypes.string,
    }),
    photos: PropTypes.arrayOf(PropTypes.shape({
        url: PropTypes.string,
    })),
    inActiveSearch: PropTypes.bool,
};

Name.defaultProps = {
    className: '',
    name: '',
    nameLat: '',
    sex: '',
    photos: [],
    inActiveSearch: false,
};

export default Name;
