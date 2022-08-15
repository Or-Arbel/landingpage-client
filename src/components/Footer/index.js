import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <h5>
        מנוהל ע"י מחלקת תקשוב והתרעה, ענף התרעה וטכנולוגיות, מדור פיתוח שו"ב
      </h5>

      <div className={styles.content}>
        <div className={styles.contact}>
          <p>קישורים</p>
          <ul>
            <li>
              <Link to="/">דף הבית</Link>
            </li>
            <li>
              <Link to="/shob">מעבדת פיתוח שו"ב</Link>
            </li>
            <li>
              <Link to="/report">דיווח תקלה</Link>
            </li>
          </ul>
        </div>

        <div className={styles.contact}>
          <p>צרו קשר</p>
          <ul>
            <li>
              <a href="mailto:Niroren@gmail.com">Niroren@gmail.com (אזרחי)</a>
            </li>
            <li>
              <a href="tel:+97252-8342580">052-8342580 (ניר)</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
