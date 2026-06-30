// import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import { Image } from "expo-image";
import { DarkTheme, DefaultTheme, Tabs, ThemeProvider } from "expo-router";
import { StyleSheet, useColorScheme } from "react-native";

export default function TabLayout() {
    const colorScheme = useColorScheme();
    return (
        <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
            <Tabs
                screenOptions={{
                    tabBarActiveTintColor: "#000", // Classic Apple System Blue
                    tabBarInactiveTintColor: "#8E8E93", // Classic Apple System Gray
                    tabBarStyle: {
                        paddingTop: 10,
                        height: 85,
                    },
                    headerTitleAlign: "left",
                    headerTitleStyle: {
                        fontWeight: 600,
                        fontSize: 20,
                    },
                    headerShadowVisible: false,
                    headerShown: false,
                }}
            >
                <Tabs.Screen
                    name="index"
                    options={{
                        title: "消息",
                        tabBarIcon: ({ focused }) =>
                            focused ? (
                                <Image style={styles.icon} source={require("@/assets/images/message.svg")} />
                            ) : (
                                <Image style={styles.icon} source={require("@/assets/images/message-inactive.svg")} />
                            ),
                        tabBarBadge: 13,
                        tabBarBadgeStyle: {
                            top: -8,
                        },
                    }}
                />
                <Tabs.Screen
                    name="explore"
                    options={{
                        title: "联系人",
                        tabBarIcon: ({ focused }) =>
                            focused ? (
                                <Image style={styles.icon} source={require("@/assets/images/contacts.svg")} />
                            ) : (
                                <Image style={styles.icon} source={require("@/assets/images/contacts-inactive.svg")} />
                            ),
                    }}
                />
                <Tabs.Screen
                    name="ecosystem"
                    options={{
                        title: "生态",
                        tabBarIcon: ({ focused }) =>
                            focused ? (
                                <Image style={styles.icon} source={require("@/assets/images/ecosystem.svg")} />
                            ) : (
                                <Image style={styles.icon} source={require("@/assets/images/ecosystem-inactive.svg")} />
                            ),
                    }}
                />
                <Tabs.Screen
                    name="mine"
                    options={{
                        title: "我的",
                        tabBarIcon: ({ focused }) =>
                            focused ? (
                                <Image style={styles.icon} source={require("@/assets/images/mine.svg")} />
                            ) : (
                                <Image style={styles.icon} source={require("@/assets/images/mine-inactive.svg")} />
                            ),
                    }}
                />
            </Tabs>
        </ThemeProvider>
    );
}

const styles = StyleSheet.create({
    icon: {
        width: 24,
        height: 24,
    },
});
