import { Route } from 'react-router-dom';
import DetailChatComponent from './detail-chat-patient';


const ChatComponent = (props: any) => {
    const { match } = props;
    return (
        <div>
            <Route exact path={`${match?.url}`} render={() => <DetailChatComponent />} />
        </div>
    );
};

export default ChatComponent;