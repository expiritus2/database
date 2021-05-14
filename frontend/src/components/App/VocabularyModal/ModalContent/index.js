import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { CustomTabs } from 'components';
import { useTranslate } from 'hooks';
import { getVocabularyTabs } from 'settings/constants/vocabulary';

import styles from './styles.module.scss';

const ModalContent = (props) => {
    const { className } = props;
    const { translate } = useTranslate();

    return (
        <div className={classNames(styles.modalContent, className)}>
            <CustomTabs
                direction={CustomTabs.DIRECTION_VERTICAL}
                tabsClassName={styles.tabs}
                tabClassName={styles.tab}
                wrapperClassName={styles.tabsWrapper}
                tabs={getVocabularyTabs(translate)}
                contentClassName={styles.tabsContentClassName}
                innerContentClassName={styles.innerContentClassName}
                listClassName={styles.listClassName}
                elementClassName={styles.elementClassName}
            />
        </div>
    );
};

ModalContent.propTypes = {
    className: PropTypes.string,
};

ModalContent.defaultProps = {
    className: '',
};

export default ModalContent;
