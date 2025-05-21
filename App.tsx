// --- App.tsx ---
// Main application file for Expo-based MVP
import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Button, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import Constants from 'expo-constants';
import { FIREBASE_CONFIG } from './firebaseConfig';

if (!firebase.apps.length) {
  firebase.initializeApp(FIREBASE_CONFIG);
}

const Tab = createBottomTabNavigator();

function MapScreen() {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
        return;
      }
      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
      setLoading(false);
    })();
  }, []);

  if (loading) return <ActivityIndicator style={{ flex: 1 }} size="large" />;

  return (
    <MapView
      style={{ flex: 1 }}
      region={{
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      <Marker coordinate={{ latitude: location.latitude, longitude: location.longitude }} title="You Are Here" />
    </MapView>
  );
}

function ProfileScreen() {
  const handleLogin = async () => {
    try {
      await firebase.auth().signInAnonymously();
      alert('Logged in anonymously!');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.centered}>
      <Text>User Profile</Text>
      <Button title="Login Anonymously" onPress={handleLogin} />
    </View>
  );
}

function PaymentsScreen() {
  return (
    <View style={styles.centered}>
      <Text>Payments (Stripe Integration Placeholder)</Text>
      <Button title="Start Checkout" onPress={() => alert('Stripe flow goes here')} />
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Map" component={MapScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Tab.Screen name="Payments" component={PaymentsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
