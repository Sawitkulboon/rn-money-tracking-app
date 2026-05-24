import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useCallback, useState } from "react";

import { useFocusEffect } from "@react-navigation/native";

import { Ionicons } from "@expo/vector-icons";

import { router } from "expo-router";

import { supabase } from "../../services/supabase";

export default function IncomeScreen() {
  const [balance, setBalance] = useState(0);

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  // ADD INCOME
  const addIncome = async () => {
    // VALIDATE
    if (!title || !amount) {
      Alert.alert(
        "แจ้งเตือน",
        "กรุณากรอกข้อมูลให้ครบ"
      );

      return;
    }

    // INSERT DATABASE
    const { error } = await supabase
      .from("money_bk")
      .insert([
        {
          title: title,
          amount: Number(amount),
          type: "income",
        },
      ]);

    // ERROR
    if (error) {
      Alert.alert(
        "Error",
        error.message
      );

      return;
    }

    // SUCCESS
    Alert.alert(
      "สำเร็จ",
      "เพิ่มรายรับเรียบร้อย"
    );

    // CLEAR INPUT
    setTitle("");
    setAmount("");

    // GO HOME
    router.replace("/home");
  };
  const fetchBalance = async () => {
    const { data, error } = await supabase
      .from("money_bk")
      .select("*");

    if (error) {
      console.log(error);
      return;
    }

    let income = 0;
    let expense = 0;

    data.forEach((item: any) => {
      if (item.type === "income") {
        income += Number(item.amount);
      } else {
        expense += Number(item.amount);
      }
    });

    setBalance(income - expense);
  };
  const [totalIncome, setTotalIncome] =
    useState(0);

  const [totalExpense, setTotalExpense] =
    useState(0);

  const getCurrentDateTime = () => {
    const now = new Date();

    const formatted =
      now.toLocaleDateString("th-TH", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }) +
      " | " +
      now.toLocaleTimeString("th-TH", {
        hour: "2-digit",
        minute: "2-digit",
      });

    setCurrentDate(formatted);
  };
  const [currentDate, setCurrentDate] =
    useState("");

  useFocusEffect(
    useCallback(() => {
      fetchBalance();
      getCurrentDateTime();
    }, [])
  );

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
      <Text style={styles.dateText}>
        {currentDate}
      </Text>
      {/* TITLE */}
      <Text style={styles.header}>
        เพิ่มรายรับ
      </Text>

      {/* FORM */}
      <View style={styles.formContainer}>
        {/* TITLE */}
        <Text style={styles.label}>
          รายการรายรับ
        </Text>

        <TextInput
          placeholder="เช่น เงินเดือน"
          style={styles.input}
          value={title}
          onChangeText={setTitle}
        />

        {/* AMOUNT */}
        <Text style={styles.label}>
          จำนวนเงิน
        </Text>

        <TextInput
          placeholder="0.00"
          style={styles.input}
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />

        {/* BUTTON */}
        <TouchableOpacity
          style={styles.button}
          onPress={addIncome}
        >
          <Text style={styles.buttonText}>
            บันทึกรายรับ
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 20,
    paddingTop: 80,
    paddingBottom: 100,
    overflow: "visible",
  },

  header: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 20,
    textAlign: "center",
  },

  formContainer: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },

  input: {
    backgroundColor: "#F2F2F2",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 14,
    fontSize: 16,
    marginBottom: 20,
  },

  button: {
    backgroundColor: "#17B45A",

    paddingVertical: 16,

    borderRadius: 15,

    marginTop: 10,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#2D8C84",
    borderRadius: 25,
    padding: 20,
    marginBottom: 20,
    marginTop: 30,
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

  summaryIcon: {
    color: "#D9D9D9",
  },
  dateText: {
    textAlign: "center",
    marginBottom: 20,
    color: "#666",
    fontSize: 25,
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