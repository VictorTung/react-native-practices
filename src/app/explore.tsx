import { Button, Pressable, StyleSheet, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Image } from "expo-image";

import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef, useState } from "react";
import { Alert, SectionList, Text, View } from "react-native";

const CONTACTS_DATA = [
    {
        title: "A",
        data: [
            { name: "Aaron Ramsey", avatar: "https://picsum.photos/id/101/100/100" },
            { name: "Akshay Masand", avatar: "https://picsum.photos/id/102/100/100" },
            { name: "Andrew O'Hara", avatar: "https://picsum.photos/id/103/100/100" },
        ],
    },
    {
        title: "B",
        data: [
            { name: "Benjamin Franklin", avatar: "https://picsum.photos/id/104/100/100" },
            { name: "Bradley Cooper", avatar: "https://picsum.photos/id/106/100/100" },
        ],
    },
    {
        title: "C",
        data: [
            { name: "Charlie Chaplin", avatar: "https://picsum.photos/id/107/100/100" },
            { name: "Chris Evans", avatar: "https://picsum.photos/id/108/100/100" },
            { name: "Clara Oswald", avatar: "https://picsum.photos/id/109/100/100" },
        ],
    },
    {
        title: "D",
        data: [
            { name: "Darynn Magee", avatar: "https://picsum.photos/id/110/100/100" },
            { name: "David Beckham", avatar: "https://picsum.photos/id/111/100/100" },
            { name: "Diana Prince", avatar: "https://picsum.photos/id/112/100/100" },
        ],
    },
    {
        title: "E",
        data: [
            { name: "Edward Norton", avatar: "https://picsum.photos/id/113/100/100" },
            { name: "Emma Watson", avatar: "https://picsum.photos/id/114/100/100" },
        ],
    },
    {
        title: "F",
        data: [
            { name: "Fiona Gallagher", avatar: "https://picsum.photos/id/115/100/100" },
            { name: "Frank Sinatra", avatar: "https://picsum.photos/id/116/100/100" },
        ],
    },
    {
        title: "G",
        data: [
            { name: "George Clooney", avatar: "https://picsum.photos/id/117/100/100" },
            { name: "Matt Gartenberg", avatar: "https://picsum.photos/id/118/100/100" },
        ],
    },
    {
        title: "H",
        data: [
            { name: "Harry Potter", avatar: "https://picsum.photos/id/119/100/100" },
            { name: "Henry Cavill", avatar: "https://picsum.photos/id/120/100/100" },
        ],
    },
    {
        title: "I",
        data: [
            { name: "Idris Elba", avatar: "https://picsum.photos/id/121/100/100" },
            { name: "Isaac Newton", avatar: "https://picsum.photos/id/122/100/100" },
        ],
    },
    {
        title: "J",
        data: [
            { name: "James Johnson", avatar: "https://picsum.photos/id/123/100/100" },
            { name: "John Doe", avatar: "https://picsum.photos/id/124/100/100" },
            { name: "William Jameson", avatar: "https://picsum.photos/id/125/100/100" },
        ],
    },
    {
        title: "K",
        data: [
            { name: "Kevin Moore", avatar: "https://picsum.photos/id/126/100/100" },
            { name: "Kyle Matthews", avatar: "https://picsum.photos/id/127/100/100" },
            { name: "Rob Kyle", avatar: "https://picsum.photos/id/128/100/100" },
            { name: "Thomas Krasowski", avatar: "https://picsum.photos/id/129/100/100" },
        ],
    },
    {
        title: "L",
        data: [
            { name: "Leonardo DiCaprio", avatar: "https://picsum.photos/id/130/100/100" },
            { name: "Liam Neeson", avatar: "https://picsum.photos/id/131/100/100" },
            { name: "Lucy Liu", avatar: "https://picsum.photos/id/132/100/100" },
        ],
    },
    {
        title: "M",
        data: [
            { name: "Michael Jordan", avatar: "https://picsum.photos/id/133/100/100" },
            { name: "Morgan Freeman", avatar: "https://picsum.photos/id/134/100/100" },
        ],
    },
    {
        title: "N",
        data: [
            { name: "Natalie Portman", avatar: "https://picsum.photos/id/135/100/100" },
            { name: "Neil Armstrong", avatar: "https://picsum.photos/id/136/100/100" },
        ],
    },
    {
        title: "O",
        data: [
            { name: "Oliver Twist", avatar: "https://picsum.photos/id/137/100/100" },
            { name: "Oscar Wilde", avatar: "https://picsum.photos/id/139/100/100" },
        ],
    },
    {
        title: "P",
        data: [
            { name: "Penelope Cruz", avatar: "https://picsum.photos/id/140/100/100" },
            { name: "Peter Parker", avatar: "https://picsum.photos/id/141/100/100" },
        ],
    },
    {
        title: "Q",
        data: [{ name: "Quentin Tarantino", avatar: "https://picsum.photos/id/142/100/100" }],
    },
    {
        title: "R",
        data: [
            { name: "Robert Downey", avatar: "https://picsum.photos/id/143/100/100" },
            { name: "Ryan Reynolds", avatar: "https://picsum.photos/id/144/100/100" },
        ],
    },
    {
        title: "S",
        data: [
            { name: "Scarlett Johansson", avatar: "https://picsum.photos/id/145/100/100" },
            { name: "Steve Rogers", avatar: "https://picsum.photos/id/146/100/100" },
        ],
    },
    {
        title: "T",
        data: [
            { name: "Tom Hanks", avatar: "https://picsum.photos/id/147/100/100" },
            { name: "Tom Holland", avatar: "https://picsum.photos/id/149/100/100" },
        ],
    },
    {
        title: "U",
        data: [{ name: "Usain Bolt", avatar: "https://picsum.photos/id/151/100/100" }],
    },
    {
        title: "V",
        data: [{ name: "Vincent vanGogh", avatar: "https://picsum.photos/id/152/100/100" }],
    },
    {
        title: "W",
        data: [
            { name: "Will Smith", avatar: "https://picsum.photos/id/153/100/100" },
            { name: "Wanda Maximoff", avatar: "https://picsum.photos/id/154/100/100" },
        ],
    },
    {
        title: "X",
        data: [{ name: "Xavier Charles", avatar: "https://picsum.photos/id/155/100/100" }],
    },
    {
        title: "Y",
        data: [{ name: "Yusuf Islam", avatar: "https://picsum.photos/id/156/100/100" }],
    },
    {
        title: "Z",
        data: [{ name: "Zendaya Coleman", avatar: "https://picsum.photos/id/157/100/100" }],
    },
    {
        title: "#",
        data: [
            { name: "50 Cent", avatar: "https://picsum.photos/id/158/100/100" },
            { name: "100 RealEstate", avatar: "https://picsum.photos/id/159/100/100" },
        ],
    },
];

const totalContacts = CONTACTS_DATA.reduce((accumulator, section) => {
    return accumulator + section.data.length;
}, 0);

const ALPHABET = "#ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function ExploreScreen() {
    const sectionListRef = useRef<SectionList | null>(null);
    const searchBarRef = useRef<View | null>(null);
    const [gradientHeight, setGradientHeight] = useState(0);

    const dynamicGradientStyle = [styles.gradient, { height: gradientHeight }];

    const handleMeasure = () => {
        searchBarRef.current?.measure((x, y, width, height, pageX, pageY) => {
            setGradientHeight(pageY + height);
        });
    };

    const handleContactPress = (name: string) => {
        Alert.alert("Contact Selected", `You tapped on ${name}`);
    };

    const scrollToSection = (clickedLetter: string) => {
        const sectionIndex = CONTACTS_DATA.findIndex((section) => section.title === clickedLetter);

        if (sectionIndex !== -1 && sectionListRef.current) {
            sectionListRef.current.scrollToLocation({
                sectionIndex: sectionIndex,
                itemIndex: 1,
                animated: true,
                viewPosition: 0,
            });
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            handleMeasure();
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={styles.screenContainer}>
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
            <SafeAreaView edges={["top"]} style={styles.safeArea}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>联系人</Text>
                    <View style={styles.button}>
                        <Button color="#000" title="+" onPress={() => alert("Pressed!")} />
                    </View>
                </View>

                <View style={styles.searchBar} ref={searchBarRef}>
                    <Image style={styles.searchIcon} source={require("@/assets/images/magnifyingGlass.svg")} />
                    <TextInput style={styles.searchInput} placeholder="搜索联系人/群組" />
                </View>

                <Pressable
                    onPress={() => {
                        alert("pressed");
                    }}
                    style={({ pressed }) => [styles.chatRow, pressed && { opacity: 0.7 }]}
                >
                    <View style={styles.avatarContainer}>
                        <Image source={require("@/assets/images/group.svg")} style={styles.groupIcon} />
                    </View>

                    <View style={styles.contentContainer}>
                        <Text style={styles.nameText}>我的群組</Text>
                        <Image source={require("@/assets/images/arrowRight.svg")} style={styles.arrowIcon} />
                        <View style={styles.separatorLine} />
                    </View>
                </Pressable>

                <View style={styles.contactContainer}>
                    <SectionList
                        ref={sectionListRef}
                        sections={CONTACTS_DATA}
                        keyExtractor={(item, index) => item + index}
                        stickySectionHeadersEnabled={true}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <Pressable
                                onPress={() => handleContactPress(item)}
                                style={({ pressed }) => [styles.itemContainer, { backgroundColor: pressed ? "#f0f0f0" : "#ffffff" }]}
                            >
                                <View style={styles.itemInner}>
                                    <Image source={{ uri: item.avatar }} style={styles.avatar} />
                                    <Text style={styles.contactText}>{item.name}</Text>
                                </View>
                            </Pressable>
                        )}
                        renderSectionHeader={({ section: { title } }) => (
                            <View style={styles.headerContainer}>
                                <Text style={styles.alphabetHeaderText}>{title}</Text>
                            </View>
                        )}
                        ListFooterComponent={() => <Text style={styles.footerText}>{totalContacts}个联系人</Text>}
                    />

                    <View style={styles.indexBar}>
                        {ALPHABET.map((letter) => (
                            <Pressable
                                key={letter}
                                onPress={() => scrollToSection(letter)}
                                style={styles.indexButton}
                                hitSlop={{ top: 4, bottom: 4, left: 10, right: 10 }}
                            >
                                <Text style={styles.indexLetter}>{letter}</Text>
                            </Pressable>
                        ))}
                    </View>
                </View>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: "#fff",
        position: "relative",
        flexDirection: "row",
    },
    gradient: {
        position: "absolute",
        width: "100%",
    },
    safeArea: {
        flex: 1,
        paddingHorizontal: 16,
    },
    header: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        alignSelf: "stretch",
        marginBottom: 20,
    },
    button: {
        position: "absolute",
        right: 0,
    },
    headerText: {
        fontSize: 20,
        fontWeight: "600",
    },
    searchBar: {
        backgroundColor: "#F6F6F6",
        width: "100%",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingHorizontal: 12,
        paddingVertical: 9,
        marginBottom: 4,
        flexDirection: "row",
        borderRadius: 8,
    },
    searchIcon: {
        width: 17,
        height: 17,
    },
    searchInput: {
        marginLeft: 8,
        width: "90%",
    },
    avatarContainer: {
        position: "relative",
    },
    chatRow: {
        flexDirection: "row",
        paddingVertical: 12,
    },
    contentContainer: {
        flex: 1,
        marginLeft: 12,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        position: "relative",
    },
    nameText: {
        fontSize: 14,
        fontWeight: "500",
        color: "#191919",
    },
    arrowIcon: {
        width: 20,
        height: 20,
    },
    groupIcon: {
        width: 42,
        height: 42,
        borderRadius: 8,
        backgroundColor: "#f0f0f0",
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 8,
        backgroundColor: "#f0f0f0",
        marginRight: 18,
    },
    separatorLine: {
        position: "absolute",
        bottom: -12,
        left: 0,
        right: 0,
        height: 0.5,
        backgroundColor: "#e5e5e5",
    },
    contactContainer: {
        flex: 1,
        position: "relative",
    },
    headerContainer: {
        backgroundColor: "#ffffff",
        paddingVertical: 6,
    },
    alphabetHeaderText: {
        fontSize: 10,
        fontWeight: "400",
        color: "#999",
    },
    itemContainer: {
        paddingVertical: 8,
    },
    itemInner: {
        flexDirection: "row",
        alignItems: "center",
    },
    contactText: {
        fontSize: 14,
        color: "#000000",
        fontWeight: "400",
    },
    footerText: {
        color: "#BBB",
        fontSize: 12,
        fontStyle: "normal",
        fontWeight: "400",
        textAlign: "center",
    },
    indexBar: {
        position: "absolute",
        right: 0,
        top: 30,
        bottom: 50,
        justifyContent: "space-between",
        alignItems: "center",
    },
    indexButton: {
        paddingVertical: 1,
        width: "100%",
        alignItems: "center",
    },
    indexLetter: {
        fontSize: 11,
        fontWeight: "600",
        color: "#999",
    },
});
