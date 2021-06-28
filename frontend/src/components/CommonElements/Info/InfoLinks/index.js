/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { InfoItem } from 'components';

import styles from './styles.module.scss';

const Links = (props) => {
    const { className, list } = props;

    if (!list || !list.length) return null;

    return (
        <div className={classNames(styles.languages, className)}>
            {list.map((link) => (
                <InfoItem key={link?.id} label={link?.linkType?.label} value={<a href={link?.link}>{link?.link}</a>} />
            ))}
        </div>
    );
};

Links.propTypes = {
    className: PropTypes.string,
    list: PropTypes.arrayOf(PropTypes.shape({
        email: PropTypes.string,
    })),
};

Links.defaultProps = {
    className: '',
    list: [],
};

export default Links;
