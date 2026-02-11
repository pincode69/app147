import { Path, Svg } from 'react-native-svg';

export function CalendarIcon({active = true}: {active?: boolean}) {
    return (
        <Svg width="15" height="16" viewBox="0 0 15 16" fill="none">
            <Path d="M4.83331 1.33334V4.00001M10.1666 1.33334V4.00001" stroke={active ?"#EC5F5F" : "rgba(140, 140, 140, 1)"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <Path d="M12.1667 2.66669H2.83333C2.09695 2.66669 1.5 3.26364 1.5 4.00002V13.3334C1.5 14.0697 2.09695 14.6667 2.83333 14.6667H12.1667C12.903 14.6667 13.5 14.0697 13.5 13.3334V4.00002C13.5 3.26364 12.903 2.66669 12.1667 2.66669Z" stroke={active ?"#EC5F5F" : "rgba(140, 140, 140, 1)"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <Path d="M1.5 6.66669H13.5M4.83333 9.33335H4.84M7.5 9.33335H7.50667M10.1667 9.33335H10.1733M4.83333 12H4.84M7.5 12H7.50667M10.1667 12H10.1733" stroke={active ?"#EC5F5F" : "rgba(140, 140, 140, 1)"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </Svg>
    )
}
