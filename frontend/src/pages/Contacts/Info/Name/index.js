import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Avatar, NameText } from 'components';
import { useTranslate } from 'hooks';
import styles from './styles.module.scss';

const Name = (props) => {
    const { name, photos, active, className, company, sex } = props;
    const { translate } = useTranslate();

    return (
        <div className={classNames(styles.name, className)}>
            <Avatar src={photos?.[0]?.url} />
            <div className={styles.texts}>
                <NameText className={styles.nameText}>{name}</NameText>
                <NameText className={styles.companyName}>{company?.name}</NameText>
                <NameText className={styles.active}>
                    {active ? translate.Actives : translate.NotActives}
                </NameText>
                <p className={styles.sex}>{sex?.label}</p>
            </div>
        </div>
    );
};

Name.propTypes = {
    className: PropTypes.string,
    name: PropTypes.string,
    company: PropTypes.shape({
        name: PropTypes.string,
    }),
    sex: PropTypes.shape({
        label: PropTypes.string,
    }),
    photos: PropTypes.arrayOf(PropTypes.shape({
        url: PropTypes.string,
    })),
    active: PropTypes.bool,
};

Name.defaultProps = {
    className: '',
    name: '',
    company: null,
    sex: null,
    photos: [],
    active: false,
};

export default Name;
