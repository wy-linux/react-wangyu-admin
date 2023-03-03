import React, { useEffect } from "react";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({
  showSpinner: false,
});

const Loading: React.FC = () => {
  NProgress.start();

  useEffect(() => {
    NProgress.done();
  }, []);

  return <></>;
}

export default Loading;
