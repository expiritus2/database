import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useTranslate } from 'hooks';
import { BaseAutocomplete } from 'components/index';

const Skills = (props) => {
    const { className, onChange, value } = props;

    const { translate } = useTranslate();

    return (
        <BaseAutocomplete
            label={translate.Skills}
            className={classNames(className)}
            onChange={onChange}
            value={value}
            options={[]}
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
