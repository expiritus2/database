import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Avatar, NameText } from 'components';
import { useTranslate } from 'hooks';
import styles from './styles.module.scss';

const Name = (props) => {
    const { name, photo, active, className } = props;
    const { translate } = useTranslate();

    return (
        <div className={classNames(styles.name, className)}>
            <Avatar src={photo?.url} />
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
    photo: PropTypes.shape({
        url: PropTypes.string,
    }),
    active: PropTypes.bool,
};

Name.defaultProps = {
    className: '',
    name: '',
    photo: null,
    active: false,
};

export default Name;
