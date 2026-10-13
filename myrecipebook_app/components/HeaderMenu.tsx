import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, Pressable } from 'react-native';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import { clearToken } from './lib/auth';
import { router } from 'expo-router';

export interface MenuItem {
  label: string;
  onPress: () => void;
  icon?: any;
  destructive?: boolean;
}

interface HeaderMenuProps {
  items?: MenuItem[];
}

export function HeaderMenu({ items = [] }: HeaderMenuProps) {
  const [visible, setVisible] = useState(false);

  const handleLogout = () => {
    setVisible(false);
    clearToken();
    router.push('../login');
  };

  return (
    <View>
      {/* Header Trigger Button (Three Dots) */}
      <TouchableOpacity
        onPress={() => setVisible(true)}
        className="w-9 h-9 mr-1 rounded-full items-center justify-center active:bg-neutral-100">
        <Ionicons name="ellipsis-vertical" size={20} color="#525252" />
      </TouchableOpacity>

      {/* Dropdown Menu Modal */}
      <Modal
        visible={visible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setVisible(false)}>
        {/* Backdrop: closes menu when tapping outside */}
        <Pressable
          className="flex-1 bg-black/20"
          onPress={() => setVisible(false)}>
          {/* Dropdown Box positioned near top-right header */}
          <View className="absolute top-14 right-4 w-56 bg-white rounded-2xl shadow-xl border border-neutral-100 py-2 overflow-hidden">
            {/* Dynamic Screen-Specific Buttons */}
            {items.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setVisible(false);
                  item.onPress();
                }}
                className="flex-row items-center px-4 py-3 active:bg-neutral-50">
                {item.icon && (
                  <Ionicons
                    name={item.icon}
                    size={18}
                    color={item.destructive ? '#ef4444' : '#525252'}
                    style={{ marginRight: 12 }}
                  />
                )}
                <Text
                  className={`text-base font-medium ${
                    item.destructive ? 'text-red-500' : 'text-neutral-800'
                  }`}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}

            {/* Divider if there are custom items above */}
            {items.length > 0 && (
              <View className="h-[1px] bg-neutral-100 my-1" />
            )}

            {/* Persistent Logout Button */}
            <TouchableOpacity
              onPress={handleLogout}
              className="flex-row items-center px-4 py-3 active:bg-neutral-50">
              <Ionicons
                name="log-out-outline"
                size={18}
                color="#ef4444"
                style={{ marginRight: 12 }}
              />
              <Text className="text-base font-medium text-red-500">
                Log Out
              </Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}
