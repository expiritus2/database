import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { capitalize } from 'lodash-es';
import { Avatar } from 'components';

import { useTranslate } from 'hooks';
import styles from './styles.module.scss';

const Name = (props) => {
    const { name, nameLat, photos, sex, inActiveSearch, className } = props;
    const { translate } = useTranslate();

    return (
        <div className={classNames(styles.name, className)}>
            <Avatar src={photos?.[0]} />
            <div className={styles.texts}>
                <h5>{name}</h5>
                <p>{nameLat}</p>
                <p>
                    <span>
                        {inActiveSearch ? translate.InActiveSearch : translate.InNotActiveSearch}
                    </span>
                </p>
                <p>
                    <span>
                        {translate[capitalize(sex)]}
                    </span>
                </p>
            </div>
        </div>
    );
};

Name.propTypes = {
    className: PropTypes.string,
    name: PropTypes.string,
    nameLat: PropTypes.string,
    sex: PropTypes.string,
    photos: PropTypes.arrayOf(PropTypes.string),
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
