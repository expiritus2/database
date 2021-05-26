import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './styles.module.scss';
import { CustomTabs } from '../index';

const ModalTabs = (props) => {
    const { className, tabs, ...otherProps } = props;

    return (
        <div className={classNames(styles.modalTabs, className)}>
            <CustomTabs
                tabsClassName={styles.tabs}
                tabs={tabs}
                tabClassName={styles.tab}
                activeTabClassName={styles.active}
                wrapperClassName={styles.tabsWrapper}
                contentWrapperClassName={styles.tabsContent}
                contentClassName={styles.content}
                {...otherProps}
            />
        </div>
    );
};

ModalTabs.propTypes = {
    className: PropTypes.string,
    tabs: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

ModalTabs.defaultProps = {
    className: '',
};

export default ModalTabs;
