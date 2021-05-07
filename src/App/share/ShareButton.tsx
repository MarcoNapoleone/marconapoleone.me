import ShareRoundedIcon from "@material-ui/icons/ShareRounded";
import {IconButton, Snackbar} from "@material-ui/core";
import React, {useState} from "react";
import {Alert} from "@material-ui/lab";

export type ShareData = { title: string, text: string, url: string };
 type ShareDataProps = {
  data: ShareData,
}
const ShareButton: React.FC<ShareDataProps> = ({data}) => {
  const [canShare, setCanShare] = useState(true);
  return (
    <>
      <IconButton>
        <ShareRoundedIcon
          onClick={() => {
            if (typeof navigator.share === 'function') {
              // @ts-ignore
              return navigator.share(data);
            } else {
              setCanShare(false);
            }
          }}
        />
      </IconButton>
      <Snackbar open={!canShare} autoHideDuration={3000} onClose={() => setCanShare(true)}>
        <Alert onClose={() => setCanShare(true)} severity="error">
          Your system does not support sharing.
        </Alert>
      </Snackbar>
    </>

  )
}

export default ShareButton;