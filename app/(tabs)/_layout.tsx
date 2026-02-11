import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { ArticlesIcon } from '@/components/icons/ArticlesIcon';
import { ChecklistIcon } from '@/components/icons/ChecklistIcon';
import { TaskIcon } from '@/components/icons/TaskIcon';
import SolidTabBarBackground from '@/components/ui/SolidTabBarBackground';
import { Colors } from '@/constants/Colors';

export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors['light'].tint,
        headerShown: false,
        tabBarBackground: SolidTabBarBackground,
        tabBarStyle: [Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {},
        }), 
        {
          height: 100,
          paddingTop: 12,
          paddingBottom: 12,
          paddingHorizontal: 16,
          backgroundColor: '#FFF'
        }
      ],
        tabBarLabelStyle: {
          fontSize: 14,
          paddingTop: 4
        }
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Checklist',
          tabBarIcon: ({ focused }) => <ChecklistIcon isActive={focused} />,
        }}
      />
      <Tabs.Screen
        name="task"
        options={{
          title: 'Task',
          tabBarIcon: ({ focused }) => <TaskIcon isActive={focused} />,
        }}
      />
      <Tabs.Screen
        name="articles"
        options={{
          title: 'Articles',
          tabBarIcon: ({ focused }) => <ArticlesIcon isActive={focused} />,
        }}
      />
    </Tabs>
  );
}
