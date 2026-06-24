import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, StatusBar, Platform, Alert } from 'react-native';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { CartProvider } from './src/context/CartContext';
import { LoginScreen } from './src/screens/LoginScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { FoodListingScreen } from './src/screens/FoodListingScreen';
import { FoodDetailScreen } from './src/screens/FoodDetailScreen';
import { ShoppingCartScreen } from './src/screens/ShoppingCartScreen';
import { OrderHistoryScreen } from './src/screens/OrderHistoryScreen';
import { UserProfileScreen } from './src/screens/UserProfileScreen';
import { AdminDashboardScreen } from './src/screens/AdminDashboardScreen';
import { AdminMenuScreen } from './src/screens/AdminMenuScreen';

if (Platform.OS === 'web') {
  Alert.alert = (title, message, buttons) => {
    const text = message ? `${title}\n${message}` : title;
    if (buttons && buttons.length > 0) {
      if (buttons.length > 1) {
        const hasCancel = buttons.some(b => b.style === 'cancel');
        if (hasCancel) {
          const result = window.confirm(text);
          if (result) {
            const okButton = buttons.find(b => b.style !== 'cancel');
            if (okButton && okButton.onPress) okButton.onPress();
          } else {
            const cancelButton = buttons.find(b => b.style === 'cancel');
            if (cancelButton && cancelButton.onPress) cancelButton.onPress();
          }
        } else {
          window.alert(text);
          if (buttons[0] && buttons[0].onPress) buttons[0].onPress();
        }
      } else {
        window.alert(text);
        if (buttons[0] && buttons[0].onPress) buttons[0].onPress();
      }
    } else {
      window.alert(text);
    }
  };
}

interface FoodItem {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
}

const AppNavigator: React.FC = () => {
  const { isLoggedIn } = useAuth();
  const [currentScreen, setCurrentScreen] = useState<string>('home');
  const [selectedItem, setSelectedItem] = useState<FoodItem | null>(null);

  const navigateTo = (screen: string) => {
    setCurrentScreen(screen);
  };

  const handleSelectItem = (item: FoodItem) => {
    setSelectedItem(item);
    navigateTo('detail');
  };

  if (!isLoggedIn) {
    return <LoginScreen onLoginSuccess={() => navigateTo('home')} />;
  }

  return (
    <View style={styles.appContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
      {currentScreen === 'home' && (
        <HomeScreen onNavigate={navigateTo} />
      )}
      {currentScreen === 'listing' && (
        <FoodListingScreen
          onNavigate={navigateTo}
          onSelectItem={handleSelectItem}
        />
      )}
      {currentScreen === 'detail' && selectedItem && (
        <FoodDetailScreen
          item={selectedItem}
          onNavigate={navigateTo}
        />
      )}
      {currentScreen === 'cart' && (
        <ShoppingCartScreen onNavigate={navigateTo} />
      )}
      {currentScreen === 'history' && (
        <OrderHistoryScreen onNavigate={navigateTo} />
      )}
      {currentScreen === 'profile' && (
        <UserProfileScreen onNavigate={navigateTo} />
      )}
      {currentScreen === 'admin' && (
        <AdminDashboardScreen onNavigate={navigateTo} />
      )}
      {currentScreen === 'menu' && (
        <AdminMenuScreen onNavigate={navigateTo} />
      )}
    </View>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <SafeAreaView style={styles.mainSafeArea}>
          <AppNavigator />
        </SafeAreaView>
      </CartProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  mainSafeArea: {
    flex: 1,
    backgroundColor: '#F8F9FA'
  },
  appContainer: {
    flex: 1
  }
});
