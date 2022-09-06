import React from "react";
// import { linksData } from '../linksData';
import { useQuery } from "react-query";
import axios from "axios";

//UI and styles
import styles from "./styles.module.scss";
import { Alert } from "@mui/material";
import NoData from "../Assets/NoData/NoData";
import LinkIcon from "@mui/icons-material/Link";
import CircularProgress from "@mui/material/CircularProgress";

const LinksList = () => {
  const {
    isLoading,
    error,
    data: links,
  } = useQuery("links", () =>
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}api/links?order=order`)
      .then((res) => res.data.data)
  );

  return (
    <div>
      <div className={styles.linksContainer}>
        {isLoading && <CircularProgress />}
        {error && (
          <Alert severity="error" variant="filled">
            {error.message}
          </Alert>
        )}

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
