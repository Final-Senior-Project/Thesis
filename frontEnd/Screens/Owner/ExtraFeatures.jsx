import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { APP_API_URL } from '../../env';

const ExtraFeatures = () => {
    const route = useRoute();
    const { propertyid } = route.params;
    const navigation = useNavigation();
    const [Bedroom, setBedroom] = useState(0);
    const [Bathroom, setBathroom] = useState(0);
    const [Person, setPerson] = useState(0);
    const [Ac, setAc] = useState('');
    const [Pool, setPool] = useState('');
    const [features, setFeatures] = useState({ bedroom: Bedroom, bathroom: Bathroom, person: Person, ac: Ac, pool: Pool });
    const [extra, setExtra] = useState([]);

    const addExtra = async () => {
        try {
            const res = await axios.put(`${APP_API_URL}/property/extra/${propertyid}`, { Bedroom, Bathroom, Person, Ac, Pool });
            setExtra(res.data);
            console.log("data", res.data);
        } catch (error) {
            console.log('err', error);
        }
    };

    const incrementFeature = (feature) => {
        setFeatures((prevFeatures) => ({
            ...prevFeatures,
            [feature]: prevFeatures[feature] + 1,
        }));
    };

    const decrementFeature = (feature) => {
        setFeatures((prevFeatures) => ({
            ...prevFeatures,
            [feature]: prevFeatures[feature] > 0 ? prevFeatures[feature] - 1 : 0,
        }));
    };

    const handleExtra = () => {
        addExtra();
        navigation.navigate('img', { propertyid });
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.formContainer}>
                <View style={styles.form}>
                    <Text style={styles.label}>Bedroom</Text>
                    <View style={styles.inputRow}>
                        <TouchableOpacity onPress={() => decrementFeature('bedroom')} style={styles.incrementButton}>
                            <Text style={styles.incrementButtonText}>-</Text>
                        </TouchableOpacity>
                        <TextInput
                            style={styles.input}
                            placeholder="Bedroom"
                            keyboardType="numeric"
                            value={features.bedroom.toString()}
                            onChangeText={(text) => setBedroom(Number(text))}
                        />
                        <TouchableOpacity onPress={() => incrementFeature('bedroom')} style={styles.incrementButton}>
                            <Text style={styles.incrementButtonText}>+</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.label}>Bathroom</Text>
                    <View style={styles.inputRow}>
                        <TouchableOpacity onPress={() => decrementFeature('bathroom')} style={styles.incrementButton}>
                            <Text style={styles.incrementButtonText}>-</Text>
                        </TouchableOpacity>
                        <TextInput
                            style={styles.input}
                            placeholder="Bathroom"
                            keyboardType="numeric"
                            value={features.bathroom.toString()}
                            onChangeText={(text) => setBathroom(Number(text))}
                        />
                        <TouchableOpacity onPress={() => incrementFeature('bathroom')} style={styles.incrementButton}>
                            <Text style={styles.incrementButtonText}>+</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.label}>Person</Text>
                    <View style={styles.inputRow}>
                        <TouchableOpacity onPress={() => decrementFeature('person')} style={styles.incrementButton}>
                            <Text style={styles.incrementButtonText}>-</Text>
                        </TouchableOpacity>
                        <TextInput
                            style={styles.input}
                            placeholder="Person"
                            keyboardType="numeric"
                            value={features.person.toString()}
                            onChangeText={(text) => setPerson(Number(text))}
                        />
                        <TouchableOpacity onPress={() => incrementFeature('person')} style={styles.incrementButton}>
                            <Text style={styles.incrementButtonText}>+</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.label}>AC</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="yes or no"
                        value={Ac}
                        onChangeText={setAc}
                    />

                    <Text style={styles.label}>Pool</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="yes or no"
                        value={Pool}
                        onChangeText={setPool}
                    />
                </View>

                <TouchableOpacity style={styles.button} onPress={handleExtra}>
                    <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 25,
        backgroundColor: '#f9f9f9',
    },
    formContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    form: {
        width: '100%',
        justifyContent: 'center',
        marginBottom: 10,
    },
    label: {
        fontSize: 17,
        color: '#333',
        marginBottom: 8,
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        flex: 1,
        textAlign: 'center',
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    incrementButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: '#007BFF',
        marginHorizontal: 5,
    },
    incrementButtonText: {
        color: '#fff',
        fontSize: 20,
    },
    button: {
        alignSelf: 'flex-end',
        backgroundColor: '#007BFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginTop: 20,
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default ExtraFeatures;