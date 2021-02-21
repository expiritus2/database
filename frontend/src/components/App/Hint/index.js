/* eslint-disable react/no-danger */
import React from 'react';
import ReactHintFactory from 'react-hint';

import 'react-hint/css/index.css';
import styles from './styles.module.scss';
import './styles.scss';

const ReactHint = ReactHintFactory(React);

const Hint = () => {
    const onRenderContent = (target, content) => {
        const customContent = target.querySelector('.hintContent');

        if (customContent) {
            return (
                <div className={styles.hint} dangerouslySetInnerHTML={{ __html: customContent.innerHTML }} />
            );
        }

        return <div className={styles.hint}>{content}</div>;
    };

    return (
        <ReactHint
            autoPosition
            events={{ hover: true, focus: true }}
            onRenderContent={onRenderContent}
        />
    );
};

export default Hint;
