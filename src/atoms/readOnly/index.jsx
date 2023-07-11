import React from 'react';
import { string } from 'prop-types';
import Typography from '@Atoms/typography';
import styles from '@Styles/ReadOnly.module.scss';

const ReadOnly = ({ label, value, theme }) => {
  return (
    <div className={styles.readOnly}>
      {label && (
        <Typography variant="p" className={styles.label}>
          <span>{label} :</span>
        </Typography>
      )}
      <div className={`${styles.value} ${styles[theme]}`}>
        <Typography variant="p" className={styles.paragraph}>
          <span>{value}</span>
        </Typography>
      </div>
    </div>
  );
};

ReadOnly.defaultProps = {
  theme: 'secondary',
};

ReadOnly.propTypes = {
  label: string,
  value: string,
  theme: string,
};

export default ReadOnly;
