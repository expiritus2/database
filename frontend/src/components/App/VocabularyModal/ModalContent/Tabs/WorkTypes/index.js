import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { getVocabularyWorkTypesSelector } from 'store/selectors/vocabulary';
import { getVocabularyWorkTypesEffect, deleteVocabularyWorkTypeEffect, updateVocabularyWorkTypeEffect } from 'store/effects/vocabulary';
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

const WorkTypes = (props) => {
    const { className, innerContentClassName, listClassName, elementClassName } = props;
    const dispatch = useDispatch();
    const { workTypes, isPending } = useSelector(getVocabularyWorkTypesSelector);
    const scrollContainerRef = useRef();

    useEffect(() => {
        dispatch(getVocabularyWorkTypesEffect());
    }, []); // eslint-disable-line

    const onUpdateHandler = ({ id, inputValue }, cb) => {
        const value = snakeCase(cyrillicToTranslit.transform(inputValue));
        dispatch(updateVocabularyWorkTypeEffect({ id, label: inputValue, value }, {}, cb));
    };

    const onDeleteHandler = (item) => {
        dispatch(deleteVocabularyWorkTypeEffect({ id: item?.id }));
    };

    const tabId = vocabularyTabsIds.workTypes;

    return (
        <div className={classNames(styles.workTypes, className, innerContentClassName)}>
            <ContentHeader activeTab={tabId} className={elementClassName} />
            <ScrollWrapper ref={scrollContainerRef}>
                <PendingWrapper isPending={isPending}>
                    <List
                        onUpdate={onUpdateHandler}
                        onDelete={onDeleteHandler}
                        className={classNames(listClassName)}
                        list={workTypes}
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

WorkTypes.propTypes = {
    className: PropTypes.string,
    innerContentClassName: PropTypes.string,
    listClassName: PropTypes.string,
    elementClassName: PropTypes.string,
};

WorkTypes.defaultProps = {
    className: '',
    innerContentClassName: '',
    listClassName: '',
    elementClassName: '',
};

export default WorkTypes;
