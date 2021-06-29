/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { InfoItem } from 'components';

import styles from './styles.module.scss';

const InfoLinks = (props) => {
    const { className, list } = props;

    if (!list || !list.length) return null;

    return (
        <div className={classNames(styles.infoLinks, className)}>
            {list.map((link) => (
                <InfoItem
                    key={link?.id}
                    label={link?.linkType?.label}
                    value={<a target="_blank" rel="noreferrer" href={link?.link}>{link?.link}</a>}
                />
            ))}
        </div>
    );
};

InfoLinks.propTypes = {
    className: PropTypes.string,
    list: PropTypes.arrayOf(PropTypes.shape({
        email: PropTypes.string,
    })),
};

InfoLinks.defaultProps = {
    className: '',
    list: [],
};

export default InfoLinks;
