import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { FoodItemCard } from '../components/FoodItemCard';

interface FoodItem {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
}

interface FoodListingScreenProps {
  onNavigate: (screen: string) => void;
  onSelectItem: (item: FoodItem) => void;
}

const MENU_ITEMS: FoodItem[] = [
  // Sprite
  { id: 's1', name: 'Sprite Classic', price: 3.50, description: 'Crisp refreshing lemon-lime soda.', category: 'Sprite' },
  { id: 's2', name: 'Sprite Zero', price: 3.80, description: 'Zero sugar lemon-lime refreshment.', category: 'Sprite' },
  { id: 's3', name: 'Sprite Duo', price: 4.00, description: 'Double lemon flavor hit.', category: 'Sprite' },
  
  // Coke
  { id: 'c1', name: 'Coke Classic', price: 3.50, description: 'The original sweet carbonated beverage.', category: 'Coke' },
  { id: 'c2', name: 'Coke Zero', price: 3.80, description: 'Original taste with zero sugar.', category: 'Coke' },
  { id: 'c3', name: 'Diet Coke', price: 3.50, description: 'No sugar and no calories.', category: 'Coke' },
  
  // Burger
  { id: 'b1', name: 'Original Burger', price: 8.50, description: 'Flame-grilled patty with lettuce, tomato, and sauce.', category: 'Burger' },
  { id: 'b2', name: 'Cheese Burger', price: 9.50, description: 'Original burger loaded with cheddar cheese layers.', category: 'Burger' },
  
  // Pizza
  { id: 'p1', name: 'Margherita Pizza', price: 11.00, description: 'Mozzarella, fresh basil, and tomato sauce.', category: 'Pizza' },
  { id: 'p2', name: 'Pepperoni Pizza', price: 13.50, description: 'Classic mozzarella and pepperoni pizza.', category: 'Pizza' },
  { id: 'p3', name: 'Regina Pizza', price: 14.00, description: 'Ham and mushroom premium pizza.', category: 'Pizza' },
  
  // Ice Cream
  { id: 'i1', name: 'Standard Scoop Ice Cream', price: 4.50, description: 'Delicious cold scoop ice cream.', category: 'IceCream' },
  
  // Chips
  { id: 'ch1', name: 'Regular Chips', price: 4.00, description: 'Freshly fried hot potato chips.', category: 'Chips' },
  { id: 'ch2', name: 'Large Chips', price: 5.50, description: 'Crispy salted golden chips (Large).', category: 'Chips' }
];

const CATEGORIES = ['All', 'Sprite', 'Coke', 'Burger', 'Pizza', 'IceCream', 'Chips'];

export const FoodListingScreen: React.FC<FoodListingScreenProps> = ({ onNavigate, onSelectItem }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = MENU_ITEMS.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => onNavigate('home')} style={styles.backBtn}>
            <Text style={styles.backText}>← Dashboard</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Menu Browser</Text>
        </View>

        <TextInput
          style={styles.searchBar}
          placeholder="🔍 Search food items..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#999999"
        />

        <View style={styles.categoriesContainer}>
          <ScrollViewHorizontal categories={CATEGORIES} selected={selectedCategory} onSelect={setSelectedCategory} />
        </View>

        <FlatList
          data={filteredItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <FoodItemCard
              item={item}
              onPress={() => onSelectItem(item)}
            />
          )}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Text style={styles.emptyText}>No menu items match your search criteria.</Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
};

// Internal horizontal category slider
const ScrollViewHorizontal: React.FC<{
  categories: string[];
  selected: string;
  onSelect: (cat: string) => void;
}> = ({ categories, selected, onSelect }) => {
  return (
    <FlatList
      horizontal
      data={categories}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item}
      renderItem={({ item }) => {
        const isSelected = item === selected;
        return (
          <TouchableOpacity
            style={[styles.categoryBtn, isSelected && styles.selectedCategoryBtn]}
            onPress={() => onSelect(item)}
          >
            <Text style={[styles.categoryText, isSelected && styles.selectedCategoryText]}>{item}</Text>
          </TouchableOpacity>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F9FA'
  },
  container: {
    flex: 1,
    padding: 20
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  backBtn: {
    paddingRight: 16
  },
  backText: {
    fontSize: 16,
    color: '#FF6B35',
    fontWeight: 'bold'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2C3E50'
  },
  searchBar: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DEE2E6',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333333',
    marginBottom: 16
  },
  categoriesContainer: {
    marginBottom: 16
  },
  categoryBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#EFEFEF',
    marginRight: 10
  },
  selectedCategoryBtn: {
    backgroundColor: '#FF6B35'
  },
  categoryText: {
    fontSize: 14,
    color: '#333333',
    fontWeight: '600'
  },
  selectedCategoryText: {
    color: '#FFFFFF'
  },
  list: {
    paddingBottom: 20
  },
  empty: {
    paddingVertical: 40,
    alignItems: 'center'
  },
  emptyText: {
    color: '#6C757D',
    fontSize: 16
  }
});
