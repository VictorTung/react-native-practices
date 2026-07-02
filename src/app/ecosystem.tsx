import { imageMap } from "@/assets/imageMap";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef, useState } from "react";
import { ImageSourcePropType, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const financialService = [
    { icon: "ecosystem-quick-exchange.svg", desc: "快速兑换" },
    { icon: "ecosystem-crypto-wealth-management.svg", desc: "币币理财" },
    { icon: "ecosystem-exchange.svg", desc: "交易所" },
    { icon: "ecosystem-indices.svg", desc: "指数" },
    { icon: "ecosystem-precious-metals.svg", desc: "贵金属" },
    { icon: "ecosystem-commodities.svg", desc: "大宗商品" },
    { icon: "ecosystem-contract-guarantee.svg", desc: "合约担保" },
    { icon: "ecosystem-us-stocks.svg", desc: "美股" },
];

const lifeService = [
    { icon: "ecosystem-clawbot.svg", desc: "Clawbot" },
    { icon: "ecosystem-crypto-airdrop.svg", desc: "币币空投" },
    { icon: "ecosystem-event-host.svg", desc: "活动主办" },
    { icon: "ecosystem-knowledge-planet.svg", desc: "知识星球" },
    { icon: "ecosystem-news.svg", desc: "新闻" },
    { icon: "ecosystem-travel-channel.svg", desc: "旅游频道" },
    { icon: "ecosystem-mall.svg", desc: "商城" },
    { icon: "ecosystem-esim.svg", desc: "eSIM" },
];

const otherService = [
    { icon: "ecosystem-online-service.svg", desc: "在线服务1" },
    { icon: "ecosystem-online-service.svg", desc: "在线服务2" },
    { icon: "ecosystem-online-service.svg", desc: "在线服务3" },
    { icon: "ecosystem-online-service.svg", desc: "在线服务4" },
];

export interface ServiceItem {
    icon: string;
    desc: string;
}

interface ServiceSectionProps {
    title: string;
    data: ServiceItem[];
    imageMap: Record<string, ImageSourcePropType>;
    onItemPress?: (item: ServiceItem) => void;
}

export const ServiceSection: React.FC<ServiceSectionProps> = ({ title, data, imageMap, onItemPress }) => {
    return (
        <View style={styles.sectionContainer}>
            <Text style={styles.title}>{title}</Text>

            <View style={styles.grid}>
                {data.map((item, index) => (
                    <Pressable
                        key={`${item.icon}-${index}`}
                        style={({ pressed }) => [styles.gridItem, pressed && { opacity: 0.7 }]}
                        onPress={() => {
                            if (onItemPress) onItemPress(item);
                            else alert("pressed " + item.desc);
                        }}
                    >
                        <Image style={styles.iconImage} source={imageMap[item.icon]} />
                        <Text style={styles.iconText}>{item.desc}</Text>
                    </Pressable>
                ))}
            </View>
        </View>
    );
};

const handlePress = (item: ServiceItem) => {
    console.log(`Navigating to ${item.desc}`);
};

export default function EcosystemScreen() {
    const searchBarRef = useRef<View | null>(null);
    const [gradientHeight, setGradientHeight] = useState(0);

    const dynamicGradientStyle = [styles.gradientBackground, { height: gradientHeight }];

    const handleMeasure = () => {
        searchBarRef.current?.measure((x, y, width, height, pageX, pageY) => {
            setGradientHeight(pageY + height);
        });
    };

    useEffect(() => {
        const idleId = requestIdleCallback((deadline) => {
            console.log(deadline.timeRemaining());
            // Check if we have enough time left in this idle period (optional but good practice)
            if (deadline.timeRemaining() > 0 || deadline.didTimeout) {
                // Run your deferred heavy task here (e.g., loading extra data, heavy formatting)
                handleMeasure();
            }
        });

        return () => cancelIdleCallback(idleId);
    }, []);

    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         handleMeasure();
    //     }, 100);
    //     return () => clearTimeout(timer);
    // }, []);

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
            <SafeAreaView edges={["top", "left", "right"]} style={styles.container}>
                <Text style={styles.headerTitle}>生态</Text>
                <ScrollView style={styles.scrollContainer}>
                    <Pressable onPress={() => alert("pressed XXX喊您养虾啦")} style={styles.bannerWrapper} ref={searchBarRef}>
                        <Image style={styles.bannerImage} source={require(`@/assets/images/ecosystem-banner.png`)} />
                        <View style={styles.bannerTextContainer}>
                            <Text style={styles.bannerTitle}>XXX喊您养虾啦</Text>
                            <View style={styles.bannerSpacer} />
                            <Text style={styles.bannerSubtitle}>首次注册就送10000token</Text>
                        </View>
                    </Pressable>
                    <ServiceSection title="金融服务" data={financialService} imageMap={imageMap} onItemPress={handlePress} />
                    <ServiceSection title="生活服务" data={lifeService} imageMap={imageMap} onItemPress={handlePress} />
                    <ServiceSection title="其他服务" data={otherService} imageMap={imageMap} onItemPress={handlePress} />
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

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
    container: {
        flex: 1,
        paddingHorizontal: 16,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "600",
        color: "#333",
    },
    scrollContainer: {
        flex: 1,
        paddingTop: 16,
    },
    bannerWrapper: {
        position: "relative",
        paddingBottom: 20,
    },
    bannerImage: {
        width: "100%",
        height: 78,
    },
    bannerTextContainer: {
        position: "absolute",
        left: 32,
        top: 16,
    },
    bannerTitle: {
        color: "#1A426F",
        fontSize: 16,
        fontWeight: "600",
    },
    bannerSpacer: {
        height: 5,
    },
    bannerSubtitle: {
        color: "#6286AE",
        fontSize: 10,
        fontWeight: "400",
    },
    sectionContainer: {
        marginBottom: 8,
    },
    title: {
        color: "#333333",
        fontWeight: "600",
        fontSize: 14,
    },
    grid: {
        marginTop: 16,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "flex-start",
    },
    gridItem: {
        width: "25%",
        alignItems: "center",
        paddingBottom: 12,
        gap: 8,
    },
    iconImage: {
        width: 44,
        height: 44,
    },
    iconText: {
        textAlign: "center",
        fontSize: 12,
        color: "#333333",
    },
});
