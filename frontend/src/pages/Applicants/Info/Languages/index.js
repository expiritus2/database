/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useTranslate } from 'hooks';
import { InfoItem } from 'components';

import styles from './styles.module.scss';

const Languages = (props) => {
    const { className, list } = props;
    const { translate } = useTranslate();

    if (!list || !list.length) return null;

    const getValue = () => (
        <div className={styles.languageValue}>
            {list.map(({ id, language, languageLevel }) => (
                <div key={id}>{`${language?.label} - ${languageLevel?.label}`}</div>
            ))}
        </div>
    );

    return (
        <div className={classNames(styles.languages, className)}>
            <InfoItem label={translate.Languages} value={getValue()} />
        </div>
    );
};

Languages.propTypes = {
    className: PropTypes.string,
    list: PropTypes.arrayOf(PropTypes.shape({
        language: PropTypes.shape({}),
        languageLevel: PropTypes.shape({}),
    })),
};

Languages.defaultProps = {
    className: '',
    list: [],
};

export default Languages;
