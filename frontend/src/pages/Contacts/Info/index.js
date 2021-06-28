/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ScrollWrapper, PendingWrapper, InfoEmails, InfoPositions, InfoPhones, InfoItem } from 'components';

import { useSelector } from 'react-redux';
import { getCurrentContactSelector } from 'store/selectors/contact';

import { useTranslate } from 'hooks';
import { getDate } from 'helpers/date';
import Actions from './Actions';
import Header from './Header';
import Empty from './Empty';

import styles from './styles.module.scss';
import Name from './Name';

const Info = (props) => {
    const { className } = props;
    const { contact, isPending } = useSelector(getCurrentContactSelector);
    const { translate } = useTranslate();

    return (
        <>
            <Header />
            {contact || isPending ? (
                <>
                    <Actions />
                    <ScrollWrapper className={classNames(classNames(styles.info, styles.scroll), className)}>
                        <PendingWrapper isPending={isPending}>
                            <Name {...contact} />
                            <InfoEmails emails={contact?.emails} />
                            <InfoPositions positions={contact?.positions} />
                            <InfoPhones phones={contact?.phones} />
                            <InfoItem label={translate.BirthDate} value={getDate(contact?.birthDate)} />
                        </PendingWrapper>
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
