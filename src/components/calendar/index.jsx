/*
 * File: index.jsx
 * Project: codelabs-boilderplate
 * Created Date: Sat Sep 10 2022 2:41:52 AM
 * Author: Mohammed Parveez <ahamed.parveez@gmail.com>
 * ------------------------------------
 *
 * Copyright (c) 2022 All rights reserved by Codelabs
 * ------------------------------------
 */

// References can be pulled from below :
// https://codesandbox.io/u/hendalGit
// https://codesandbox.io/s/sj24v?file=/src/App.js
// https://codesandbox.io/u/kaioduarte
// Type definitions for react-date-range 1.4
// Project: https://github.com/hypeserver/react-date-range
// Definitions by: Junbong Lee <https://github.com/Junbong>
//                 Minseok Choi <https://github.com/Curzy>
//                 John Demetriou <https://github.com/DemetriouJohn>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// https://hypeserver.github.io/react-date-range/  -- documentation url
// TypeScript Version: 2.8

// css - globals.css'; // calendar.module.css

import React, { useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import { addDays, format } from 'date-fns';
// import { useRouter } from 'next/router';
// import * as daterange from 'react-date-range';
import moment from 'moment';
// import Buttons from '@Atoms/button';
// import { Row } from 'antd';
// import styles from '@Styles/Calendar.module.scss';
import { array, func } from 'prop-types';
import FooterTimeline from '@Atoms/footerTimeline';
import { useEffect } from 'react';

function Calendar({ callSetDate, eventsData }) {
  const [state, setState] = useState({
    selection1: {
      startDate: addDays(new Date(), -6),
      endDate: new Date(),
      key: 'selection1',
    },
    selection2: {
      // startDate: d.setDate(d.getDate() + 7),
      startDate: addDays(new Date(), 8),
      endDate: addDays(new Date(), 38),
      key: 'selection2',
    },
  });

  useEffect(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
  }, []);

  const dateFormat = 'DD MM YYYY';

  const customDayContent = (day) => {
    let extraDot = null;
    eventsData?.map((item) => {
      let sd = moment.unix(item.eventStartDate).format(dateFormat);
      let ed = moment.unix(item.eventEndDate).format(dateFormat);

      if (sd == moment(day).format(dateFormat)) {
        extraDot = (
          <div
            style={{
              height: '5px',
              width: '5px',
              borderRadius: '100%',
              background: 'orange',
              position: 'absolute',
              top: 2,
              right: 2,
            }}
          />
        );
      }
      if (ed == moment(day).format(dateFormat)) {
        extraDot = (
          <div
            style={{
              height: '5x',
              width: '5px',
              borderRadius: '100%',
              background: 'red',
              position: 'absolute',
              top: 2,
              right: 2,
            }}
          />
        );
      }

      // if (isWeekend(day)) {
      //   extraDot = (
      //     <div
      //       style={{
      //         height: '5px',
      //         width: '5px',
      //         borderRadius: '100%',
      //         background: 'orange',
      //         position: 'absolute',
      //         top: 2,
      //         right: 2,
      //       }}
      //     />
      //   );
      // }
    });

    return (
      <div>
        {extraDot}
        <span>{format(day, 'd')}</span>
      </div>
    );
  };

  const onChangeDateRange = (range) => {
    setState({ ...state, ...range });
    callSetDate(range);
  };

  // const handleContinue = () => {
  //   router.push('/cart');
  // };

  // const handleBack = () => {
  //   router.push('/store-details');
  // };

  return (
    <>
      <DateRangePicker
        onChange={onChangeDateRange}
        // onChange={item => setState({ ...state, ...item })}
        showSelectionPreview={true}
        moveRangeOnFirstSelection={false}
        months={3}
        // staticRanges={[]} // thisis for in calendar left nav - last item days upto today
        // inputRanges={[]}// thisis for in calendar left nav - last item days starting today
        // dayHovered={onDayHover}
        ranges={[state.selection2]}
        // ranges={[state.selection1, state.selection2]}
        direction="horizontal"
        dayContentRenderer={customDayContent}
        minDate={addDays(new Date(), 8)}
        ariaLabels={{
          dateInput: {
            selection1: {
              startDate: 'start date input of selction 1',
              endDate: 'end date input of selction 1',
            },
            selection2: {
              startDate: 'start date input of selction 2',
              endDate: 'end date input of selction 2',
            },
          },
          monthPicker: 'month picker',
          yearPicker: 'year picker',
          prevButton: 'previous month button',
          nextButton: 'next month button',
        }}
        staticRanges={[
          // ...daterange.defaultStaticRanges,
          {
            label: '1 month',
            range: () => ({
              startDate: addDays(new Date(), 8),
              endDate: addDays(new Date(), 38),
            }),
            isSelected() {
              return true;
            },
          },
          {
            label: '3 months',
            range: () => ({
              startDate: addDays(new Date(), 8),
              endDate: addDays(new Date(), 98),
            }),
            isSelected() {
              return true;
            },
          },
          {
            label: '6 months',
            range: () => ({
              startDate: addDays(new Date(), 8),
              endDate: addDays(new Date(), 188),
            }),
            isSelected() {
              return true;
            },
          },
        ]}
      />

      <FooterTimeline active="Planning" nextRoute="/cart" />
      {/* <Row className={`${styles.footer} fullwidth`} justify="space-between">
        <Buttons
          size="small"
          action="submit"
          processingLabel="Please wait..."
          onClick={() => handleBack()}
        >
          Back
        </Buttons>
        <Buttons
          size="small"
          action="submit"
          disabled={!canShowContinue}
          processingLabel="Please wait..."
          onClick={() => handleContinue()}
        >
          Continue
        </Buttons>
      </Row> */}
    </>
  );
}

Calendar.propTypes = {
  callSetDate: func,
  eventsData: array,
};

export default Calendar;
