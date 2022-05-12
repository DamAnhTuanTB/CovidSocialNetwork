import { Button } from "antd";
import React from "react";
import { useHistory } from "react-router-dom";

const NotFoundPage = ({ match } : any) => {
  const history = useHistory();
  return (
    <div style={{ padding: "50px", height: "100vh" }}>
      <div style={{ fontSize: "40px", fontWeight: "600", marginBottom: "30px" }}>Not Found</div>
      <Button type="primary" onClick={() => history.go(-2)}>Quay lại</Button>
    </div>
  );
};

export default NotFoundPage;
