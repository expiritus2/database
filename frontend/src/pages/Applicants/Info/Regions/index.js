/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useTranslate } from 'hooks';
import { Item } from 'pages/Applicants/Info/components';

import styles from './styles.module.scss';

const Regions = (props) => {
    const { className, regions } = props;
    const { translate } = useTranslate();

    if (!regions || !regions.length) return null;

    return (
        <div className={classNames(styles.regions, className)}>
            <Item
                label={translate.Regions}
                value={regions.map(({ label }) => label).join(', ')}
            />
        </div>
    );
};

Regions.propTypes = {
    className: PropTypes.string,
    regions: PropTypes.arrayOf(PropTypes.shape({
        type: PropTypes.string,
        number: PropTypes.number,
    })).isRequired,
};

Regions.defaultProps = {
    className: '',
};

export default Regions;
