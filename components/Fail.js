import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { getDocs, query, where, collection } from "firebase/firestore";
import { Button, Card, Divider } from "@rneui/base";
import { db } from "./config";

const Fail = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    readAllWhere();
  }, []);
  const readAllWhere = async () => {
    const q = query(collection(db, "students"), where("pass", "==", false));

    const querySnapshot = await getDocs(q);
    let temp = [];
    querySnapshot.forEach((doc) => {
      temp.push(doc.data());
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });
    setData(temp);
  };
  // const readAll = async () => {
  //   const q = query(collection(db, "students"));
  //   const querySnapshot = await getDocs(q);
  //   const allData = querySnapshot.docs.map((doc) => {
  //     let g = 0;
  //     if (doc.data().avg < 60) {
  //       g = doc.data().avg;
  //     }
  //     return {
  //       name: doc.data().name,
  //       grade: g,
  //     };
  //   });
  //   setData(allData);
  // };

  return (
    <View style={styles.container}>
      <Button color="primary" style={{ marginTop: 20 }} onPress={readAllWhere}>
        Refresh!
      </Button>

      <Card width={"80%"}>
        <Card.Title>PASSED STUDENTS</Card.Title>
        <Card.Divider />
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <Text style={{ fontWeight: "bold" }}>Student Name</Text>
          <Text style={{ fontWeight: "bold" }}>Grade</Text>
        </View>

        {data.map((std, i) => (
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
            key={i}
          >
            <Text>{std.name}</Text>
            <Text>{std.avg}</Text>
          </View>
        ))}
      </Card>
    </View>
  );
};

export default Fail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  res: {
    width: "50%",
    fontSize: 18,
    marginTop: 5,
  },
});
