import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Input } from 'components/Form-NEW';

import styles from './styles.module.scss';

const Item = (props) => {
    const { label, className, onClick, editMode, currentItem, index, onUpdate } = props;
    const [inputValue, setInputValue] = useState(label);

    const onKeyPress = (event) => {
        if (event.key === 'Enter') {
            onUpdate({ id: currentItem?.item?.id, inputValue });
        }
    };

    const onBlur = () => {
        onUpdate({ id: currentItem?.item?.id, inputValue });
    };

    const onChange = (event) => {
        setInputValue(event.target.value);
    };

    const isEditableField = editMode && currentItem?.index === index;

    return (
        <li
            className={classNames(styles.item, { [styles.editMode]: isEditableField }, className)}
            onClick={onClick}
        >
            {isEditableField
                ? (
                    <Input
                        className={styles.inputField}
                        onChange={onChange}
                        onKeyPress={onKeyPress}
                        onBlur={onBlur}
                        value={inputValue}
                        autofocus
                    />
                ) : label}
        </li>

    );
};

Item.propTypes = {
    className: PropTypes.string,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    editMode: PropTypes.bool,
    currentItem: PropTypes.shape({
        item: PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        }),
        index: PropTypes.number,
    }),
    index: PropTypes.number.isRequired,
    onUpdate: PropTypes.func,
};

Item.defaultProps = {
    className: '',
    editMode: false,
    currentItem: null,
    onUpdate: () => {},
};

export default Item;
