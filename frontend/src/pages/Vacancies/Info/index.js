/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ScrollWrapper, InfoItem, PendingWrapper, InfoRecruiters, InfoRegions, InfoSkills } from 'components';

import { useSelector } from 'react-redux';
import { getCurrentVacancySelector } from 'store/selectors/vacancy';
import { useTranslate } from 'hooks';

import Actions from './Actions';
import Header from './Header';
import Empty from './Empty';

import Position from './Position';
import Active from './Active';
import Information from './Information';
import { SalaryValue } from '../components';

import styles from './styles.module.scss';

const Info = (props) => {
    const { className } = props;
    const { translate } = useTranslate();
    const { vacancy, isPending } = useSelector(getCurrentVacancySelector);

    return (
        <>
            <Header />
            {vacancy || isPending ? (
                <>
                    {!isPending && <Actions />}
                    <ScrollWrapper className={classNames(classNames(styles.info, styles.scroll), className)}>
                        <PendingWrapper isPending={isPending} className={styles.pendingWrapper}>
                            <div className={styles.head}>
                                <Position position={vacancy?.position} />
                                <Active value={vacancy?.active} />
                            </div>
                            <InfoRecruiters value={vacancy?.users} />
                            <InfoItem label={translate.Company} value={vacancy?.company?.name} />
                            <InfoItem
                                label={translate.Salary}
                                value={(
                                    <SalaryValue
                                        value={vacancy?.salaryRange}
                                        currency={vacancy?.salaryRange?.currency?.label}
                                    />
                                )}
                            />
                            <InfoItem label={translate.ExperienceYears} value={vacancy?.experienceYears} />
                            <InfoSkills skills={vacancy?.skills} />
                            <InfoRegions regions={vacancy?.regions} />
                            <InfoItem
                                label={translate.Place}
                                value={vacancy?.workPlaces?.map((place) => place?.label).join(', ')}
                            />
                            <InfoItem
                                label={translate.WorkSchedule}
                                value={vacancy?.workSchedules?.map((item) => item?.label).join(', ')}
                            />
                            <Information value={vacancy?.info} />
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
