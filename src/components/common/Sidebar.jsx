import { useNavigate } from 'react-router-dom';
import '../../styles.css';
import LogoImage from '../../../public/logo.png';

const sidebarItems = [
    { name: '대시보드', path: '/' },
    { name: '통계 현황', path: '/statistics' },
    { name: '이상상황 과거이력', path: '/history' },
    { name: '카메라 관리', path: '/camera-management' },
    { name: '보고서', path: '/report' },
];

const Sidebar = () => {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div className="sidebar">
            <h1> </h1>
            <img src={LogoImage} alt="APAP Logo" />
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
