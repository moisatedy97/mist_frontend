import { create } from "zustand";
import { produce } from "immer";
import { accessSessionStorage } from "../browser/SessionStorage";
import { Notification } from "@/interfaces/TypeNotification";

export type I_Notifications = {
    notifications: Notification[];
};

type NotificationsActions = {
    setNotifications: (notifications: Notification[]) => void;
    addNotification: (notification: Notification) => void;
    setNotificationToRed: (index: number) => void;
};

const sessionStorageNotifications: Notification[] = accessSessionStorage.GET_NOTIFICATIONS();
let defaultNotifications: Notification[] = [];

if (sessionStorageNotifications) {
    defaultNotifications = sessionStorageNotifications;
}

accessSessionStorage.SET_NOTIFICATIONS(defaultNotifications);

export const useNotificationStore = create<I_Notifications & NotificationsActions>()((set) => {
    return {
        notifications: defaultNotifications,
        setNotifications: (notifications: Notification[]) => {
            set(
                produce((state: I_Notifications) => {
                    state.notifications = notifications;
                }),
            );
        },
        addNotification: (notification: Notification) => {
            set(
                produce((state: I_Notifications) => {
                    state.notifications.push(notification);

                    if (state.notifications.length > 20) {
                        state.notifications = state.notifications.slice(-5);
                    }

                    accessSessionStorage.SET_NOTIFICATIONS(state.notifications);
                }),
            );
        },
        setNotificationToRed: (index: number) => {
            set(
                produce((state: I_Notifications) => {
                    state.notifications[index].read = true;

                    accessSessionStorage.SET_NOTIFICATIONS(state.notifications);
                }),
            );
        },
    };
});
