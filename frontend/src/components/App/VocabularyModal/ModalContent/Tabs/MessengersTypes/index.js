import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { getVocabularyMessengerTypesSelector } from 'store/selectors/vocabulary';
import { getVocabularyMessengerTypesEffect, deleteVocabularyMessengerTypeEffect, updateVocabularyMessengerTypeEffect } from 'store/effects/vocabulary';
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

const MessengerTypes = (props) => {
    const { className, innerContentClassName, listClassName, elementClassName } = props;
    const dispatch = useDispatch();
    const { messengerTypes, isPending } = useSelector(getVocabularyMessengerTypesSelector);
    const scrollContainerRef = useRef();

    useEffect(() => {
        dispatch(getVocabularyMessengerTypesEffect());
    }, []); // eslint-disable-line

    const onUpdateHandler = ({ id, inputValue }, cb) => {
        const value = snakeCase(cyrillicToTranslit.transform(inputValue));
        dispatch(updateVocabularyMessengerTypeEffect({ id, label: inputValue, value }, {}, cb));
    };

    const onDeleteHandler = (item) => {
        dispatch(deleteVocabularyMessengerTypeEffect({ id: item?.id }));
    };

    const tabId = vocabularyTabsIds.messengerTypes;

    return (
        <div className={classNames(styles.messengerTypes, className, innerContentClassName)}>
            <ContentHeader activeTab={tabId} className={elementClassName} />
            <ScrollWrapper ref={scrollContainerRef}>
                <PendingWrapper isPending={isPending}>
                    <List
                        onUpdate={onUpdateHandler}
                        onDelete={onDeleteHandler}
                        className={classNames(listClassName)}
                        list={messengerTypes}
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

MessengerTypes.propTypes = {
    className: PropTypes.string,
    innerContentClassName: PropTypes.string,
    listClassName: PropTypes.string,
    elementClassName: PropTypes.string,
};

MessengerTypes.defaultProps = {
    className: '',
    innerContentClassName: '',
    listClassName: '',
    elementClassName: '',
};

export default MessengerTypes;
