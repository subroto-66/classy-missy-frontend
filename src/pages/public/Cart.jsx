import { useEffect, useState } from "react";
import { FiArrowRight, FiCheckCircle, FiShoppingBag, FiTag } from "react-icons/fi";
import { Link, useNavigate } from "react-router";
import Container from "../../components/layouts/Container";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import CartItem from "../../components/shared/CartItem";
import { useCart } from "../../context/CartContext";
import { formatProductPrice } from "../../lib/productUtils";
import productsMock from "../../data/products";
import { useAuth } from "../../context/AuthContext";
import api from "../../lib/axios";
import toast from "react-hot-toast";
import { showApiErrorToast } from "../../utils/apiErrorToast";

export default function Cart() {
  const { items, setQuantity, removeFromCart, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [checkoutStep, setCheckoutStep] = useState("cart"); // "cart" | "checkout" | "success"
  const [placedOrder, setPlacedOrder] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Coupon state
  const [couponCode, setCouponCode] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponLoading, setCouponLoading] = useState(false);

  // Checkout form state
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    city: user?.city || "Dhaka",
    postalCode: user?.postal_code || "",
    paymentMethod: "cash_on_delivery",
    notes: "",
  });

  // Keep form data synchronized with authenticated user profile
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: prev.name || user.name || "",
        email: prev.email || user.email || "",
        phone: prev.phone || user.phone || "",
        address: prev.address || user.address || "",
        city: prev.city || user.city || "Dhaka",
        postalCode: prev.postalCode || user.postal_code || "",
      }));
    }
  }, [user]);

  const itemCount = items.reduce((count, item) => count + item.quantity, 0);
  const rawSubtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const catalogDiscount = items.reduce(
    (total, item) =>
      total +
      Math.max((item.oldPrice || item.price) - item.price, 0) * item.quantity,
    0,
  );

  const totalDiscount = catalogDiscount + couponDiscount;
  const shippingFee = appliedCoupon?.free_shipping ? 0 : (rawSubtotal > 3000 ? 0 : 80);
  const finalTotal = Math.max(0, rawSubtotal - couponDiscount + (rawSubtotal > 0 ? shippingFee : 0));

  const handleApplyCoupon = async (e) => {
    e.preventDefault();
    if (!couponCode.trim()) return;

    try {
      setCouponLoading(true);
      const res = await api.post("/coupons/apply", {
        code: couponCode.trim(),
        subtotal: rawSubtotal,
      });

      if (res.data?.data) {
        setAppliedCoupon(res.data.data);
        setCouponDiscount(res.data.data.discount || 0);
        toast.success(res.data.message || "Coupon applied!");
      }
    } catch (error) {
      showApiErrorToast(error);
    } finally {
      setCouponLoading(false);
    }
  };

  const handleProceedToCheckout = () => {
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: prev.name || user.name || "",
        email: prev.email || user.email || "",
        phone: prev.phone || user.phone || "",
        address: prev.address || user.address || "",
        city: prev.city || user.city || "Dhaka",
        postalCode: prev.postalCode || user.postal_code || "",
      }));
    }

    setCheckoutStep("checkout");
    window.scrollTo({ top: 120, behavior: "smooth" });
  };

  const handlePlaceOrder = async (e) => {
    if (e && e.preventDefault) e.preventDefault();

    if (!items.length) {
      toast.error("Your cart is empty. Add products before checking out.");
      return;
    }

    if (checkoutStep !== "checkout") {
      handleProceedToCheckout();
      return;
    }

    // Explicit field validations with helpful alerts
    if (!formData.name?.trim()) {
      toast.error("Please enter recipient name");
      return;
    }
    if (!formData.email?.trim()) {
      toast.error("Please enter email address");
      return;
    }
    if (!formData.phone?.trim()) {
      toast.error("Please enter contact phone number");
      return;
    }
    if (!formData.address?.trim()) {
      toast.error("Please enter complete delivery address");
      return;
    }

    try {
      setSubmitting(true);

      const orderPayload = {
        customer_name: formData.name.trim(),
        customer_email: formData.email.trim(),
        customer_phone: formData.phone.trim(),
        shipping_address: formData.address.trim(),
        city: formData.city.trim() || "Dhaka",
        postal_code: formData.postalCode.trim() || "",
        payment_method: formData.paymentMethod || "cash_on_delivery",
        discount: totalDiscount,
        shipping_fee: shippingFee,
        notes: formData.notes?.trim() || "",
        items: items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
      };

      const res = await api.post("/orders", orderPayload);
      const createdOrder = res.data?.data;

      setPlacedOrder(createdOrder);
      setCheckoutStep("success");
      clearCart();
      toast.success(res.data?.message || "Order placed successfully!");
    } catch (error) {
      showApiErrorToast(error);
    } finally {
      setSubmitting(false);
    }
  };

  if (checkoutStep === "success" && placedOrder) {
    return (
      <section className="py-12 sm:py-16">
        <Container className="max-w-2xl text-center">
          <div className="rounded-2xl border border-border bg-background p-8 shadow-sm">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <FiCheckCircle size={32} />
            </span>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-foreground-secondary">
              Thank you for your order!
            </p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Order Confirmed
            </h1>
            <p className="mt-3 text-sm text-foreground-secondary">
              Your order number is <strong className="text-foreground">{placedOrder.id || placedOrder.order_number}</strong>. We have sent a confirmation email with all details.
            </p>

            <div className="mt-6 rounded-xl border border-border bg-background-secondary p-5 text-left text-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-foreground-secondary">Total Paid / Due:</span>
                <span className="font-semibold text-foreground">{formatProductPrice(placedOrder.total)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground-secondary">Payment Method:</span>
                <span className="capitalize text-foreground">{placedOrder.payment_method?.replace(/_/g, " ")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground-secondary">Delivery Status:</span>
                <span className="font-medium text-emerald-600">{placedOrder.status}</span>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link to="/dashboard/orders">
                <Button className="rounded-lg">
                  View in My Orders
                </Button>
              </Link>
              <Link to="/products">
                <Button variant="outline" className="rounded-lg">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-8 sm:py-12">
      <Container className="space-y-7">
        <div className="relative isolate flex min-h-48 items-center overflow-hidden rounded-2xl bg-background-secondary px-5 py-8 sm:min-h-56 sm:px-10 lg:px-14">
          <div className="absolute inset-y-0 right-0 z-0 w-2/3 opacity-25 sm:w-1/2">
            <img
              src={items[0]?.image || productsMock[0].image}
              alt=""
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background-secondary via-background-secondary/70 to-transparent" />
          </div>
          <div className="relative z-10">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground-secondary">
              {checkoutStep === "checkout" ? "Final Step" : "Your picks"}
            </p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {checkoutStep === "checkout" ? "Checkout & Shipping" : "My cart"}
            </h1>
            <p className="mt-2 text-sm text-foreground-secondary">
              {itemCount} {itemCount === 1 ? "item" : "items"} in your cart
            </p>
          </div>
        </div>

        {items.length ? (
          <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-8">
            {checkoutStep === "cart" ? (
              <ul className="space-y-3">
                {items.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    setQuantity={setQuantity}
                    removeFromCart={removeFromCart}
                  />
                ))}
              </ul>
            ) : (
              <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-4 rounded-xl border border-border bg-background p-6">
                <div className="flex items-center justify-between border-b border-border pb-3">
                  <h2 className="text-base font-semibold text-foreground">Delivery Details</h2>
                  <button
                    type="button"
                    onClick={() => setCheckoutStep("cart")}
                    className="text-xs text-foreground-secondary underline hover:text-foreground"
                  >
                    ← Edit cart
                  </button>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <Input
                    label="Full Name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter recipient name"
                  />
                  <Input
                    label="Email Address"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="recipient@example.com"
                  />
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <Input
                    label="Phone Number"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+880 1700-000000"
                  />
                  <Input
                    label="City / District"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="Dhaka"
                  />
                </div>

                <div>
                  <Input
                    label="Shipping Address"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="House, road, area details"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-foreground">Payment Method</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "cash_on_delivery", label: "Cash on Delivery" },
                      { id: "bkash", label: "bKash" },
                      { id: "card", label: "Credit/Debit Card" },
                    ].map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, paymentMethod: m.id })}
                        className={`rounded-lg border p-3 text-center text-xs font-medium transition ${
                          formData.paymentMethod === m.id
                            ? "border-foreground bg-foreground text-background"
                            : "border-border bg-background text-foreground hover:bg-background-secondary"
                        }`}
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <Input
                    label="Order Notes (optional)"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Special instructions for delivery"
                  />
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    loading={submitting}
                    className="w-full rounded-lg"
                  >
                    Place Order ({formatProductPrice(finalTotal)})
                    <FiArrowRight size={16} />
                  </Button>
                </div>
              </form>
            )}

            <aside className="rounded-xl border border-border bg-background p-5 lg:sticky lg:top-32 space-y-5">
              <h2 className="text-base font-semibold text-foreground">
                Order summary
              </h2>

              {/* Coupon input */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Coupon code (e.g. GLOW10)"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  className="h-10 flex-1 rounded-lg border border-border bg-background-secondary px-3 text-xs uppercase tracking-wider outline-none focus:border-foreground"
                />
                <Button
                  type="submit"
                  variant="outline"
                  loading={couponLoading}
                  className="h-10 text-xs px-3"
                >
                  <FiTag size={14} className="mr-1" /> Apply
                </Button>
              </form>

              {appliedCoupon && (
                <div className="flex items-center justify-between rounded-lg bg-emerald-50 px-3 py-2 text-xs text-emerald-800">
                  <span>Coupon {appliedCoupon.code} applied!</span>
                  <button
                    type="button"
                    onClick={() => {
                      setAppliedCoupon(null);
                      setCouponDiscount(0);
                      setCouponCode("");
                    }}
                    className="underline text-[11px]"
                  >
                    Remove
                  </button>
                </div>
              )}

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-foreground-secondary">
                  <span>Subtotal</span>
                  <span>{formatProductPrice(rawSubtotal + catalogDiscount)}</span>
                </div>
                {totalDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Discount</span>
                    <span>-{formatProductPrice(totalDiscount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-foreground-secondary">
                  <span>Shipping fee</span>
                  <span>{shippingFee === 0 ? "FREE" : formatProductPrice(shippingFee)}</span>
                </div>
                <div className="flex justify-between border-t border-border pt-4 text-base font-semibold text-foreground">
                  <span>Total</span>
                  <span>{formatProductPrice(finalTotal)}</span>
                </div>
              </div>

              {checkoutStep === "cart" ? (
                <Button
                  type="button"
                  onClick={handleProceedToCheckout}
                  className="w-full rounded-lg"
                >
                  Proceed to Checkout
                  <FiArrowRight size={16} />
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handlePlaceOrder}
                  loading={submitting}
                  className="w-full rounded-lg"
                >
                  Place Order ({formatProductPrice(finalTotal)})
                  <FiArrowRight size={16} />
                </Button>
              )}

              <p className="text-center text-xs leading-5 text-foreground-secondary">
                {shippingFee === 0 ? "Free standard delivery included!" : "Free delivery on orders over ৳3,000"}
              </p>
              <Link
                to="/products"
                className="block text-center text-sm font-medium text-foreground underline underline-offset-4"
              >
                Continue shopping
              </Link>
            </aside>
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border bg-background-secondary px-5 py-14 text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-background-custom text-foreground-secondary">
              <FiShoppingBag size={24} />
            </span>
            <h2 className="mt-4 text-lg font-semibold text-foreground">
              Your cart is empty
            </h2>
            <p className="mt-2 text-sm text-foreground-secondary">
              Find something lovely to add to your routine.
            </p>
            <Link to="/products" className="mt-5 inline-flex">
              <Button type="button" className="rounded-lg">
                Explore products
              </Button>
            </Link>
          </div>
        )}
      </Container>
    </section>
  );
}
