import {
    StyleSheet,
    TextInput,
    View,
    Text,
    Button,
    Modal,
    ScrollView,
    Pressable,
    TouchableOpacity,
    Alert
} from "react-native";
import { useEffect, useState } from "react";
import {

    doc,
    setDoc,

    getDocs,
    onSnapshot,
    collection,
    query,
    deleteDoc,
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import { auth, db, storage } from "./config";
import { ref, getDownloadURL } from "firebase/storage";
import { Card } from "@rneui/themed";
import { Avatar } from "@rneui/base";
import { Dropdown } from "react-native-element-dropdown";

export default function Home({ navigation }) {
    const [itemName, setItemName] = useState();
    const [price, setPrice] = useState();
    const [color, setColor] = useState();
    const [c, setC] = useState(0)
    const [ob, setOb] = useState({});
    const [data, setData] = useState([])
    const [modalVisible, setModalVisible] = useState(false);

    const colors = [
        { label: "Red", value: "red" },
        { label: "Blue", value: "blue" },
        { label: "Green", value: "green" },
        { label: "White", value: "white" },
        { label: "Black", value: "black" },
        { label: "Yellow", value: "yellow" },
    ];

    useEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <Button title="Sign out" onPress={() => navigation.replace('Login')} />
            )
        })
    }, []);
    useEffect(() => {
        const unsubscribe = onSnapshot(
            collection(db, "users"),
            async (snapshot) => {
                const items = []
                for (const itemDoc of snapshot.docs) {
                    const itemData = itemDoc.data()
                    const itemId = itemDoc.id
                    let all = {
                        name: itemId,
                        price: itemData.price,
                        color: itemData.color
                    }
                    items.push(all)
                }
                setData(items)
            }
        )
        return () => unsubscribe()
    }, [])
    //************************************ */

    //************************************* */
    // const readAll = async () => {
    //     const q = query(collection(db, "users"));
    //     const unsubscribe = onSnapshot(q, (snapshot) => {
    //         // const querySnapshot = await getDocs(q);
    //         const allData = snapshot.docs.map((doc) => {
    //             return {
    //                 name: doc.id,
    //                 price: (doc.data().price / 100) * 10,
    //                 color: doc.data().color
    //             };
    //         })
    //         setData(allData);
    //     })
    //     return unsubscribe
    // };



    //************************************* */

    const clear = () => {
        setColor('')
        setItemName('')
        setPrice()
    };
    //************************************* */

    const create = async () => {
        const docRef = doc(db, "users", itemName);
        await setDoc(docRef, {
            price: (price / 100) * 10,
            color: color.value
        })
            .then(() => {
                clear()
                console.log("data submitted")
            })
            .catch((error) => {
                console.log(error.message);

            });

    };

    //************************************* */

    //delete row
    const deleteUser = async (id) => {
        const userDoc = doc(db, "users", id);
        await deleteDoc(userDoc);
        Alert.alert(`Item is deleted!`, "", {
            text: "OK",
            onPress: () => console.log("OK Pressed"),
        });
    };

    //************************************* */
    const edit = (obj) => {

    };
    //************************************* */

    const update = async (id) => {

    };
    //************************************* */

    const friend = (doc) => {
        return (
            <View key={doc.itemName}>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Avatar

                    />
                    <Text style={styles.text}>{doc.itemName}</Text>
                    <View style={{ flexDirection: "row" }}>

                    </View>

                    <Text

                        style={{ alignSelf: "center", fontSize: 16, color: "orange" }}
                    >
                        Edit
                    </Text>

                    <Text

                        style={{ alignSelf: "center", fontSize: 16, color: "red" }}
                    >
                        Delete
                    </Text>
                </View>
            </View>
        );
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                {/* *********************************************** */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}

                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>

                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    flexWrap: "wrap",
                                }}
                            >
                                <TextInput
                                    style={styles.input}
                                    value={itemName}
                                    editable={false}
                                    placeholder="Item Name"
                                    autoComplete="false"
                                    autoCorrect="false"
                                />
                                <TextInput
                                    style={styles.input}
                                    value={price}
                                    placeholder="Price"
                                    autoComplete="false"
                                    autoCorrect="false"
                                    autoFocus={true}
                                />

                                <Dropdown
                                    data={colors}
                                    labelField="label"
                                    valueField="value"
                                    style={[styles.input, { width: "100%" }]}
                                    search={true}
                                    value={color}
                                    onChange={((value) => setColor(value))}
                                    placeholder="Select color"
                                    selectedTextStyle={{ fontSize: 20 }}
                                    searchPlaceholder="Search..."
                                />
                            </View>
                            <View style={{ flexDirection: "row", margin: 10 }}>
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => setModalVisible(!modalVisible)}
                                >
                                    <Text style={styles.textStyle}>close</Text>
                                </Pressable>
                                <Pressable
                                    style={[styles.button, styles.buttonOpen]}

                                >
                                    <Text style={styles.textStyle}>Save</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </Modal>
                <View style={{ width: "95%" }}>
                    <Card>
                        <Card.Title
                            style={{
                                backgroundColor: "darkblue",
                                color: "white",
                                height: 50,
                                fontSize: 22,
                                padding: 10,
                            }}
                        >
                            Add items
                        </Card.Title>
                        <Card.Divider />
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                flexWrap: "wrap",
                            }}
                        >
                            <TextInput
                                style={styles.input}
                                value={itemName == undefined ? '' : itemName}
                                placeholder="Item Name"
                                autoComplete="false"
                                autoCorrect="false"
                                onChangeText={setItemName}
                            />
                            <TextInput
                                value={price == undefined ? '' : price}
                                style={styles.input}
                                placeholder="Price"
                                autoComplete="false"
                                autoCorrect="false"
                                onChangeText={setPrice}
                            />

                            <Dropdown
                                labelField="label"
                                valueField="value"
                                data={colors}
                                style={[styles.input, { width: "100%" }]}
                                search={true}
                                value={color}
                                onChange={(value) => setColor(value)} selectedTextStyle={{ fontSize: 20 }}
                                searchPlaceholder="Search..."

                            />
                        </View>
                        <Button title="Add" onPress={create} />
                    </Card>
                </View>
                <View style={{ width: "95%" }}>
                    <Card>
                        <Card.Title
                            style={{
                                backgroundColor: "darkblue",
                                color: "white",
                                height: 50,
                                fontSize: 22,
                                padding: 10,
                            }}
                        >
                            Item List
                        </Card.Title>
                        <View
                            style={{ flexDirection: "row", justifyContent: "space-between" }}
                        >
                            <Text style={styles.text}>Icon</Text>
                            <Text style={styles.text}>Name</Text>
                            <Text style={styles.text}>Price</Text>
                            <Text style={styles.text}>Edit</Text>
                            <Text style={styles.text}>Del</Text>

                        </View>
                        {data ? data.map((item, index) => (
                            <View key={index} style={[{ flexDirection: "row", justifyContent: 'space-between' }]}>
                                <View style={{
                                    borderRadius: 20, width: 40, height: 40, backgroundColor: item.color,
                                    borderWidth: item.color == 'white' ? 1 : 0,
                                    alignItems: 'center', justifyContent: 'center', borderColor: item.color == 'white' ? 'black' : 'white'
                                }}>
                                    <Text style={{ color: item.color == 'white' ? 'black' : 'white' }}>{(item.name).charAt(0).toUpperCase()}</Text>
                                </View>
                                <Text >{item.name}</Text>
                                <Text style={styles.text}>{item.price}$</Text>
                                <Button title="Edit" color={"yellow"} />
                                <Button title="Delete" color={"red"} onPress={() => deleteUser(item.name)} />
                            </View>)) : ''}
                        <Card.Divider />


                    </Card>
                </View>



            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    input: {
        fontSize: 18,
        padding: 10,
        width: "45%",
        borderWidth: 1,
        borderRadius: 10,
        marginTop: "2%",
    },
    text: {
        alignSelf: "center",
        fontSize: 16,
        margin: 15,
        fontWeight: "bold"
    },
    title: {
        alignSelf: "center",
        fontSize: 16,
        margin: 15,
        fontWeight: "bold",
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        // width: 200,
    },
    modalView: {
        width: 350,
        margin: 20,
        backgroundColor: "#e8eddf",
        borderWidth: 1,
        borderRadius: 20,
        padding: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        width: 100,
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginHorizontal: 10,
    },
    buttonOpen: {
        backgroundColor: "#8fec8d",
    },
    buttonClose: {
        backgroundColor: "lightgrey",
    },
    textStyle: {
        fontWeight: "bold",
        textAlign: "center",
    },
});
