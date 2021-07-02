import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import JoditEditor from 'jodit-react';

import { useTranslate } from 'hooks';
import { InputLabel } from 'components/Form';

import styles from './styles.module.scss';

const InfoInput = (props) => {
    const { className, name, value, onChange } = props;
    const { translate } = useTranslate();
    const editor = useRef(null);

    const onChangeHandler = (newContent) => {
        const fakeEvent = { target: { value: newContent, name } };
        onChange(fakeEvent, newContent);
    };

    const config = {
        readonly: false, // all options from https://xdsoft.net/jodit/doc/
        minHeight: 400,
    };

    return (
        <div className={classNames(styles.infoInput, className)}>
            <InputLabel label={translate.Info} />
            <JoditEditor
                ref={editor}
                value={value}
                config={config}
                onBlur={onChangeHandler}
            />
        </div>
    );
};

InfoInput.propTypes = {
    className: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
};

InfoInput.defaultProps = {
    className: '',
    name: undefined,
    value: '',
    onChange: () => {},
};

export default InfoInput;
