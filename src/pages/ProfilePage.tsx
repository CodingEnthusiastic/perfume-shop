import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";
import { useCartStore } from "@/stores/cartStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Phone, MapPin, LogOut, User, ShoppingBag, Calendar, Trash2, Plus, Minus } from "lucide-react";
import api from "@/services/api";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuthStore();
  const { items: cartItems, removeItem, updateQuantity, getTotalPrice, clearCart, loadFromStorage } = useCartStore();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    loadFromStorage();
    fetchOrders();
  }, [isAuthenticated, navigate]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await api.get("/transactions");
      if (response.data.success) {
        setOrders(response.data.transactions || []);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-28 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
            My Account
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Manage your profile and view your orders
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Section */}
          <div className="lg:col-span-1">
            <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  <span>Profile Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar Placeholder */}
                <div className="flex justify-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                    <span className="text-3xl font-bold text-white">
                      {user.firstName?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* User Info */}
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                      Name
                    </label>
                    <p className="text-slate-900 dark:text-white font-medium mt-1">
                      {user.firstName} {user.lastName}
                    </p>
                  </div>

                  <div>
                    <label className="flex items-center space-x-2 text-sm font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      <Mail className="h-4 w-4" />
                      <span>Email</span>
                    </label>
                    <p className="text-slate-900 dark:text-white break-all">
                      {user.email}
                    </p>
                  </div>

                  {user.phone && (
                    <div>
                      <label className="flex items-center space-x-2 text-sm font-semibold text-slate-600 dark:text-slate-400 mb-1">
                        <Phone className="h-4 w-4" />
                        <span>Phone</span>
                      </label>
                      <p className="text-slate-900 dark:text-white">
                        {user.phone}
                      </p>
                    </div>
                  )}

                  {user.address && (
                    <div>
                      <label className="flex items-center space-x-2 text-sm font-semibold text-slate-600 dark:text-slate-400 mb-1">
                        <MapPin className="h-4 w-4" />
                        <span>Address</span>
                      </label>
                      <p className="text-slate-900 dark:text-white">
                        {user.address}
                      </p>
                    </div>
                  )}

                  <div>
                    <label className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                      Account Type
                    </label>
                    <p className="text-slate-900 dark:text-white mt-1 capitalize">
                      {user.authProvider || "Email"}
                    </p>
                  </div>

                  {user.isEmailVerified && (
                    <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-md">
                      <p className="text-sm text-green-600 dark:text-green-400 font-medium">
                        ✓ Email Verified
                      </p>
                    </div>
                  )}
                </div>

                {/* Logout Button */}
                <Button
                  onClick={handleLogout}
                  variant="destructive"
                  className="w-full flex items-center justify-center space-x-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Orders & Cart Section */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="orders" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="orders">Order History</TabsTrigger>
                <TabsTrigger value="cart">Shopping Cart</TabsTrigger>
              </TabsList>

              {/* Orders Tab */}
              <TabsContent value="orders">
                <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <ShoppingBag className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                      <span>Order History</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                {loading ? (
                  <div className="text-center py-8">
                    <p className="text-slate-600 dark:text-slate-400">Loading orders...</p>
                  </div>
                ) : orders.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingBag className="h-12 w-12 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
                    <p className="text-slate-600 dark:text-slate-400 mb-4">
                      No orders yet
                    </p>
                    <Button
                      onClick={() => navigate("/shop")}
                      className="bg-amber-600 hover:bg-amber-700 text-white"
                    >
                      Start Shopping
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order: any) => (
                      <div
                        key={order._id}
                        className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:shadow-md dark:hover:bg-slate-800/50 transition-all"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <p className="font-semibold text-slate-900 dark:text-white">
                              Order {order._id?.slice(-8) || order.orderId}
                            </p>
                            <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400 mt-1">
                              <Calendar className="h-4 w-4" />
                              <span>
                                {new Date(order.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            order.status === "completed"
                              ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                              : order.status === "pending"
                              ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400"
                              : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                          }`}>
                            {order.status || "Processing"}
                          </span>
                        </div>

                        {/* Order Items */}
                        {order.products && order.products.length > 0 && (
                          <div className="mb-3 space-y-2">
                            {order.products.slice(0, 2).map((product: any, idx: number) => (
                              <p
                                key={idx}
                                className="text-sm text-slate-600 dark:text-slate-400"
                              >
                                • {product.name || "Product"} x {product.quantity || 1}
                              </p>
                            ))}
                            {order.products.length > 2 && (
                              <p className="text-sm text-slate-600 dark:text-slate-400">
                                +{order.products.length - 2} more items
                              </p>
                            )}
                          </div>
                        )}

                        {/* Order Total */}
                        <div className="pt-3 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center">
                          <span className="text-slate-600 dark:text-slate-400">Total:</span>
                          <span className="text-lg font-bold text-amber-600 dark:text-amber-400">
                            ₹{(order.totalAmount || 0).toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Cart Tab */}
              <TabsContent value="cart">
                <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <ShoppingBag className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                      <span>Shopping Cart ({cartItems.length} items)</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {cartItems.length === 0 ? (
                      <div className="text-center py-12">
                        <ShoppingBag className="h-12 w-12 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
                        <p className="text-slate-600 dark:text-slate-400 mb-4">
                          Your cart is empty
                        </p>
                        <Button
                          onClick={() => navigate("/shop")}
                          className="bg-amber-600 hover:bg-amber-700 text-white"
                        >
                          Continue Shopping
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {cartItems.map((item) => (
                          <div
                            key={`${item.productId}-${item.size}`}
                            className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:shadow-md dark:hover:bg-slate-800/50 transition-all"
                          >
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <p className="font-semibold text-slate-900 dark:text-white">
                                  {item.name}
                                </p>
                                {item.size && (
                                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Size: {item.size}
                                  </p>
                                )}
                              </div>
                              <button
                                onClick={() => removeItem(item.productId, item.size)}
                                className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                              >
                                <Trash2 className="h-5 w-5" />
                              </button>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2 border border-slate-200 dark:border-slate-700 rounded-md">
                                <button
                                  onClick={() =>
                                    updateQuantity(item.productId, Math.max(1, item.quantity - 1), item.size)
                                  }
                                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800"
                                >
                                  <Minus className="h-4 w-4" />
                                </button>
                                <span className="px-3 py-2 font-medium">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    updateQuantity(item.productId, item.quantity + 1, item.size)
                                  }
                                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800"
                                >
                                  <Plus className="h-4 w-4" />
                                </button>
                              </div>

                              <div className="text-right">
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                  ₹{(item.price).toLocaleString('en-IN')} each
                                </p>
                                <p className="text-lg font-bold text-amber-600 dark:text-amber-400">
                                  ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}

                        {/* Cart Summary */}
                        <div className="pt-6 border-t border-slate-200 dark:border-slate-700 space-y-4">
                          <div className="flex justify-between items-center text-lg font-bold">
                            <span className="text-slate-900 dark:text-white">Total:</span>
                            <span className="text-amber-600 dark:text-amber-400">
                              ₹{getTotalPrice().toLocaleString('en-IN')}
                            </span>
                          </div>

                          <div className="flex gap-3">
                            <Button
                              onClick={() => clearCart()}
                              variant="outline"
                              className="flex-1"
                            >
                              Clear Cart
                            </Button>
                            <Button
                              onClick={() => navigate("/checkout")}
                              className="flex-1 bg-amber-600 hover:bg-amber-700 text-white"
                            >
                              Proceed to Checkout
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
