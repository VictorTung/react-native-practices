import { useRef, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

// 1. Define fixed dimensions for layout precision
const ITEM_HEIGHT = 70;
const INDEX_BAR_WIDTH = 30;

interface DataItem {
    id: string;
    name: string;
    group: string;
}

// Generate Mock Alphabetical Data
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const MOCK_DATA: DataItem[] = ALPHABET.flatMap((letter, index) =>
    Array.from({ length: 3 }, (_, i) => ({
        id: `${letter}-${index}-${i}`,
        name: `${letter} - Contact Person ${i + 1}`,
        group: letter,
    })),
);

export default function IndexedList() {
    const flatListRef = useRef<FlatList<DataItem>>(null);
    const [activeLetter, setActiveLetter] = useState<string>("");

    // 2. Map each alphabet letter to its first occurrence index in the list
    const getIndexForGroup = (letter: string): number => {
        return MOCK_DATA.findIndex((item) => item.group === letter);
    };

    // 3. Trigger precise scrolling on index press
    const handleIndexPress = (letter: string) => {
        const targetIndex = getIndexForGroup(letter);

        if (targetIndex !== -1) {
            setActiveLetter(letter);
            flatListRef.current?.scrollToIndex({
                index: targetIndex,
                animated: true,
                viewPosition: 0, // 0 places the item exactly at the top of the viewport
            });
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Main Content List */}
            <FlatList
                ref={flatListRef}
                data={MOCK_DATA}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Text style={styles.itemText}>{item.name}</Text>
                    </View>
                )}
                // 4. CRITICAL: Prevents calculation lag and scrollToIndex crashes
                getItemLayout={(_, index) => ({
                    length: ITEM_HEIGHT,
                    offset: ITEM_HEIGHT * index,
                    index,
                })}
            />

            {/* Floating Right Index Scrollbar */}
            <View style={styles.indexBar}>
                {ALPHABET.map((letter) => {
                    const hasData = getIndexForGroup(letter) !== -1;
                    return (
                        <TouchableOpacity key={letter} onPress={() => handleIndexPress(letter)} disabled={!hasData} style={styles.indexItem}>
                            <Text style={[styles.indexText, !hasData && styles.disabledText, activeLetter === letter && styles.activeText]}>{letter}</Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "#fff",
    },
    itemContainer: {
        height: ITEM_HEIGHT,
        justifyContent: "center",
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#f0f0f0",
    },
    itemText: {
        fontSize: 16,
        color: "#333",
    },
    indexBar: {
        position: "absolute",
        right: 0,
        top: 40,
        bottom: 40,
        width: INDEX_BAR_WIDTH,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10,
    },
    indexItem: {
        paddingVertical: 2,
        width: "100%",
        alignItems: "center",
    },
    indexText: {
        fontSize: 11,
        fontWeight: "bold",
        color: "#007AFF",
    },
    disabledText: {
        color: "#ccc",
    },
    activeText: {
        color: "#ff3b30",
        scale: 1.2,
    },
});
