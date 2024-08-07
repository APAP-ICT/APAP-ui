const ConnectionStatus = ({isConnected}) => {
    return (
        <div>
            서버 연결 여부 : {isConnected ? '🟢' : '🔴'}
        </div>
    );
};

export default ConnectionStatus;
