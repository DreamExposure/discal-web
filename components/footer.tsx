import styles from "../styles/Home.module.css";
import * as React from 'react';


function BrandingRow() {
    return <div className={"flex flex-col"}>
        <div>1</div>
        <div>2</div>
        <div>3</div>
    </div>
}

export default function Footer() {
    return <footer className={styles.footer}>
        <div className="flex flex-row">
            <BrandingRow/>
            <BrandingRow/>
            <BrandingRow/>
        </div>
    </footer>
}

