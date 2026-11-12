import React, { useState } from 'react';

import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

// ===============================
// COLORS
// ===============================

const GREEN = '#238B45';
const DARK = '#174C2B';
const LIGHT = '#EAF6ED';
const BG = '#F6FAF6';
const WHITE = '#FFFFFF';
const GRAY = '#718096';

// ===============================
// SAMPLE CROP DATA
// ===============================

const initialProducts = [
  {
    id: '1',
    name: 'Tomato',
    category: 'Vegetable',
    price: '25',
    quantity: '50 kg',
    seller: 'Juan Dela Cruz',
    location: 'Bunawan, Agusan del Sur',
    harvest: 'December 15, 2026',
    description: 'Fresh tomatoes currently growing in the farm. Available for advance reservation.',
    emoji: '🍅',
    isMine: false
  },
  {
    id: '2',
    name: 'Eggplant',
    category: 'Vegetable',
    price: '30',
    quantity: '40 kg',
    seller: 'Pedro Santos',
    location: 'Prosperidad, Agusan del Sur',
    harvest: 'December 20, 2026',
    description: 'Healthy eggplants growing in our family farm. Reserve before harvest.',
    emoji: '🍆',
    isMine: false
  },
  {
    id: '3',
    name: 'Sweet Corn',
    category: 'Grains',
    price: '18',
    quantity: '100 pieces',
    seller: 'Maria Reyes',
    location: 'Trento, Agusan del Sur',
    harvest: 'December 25, 2026',
    description: 'Sweet corn planted and currently growing. Available for pre-order.',
    emoji: '🌽',
    isMine: false
  },
  {
    id: '4',
    name: 'Watermelon',
    category: 'Fruit',
    price: '35',
    quantity: '30 kg',
    seller: 'Jose Garcia',
    location: 'San Francisco, Agusan del Sur',
    harvest: 'January 5, 2027',
    description: 'Watermelons growing naturally on our farm.',
    emoji: '🍉',
    isMine: false
  }
];

// ===============================
// REUSABLE COMPONENTS
// ===============================

function MainButton({ title, onPress, outline = false }) {
  return (
    <TouchableOpacity
      style={[styles.mainButton, outline && styles.outlineButton]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[styles.mainButtonText, outline && styles.outlineText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

function SectionTitle({ title, action, onPress }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {action && (
        <TouchableOpacity onPress={onPress}>
          <Text style={styles.linkText}>{action}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

function ProductCard({ product, onPress }) {
  return (
    <TouchableOpacity
      style={styles.productCard}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <View style={styles.productEmoji}>
        <Text style={{ fontSize: 45 }}>{product.emoji}</Text>
      </View>

      <View style={styles.productInfo}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.smallText}>{product.category}</Text>

        <Text style={styles.price}>
          ₱{product.price} <Text style={styles.smallText}>/ unit</Text>
        </Text>

        <Text style={styles.smallText}>
          Available: {product.quantity}
        </Text>

        <Text style={styles.harvestText}>
          🌱 Harvest: {product.harvest}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

// ===============================
// HOME SCREEN
// ===============================

function HomeScreen({ navigation, products }) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.homeHeader}>
        <Image
          source={require('./assets/agrihub-logo-circle.png')}
          style={styles.brandLogo}
          resizeMode="contain"
          accessible
          accessibilityLabel="AGRIHUB logo"
        />
        <Text style={styles.tagline}>Presko, Barato, Tatak ADSSU!</Text>

        <Text style={styles.welcome}>
          Welcome to AGRIHUB!
        </Text>

        <Text style={styles.subtitle}>
        See what student farmers harvested today,
        with live stock counters so you never miss the freshest produce on campus.
        </Text>

        <MainButton
          title="Explore Marketplace →"
          onPress={() => navigation.navigate('Marketplace')}
        />
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{products.length}</Text>
          <Text style={styles.statLabel}>Crop Listings</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statNumber}>
            {products.filter(p => p.isMine).length}
          </Text>
          <Text style={styles.statLabel}>My Listings</Text>
        </View>
      </View>

      <View style={styles.content}>
        <SectionTitle
          title="Featured Crops"
          action="See All"
          onPress={() => navigation.navigate('Marketplace')}
        />

        {products.slice(0, 3).map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onPress={() =>
              navigation.navigate('ProductDetails', { product })
            }
          />
        ))}

        <SectionTitle title="Quick Access" />

        <View style={styles.quickGrid}>
          <TouchableOpacity
            style={styles.quickCard}
            onPress={() => navigation.navigate('SellCrops')}
          >
            <Text style={styles.quickEmoji}>🌾</Text>
            <Text style={styles.quickTitle}>Sell Crops</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickCard}
            onPress={() => navigation.navigate('MyListings')}
          >
            <Text style={styles.quickEmoji}>📦</Text>
            <Text style={styles.quickTitle}>My Listings</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickCard}
            onPress={() => navigation.navigate('Orders')}
          >
            <Text style={styles.quickEmoji}>🛒</Text>
            <Text style={styles.quickTitle}>Orders</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickCard}
            onPress={() => navigation.navigate('Profile')}
          >
            <Text style={styles.quickEmoji}>👤</Text>
            <Text style={styles.quickTitle}>Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

// ===============================
// MARKETPLACE SCREEN
// ===============================

function MarketplaceScreen({ navigation, products }) {
  const [search, setSearch] = useState('');

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.pageTitle}>Crop Marketplace 🥬</Text>
        <Text style={styles.subtitle}>
          Discover crops available directly from local growers.
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Search crops..."
          value={search}
          onChangeText={setSearch}
        />

        <SectionTitle title="Available Crops" />

        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onPress={() =>
                navigation.navigate('ProductDetails', { product })
              }
            />
          ))
        ) : (
          <Text style={styles.emptyText}>No crops found.</Text>
        )}
      </View>
    </ScrollView>
  );
}

// ===============================
// PRODUCT DETAILS SCREEN
// ===============================

function ProductDetailsScreen({ route, navigation, onOrder }) {
  const { product } = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.detailEmoji}>
          <Text style={{ fontSize: 100 }}>{product.emoji}</Text>
        </View>

        <Text style={styles.pageTitle}>{product.name}</Text>

        <Text style={styles.categoryTag}>{product.category}</Text>

        <Text style={styles.detailPrice}>
          ₱{product.price} / unit
        </Text>

        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Available Quantity</Text>
          <Text style={styles.infoValue}>{product.quantity}</Text>

          <Text style={styles.infoLabel}>Seller</Text>
          <Text style={styles.infoValue}>{product.seller}</Text>

          <Text style={styles.infoLabel}>Farm Location</Text>
          <Text style={styles.infoValue}>{product.location}</Text>

          <Text style={styles.infoLabel}>Expected Harvest</Text>
          <Text style={styles.infoValue}>{product.harvest}</Text>

          <Text style={styles.infoLabel}>Description</Text>
          <Text style={styles.description}>{product.description}</Text>
        </View>

        <Text style={styles.harvestNotice}>
          🌱 This crop is still growing and is available
          for advance reservation.
        </Text>

        <MainButton
          title="Place Sample Order"
          onPress={() => onOrder(product)}
        />

        <MainButton
          title="Back to Marketplace"
          outline
          onPress={() => navigation.goBack()}
        />
      </View>
    </ScrollView>
  );
}

// ===============================
// SELL CROPS SCREEN
// ===============================

function SellCropsScreen({ navigation, onAddProduct }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Vegetable');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [harvest, setHarvest] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  const saveProduct = () => {
    if (!name.trim() || !price.trim() ||
        !quantity.trim() || !harvest.trim() ||
        !location.trim()) {
      Alert.alert('Missing Information', 'Please complete all required fields.');
      return;
    }

    if (Number(price) <= 0 || !Number.isFinite(Number(price))) {
      Alert.alert('Invalid Price', 'Please enter a valid price.');
      return;
    }

    const emojis = {
      Vegetable: '🥬',
      Fruit: '🍉',
      Grains: '🌽',
      Other: '🌱'
    };

    const newProduct = {
      id: Date.now().toString(),
      name: name.trim(),
      category,
      price,
      quantity,
      harvest,
      location,
      description: description.trim() || 'Crop currently growing on the farm.',
      seller: 'My Account',
      emoji: emojis[category] || '🌱',
      isMine: true
    };

    onAddProduct(newProduct);

    Alert.alert(
      'Success!',
      'Your crop listing has been added.',
      [
        {
          text: 'View My Listings',
          onPress: () => navigation.navigate('MyListings')
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.pageTitle}>Sell Your Crops 🌾</Text>

        <Text style={styles.subtitle}>
          Post your growing crops and connect with potential buyers.
        </Text>

        <Text style={styles.label}>Crop Name *</Text>
        <TextInput
          style={styles.input}
          placeholder="Example: Tomato"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Category *</Text>
        <View style={styles.categoryRow}>
          {['Vegetable', 'Fruit', 'Grains', 'Other'].map(item => (
            <TouchableOpacity
              key={item}
              style={[
                styles.categoryButton,
                category === item && styles.categorySelected
              ]}
              onPress={() => setCategory(item)}
            >
              <Text style={[
                styles.categoryText,
                category === item && styles.categoryTextSelected
              ]}>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Price per unit (₱) *</Text>
        <TextInput
          style={styles.input}
          placeholder="Example: 25"
          keyboardType="decimal-pad"
          value={price}
          onChangeText={setPrice}
        />

        <Text style={styles.label}>Available Quantity *</Text>
        <TextInput
          style={styles.input}
          placeholder="Example: 50 kg"
          value={quantity}
          onChangeText={setQuantity}
        />

        <Text style={styles.label}>Expected Harvest Date *</Text>
        <TextInput
          style={styles.input}
          placeholder="Example: December 20, 2026"
          value={harvest}
          onChangeText={setHarvest}
        />

        <Text style={styles.label}>Farm Location *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your farm location"
          value={location}
          onChangeText={setLocation}
        />

        <Text style={styles.label}>Crop Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Describe your crop..."
          multiline
          value={description}
          onChangeText={setDescription}
        />

        <MainButton title="Publish Crop Listing" onPress={saveProduct} />
      </View>
    </ScrollView>
  );
}

// ===============================
// MY LISTINGS SCREEN
// ===============================

function MyListingsScreen({ navigation, products, onDelete }) {
  const myProducts = products.filter(product => product.isMine);

  const confirmDelete = (id, name) => {
    Alert.alert(
      'Delete Listing',
      `Are you sure you want to delete ${name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => onDelete(id)
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.pageTitle}>My Listings 📦</Text>

        <Text style={styles.subtitle}>
          Manage the crops you have posted.
        </Text>

        <MainButton
          title="+ Add New Crop"
          onPress={() => navigation.navigate('SellCrops')}
        />

        {myProducts.length > 0 ? (
          myProducts.map(product => (
            <View key={product.id}>
              <ProductCard
                product={product}
                onPress={() =>
                  navigation.navigate('ProductDetails', { product })
                }
              />

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => confirmDelete(product.id, product.name)}
              >
                <Text style={styles.deleteText}>Delete Listing</Text>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <View style={styles.emptyCard}>
            <Text style={{ fontSize: 45 }}>🌱</Text>
            <Text style={styles.emptyText}>No crop listings yet.</Text>
            <Text style={styles.smallText}>
              Add your first crop to the marketplace.
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

// ===============================
// ORDERS SCREEN
// ===============================

function OrdersScreen({ orders, navigation }) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.pageTitle}>My Orders 🛒</Text>

        <Text style={styles.subtitle}>
          View your crop reservation requests.
        </Text>

        {orders.length > 0 ? (
          orders.map(order => (
            <View key={order.id} style={styles.orderCard}>
              <Text style={styles.productName}>{order.name}</Text>
              <Text style={styles.smallText}>
                Seller: {order.seller}
              </Text>
              <Text style={styles.price}>
                ₱{order.price} / unit
              </Text>
              <Text style={styles.status}>
                Status: {order.status}
              </Text>
            </View>
          ))
        ) : (
          <View style={styles.emptyCard}>
            <Text style={{ fontSize: 45 }}>🛒</Text>
            <Text style={styles.emptyText}>No orders yet.</Text>
            <MainButton
              title="Browse Marketplace"
              onPress={() => navigation.navigate('Marketplace')}
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
}

// ===============================
// PROFILE SCREEN
// ===============================

function ProfileScreen({ navigation, products, orders }) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.profileHeader}>
          <Text style={{ fontSize: 65 }}>👨‍🌾</Text>
          <Text style={styles.pageTitle}>My Profile</Text>
          <Text style={styles.subtitle}>AGRIHUB Member</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Name</Text>
          <Text style={styles.infoValue}>AGRIHUB User</Text>

          <Text style={styles.infoLabel}>Account Type</Text>
          <Text style={styles.infoValue}>Agriculture Student</Text>

          <Text style={styles.infoLabel}>Platform</Text>
          <Text style={styles.infoValue}>AGRIHUB Marketplace</Text>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {products.filter(p => p.isMine).length}
            </Text>
            <Text style={styles.statLabel}>My Crops</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{orders.length}</Text>
            <Text style={styles.statLabel}>Orders</Text>
          </View>
        </View>

        <MainButton
          title="My Listings"
          onPress={() => navigation.navigate('MyListings')}
        />

        <MainButton
          title="View Orders"
          outline
          onPress={() => navigation.navigate('Orders')}
        />
      </View>
    </ScrollView>
  );
}

// ===============================
// MAIN APP
// ===============================

export default function App() {
  const [products, setProducts] = useState(initialProducts);
  const [orders, setOrders] = useState([]);

  const addProduct = (product) => {
    setProducts(previous => [product, ...previous]);
  };

  const deleteProduct = (id) => {
    setProducts(previous =>
      previous.filter(product => product.id !== id)
    );
  };

  const placeOrder = (product) => {
    const newOrder = {
      id: Date.now().toString(),
      name: product.name,
      price: product.price,
      seller: product.seller,
      status: 'Reservation Requested'
    };

    setOrders(previous => [newOrder, ...previous]);

    Alert.alert(
      'Order Submitted!',
      `Your reservation request for ${product.name} has been added to My Orders.`,
      [{ text: 'View Orders' }]
    );
  };

  return (
    <NavigationContainer>
      <StatusBar style="light" />

      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: DARK },
          headerTintColor: WHITE,
          headerTitleStyle: { fontWeight: 'bold' },
          headerBackTitle: 'Back',
          contentStyle: { backgroundColor: BG }
        }}
      >

        <Stack.Screen name="Home" options={{ title: 'AGRIHUB' }}>
          {props => (
            <HomeScreen {...props} products={products} />
          )}
        </Stack.Screen>

        <Stack.Screen
          name="Marketplace"
          options={{ title: 'Crop Marketplace' }}
        >
          {props => (
            <MarketplaceScreen {...props} products={products} />
          )}
        </Stack.Screen>

        <Stack.Screen
          name="ProductDetails"
          options={{ title: 'Product Details' }}
        >
          {props => (
            <ProductDetailsScreen
              {...props}
              onOrder={placeOrder}
            />
          )}
        </Stack.Screen>

        <Stack.Screen
          name="SellCrops"
          options={{ title: 'Sell Your Crops' }}
        >
          {props => (
            <SellCropsScreen
              {...props}
              onAddProduct={addProduct}
            />
          )}
        </Stack.Screen>

        <Stack.Screen
          name="MyListings"
          options={{ title: 'My Listings' }}
        >
          {props => (
            <MyListingsScreen
              {...props}
              products={products}
              onDelete={deleteProduct}
            />
          )}
        </Stack.Screen>

        <Stack.Screen
          name="Orders"
          options={{ title: 'My Orders' }}
        >
          {props => (
            <OrdersScreen {...props} orders={orders} />
          )}
        </Stack.Screen>

        <Stack.Screen
          name="Profile"
          options={{ title: 'My Profile' }}
        >
          {props => (
            <ProfileScreen
              {...props}
              products={products}
              orders={orders}
            />
          )}
        </Stack.Screen>

      </Stack.Navigator>
    </NavigationContainer>
  );
}

// ===============================
// STYLES
// ===============================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG
  },

  content: {
    padding: 18,
    paddingBottom: 35
  },

  homeHeader: {
    backgroundColor: DARK,
    padding: 25,
    paddingTop: 30,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28
  },

  brandLogo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 10,
    borderColor: WHITE,
    backgroundColor: WHITE,
    shadowColor: DARK,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4
  },

  tagline: {
    color: '#C7E8CD',
    fontSize: 13,
    marginTop: 4
  },

  welcome: {
    color: WHITE,
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 35
  },

  subtitle: {
    color: GRAY,
    fontSize: 14,
    lineHeight: 21,
    marginTop: 8,
    marginBottom: 15
  },

  mainButton: {
    backgroundColor: GREEN,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 8
  },

  mainButtonText: {
    color: WHITE,
    fontWeight: 'bold',
    fontSize: 15
  },

  outlineButton: {
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: GREEN
  },

  outlineText: {
    color: GREEN
  },

  statsRow: {
    flexDirection: 'row',
    marginHorizontal: 15,
    marginTop: 18,
    marginBottom: 12
  },

  statCard: {
    flex: 1,
    backgroundColor: WHITE,
    padding: 17,
    marginHorizontal: 5,
    borderRadius: 14,
    alignItems: 'center',
    elevation: 2
  },

  statNumber: {
    fontSize: 25,
    color: GREEN,
    fontWeight: 'bold'
  },

  statLabel: {
    color: GRAY,
    fontSize: 12,
    marginTop: 5
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 18,
    marginBottom: 12
  },

  sectionTitle: {
    fontSize: 19,
    color: DARK,
    fontWeight: 'bold'
  },

  linkText: {
    color: GREEN,
    fontWeight: 'bold'
  },

  productCard: {
    flexDirection: 'row',
    backgroundColor: WHITE,
    borderRadius: 15,
    padding: 12,
    marginBottom: 12,
    elevation: 2
  },

  productEmoji: {
    width: 95,
    height: 115,
    backgroundColor: LIGHT,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center'
  },

  productInfo: {
    flex: 1,
    paddingLeft: 13,
    justifyContent: 'center'
  },

  productName: {
    fontSize: 17,
    color: DARK,
    fontWeight: 'bold'
  },

  smallText: {
    color: GRAY,
    fontSize: 12,
    marginTop: 4
  },

  price: {
    color: GREEN,
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 7
  },

  harvestText: {
    color: GREEN,
    fontSize: 11,
    marginTop: 6
  },

  quickGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },

  quickCard: {
    width: '48%',
    backgroundColor: WHITE,
    padding: 20,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 12,
    elevation: 2
  },

  quickEmoji: {
    fontSize: 32
  },

  quickTitle: {
    color: DARK,
    fontWeight: 'bold',
    marginTop: 8
  },

  pageTitle: {
    color: DARK,
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 10
  },

  input: {
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: '#DCE8DE',
    borderRadius: 10,
    padding: 14,
    fontSize: 14,
    marginBottom: 14
  },

  label: {
    color: DARK,
    fontWeight: 'bold',
    marginBottom: 7,
    marginTop: 8
  },

  textArea: {
    height: 100,
    textAlignVertical: 'top'
  },

  categoryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12
  },

  categoryButton: {
    padding: 10,
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: '#DCE8DE',
    borderRadius: 9,
    marginRight: 6,
    marginBottom: 6
  },

  categorySelected: {
    backgroundColor: GREEN,
    borderColor: GREEN
  },

  categoryText: {
    color: DARK,
    fontSize: 12
  },

  categoryTextSelected: {
    color: WHITE,
    fontWeight: 'bold'
  },

  detailEmoji: {
    backgroundColor: LIGHT,
    height: 190,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },

  detailPrice: {
    fontSize: 25,
    color: GREEN,
    fontWeight: 'bold',
    marginTop: 12
  },

  categoryTag: {
    color: GREEN,
    marginTop: 5
  },

  infoCard: {
    backgroundColor: WHITE,
    borderRadius: 14,
    padding: 18,
    marginTop: 18,
    elevation: 2
  },

  infoLabel: {
    color: GRAY,
    fontSize: 12,
    marginTop: 13
  },

  infoValue: {
    color: DARK,
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 4
  },

  description: {
    color: DARK,
    fontSize: 14,
    lineHeight: 22,
    marginTop: 6
  },

  harvestNotice: {
    backgroundColor: LIGHT,
    color: DARK,
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
    lineHeight: 21
  },

  emptyCard: {
    backgroundColor: WHITE,
    padding: 25,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 15
  },

  emptyText: {
    color: GRAY,
    textAlign: 'center',
    marginTop: 12
  },

  deleteButton: {
    alignSelf: 'flex-end',
    padding: 10,
    marginBottom: 12
  },

  deleteText: {
    color: '#D93636',
    fontWeight: 'bold'
  },

  orderCard: {
    backgroundColor: WHITE,
    padding: 18,
    borderRadius: 13,
    marginBottom: 12,
    elevation: 2
  },

  status: {
    color: GREEN,
    fontWeight: 'bold',
    marginTop: 10
  },

  profileHeader: {
    alignItems: 'center',
    padding: 20
  }
});
