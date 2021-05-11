import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// import { useSelector } from 'react-redux';
import { Logger } from 'services';
// import { getVocabularySkillsSelector } from 'store/selectors/vocabulary';

import ContentHeader from '../../../ContentHeader';
import AddMode from '../../../AddMode';
import List from '../../../List';

import styles from './styles.module.scss';

const Skills = (props) => {
    const { className, innerContentClassName, listClassName, elementClassName } = props;
    // const vocabularySkills = useSelector(getVocabularySkillsSelector);

    const onEditHandler = (item) => {
        Logger.log('onEdit', item);
    };

    const onDeleteHandler = (item) => {
        Logger.log('onDelete', item);
    };

    return (
        <div className={classNames(styles.skills, className, innerContentClassName)}>
            <ContentHeader className={elementClassName} />
            <List
                onEdit={onEditHandler}
                onDelete={onDeleteHandler}
                className={classNames(listClassName)}
                list={[
                    { id: 1, label: 'Test Skill', value: 'test_skill' },
                    { id: 2, label: 'Test Skill2', value: 'test_skill2' },
                    { id: 3, label: 'Test Skill3', value: 'test_skill3' },
                ]}
            />
            <AddMode className={elementClassName} />
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
