/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useTranslate } from 'hooks';
import { InfoItem } from 'components';

import styles from './styles.module.scss';

const InfoRecruiters = (props) => {
    const { className, list } = props;
    const { translate } = useTranslate();

    if (!list || !list.length) return null;

    const getValue = () => (
        <div>
            {list.map(({ id, email }) => (
                <div key={id} className={styles.link}>{email}</div>
            ))}
        </div>
    );

    return (
        <div className={classNames(styles.infoRecruiters, className)}>
            <InfoItem label={translate.Recruiters} value={getValue()} />
        </div>
    );
};

InfoRecruiters.propTypes = {
    className: PropTypes.string,
    list: PropTypes.arrayOf(PropTypes.shape({
        email: PropTypes.string,
    })),
};

InfoRecruiters.defaultProps = {
    className: '',
    list: [],
};

export default InfoRecruiters;
