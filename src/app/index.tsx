import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef, useState } from "react";
import { FlatList, LayoutChangeEvent, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CHAT_DATA = [
    {
        id: "1",
        name: "kerry",
        lastMessage: "我们今天去港口逛逛吧",
        time: "15:09",
        unreadCount: 1,
        avatar: "https://picsum.photos/id/1025/100/100", // Replace with actual image paths
    },
    {
        id: "2",
        name: "观塘吴彦祖",
        lastMessage: "哈喽呀！在干嘛呢",
        time: "15:12",
        unreadCount: 12,
        avatar: "https://picsum.photos/id/64/100/100",
    },
    {
        id: "3",
        name: "香港八卦讨论组",
        lastMessage: "今天我得去围追堵截他",
        time: "15:18",
        unreadCount: 0,
        avatar: "https://picsum.photos/id/1062/100/100", // Group avatar placeholder
    },
    {
        id: "4",
        name: "妹妹",
        lastMessage: "吃饭没？",
        time: "15:09",
        unreadCount: 0,
        avatar: "https://picsum.photos/id/338/100/100",
    },
    {
        id: "5",
        name: "爱喝酒的懒虫",
        lastMessage: "晚上几点集合",
        time: "15:09",
        unreadCount: 0,
        avatar: "https://picsum.photos/id/342/100/100",
    },
    {
        id: "6",
        name: "Ai交流群",
        lastMessage: "这次抽卡直接拉满了，兄弟们",
        time: "15:18",
        unreadCount: 0,
        avatar: "https://picsum.photos/id/445/100/100",
    },
    {
        id: "7",
        name: "中环打工人",
        lastMessage: "明天那个PPT谁来汇报？大佬们救命",
        time: "15:22",
        unreadCount: 5,
        avatar: "https://picsum.photos/id/212/100/100",
    },
    {
        id: "8",
        name: "Alex Wong",
        lastMessage: "Got it, let’s sync up tomorrow morning.",
        time: "15:30",
        unreadCount: 0,
        avatar: "https://picsum.photos/id/91/100/100",
    },
    {
        id: "9",
        name: "周五下班拆迁队",
        lastMessage: "[图片]这家兰芳园怎么样？",
        time: "15:45",
        unreadCount: 23,
        avatar: "https://picsum.photos/id/1011/100/100",
    },
    {
        id: "10",
        name: "王阿姨（房东）",
        lastMessage: "小张，下个月的房租记得准时转账哈。",
        time: "16:01",
        unreadCount: 1,
        avatar: "https://picsum.photos/id/396/100/100",
    },
    {
        id: "11",
        name: "Molly",
        lastMessage: "刚排队买到了限定盲盒！给你看！",
        time: "16:15",
        unreadCount: 2,
        avatar: "https://picsum.photos/id/646/100/100",
    },
];

type ChatItem = (typeof CHAT_DATA)[0];

export default function MessageScreen() {
    const testRef = useRef<View | null>(null);
    const searchBarRef = useRef<View | null>(null);
    const [gradientHeight, setGradientHeight] = useState(0);

    const dynamicGradientStyle = [styles.gradient, { height: gradientHeight }];

    const handleMeasure = () => {
        searchBarRef.current?.measureInWindow((x, y, width, height) => {
            console.log("Measured in window:", { x, y, width, height });
            setGradientHeight(y + height);
            y;
        });
    };

    const handleOnLayoutMeasure = (event: LayoutChangeEvent) => {
        const { x, y, width, height } = event.nativeEvent.layout;
        console.log("Layout measured:", { x, y, width, height });
        setGradientHeight(y + height);
        handleMeasure();
    };

    // const idleId = requestIdleCallback((deadline) => {
    //     // Check if we have enough time left in this idle period (optional but good practice)
    //     if ((deadline.timeRemaining() > 0 || deadline.didTimeout) && gradientHeight < 100) {
    //         // Run your deferred heavy task here (e.g., loading extra data, heavy formatting)
    //         handleMeasure();
    //     }
    // });
    useEffect(() => {
        testRef.current?.measureInWindow((x, y, width, height) => {
            console.log(y, height);
        });
        handleMeasure();
        // return () => cancelIdleCallback(idleId);
    }, []);

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={["rgba(61, 193, 254, 0.1)", "rgba(255, 162, 148, 0.1)"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                locations={[0.5, 0.9]}
                style={dynamicGradientStyle}
            ></LinearGradient>
            <LinearGradient
                colors={["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 1)"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                locations={[0.5, 1]}
                style={dynamicGradientStyle}
            />

            <SafeAreaView edges={["top"]} style={styles.safeArea}>
                <View>
                    <View style={styles.header} ref={testRef}>
                        <Text style={styles.headerTitle}>xxchat(13)</Text>
                        <View style={styles.button}>
                            <Pressable
                                onPress={() =>
                                    testRef.current?.measureInWindow((x, y, width, height) => {
                                        console.log(y, height);
                                    })
                                }
                                style={({ pressed }) => [pressed && styles.pressedButton]}
                            >
                                <Image style={styles.addIcon} source={require("@/assets/images/add.svg")} />
                            </Pressable>
                        </View>
                    </View>
                    {/* <View style={styles.searchContainer} ref={searchBarRef} onLayout={handleOnLayoutMeasure}> */}
                    <View style={styles.searchContainer} ref={searchBarRef}>
                        <Image style={styles.searchIcon} source={require("@/assets/images/magnifyingGlass.svg")} />
                        <TextInput style={styles.searchInput} placeholder="搜索联系人/群組" />
                    </View>
                </View>

                <FlatList
                    showsVerticalScrollIndicator={false}
                    style={styles.flatList}
                    data={CHAT_DATA}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }: { item: ChatItem }) => (
                        <Pressable
                            onPress={() => {
                                alert("pressed");
                            }}
                            style={({ pressed }) => [styles.chatRow, pressed && { opacity: 0.7 }]}
                        >
                            {/* Left: Avatar with dynamic Badge */}
                            <View style={styles.avatarContainer}>
                                <Image source={{ uri: item.avatar }} style={styles.avatar} />
                                {item.unreadCount > 0 && (
                                    <View style={styles.badge}>
                                        <Text style={styles.badgeText}>{item.unreadCount}</Text>
                                    </View>
                                )}
                            </View>

                            {/* Right: Message Content Area */}
                            <View style={styles.contentContainer}>
                                <View style={styles.topRow}>
                                    <Text style={styles.nameText} numberOfLines={1}>
                                        {item.name}
                                    </Text>
                                    <Text style={styles.timeText}>{item.time}</Text>
                                </View>

                                <View style={styles.bottomRow}>
                                    <Text style={styles.messageText} numberOfLines={1}>
                                        {item.lastMessage}
                                    </Text>
                                </View>
                            </View>
                        </Pressable>
                    )}
                />
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        position: "relative",
        backgroundColor: "#fff",
    },
    safeArea: {
        flex: 1,
        paddingHorizontal: 16,
    },
    header: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "stretch",
        marginBottom: 20,
    },
    button: {
        position: "absolute",
        right: 0,
    },
    searchContainer: {
        width: "100%",
        marginBottom: 4,
        position: "relative",
        justifyContent: "center",
    },
    searchIcon: {
        width: 17,
        height: 17,
        position: "absolute",
        left: 12,
        zIndex: 1,
    },
    searchInput: {
        backgroundColor: "#F6F6F6",
        width: "100%",
        paddingVertical: 9,
        paddingRight: 12,
        paddingLeft: 37,
        borderRadius: 8,
    },
    gradient: {
        position: "absolute",
        width: "100%",
    },
    headerTitle: {
        fontSize: 16,
    },
    addIcon: {
        width: 32,
        height: 32,
    },
    pressedButton: {
        opacity: 0.3,
    },
    pressedRow: {
        opacity: 0.7,
    },
    flatList: {},
    chatRow: {
        flexDirection: "row",
        paddingTop: 16,
        alignItems: "center",
    },
    avatarContainer: {
        position: "relative",
    },
    avatar: {
        width: 52,
        height: 52,
        borderRadius: 8,
        backgroundColor: "#f0f0f0",
    },
    badge: {
        position: "absolute",
        top: -6,
        right: -6,
        backgroundColor: "#FA5151",
        minWidth: 18,
        height: 18,
        borderRadius: 9,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 4,
    },
    badgeText: {
        color: "#ffffff",
        fontSize: 11,
        fontWeight: "600",
        lineHeight: 20,
    },
    contentContainer: {
        flex: 1,
        marginLeft: 14,
        justifyContent: "center",
        borderBottomWidth: 0.5,
        borderBottomColor: "#EAEAEA",
        paddingBottom: 12,
    },
    topRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "baseline",
        marginBottom: 6,
    },
    nameText: {
        fontSize: 16,
        fontWeight: "500",
        color: "#191919",
        flex: 1,
        paddingRight: 8,
    },
    timeText: {
        fontSize: 12,
        color: "#b2b2b2",
    },
    bottomRow: {
        flexDirection: "row",
    },
    messageText: {
        fontSize: 14,
        color: "#888888",
        flex: 1,
    },
    separator: {
        height: 0.5,
        backgroundColor: "#EAEAEA",
        marginLeft: 82,
    },
});
