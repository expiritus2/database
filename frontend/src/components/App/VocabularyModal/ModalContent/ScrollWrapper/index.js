import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useSelector } from 'react-redux';
import { getVocabularyModeSelector } from 'store/selectors/vocabulary';
import { ADD } from 'settings/constants/mode';
import styles from './styles.module.scss';

const ScrollWrapper = forwardRef((props, ref) => {
    const { className, children } = props;
    const vocabularyMode = useSelector(getVocabularyModeSelector);

    return (
        <div
            ref={ref}
            className={classNames(
                styles.contentScrollWrapper,
                { [styles.addMode]: vocabularyMode === ADD },
                className,
            )}
        >
            {children}
        </div>
    );
});

ScrollWrapper.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
};

ScrollWrapper.defaultProps = {
    className: '',
};

export default ScrollWrapper;
