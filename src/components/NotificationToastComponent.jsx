import {Button, ButtonToolbar, Notification} from "rsuite";
import {useNavigate} from "react-router-dom";

const NotificationToastComponent = ({notification}) => {
    const {title, body, imageUrl, infoId} = notification
    const navigate = useNavigate();
    const handleHistoryDetailOnClick = () => {
        navigate(`history/${infoId}`);
    }

    const header = "이상 상황이 감지되었습니다";
    return (
        <Notification type="warning" header={header} closable>
            <p>{title}</p>
            <p>{body}</p>
            <img src={image} alt="" width="70%"/>
            <hr/>
            <ButtonToolbar>
                <Button appearance="primary" onClick={handleHistoryDetailOnClick}>상세 보기</Button>
                <Button appearance="default">닫기</Button>
            </ButtonToolbar>
        </Notification>
    );
}

export default NotificationToastComponent;
