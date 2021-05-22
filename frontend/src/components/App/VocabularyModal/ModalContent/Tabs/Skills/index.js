import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { getVocabularySkillsSelector } from 'store/selectors/vocabulary';
import { getVocabularySkillsEffect, deleteVocabularySkillEffect, updateVocabularySkillEffect } from 'store/effects/vocabulary';
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

const Skills = (props) => {
    const { className, innerContentClassName, listClassName, elementClassName } = props;
    const dispatch = useDispatch();
    const { skills, isPending } = useSelector(getVocabularySkillsSelector);
    const scrollContainerRef = useRef();

    useEffect(() => {
        dispatch(getVocabularySkillsEffect());
    }, []); // eslint-disable-line

    const onUpdateHandler = ({ id, inputValue }, cb) => {
        const value = snakeCase(cyrillicToTranslit.transform(inputValue));
        dispatch(updateVocabularySkillEffect({ id, label: inputValue, value }, {}, cb));
    };

    const onDeleteHandler = (item) => {
        dispatch(deleteVocabularySkillEffect({ id: item?.id }));
    };

    const tabId = vocabularyTabsIds.skills;

    return (
        <div className={classNames(styles.skills, className, innerContentClassName)}>
            <ContentHeader activeTab={tabId} className={elementClassName} />
            <ScrollWrapper ref={scrollContainerRef}>
                <PendingWrapper isPending={isPending}>
                    <List
                        onUpdate={onUpdateHandler}
                        onDelete={onDeleteHandler}
                        className={classNames(listClassName)}
                        list={skills}
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

Skills.propTypes = {
    className: PropTypes.string,
    innerContentClassName: PropTypes.string,
    listClassName: PropTypes.string,
    elementClassName: PropTypes.string,
};

Skills.defaultProps = {
    className: '',
    innerContentClassName: '',
    listClassName: '',
    elementClassName: '',
};

export default Skills;
