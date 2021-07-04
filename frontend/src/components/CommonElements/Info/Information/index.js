import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useTranslate } from 'hooks';
import { PaddingWrapper } from 'components';

import styles from './styles.module.scss';

const Information = (props) => {
    const { value, className } = props;
    const { translate } = useTranslate();

    return (
        <div className={classNames(styles.information, className)}>
            <PaddingWrapper>
                <div className={styles.title}>{translate.Info}</div>
                {/* eslint-disable-next-line react/no-danger */}
                <div className={styles.text} dangerouslySetInnerHTML={{ __html: value }} />
            </PaddingWrapper>
        </div>
    );
};

Information.propTypes = {
    className: PropTypes.string,
    value: PropTypes.string,
};

Information.defaultProps = {
    className: '',
    value: '',
};

export default Information;
