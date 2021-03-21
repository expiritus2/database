import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ScrollWrapper } from 'components';

import styles from './styles.module.scss';
import Header from './Header';
import Actions from './Actions';

const Info = (props) => {
    const { className } = props;

    return (
        <>
            <Header />
            <Actions />
            <ScrollWrapper className={classNames(classNames(styles.info, styles.scroll), className)}>
                Base Component
            </ScrollWrapper>
        </>
    );
};

Info.propTypes = {
    className: PropTypes.string,
};

Info.defaultProps = {
    className: '',
};

export default Info;
