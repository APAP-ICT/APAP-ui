import {Button, ButtonToolbar, Notification} from "rsuite";

const NotificationToastComponent = ({title, image, datetime}) => {
    const header = "이상 상황이 감지되었습니다";
    return (
        <Notification type="warning" header={header} closable>
            <p>{title}</p>
            <p>{datetime}</p>
            <img src={image} alt="" width="70%"/>
            <hr/>
            <ButtonToolbar>
                {/* TODO 상세 보기 구현 필요*/}
                <Button appearance="primary">상세 보기</Button>
                <Button appearance="default">닫기</Button>
            </ButtonToolbar>
        </Notification>
    );
}

export default NotificationToastComponent;
