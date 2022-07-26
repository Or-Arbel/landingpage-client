import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";
// import { linksData } from '../linksData';
import CircularProgress from "@mui/material/CircularProgress";
import LinkIcon from "@mui/icons-material/Link";
import useHttp from "../../Hooks/use-http";
import { Alert } from "@mui/material";
import NoData from "../Assets/NoData/NoData";

const LinksList = () => {
  const [links, setLinks] = useState();

  const { isLoading, error, sendRequest } = useHttp();

  useEffect(() => {
    const renderData = async () => {
      let { data } = await sendRequest({
        url: `${process.env.REACT_APP_SERVER_URL}api/links`,
      });
      setLinks(data);
    };

    renderData();
  }, []);

  return (
    <div>
      <div className={styles.linksContainer}>
        {isLoading ? <CircularProgress /> : null}
        {error ? (
          <Alert severity="error" variant="filled">
            {error}
          </Alert>
        ) : null}

        {links?.length > 0 &&
          !isLoading &&
          !error &&
          links.map((e, i) => (
            <a
              key={i}
              className={styles.singleLink}
              href={e.url}
              target="_blank"
              rel="noreferrer"
            >
              <LinkIcon />
              <div>{e.name}</div>
            </a>
          ))}

        {!isLoading && !error && links && links.length == 0 && <NoData />}
      </div>
    </div>
  );
};

export default React.memo(LinksList);
