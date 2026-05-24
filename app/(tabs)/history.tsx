import {
    Alert,
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";

import { Ionicons } from "@expo/vector-icons";

import { supabase } from "../../services/supabase";

export default function HistoryScreen() {
    const [transactions, setTransactions] = useState<any[]>([]);

    useFocusEffect(
        useCallback(() => {
            fetchTransactions();
        }, [])
    );

    // FETCH DATA
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
    };

    // DELETE
    const deleteTransaction = async (id: string) => {
        Alert.alert(
            "ลบรายการ",
            "ต้องการลบรายการนี้หรือไม่ ?",
            [
                {
                    text: "ยกเลิก",
                    style: "cancel",
                },

                {
                    text: "ลบ",
                    style: "destructive",

                    onPress: async () => {
                        const { error } = await supabase
                            .from("money_bk")
                            .delete()
                            .eq("id", id);

                        if (error) {
                            Alert.alert(
                                "Error",
                                error.message
                            );

                            return;
                        }

                        fetchTransactions();
                    },
                },
            ]
        );
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

                {/* DELETE */}
                <TouchableOpacity
                    onPress={() =>
                        deleteTransaction(item.id)
                    }
                >
                    <Ionicons
                        name="trash-outline"
                        size={24}
                        color="#888"
                    />
                </TouchableOpacity>
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
            {/* TITLE */}
            <Text style={styles.header}>
                ประวัติรายการ
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
                style={{ marginHorizontal: 20 }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F5F5",

    },

    header: {
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
        color: "#2D8C84",
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
        marginRight: 15,
    },
    appBarImage: {
        width: 50,
        height: 50,
        borderRadius: 25,

    },
    appBar: {
        flexDirection: "row",
        paddingTop: 50,
        height: 120,
        backgroundColor: "#7D7D7D",
        justifyContent: "space-between",
        paddingHorizontal: 20,

    },

    appBarTitle: {
        color: "#3b3b3b",
        fontSize: 22,
        fontWeight: "bold",
    },
});