import { useNavigate } from 'react-router-dom';
import '../styles.css';

const sidebarItems = [
    { name: '대시보드', path: '/dashboard' },
    { name: '통계 현황', path: '/statistics' },
    { name: '이상상황 과거이력', path: '/history' },
    { name: '카메라 관리', path: '/camera-management' },
    { name: '객체 탐지 결과', path: '/object-detect' },
    { name: '실시간 상황', path: '/subscriber' },
    { name: '카메라', path: '/publisher' },
    { name: '이미지 업로드', path: '/image-upload' }
];

const Sidebar = () => {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div className="sidebar">
            <h2>APAP</h2>
            {sidebarItems.map((item, index) => (
                <div
                    key={index}
                    className="sidebar-item"
                    onClick={() => handleNavigation(item.path)}
                >
                    {item.name}
                </div>
            ))}
        </div>
    );
};

export default Sidebar;
