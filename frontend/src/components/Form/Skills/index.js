import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';

import { getVocabularySkillsEffect } from 'store/effects/vocabulary';
import { useTranslate } from 'hooks';
import { BaseAutocomplete } from 'components/index';
import { getVocabularySkillsSelector } from 'store/selectors/vocabulary';

const Skills = (props) => {
    const { className, onChange, value } = props;
    const dispatch = useDispatch();
    const { translate } = useTranslate();
    const skills = useSelector(getVocabularySkillsSelector);

    useEffect(() => {
        dispatch(getVocabularySkillsEffect({}, { silent: true }));
    }, []); // eslint-disable-line

    return (
        <BaseAutocomplete
            label={translate.Skills}
            className={classNames(className)}
            onChange={onChange}
            value={value}
            options={skills}
            convertTitleCaseIfNew={false}
        />
    );
};

Skills.propTypes = {
    className: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.arrayOf(PropTypes.shape({})),
};

Skills.defaultProps = {
    className: '',
    onChange: () => {},
    value: undefined,
};

export default Skills;
