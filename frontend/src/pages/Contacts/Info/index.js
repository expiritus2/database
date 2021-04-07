/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ScrollWrapper } from 'components';

import { useSelector } from 'react-redux';
import { getCurrentContactSelector } from 'store/selectors/contact';
// import { useTranslate } from 'hooks';

import Actions from './Actions';
import Header from './Header';
import Empty from './Empty';

import styles from './styles.module.scss';

const Info = (props) => {
    const { className } = props;
    // const { translate } = useTranslate();
    const contact = useSelector(getCurrentContactSelector);

    return (
        <>
            <Header />
            {contact ? (
                <>
                    <Actions />
                    <ScrollWrapper className={classNames(classNames(styles.info, styles.scroll), className)}>
                        <div className={styles.details}>
                            Details
                        </div>
                    </ScrollWrapper>
                </>
            ) : <Empty />}
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
