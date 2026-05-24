import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    View,
} from "react-native";

import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";

import { Ionicons } from "@expo/vector-icons";

import { supabase } from "../../services/supabase";

export default function HomeScreen() {
    const [transactions, setTransactions] =
        useState<any[]>([]);

    const [totalIncome, setTotalIncome] =
        useState(0);

    const [totalExpense, setTotalExpense] =
        useState(0);

    const [balance, setBalance] =
        useState(0);

    // LOAD DATA
    useFocusEffect(
        useCallback(() => {
            fetchTransactions();
        }, [])
    );

    // FETCH DATABASE
    const fetchTransactions = async () => {
        const { data, error } = await supabase
            .from("money_bk")
            .select("*")
            .order("created_at", {
                ascending: false,
            });

        if (error) {
            console.log(error);
            return;
        }

        setTransactions(data);

        // CALCULATE
        let income = 0;
        let expense = 0;

        data.forEach((item: any) => {
            if (item.type === "income") {
                income += Number(item.amount);
            } else {
                expense += Number(item.amount);
            }
        });

        setTotalIncome(income);
        setTotalExpense(expense);
        setBalance(income - expense);
    };

    // RENDER ITEM
    const renderItem = ({ item }: any) => {
        return (
            <View style={styles.itemContainer}>
                {/* ICON */}
                <View
                    style={[
                        styles.iconCircle,
                        {
                            backgroundColor:
                                item.type === "income"
                                    ? "#17B45A"
                                    : "#FF3B30",
                        },
                    ]}
                >
                    <Ionicons
                        name={
                            item.type === "income"
                                ? "arrow-down"
                                : "arrow-up"
                        }
                        size={18}
                        color="#fff"
                    />
                </View>

                {/* TEXT */}
                <View style={styles.textContainer}>
                    <Text style={styles.itemTitle}>
                        {item.title}
                    </Text>

                    <Text style={styles.itemType}>
                        {new Date(
                            item.created_at
                        ).toLocaleString("th-TH", {
                            day: "numeric",
                            month: "short",
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </Text>
                </View>

                {/* AMOUNT */}
                <Text
                    style={[
                        styles.amountText,
                        {
                            color:
                                item.type === "income"
                                    ? "#17B45A"
                                    : "#FF3B30",
                        },
                    ]}
                >
                    {item.amount} ฿
                </Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.appBar}>
                <Text style={styles.appBarTitle}>
                    Sawit Kulboon
                </Text>
                <Image
                    style={styles.appBarImage}
                    source={require("@/assets/images/my.jpg")}
                />
            </View>
            {/* TOP CARD */}
            <View style={styles.card}>
                {/* BALANCE */}
                <View style={styles.balanceContainer}>
                    <Text style={styles.balanceLabel}>
                        ยอดเงินคงเหลือ
                    </Text>

                    <Text style={styles.balanceText}>
                        {balance.toLocaleString()} ฿
                    </Text>
                </View>

                {/* SUMMARY */}
                <View style={styles.summaryRow}>
                    {/* INCOME */}
                    <View style={styles.summaryBox}>
                        <View style={styles.summaryTitleRow}>
                            <Ionicons
                                name="arrow-down-circle"
                                size={16}
                                color="#D9D9D9"
                            />

                            <Text style={styles.summaryTitle}>
                                เงินเข้า
                            </Text>
                        </View>

                        <Text style={styles.summaryAmount}>
                            {totalIncome.toLocaleString()} ฿
                        </Text>
                    </View>

                    {/* EXPENSE */}
                    <View style={styles.summaryBox}>
                        <View style={styles.summaryTitleRow}>
                            <Ionicons
                                name="arrow-up-circle"
                                size={16}
                                color="#D9D9D9"
                            />

                            <Text style={styles.summaryTitle}>
                                เงินออก
                            </Text>
                        </View>

                        <Text style={styles.summaryAmount}>
                            {totalExpense.toLocaleString()} ฿
                        </Text>
                    </View>
                </View>
            </View>

            {/* TITLE */}
            <Text style={styles.sectionTitle}>
                รายการล่าสุด
            </Text>

            {/* LIST */}
            <FlatList
                data={transactions}
                keyExtractor={(item) =>
                    item.id.toString()
                }
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: 100,
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F5F5",
        padding: 15,
        overflow: "visible",
    },

    card: {
        backgroundColor: "#2D8C84",
        borderRadius: 25,
        padding: 20,
        marginBottom: 20,
        marginTop: 100,
        zIndex: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 5,
        elevation: 10,
    },

    balanceContainer: {
        alignItems: "center",
        marginBottom: 20,
    },

    balanceLabel: {
        color: "#fff",
        fontSize: 16,
    },

    balanceText: {
        color: "#fff",
        fontSize: 40,
        fontWeight: "bold",
        marginTop: 5,
    },

    summaryRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    summaryBox: {
        width: "48%",
    },

    summaryTitleRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        marginBottom: 5,
    },

    summaryTitle: {
        color: "#D9D9D9",
        fontSize: 13,
    },

    summaryAmount: {
        color: "#fff",
        fontSize: 24,
        fontWeight: "bold",
    },

    sectionTitle: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 15,
        textAlign: "center",
    },

    itemContainer: {
        backgroundColor: "#fff",

        borderRadius: 15,

        padding: 15,

        marginBottom: 12,

        flexDirection: "row",
        alignItems: "center",

        shadowColor: "#000",

        shadowOffset: {
            width: 0,
            height: 2,
        },

        shadowOpacity: 0.08,
        shadowRadius: 3,

        elevation: 2,
    },

    iconCircle: {
        width: 45,
        height: 45,

        borderRadius: 25,

        justifyContent: "center",
        alignItems: "center",
    },

    textContainer: {
        flex: 1,
        marginLeft: 12,
    },

    itemTitle: {
        fontSize: 16,
        fontWeight: "bold",
    },

    itemType: {
        fontSize: 13,
        color: "#888",
        marginTop: 4,
    },

    amountText: {
        fontSize: 18,
        fontWeight: "bold",
    },
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