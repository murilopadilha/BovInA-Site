import React, { useState } from 'react';
import styles from './styles.module.css';

export default function Header({ page }) {

    return (
        <div className={styles.container}>
            {page}
        </div>
    )
}
