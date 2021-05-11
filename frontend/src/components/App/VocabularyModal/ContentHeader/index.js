import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';

import { setVocabularyModeEffect } from 'store/effects/vocabulary';
import { Button } from 'components/Form-NEW';
import { useTranslate } from 'hooks';
import { getVocabularyModeSelector } from 'store/selectors/vocabulary';
import { ADD_MODE } from 'settings/constants/modes';

import styles from './styles.module.scss';

const ContentHeader = (props) => {
    const { className } = props;
    const { translate } = useTranslate();
    const dispatch = useDispatch();
    const vocabularyMode = useSelector(getVocabularyModeSelector);

    const onAdd = () => {
        const newMode = vocabularyMode === null ? ADD_MODE : null;
        dispatch(setVocabularyModeEffect({ mode: newMode }));
    };

    return (
        <div className={classNames(styles.contentHeader, className)}>
            <Button onClick={onAdd} title={vocabularyMode === ADD_MODE ? translate.Reset : translate.Add} />
        </div>
    );
};

ContentHeader.propTypes = {
    className: PropTypes.string,
};

ContentHeader.defaultProps = {
    className: '',
};

export default ContentHeader;
