import '../styles.css';

const Modal = ({isOpen, onClose, messages}) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>알림 내용</h2>
                <table className="message-table">
                    <thead>
                    <tr>
                        <th>메시지</th>
                        <th>발생 시각</th>
                    </tr>
                    </thead>
                    <tbody>
                    {messages.map((message, index) => (
                        <tr key={index}>
                            <td>{message.text}</td>
                            <td>{message.time}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <button onClick={onClose}>닫기</button>
            </div>
        </div>
    );
};

const Notifications = ({isOpen, onClose}) => {
    const getTimeWithOffset = (offsetHours) => {
        const date = new Date();
        date.setHours(date.getHours() + offsetHours);
        return date.toLocaleTimeString();
    };

    const messages = [
        {text: "A-101에서 화재 발생", time: getTimeWithOffset(0)},
        {text: "E-102에서 가스유출 발생", time: getTimeWithOffset(1)},
        {text: "E-305에서 폭력 발생", time: getTimeWithOffset(2)},
        {text: "E-401에서 안전모 미착용", time: getTimeWithOffset(3)}
    ];

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} messages={messages}/>
        </>
    );
};

export default Notifications;
