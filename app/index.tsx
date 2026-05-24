import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/welcome");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient
      colors={["#7FC6C6", "#4D9A9A"]}
      style={styles.container}
    >
      <View style={styles.centerContent}>
        <Text style={styles.title}>
          Money Tracking
        </Text>

        <Text style={styles.subtitle}>
          รายรับรายจ่ายของฉัน
        </Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Created by 6852D10035
        </Text>

        <Text style={styles.footerText}>
          - SAU -
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 60,
  },

  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },

  subtitle: {
    fontSize: 16,
    color: "#fff",
    marginTop: 8,
  },

  footer: {
    alignItems: "center",
  },

  footerText: {
    color: "yellow",
    fontSize: 12,
    fontWeight: "bold",
  },
});