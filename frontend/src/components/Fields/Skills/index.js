import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';

import { getVocabularySkillsEffect } from 'store/effects/vocabulary';
import { useTranslate } from 'hooks';
import { Select } from 'components/Form';
import { getVocabularySkillsSelector } from 'store/selectors/vocabulary';

const Skills = (props) => {
    const { className, onChange, value } = props;
    const dispatch = useDispatch();
    const { translate } = useTranslate();
    const { skills } = useSelector(getVocabularySkillsSelector);

    useEffect(() => {
        dispatch(getVocabularySkillsEffect({}, { silent: true }));
    }, []); // eslint-disable-line

    return (
        <div className={classNames(className)}>
            <Select
                multiple
                search
                label={translate.Skills}
                variant={Select.LIGHT_FULL}
                onChange={onChange}
                value={value}
                options={skills}
            />
        </div>
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
