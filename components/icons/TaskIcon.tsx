import { Path, Svg } from 'react-native-svg';

export function TaskIcon({isActive=false} : {isActive?: boolean}) {
    return (
        <Svg width="19" height="22" viewBox="0 0 19 22" fill="none">
            <Path d="M12.5 1H6.5C5.94772 1 5.5 1.44772 5.5 2V4C5.5 4.55228 5.94772 5 6.5 5H12.5C13.0523 5 13.5 4.55228 13.5 4V2C13.5 1.44772 13.0523 1 12.5 1Z" stroke={isActive ? "rgba(236, 95, 95, 1)" : "rgba(199, 201, 217, 1)"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <Path d="M13.5 3H15.5C16.0304 3 16.5391 3.21071 16.9142 3.58579C17.2893 3.96086 17.5 4.46957 17.5 5V19C17.5 19.5304 17.2893 20.0391 16.9142 20.4142C16.5391 20.7893 16.0304 21 15.5 21H3.5C2.96957 21 2.46086 20.7893 2.08579 20.4142C1.71071 20.0391 1.5 19.5304 1.5 19V5C1.5 4.46957 1.71071 3.96086 2.08579 3.58579C2.46086 3.21071 2.96957 3 3.5 3H5.5M9.5 10H13.5M9.5 15H13.5M5.5 10H5.51M5.5 15H5.51" stroke={isActive ? "rgba(236, 95, 95, 1)" : "rgba(199, 201, 217, 1)"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </Svg>
    )
}
