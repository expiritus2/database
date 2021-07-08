/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useTranslate } from 'hooks';
import { InfoItem } from 'components';

import styles from './styles.module.scss';

const InfoSkills = (props) => {
    const { className, list } = props;
    const { translate } = useTranslate();

    if (!list || !list.length) return null;

    return (
        <div className={classNames(styles.infoSkills, className)}>
            <InfoItem
                label={translate.Skills}
                value={list.map(({ label }) => label).join(', ')}
            />
        </div>
    );
};

InfoSkills.propTypes = {
    className: PropTypes.string,
    list: PropTypes.arrayOf(PropTypes.shape({
        type: PropTypes.string,
        number: PropTypes.number,
    })),
};

InfoSkills.defaultProps = {
    className: '',
    list: [],
};

export default InfoSkills;
