import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";
// import { linksData } from '../linksData';
import CircularProgress from "@mui/material/CircularProgress";
import useHttp from "../../Hooks/use-http";

const LinksList = () => {
  const [links, setLinks] = useState();

  const { isLoading, error, sendRequest: fetchLinks } = useHttp();

  useEffect(() => {
    const renderLinks = (fetchedData) => {
      setLinks(fetchedData.data);
    };

    fetchLinks(
      { url: `${process.env.REACT_APP_SERVER_URL}api/links` },
      renderLinks
    );
  }, []);

  return (
    <div>
      <div className={styles.linksContainer}>
        {isLoading ? <CircularProgress /> : null}
        {error ? <p>{error}</p> : null}

        {links &&
          !isLoading &&
          !error &&
          links.map((e, i) => (
            <div className={styles.singleLink} key={i}>
              <a href={e.url} target="_blank" rel="noreferrer">
                {e.name}
              </a>
            </div>
          ))}
      </div>
    </div>
  );
};

export default LinksList;
