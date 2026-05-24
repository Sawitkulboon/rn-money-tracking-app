import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function TabLayout() {
  return (
    <View style={{ flex: 1 }}>
      {/* APP BAR */}

      {/* TABS */}
      <Tabs
        screenOptions={{
          headerShown: false,

          tabBarStyle: {
            position: "absolute",

            bottom: 15,
            left: 15,
            right: 15,

            height: 65,

            borderRadius: 20,

            backgroundColor: "#2D8C84",

            paddingTop: 5,
            paddingBottom: 5,

            elevation: 5,
          },
          tabBarActiveTintColor: "#fff",
          tabBarInactiveTintColor: "#d6f2ef",
        }}
      >
        {/* HOME */}
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",

            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="home-outline"
                size={size}
                color={color}
              />
            ),
          }}
        />

        {/* INCOME */}
        <Tabs.Screen
          name="income"
          options={{
            title: "Income",

            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="arrow-down-circle-outline"
                size={30}
                color={color}
              />
            ),
          }}
        />

        {/* EXPENSES */}
        <Tabs.Screen
          name="expenses"
          options={{
            title: "Expenses",

            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="arrow-up-circle-outline"
                size={30}
                color={color}
              />
            ),
          }}
        />

        {/* HISTORY */}
        <Tabs.Screen
          name="history"
          options={{
            title: "History",

            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="time-outline"
                size={size}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  appBarImage: {
    width: 50,
    height: 50,
    borderRadius: 25,

  },
  appBar: {
    flexDirection: "row",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    paddingTop: 50,
    height: 200,
    backgroundColor: "#7D7D7D",
    justifyContent: "space-between",
    paddingHorizontal: 20,

  },

  appBarTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
});