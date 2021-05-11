import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { capitalize } from 'lodash-es';
import { Avatar } from 'components';

import { useTranslate } from 'hooks';
import styles from './styles.module.scss';

const Name = (props) => {
    const { name, photos, sex, active, className } = props;
    const { translate } = useTranslate();

    return (
        <div className={classNames(styles.name, className)}>
            <Avatar src={photos?.[0]} />
            <div className={styles.texts}>
                <h5>{name}</h5>
                <p>
                    <span>
                        {active ? translate.Actives : translate.NotActives}
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
    sex: PropTypes.string,
    photos: PropTypes.arrayOf(PropTypes.string),
    active: PropTypes.bool,
};

Name.defaultProps = {
    className: '',
    name: '',
    sex: '',
    photos: [],
    active: false,
};

export default Name;
