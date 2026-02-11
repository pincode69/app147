import { Path, Svg } from 'react-native-svg';

export function ChecklistIcon({isActive=false} : {isActive?: boolean}) {
    return (
        <Svg width="18" height="22" viewBox="0 0 18 22" fill="none">
            <Path d="M12 1H3C2.46957 1 1.96086 1.21071 1.58579 1.58579C1.21071 1.96086 1 2.46957 1 3V19C1 19.5304 1.21071 20.0391 1.58579 20.4142C1.96086 20.7893 2.46957 21 3 21H15C15.5304 21 16.0391 20.7893 16.4142 20.4142C16.7893 20.0391 17 19.5304 17 19V6L12 1Z" stroke={isActive ? "rgba(236, 95, 95, 1)" : "rgba(199, 201, 217, 1)"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <Path d="M11 1V5C11 5.53043 11.2107 6.03914 11.5858 6.41421C11.9609 6.78929 12.4696 7 13 7H17M6 14L8 16L12 12" stroke={isActive ? "rgba(236, 95, 95, 1)" : "rgba(199, 201, 217, 1)"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </Svg>
    )
}