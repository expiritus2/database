/* eslint-disable react/no-array-index-key */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useTranslate } from 'hooks';
import { Input, Select } from 'components/Form';

import { useDispatch, useSelector } from 'react-redux';
import { getVocabularyLinkTypesSelector } from 'store/selectors/vocabulary';
import { getVocabularyLinkTypesEffect } from 'store/effects/vocabulary';

import { emptyLink } from 'settings/constants/templates';
import styles from './styles.module.scss';

const Link = (props) => {
    const { className, value, onChange, menuTop } = props;
    const { translate } = useTranslate();

    const dispatch = useDispatch();
    const { linkTypes, isIdle } = useSelector(getVocabularyLinkTypesSelector);

    useEffect(() => {
        if (isIdle) {
            dispatch(getVocabularyLinkTypesEffect({}, { silent: true }));
        }
    }, []); // eslint-disable-line

    const onChangeLinkType = (event) => {
        onChange(event, { ...value, linkType: event.target.value });
    };

    const onChangeLink = (event) => {
        onChange(event, { ...value, link: event.target.value });
    };

    return (
        <div className={classNames(styles.inputWrapper, className)}>
            <div className={styles.block}>
                <Select
                    name="linkType"
                    label={translate.Type}
                    className={styles.type}
                    options={linkTypes}
                    onChange={onChangeLinkType}
                    value={value?.linkType || ''}
                    menuTop={menuTop}
                />
                <Input
                    label={translate.Link}
                    className={styles.link}
                    value={value?.link}
                    onChange={onChangeLink}
                />
            </div>
        </div>
    );
};

Link.propTypes = {
    className: PropTypes.string,
    value: PropTypes.shape({
        linkType: PropTypes.shape({}),
        link: PropTypes.string,
    }),
    onChange: PropTypes.func,
    menuTop: PropTypes.bool,
};

Link.defaultProps = {
    className: '',
    value: emptyLink,
    onChange: () => {},
    menuTop: false,
};

export default Link;
