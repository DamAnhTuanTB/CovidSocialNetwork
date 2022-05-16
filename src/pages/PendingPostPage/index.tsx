import { Button } from "antd";
import React from "react";
import { useHistory } from "react-router-dom";

const PendingPostPage = ({ match } : any) => {
  const history = useHistory();
  return (
    <div style={{ padding: "50px", height: "100vh" }}>
      <div style={{ fontSize: "40px", fontWeight: "600", marginBottom: "0px" }}>Bài viết đang đợi được phê duyệt</div>
      <div style={{ fontSize: "30px", fontWeight: "400", marginBottom: "30px" }}>Vui lòng quay lại sau</div>
      <Button type="primary" onClick={() => history.go(-2)}>Quay lại</Button>
    </div>
  );
};

export default PendingPostPage;
