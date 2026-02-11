import { Article, DefaultSubTask, DefaultTask } from "./types";

export const checklist: DefaultTask[] = [
    {
        id: 1,
        icon: 1,
        title: 'External\ninspiration'
    },
    {
        id: 2,
        icon: 2,
        title: 'Fuel\n& Oil'
    },
    {
        id: 3,
        icon: 3,
        title: 'Instruments\n& Avionics'
    },
    {
        id: 4,
        icon: 4,
        title: 'Engin\n(after start)'
    },
    {
        id: 5,
        icon: 5,
        title: 'Emergency\nequipment'
    },
    {
        id: 6,
        icon: 6,
        title: 'Documents\n& Conditions'
    }
]

export const subChecklist: DefaultSubTask[] = [
    {
        id: 1,
        title: 'External inspiration',
        tasks: [
            {
                id: 1,
                defaultSubTaskID: 1,
                title: "Fuselage, wings, and tail: no damage or cracks",
                status: "to do"
            },
            {
                id: 2,
                defaultSubTaskID: 2,
                title: "Control surfaces: free and unobstructed",
                status: "to do"
            },
            {
                id: 3,
                defaultSubTaskID: 2,
                title: "Flaps: intactand moving freely",
                status: "to do"
            },
            {
                id: 4,
                defaultSubTaskID: 4,
                title: "Pitot tube and sensors: clean, unobstructed",
                status: "to do"
            },
            {
                id: 5,
                defaultSubTaskID: 5,
                title: "Windows and canopy: clean, no cracks",
                status: "to do"
            },
            {
                id: 6,
                defaultSubTaskID: 6,
                title: "Landing gear and tires: proper pressure, no leaks",
                status: "to do"
            }
        ]
    },
    {
        id: 2,
        title: 'Fuel & Oil',
        tasks: [
            {
                id: 1,
                defaultSubTaskID: 1,
                title: "Yoke/stick and rudder pedals: full and free movement",
                status: "to do"
            },
            {
                id: 2,
                defaultSubTaskID: 2,
                title: "Flaps and trim: functioning correctly",
                status: "to do"
            }
        ]
    },
    {
        id: 3,
        title: 'Instruments & Avionics',
        tasks: [
            {
                id: 1,
                defaultSubTaskID: 1,
                title: "Primary flight instruments: powered and operational",
                status: "to do"
            },
            {
                id: 2,
                defaultSubTaskID: 2,
                title: "Radios and navigation: checked and working",
                status: "to do"
            },
            {
                id: 3,
                defaultSubTaskID: 3,
                title: "Transponder: code set",
                status: "to do"
            },
            {
                id: 4,
                defaultSubTaskID: 4,
                title: "Emergency Locator Transmitter (ELT): status OK",
                status: "to do"
            },
        ]
    },
    {
        id: 4,
        title: 'Engin (after start)',
        tasks: [
            {
                id: 1,
                defaultSubTaskID: 1,
                title: "Engine start: normal",
                status: "to do"
            },
            {
                id: 2,
                defaultSubTaskID: 2,
                title: "RPM, oil pressure, and temperature: within limits",
                status: "to do"
            },
            {
                id: 3,
                defaultSubTaskID: 3,
                title: "Magnetos (if applicable): test OK",
                status: "to do"
            },
        ]
    },
    {
        id: 5,
        title: 'Emergency equipment',
        tasks: [
            {
                id: 1,
                defaultSubTaskID: 1,
                title: "Fire extinguisher and first aid kit: present",
                status: "to do"
            },
            {
                id: 2,
                defaultSubTaskID: 2,
                title: "Life vests / raft: as required",
                status: "to do"
            },
        ]
    },
    {
        id: 6,
        title: 'Documents & Conditions',
        tasks: [
            {
                id: 1,
                defaultSubTaskID: 1,
                title: "Fire extinguisher and first aid kit: present",
                status: "to do"
            },
            {
                id: 2,
                defaultSubTaskID: 2,
                title: "Weather: suitable for flight",
                status: "to do"
            },
            {
                id: 3,
                defaultSubTaskID: 3,
                title: "Weight and balance: within limits",
                status: "to do"
            },
            {
                id: 4,
                defaultSubTaskID: 4,
                title: "Flight plan: filed if required",
                status: "to do"
            },
        ]
    }
]


export const articleImages: Record<string, any> = {
    '1': require('@/assets/images/content/1.png'),
    '2': require('@/assets/images/content/2.png'),
    '3': require('@/assets/images/content/3.png'),
    '4': require('@/assets/images/content/4.png'),
    '5': require('@/assets/images/content/5.png'),
}

export const articles: Article[] = [
    {
        id: 1,
        img: '1',
        title: 'What are aircraft signals and why are they important?',
        shortDesc: 'Aircraft signals are means of visual, audio, or radio communication used to ensure',
        content: [
            {
                type: 'paragraph',
                text: 'Aircraft signals are means of visual, audio, or radio communication used to ensure flight safety and coordination between pilots, air traffic controllers, other aircraft, and ground personnel. They are critical in cases of radio failure, poor visibility, or when radio communication is unavailable.'
            },
            {
                type: 'heading',
                text: 'Types of signals:'
            },
            {
                type: 'list',
                items: [
                    'Visual (lights, signal lamps)',
                    'Radio (transponder codes, voice communication)',
                    'Audio (cockpit alarms)',
                    'Gestures (marshaling hand signals)'
                ]
            },
            {
                type: 'paragraph',
                text: 'Signals are standardized by international organizations such as ICAO, making them universally understood by pilots worldwide. This ensures consistent coordination even during emergency situations.'
            }
        ]
    },
    {
        id: 2,
        img: '2',
        title: 'Light signals from ground to aircraft',
        shortDesc: 'Light signals from air traffic control using signal lamps are used when radio communication with an aircraft is lost.',
        content: [
            {
                type: 'paragraph',
                text: 'Light signals from air traffic control using signal lamps are used when radio communication with an aircraft is lost. Each color and mode (steady or flashing) has a specific meaning.'
            },
            {
                type: 'heading',
                text: 'Main signals:'
            },
            {
                type: 'list',
                items: [
                    '🔵 Steady green — Cleared for takeoff / landing',
                    '🔵 Flashing green — Cleared to taxi / return for landing',
                    '🔴 Steady red — Stop / do not land',
                    '🔴 Flashing red — Vacate runway / danger',
                    '⚪ Flashing white — Return to starting point on the airport',
                    '🔆 Alternating light signals — Use visual contact, pay attention'
                ]
            },
            {
                type: 'paragraph',
                text: 'Pilots acknowledge light signals by rocking the wings (day) or flashing landing lights (night).'
            }
        ]
    },
    {
        id: 3,
        img: '3',
        title: 'Aircraft light signals and their meaning',
        shortDesc: 'Every aircraft is equipped with a set of lights used for positioning, collision avoidance, and status indication.',
        content: [
            {
                type: 'paragraph',
                text: 'Every aircraft is equipped with a set of lights used for positioning, collision avoidance, and status indication.'
            },
            {
                type: 'heading',
                text: 'Types of lights:'
            },
            {
                type: 'list',
                items: [
                    '🔴 Navigation lights (left — red, right — green, tail — white): indicate aircraft orientation',
                    '🔆 Anti-collision beacon — red flashing light, activated before engine start',
                    '✳️ Strobe lights — white flashing lights on wingtips, used during taxi, takeoff, and flight',
                    '💡 Landing and taxi lights — illuminate path and indicate aircraft is moving'
                ]
            },
            {
                type: 'paragraph',
                text: "The combination of lights helps other pilots and ground crew determine the aircraft's status and direction."
            }
        ]
    },
    {
        id: 4,
        img: '4',
        title: 'Emergency transponder codes and radio signals',
        shortDesc: 'The transponder is a device that transmits flight information to air traffic controllers',
        content: [
            {
                type: 'paragraph',
                text: 'The transponder is a device that transmits flight information to air traffic controllers. During emergencies, a pilot may set a specific squawk code to indicate the type of emergency.'
            },
            {
                type: 'heading',
                text: 'Key emergency codes:'
            },
            {
                type: 'list',
                items: [
                    '⚠️ 7700 — General emergency',
                    '🔇 7600 — Radio communication failure',
                    '🛑 7500 — Aircraft hijacking (do not confirm verbally!)'
                ]
            },
            {
                type: 'paragraph',
                text: 'Using these codes allows air traffic services to immediately identify the issue and prepare assistance. Pilots may also use the radio to transmit "MAYDAY" (life-threatening emergency) or "PAN-PAN" (urgent situation but not critical).'
            }
        ]
    },
    {
        id: 5,
        img: '5',
        title: "Ground marshal signals and hand gestures",
        shortDesc: "On the ground, visual signaling is performed by ground marshals.",
        content: [
            {
                type: 'paragraph',
                text: 'On the ground, visual signaling is performed by ground marshals. They use standardized hand signals (with or without paddles or light wands) to guide aircraft during taxiing, stopping, and parking.'
            },
            {
                type: 'heading',
                text: 'Common marshal gestures:'
            },
            {
                type: 'list',
                items: [
                    '✋✋ — Stop (arms raised, palms forward)',
                    '👈👉 — Turn left / right (arms point in direction)',
                    '🔄 — Start engine (circular motion with hand)',
                    '🅿️ — Set brakes (closed fist with raised thumb)'
                ]
            },
            {
                type: 'paragraph',
                text: "Pilots must follow the marshal's signals until the aircraft is parked and engines are shut down. This ensures safety for both crew and ground staff."
            }
        ]
    }
]