import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { Logger } from 'services';
import { getVocabularySkillsSelector } from 'store/selectors/vocabulary';
import { getVocabularySkillsEffect } from 'store/effects/vocabulary';
import ContentHeader from 'components/App/VocabularyModal/ContentHeader';
import AddMode from 'components/App/VocabularyModal/AddMode';
import List from 'components/App/VocabularyModal/List';
import { vocabularyTabsIds } from 'settings/constants/vocabulary';
import { PendingWrapper } from 'components';
import { PENDING } from 'settings/constants/apiState';
import ScrollWrapper from '../../ScrollWrapper';

import styles from './styles.module.scss';

const Skills = (props) => {
    const { className, innerContentClassName, listClassName, elementClassName } = props;
    const dispatch = useDispatch();
    const vocabularySkills = useSelector(getVocabularySkillsSelector);
    const scrollContainerRef = useRef();

    useEffect(() => {
        dispatch(getVocabularySkillsEffect());
    }, []); // eslint-disable-line

    const onEditHandler = (item) => {
        Logger.log('onEdit', item);
    };

    const onDeleteHandler = (item) => {
        Logger.log('onDelete', item);
    };

    const isPending = vocabularySkills.state === PENDING;

    return (
        <div className={classNames(styles.skills, className, innerContentClassName)}>
            <ContentHeader className={elementClassName} />
            <ScrollWrapper ref={scrollContainerRef}>
                <PendingWrapper isPending={isPending}>
                    <List
                        onEdit={onEditHandler}
                        onDelete={onDeleteHandler}
                        className={classNames(listClassName)}
                        list={vocabularySkills.data || []}
                    />
                </PendingWrapper>
            </ScrollWrapper>
            <AddMode
                scrollContainerRef={scrollContainerRef}
                className={elementClassName}
                activeTab={vocabularyTabsIds.skills}
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
