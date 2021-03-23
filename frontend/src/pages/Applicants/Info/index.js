import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ScrollWrapper } from 'components';

import { useSelector } from 'react-redux';
import { getCurrentApplicantSelector } from 'store/selectors/applicant';

import Name from './Name';
import Actions from './Actions';
import Header from './Header';
import Empty from './Empty';

import styles from './styles.module.scss';

const Info = (props) => {
    const { className } = props;
    const applicant = useSelector(getCurrentApplicantSelector);

    return (
        <>
            <Header />
            {applicant ? (
                <>
                    <Actions />
                    <ScrollWrapper className={classNames(classNames(styles.info, styles.scroll), className)}>
                        <Name {...applicant} />
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
