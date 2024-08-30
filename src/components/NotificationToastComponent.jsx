import {Notification as Toast} from "rsuite";
import {replaceOperationType} from "../util/utils.js";

const NotificationToastComponent = ({notification}) => {
    const {title, body, imageUrl} = notification

    const header = "이상 상황이 감지되었습니다";
    return (
        <Toast type="warning" header={header} closable>
            <p>{replaceOperationType(title)}</p>
            <p>{body}</p>
            <hr/>
            <img src={imageUrl} alt="" width="70%"/>
        </Toast>
    );
}

export default NotificationToastComponent;
