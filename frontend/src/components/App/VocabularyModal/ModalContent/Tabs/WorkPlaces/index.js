import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { getVocabularyWorkPlacesSelector } from 'store/selectors/vocabulary';
import { getVocabularyWorkPlacesEffect, deleteVocabularyWorkPlaceEffect, updateVocabularyWorkPlaceEffect } from 'store/effects/vocabulary';
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

const WorkPlaces = (props) => {
    const { className, innerContentClassName, listClassName, elementClassName } = props;
    const dispatch = useDispatch();
    const { workPlaces, isPending } = useSelector(getVocabularyWorkPlacesSelector);
    const scrollContainerRef = useRef();

    useEffect(() => {
        dispatch(getVocabularyWorkPlacesEffect());
    }, []); // eslint-disable-line

    const onUpdateHandler = ({ id, inputValue }, cb) => {
        const value = snakeCase(cyrillicToTranslit.transform(inputValue));
        dispatch(updateVocabularyWorkPlaceEffect({ id, label: inputValue, value }, {}, cb));
    };

    const onDeleteHandler = (item) => {
        dispatch(deleteVocabularyWorkPlaceEffect({ id: item?.id }));
    };

    const tabId = vocabularyTabsIds.workPlaces;

    return (
        <div className={classNames(styles.workPlaces, className, innerContentClassName)}>
            <ContentHeader activeTab={tabId} className={elementClassName} />
            <ScrollWrapper ref={scrollContainerRef}>
                <PendingWrapper isPending={isPending}>
                    <List
                        onUpdate={onUpdateHandler}
                        onDelete={onDeleteHandler}
                        className={classNames(listClassName)}
                        list={workPlaces}
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

WorkPlaces.propTypes = {
    className: PropTypes.string,
    innerContentClassName: PropTypes.string,
    listClassName: PropTypes.string,
    elementClassName: PropTypes.string,
};

WorkPlaces.defaultProps = {
    className: '',
    innerContentClassName: '',
    listClassName: '',
    elementClassName: '',
};

export default WorkPlaces;
