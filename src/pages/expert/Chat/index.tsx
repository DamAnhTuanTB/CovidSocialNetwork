/* eslint-disable react/prop-types */
import ExpertChatComponent from "../../../components/expert/Chat";

const ExpertChatPage = ({ match } : any) => {
  return (
    <>
      <ExpertChatComponent match={match} />
    </>
  );
};

export default ExpertChatPage;
