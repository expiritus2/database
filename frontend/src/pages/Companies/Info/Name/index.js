import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Avatar, NameText } from 'components';
import { useTranslate } from 'hooks';
import styles from './styles.module.scss';

const Name = (props) => {
    const { name, photos, active, className } = props;
    const { translate } = useTranslate();

    return (
        <div className={classNames(styles.name, className)}>
            <Avatar src={photos?.[0]?.url} />
            <div className={styles.texts}>
                <NameText className={styles.nameText}>{name}</NameText>
                <NameText className={styles.active}>
                    {active ? translate.SheActive : translate.SheNotActive}
                </NameText>
            </div>
        </div>
    );
};

Name.propTypes = {
    className: PropTypes.string,
    name: PropTypes.string,
    photos: PropTypes.arrayOf(PropTypes.shape({
        url: PropTypes.string,
    })),
    active: PropTypes.bool,
};

Name.defaultProps = {
    className: '',
    name: '',
    photos: [],
    active: false,
};

export default Name;
