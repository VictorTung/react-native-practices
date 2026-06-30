import { imageMap } from "@/assets/imageMap";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef, useState } from "react";
import { Pressable, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// --- Types ---
interface FeatureItemProps {
    iconName: string;
    title: string;
}

interface SettingItemProps {
    iconName: string;
    title: string;
}

// --- Reusable Components ---

const FeatureItem: React.FC<FeatureItemProps> = ({ title, iconName }) => (
    <Pressable style={({ pressed }) => [styles.featureItem, pressed && styles.pressedOpacity]} onPress={() => console.log(`Pressed ${title}`)}>
        <View style={styles.featureIconContainer}>
            <Image style={styles.featureIcon} source={imageMap[iconName]} />
        </View>
        <Text style={styles.featureText}>{title}</Text>
    </Pressable>
);

const SettingItem: React.FC<SettingItemProps> = ({ title, iconName }) => (
    <Pressable style={({ pressed }) => [styles.settingItem, pressed && styles.pressedOpacity]}>
        <View style={styles.settingItemLeft}>
            <Image style={styles.settingIcon} source={imageMap[iconName]} />
            <Text style={styles.settingText}>{title}</Text>
        </View>
        <Image style={styles.arrowIcon} source={require("@/assets/images/arrowRight.svg")} />
    </Pressable>
);

export default function App() {
    const searchBarRef = useRef<View | null>(null);
    const [gradientHeight, setGradientHeight] = useState(0);

    const handleMeasure = () => {
        searchBarRef.current?.measure((x, y, width, height, pageX, pageY) => {
            setGradientHeight(pageY + height);
        });
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            handleMeasure();
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    const dynamicGradientStyle = [styles.gradientBackground, { height: gradientHeight }];

    return (
        <View style={styles.screenWrapper}>
            <LinearGradient
                colors={["rgba(61, 193, 254, 0.1)", "rgba(255, 162, 148, 0.1)"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                locations={[0.5, 0.9]}
                style={dynamicGradientStyle}
            />
            <LinearGradient
                colors={["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 1)"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                locations={[0.5, 1]}
                style={dynamicGradientStyle}
            />
            <SafeAreaView style={styles.safeArea}>
                <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                    {/* Profile Header Segment */}
                    <View style={styles.header}>
                        <View style={styles.profileInfo}>
                            <Pressable style={({ pressed }) => [styles.avatarContainer, pressed && styles.pressedOpacity]}>
                                <Image source={{ uri: "https://i.pravatar.cc/150?img=47" }} style={styles.avatar} />
                                <View style={styles.avatarEditBadge}>
                                    <Image source={require("@/assets/images/edit.svg")} style={styles.avatarEditIcon} />
                                </View>
                            </Pressable>
                            <View style={styles.nameContainer}>
                                <Text style={styles.name}>九龙塘恒字耀文</Text>
                                <Pressable style={({ pressed }) => [styles.idContainer, pressed && styles.pressedOpacity]}>
                                    <Text style={styles.idText}>ID : 45685212</Text>
                                    <Image style={styles.copyIcon} source={require("@/assets/images/file-copy-line.svg")} />
                                </Pressable>
                            </View>
                        </View>
                        <Pressable style={({ pressed }) => [pressed && styles.pressedOpacity]}>
                            <Image style={styles.qrCodeIcon} source={require("@/assets/images/qr-code-line.svg")} />
                        </Pressable>
                    </View>

                    {/* Moments / Friends Circle Banner */}
                    <Pressable style={({ pressed }) => [styles.bannerShadowContainer, pressed && styles.pressedOpacity]} ref={searchBarRef}>
                        <LinearGradient colors={["#24D0FF", "#2466FF"]} start={{ x: 0.1, y: 0 }} end={{ x: 0.2, y: 0.7 }} locations={[0, 0.9]} style={styles.banner}>
                            <View style={styles.bannerLeft}>
                                <Image style={styles.bannerIcon} source={require("@/assets/images/friends.svg")} />
                                <Text style={styles.bannerText}>朋友圈</Text>
                                <View style={styles.badge}>
                                    <Text style={styles.badgeText}>{13}</Text>
                                </View>
                            </View>
                            <Image style={styles.bannerArrowIcon} source={require("@/assets/images/arrowRight-white.svg")} />
                        </LinearGradient>
                    </Pressable>

                    {/* Popular Ecosystem Segment */}
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>热门生态</Text>
                            <Pressable onPress={() => console.log(`pressed more`)} style={({ pressed }) => [pressed && styles.pressedOpacity]}>
                                <Text style={styles.sectionActionText}>查看更多</Text>
                            </Pressable>
                        </View>
                        <View style={styles.featuresRow}>
                            <FeatureItem iconName="ecosystem-quick-exchange.svg" title="快速兑换" />
                            <FeatureItem iconName="ecosystem-crypto-wealth-management.svg" title="币币理财" />
                            <FeatureItem iconName="ecosystem-exchange.svg" title="交易所" />
                            <FeatureItem iconName="ecosystem-indices.svg" title="指数" />
                        </View>
                    </View>

                    {/* My Functions Segment */}
                    <View style={styles.section}>
                        <View style={styles.myFunctionsHeader}>
                            <Text style={styles.sectionTitle}>我的功能</Text>
                        </View>
                        <SettingItem iconName="mine-person-outline.svg" title="我的信息" />
                        <SettingItem iconName="mine-apps-outline.svg" title="我的收藏" />
                        <SettingItem iconName="mine-shield-checkmark-outline.svg" title="账号与安全" />
                        <SettingItem iconName="mine-headset-outline.svg" title="投诉与建议" />
                        <SettingItem iconName="mine-settings-outline.svg" title="账号设置" />
                        <SettingItem iconName="mine-chatbubble-ellipses-outline.svg" title="关于我们" />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

// --- Styles ---

const styles = StyleSheet.create({
    screenWrapper: {
        flex: 1,
        backgroundColor: "#fff",
        position: "relative",
        flexDirection: "row",
    },
    gradientBackground: {
        position: "absolute",
        width: "100%",
    },
    safeArea: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
    contentContainer: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 40,
    },
    pressedOpacity: {
        opacity: 0.7,
    },

    // Header
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 25,
    },
    profileInfo: {
        flexDirection: "row",
        alignItems: "center",
    },
    avatarContainer: {
        width: 58,
        height: 58,
        marginRight: 15,
        position: "relative",
    },
    avatar: {
        height: 58,
        width: 58,
        borderRadius: 15,
    },
    avatarEditBadge: {
        height: 20,
        width: 20,
        borderRadius: 20,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        right: 2,
        bottom: 2,
    },
    avatarEditIcon: {
        height: 10,
        width: 10,
    },
    nameContainer: {
        justifyContent: "center",
    },
    name: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333333",
        marginBottom: 6,
    },
    idContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    idText: {
        fontSize: 14,
        color: "#999999",
    },
    copyIcon: {
        width: 16,
        height: 16,
        marginLeft: 8,
    },
    qrCodeIcon: {
        width: 28,
        height: 28,
    },

    // Banner
    bannerShadowContainer: {
        shadowColor: "#3B72FF",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.6,
        shadowRadius: 3,
        elevation: 5,
    },
    banner: {
        backgroundColor: "#3B72FF",
        borderRadius: 12,
        paddingVertical: 16,
        paddingHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 30,
    },
    bannerLeft: {
        flexDirection: "row",
        alignItems: "center",
    },
    bannerIcon: {
        width: 24,
        height: 24,
    },
    bannerText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "600",
        marginLeft: 10,
        marginRight: 10,
    },
    badge: {
        backgroundColor: "#FF4D4F",
        borderRadius: 10,
        paddingHorizontal: 6,
        paddingVertical: 2,
        justifyContent: "center",
        alignItems: "center",
    },
    badgeText: {
        color: "#FFFFFF",
        fontSize: 12,
        fontWeight: "bold",
    },
    bannerArrowIcon: {
        width: 20,
        height: 20,
    },

    // Sections Common
    section: {
        marginBottom: 30,
    },
    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
    },
    myFunctionsHeader: {
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333333",
    },
    sectionActionText: {
        fontSize: 14,
        color: "#999999",
    },

    // Features Row
    featuresRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    featureItem: {
        alignItems: "center",
        width: "25%",
    },
    featureIconContainer: {
        marginBottom: 8,
    },
    featureIcon: {
        width: 44,
        height: 44,
    },
    featureText: {
        fontSize: 12,
        color: "#666666",
    },

    // Settings List
    settingItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#F5F5F5",
    },
    settingItemLeft: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    settingIcon: {
        width: 20,
        height: 20,
    },
    settingText: {
        fontSize: 15,
        color: "#333333",
    },
    arrowIcon: {
        width: 20,
        height: 20,
    },
});
