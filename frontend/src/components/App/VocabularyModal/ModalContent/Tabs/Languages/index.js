import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { getVocabularyLanguagesSelector } from 'store/selectors/vocabulary';
import { getVocabularyLanguagesEffect, deleteVocabularyLanguageEffect, updateVocabularyLanguageEffect } from 'store/effects/vocabulary';
import ContentHeader from 'components/App/VocabularyModal/ContentHeader';
import AddMode from 'components/App/VocabularyModal/AddMode';
import List from 'components/App/VocabularyModal/List';
import { vocabularyTabsIds } from 'settings/constants/vocabulary';
import { PendingWrapper } from 'components';
import { snakeCase } from 'lodash-es';
import CyrillicToTranslit from 'cyrillic-to-translit-js';
import ScrollWrapper from '../../ScrollWrapper';

import styles from './styles.module.scss';

const cyrillicToTranslit = new CyrillicToTranslit();

const Languages = (props) => {
    const { className, innerContentClassName, listClassName, elementClassName } = props;
    const dispatch = useDispatch();
    const { languages, isPending } = useSelector(getVocabularyLanguagesSelector);
    const scrollContainerRef = useRef();

    useEffect(() => {
        dispatch(getVocabularyLanguagesEffect());
    }, []); // eslint-disable-line

    const onUpdateHandler = ({ id, inputValue }, cb) => {
        const value = snakeCase(cyrillicToTranslit.transform(inputValue));
        dispatch(updateVocabularyLanguageEffect({ id, label: inputValue, value }, {}, cb));
    };

    const onDeleteHandler = (item) => {
        dispatch(deleteVocabularyLanguageEffect({ id: item?.id }));
    };

    const tabId = vocabularyTabsIds.languages;

    return (
        <div className={classNames(styles.languages, className, innerContentClassName)}>
            <ContentHeader activeTab={tabId} className={elementClassName} />
            <ScrollWrapper ref={scrollContainerRef}>
                <PendingWrapper isPending={isPending}>
                    <List
                        onUpdate={onUpdateHandler}
                        onDelete={onDeleteHandler}
                        className={classNames(listClassName)}
                        list={languages}
                    />
                </PendingWrapper>
            </ScrollWrapper>
            <AddMode
                scrollContainerRef={scrollContainerRef}
                className={elementClassName}
                activeTab={tabId}
            />
        </div>
    );
};

Languages.propTypes = {
    className: PropTypes.string,
    innerContentClassName: PropTypes.string,
    listClassName: PropTypes.string,
    elementClassName: PropTypes.string,
};

Languages.defaultProps = {
    className: '',
    innerContentClassName: '',
    listClassName: '',
    elementClassName: '',
};

export default Languages;
