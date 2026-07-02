import { useRef } from "react";
import { Animated, Button, SafeAreaView, StyleSheet } from "react-native";

export default function NativeAnimationExample() {
    // 1. Initialize Animated Values using useRef to persist them across re-renders
    const fadeAnim = useRef(new Animated.Value(0)).current; // Starts invisible
    const slideAnim = useRef(new Animated.Value(100)).current; // Starts 100px down

    const handleAnimate = () => {
        // Reset values to their starting points if you want to replay it
        fadeAnim.setValue(0);
        slideAnim.setValue(100);

        // 2. Compose the animations together
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true, // Executes smoothly on the Native Thread
            }),
            Animated.spring(slideAnim, {
                toValue: 0,
                friction: 5,
                tension: 40,
                useNativeDriver: true, // Executes smoothly on the Native Thread
            }),
        ]).start(() => {
            console.log("Animation completed!");
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* 3. Wrap the target component in an Animated container */}
            <Animated.View
                style={[
                    styles.box,
                    {
                        opacity: fadeAnim, // Map animated value to opacity
                        transform: [{ translateY: slideAnim }], // Map animated value to translation
                    },
                ]}
            />
            <Button title="Drop & Fade In" onPress={handleAnimate} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f5f5",
    },
    box: {
        width: 120,
        height: 120,
        backgroundColor: "#3b82f6",
        borderRadius: 16,
        marginBottom: 30,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
});
