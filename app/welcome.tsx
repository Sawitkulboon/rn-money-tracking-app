import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

import { router } from "expo-router";

export default function WelcomeScreen() {
    return (
        <View style={styles.container}>
            <Image
                source={require("../assets/images/cat.png")}
                style={{ width: 300, height: 300, marginBottom: 40 }}
            />
            <Text style={styles.subtitle}>
                บันทึก
            </Text>
            <Text style={styles.subtitle}>
                รายรับรายจ่าย
            </Text>

            <TouchableOpacity
                style={styles.button}
                onPress={() => router.replace("/home")}
            >
                <Text style={styles.buttonText}>
                    เริ่มใช้งานแอปพลิเคชัน
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffe2e2",
        padding: 20,
    },

    title: {
        fontSize: 32,
        fontWeight: "bold",
        marginBottom: 10,
    },

    subtitle: {
        fontSize: 25,
        color: "#500000",
        marginBottom: 10,
        fontWeight: "bold",
    },

    button: {
        backgroundColor: "#2D8C84",
        paddingHorizontal: 80,
        paddingVertical: 15,
        borderRadius: 25,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },

    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
});