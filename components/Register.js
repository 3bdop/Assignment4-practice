import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Card, Button } from "@rneui/themed";
import { AntDesign, MaterialIcons } from "react-native-vector-icons";
import { ref, uploadBytesResumable } from "firebase/storage";
import {
  addDoc,
  collection,
  doc,
  setDoc,
  getDoc,
  query,
  getDocs,
  where,
} from "firebase/firestore";
import { db, storage } from "./config";

const Register = () => {
  const [name, setName] = useState();
  const [id, setId] = useState();
  const [courseNumber, setCourseNumber] = useState();
  const [grade, setGrade] = useState();
  const [passed, setPass] = useState();
  const [grades, setGrades] = useState([]);
  console.log(grades);
  console.log(passed);
  const clear = () => {
    setId();
    setName();
    setCourseNumber();
    setGrade();
    setGrades([]);
  };
  const checkPassed = (grades) => {
    let sum = 0;
    let c = 0;
    for (let g of grades) {
      sum += parseInt(g.grade);
      c++;
    }
    let avg = sum / c;
    console.log(avg);
    if (avg < 60) {
      setPass(false);
      return avg;
    }
    setPass(true);
    return avg;
  };
  const store = async () => {
    const docRef = doc(db, "students", id);
    await setDoc(docRef, {
      name: name,
      grades: grades,
      avg: checkPassed(grades),
      pass: passed,
    })
      .then(() => {
        clear();
        console.log("data submitted");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const addGrades = (courseNumber, grade) => {
    grades.push({ cid: courseNumber, grade: grade });
    setCourseNumber();
    setGrade();
  };

  return (
    <View style={styles.container}>
      <Card width={"90%"}>
        <Card.Title>Aill Students info</Card.Title>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 10,
          }}
        >
          <TextInput
            placeholder="ID"
            style={styles.input}
            value={id}
            autoCorrect={false}
            onChangeText={(text) => setId(text)}
            keyboardType="numbers-and-punctuation"
          />
          <TextInput
            placeholder="Name"
            style={styles.input}
            value={name}
            autoCorrect={false}
            onChangeText={(text) => setName(text)}
          />
        </View>
        <Card.Divider />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 10,
          }}
        >
          <TextInput
            placeholder="Course Number"
            style={styles.input}
            value={courseNumber}
            autoCorrect={false}
            onChangeText={(text) => setCourseNumber(text)}
          />
          <TextInput
            placeholder="Grade"
            style={styles.input}
            value={grade}
            autoCorrect={false}
            onChangeText={(text) => setGrade(text)}
            keyboardType="numbers-and-punctuation"
          />
        </View>

        <Button
          color={"secondary"}
          style={{ width: 200, alignSelf: "center", padding: 10 }}
          onPress={() => addGrades(courseNumber, grade)}
        >
          Add more Grades
        </Button>
      </Card>
      <Button
        color="primary"
        style={{ width: 400, marginTop: 20 }}
        onPress={store}
      >
        Store
      </Button>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  in: {
    fontSize: 18,
    padding: 10,
    marginBottom: 10,
  },
});
