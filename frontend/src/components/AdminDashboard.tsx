"use client";

import Image from "next/image";
import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  CheckCircle2,
  Edit3,
  Mail,
  ImagePlus,
  Loader2,
  LogOut,
  Plus,
  Phone,
  ShieldCheck,
  Trash2
} from "lucide-react";
import {
  createCategory,
  createOffer,
  createProduct,
  deleteEnquiry,
  deleteCategory,
  deleteOffer,
  deleteProduct,
  fetchCategories,
  fetchEnquiries,
  fetchOffers,
  fetchProducts,
  loginAdmin,
  updateProduct,
  uploadImages
} from "@/lib/api";
import { categories as fallbackCategories } from "@/lib/data";
import { discountedPrice, formatCurrency } from "@/lib/constants";
import type { EnquiryRecord, Offer, Product, ProductInput } from "@/lib/types";

const emptyProduct: ProductInput = {
  name: "",
  category: "Gold Jewellery",
  originalPrice: 0,
  discountPercent: 0,
  images: [],
  description: "",
  material: "",
  sku: "",
  inStock: true,
  featured: false,
  newArrival: false
};

const emptyOffer: Omit<Offer, "id" | "_id"> = {
  title: "",
  type: "Festival Offer",
  discountPercent: 10,
  description: "",
  cta: "Explore Collection"
};

type UploadedImage = {
  url: string;
  name: string;
};

function imageNameFromUrl(url: string, index: number) {
  try {
    const filename = new URL(url).pathname.split("/").pop();
    return filename ? decodeURIComponent(filename) : `Image ${index + 1}`;
  } catch {
    return `Image ${index + 1}`;
  }
}

export function AdminDashboard() {
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>(fallbackCategories);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [enquiries, setEnquiries] = useState<
    EnquiryRecord[]
  >([]);
  const [productForm, setProductForm] = useState<ProductInput>(emptyProduct);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newCategory, setNewCategory] = useState("");
  const [offerForm, setOfferForm] = useState<Omit<Offer, "id" | "_id">>(
    emptyOffer
  );

  useEffect(() => {
    const stored = window.localStorage.getItem("jewellery-admin-token");
    if (stored) queueMicrotask(() => setToken(stored));
  }, []);

  useEffect(() => {
    if (!token) return;
    let active = true;

    Promise.all([
      fetchProducts(),
      fetchCategories(),
      fetchOffers(),
      fetchEnquiries(token)
    ])
      .then(([productData, categoryData, offerData, enquiryData]) => {
        if (!active) return;
        setProducts(productData);
        setCategories(categoryData);
        setOffers(offerData);
        setEnquiries(enquiryData);
      })
      .catch((err) => {
        if (active) {
          setError(err instanceof Error ? err.message : "Unable to load admin data");
        }
      });

    return () => {
      active = false;
    };
  }, [token]);

  const stats = useMemo(
    () => [
      { label: "Products", value: products.length },
      { label: "In Stock", value: products.filter((item) => item.inStock).length },
      { label: "Categories", value: categories.length },
      { label: "Enquiries", value: enquiries.length }
    ],
    [categories.length, enquiries.length, products]
  );

  const onLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await loginAdmin(email, password);
      window.localStorage.setItem("jewellery-admin-token", response.token);
      setToken(response.token);
      setNotice("Admin session started.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const onProductSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!token) return;
    if (isUploading) {
      setError("Please wait for the image upload to finish.");
      return;
    }
    if (productForm.images.length === 0) {
      setError("Upload at least one product image before saving.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const saved = editingId
        ? await updateProduct(editingId, productForm, token)
        : await createProduct(productForm, token);

      setProducts((current) => {
        if (!editingId) return [saved, ...current];
        return current.map((item) =>
          (item._id || item.id) === editingId ? saved : item
        );
      });
      setProductForm(emptyProduct);
      setUploadedImages([]);
      setEditingId(null);
      setNotice(editingId ? "Product updated." : "Product added.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Product save failed");
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (product: Product) => {
    const id = product._id || product.id;
    if (!id) return;
    setEditingId(id);
    setProductForm({
      name: product.name,
      category: product.category,
      originalPrice: product.originalPrice,
      discountPercent: product.discountPercent,
      images: product.images,
      description: product.description,
      material: product.material,
      sku: product.sku,
      inStock: product.inStock,
      featured: Boolean(product.featured),
      newArrival: Boolean(product.newArrival)
    });
    setUploadedImages(
      product.images.map((url, index) => ({
        url,
        name: imageNameFromUrl(url, index)
      }))
    );
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const removeProduct = async (product: Product) => {
    if (!token) return;
    const id = product._id || product.id;
    if (!id) return;
    if (!window.confirm(`Delete ${product.name}? This cannot be undone.`)) return;
    setLoading(true);
    try {
      await deleteProduct(id, token);
      setProducts((current) => current.filter((item) => (item._id || item.id) !== id));
      setNotice("Product deleted.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setLoading(false);
    }
  };

  const toggleStock = async (product: Product) => {
    if (!token) return;
    const id = product._id || product.id;
    if (!id) return;
    const updated = { ...product, inStock: !product.inStock };
    setProducts((current) =>
      current.map((item) => ((item._id || item.id) === id ? updated : item))
    );
    try {
      await updateProduct(id, updated, token);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Stock update failed");
    }
  };

  const onUpload = async (files: FileList | null) => {
    if (!files || files.length === 0 || !token) return;
    const selectedFiles = Array.from(files);

    if (productForm.images.length + selectedFiles.length > 8) {
      setError("A product can have a maximum of 8 images.");
      return;
    }

    setIsUploading(true);
    setError("");
    setNotice("");
    try {
      const response = await uploadImages(selectedFiles, token);
      const uploaded = response.images?.length
        ? response.images
        : response.urls.map((url, index) => ({
            url,
            name: selectedFiles[index]?.name || imageNameFromUrl(url, index)
          }));

      setProductForm((current) => ({
        ...current,
        images: [...current.images, ...uploaded.map((image) => image.url)]
      }));
      setUploadedImages((current) => [...current, ...uploaded]);
      setNotice(
        `${uploaded.length} image${uploaded.length === 1 ? "" : "s"} uploaded.`
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  const removeUploadedImage = (indexToRemove: number) => {
    setProductForm((current) => ({
      ...current,
      images: current.images.filter((_, index) => index !== indexToRemove)
    }));
    setUploadedImages((current) =>
      current.filter((_, index) => index !== indexToRemove)
    );
  };

  const saveCategory = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!token || !newCategory.trim()) return;
    try {
      const category = await createCategory(newCategory.trim(), token);
      setCategories((current) => [...new Set([...current, category.name])]);
      setNewCategory("");
      setNotice("Category added.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Category save failed");
    }
  };

  const removeCategory = async (name: string) => {
    if (!token) return;
    if (!window.confirm(`Delete the ${name} category?`)) return;
    try {
      await deleteCategory(name, token);
      setCategories((current) => current.filter((item) => item !== name));
      setNotice("Category removed.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Category delete failed");
    }
  };

  const saveOffer = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!token) return;
    try {
      const offer = await createOffer(offerForm, token);
      setOffers((current) => [offer, ...current]);
      setOfferForm(emptyOffer);
      setNotice("Offer saved.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Offer save failed");
    }
  };

  const removeOffer = async (offer: Offer) => {
    if (!token) return;
    const id = offer._id || offer.id;
    if (!id) return;
    if (!window.confirm(`Delete the ${offer.title} offer?`)) return;
    try {
      await deleteOffer(id, token);
      setOffers((current) => current.filter((item) => (item._id || item.id) !== id));
      setNotice("Offer deleted.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Offer delete failed");
    }
  };

  const removeEnquiry = async (id: string, name: string) => {
    if (!token) return;
    if (!window.confirm(`Delete the enquiry from ${name}?`)) return;
    try {
      await deleteEnquiry(id, token);
      setEnquiries((current) => current.filter((item) => item._id !== id));
      setNotice("Enquiry removed.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Enquiry delete failed");
    }
  };

  const logout = () => {
    window.localStorage.removeItem("jewellery-admin-token");
    setToken(null);
  };

  if (!token) {
    return (
      <section className="min-h-[70vh] bg-ivory px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-md rounded-lg border border-gold/18 bg-white p-6 shadow-premium">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/14 text-gold-deep">
            <ShieldCheck size={22} aria-hidden="true" />
          </div>
          <h1 className="mt-5 font-display text-4xl text-charcoal">
            Owner Login
          </h1>
          <p className="mt-2 text-sm leading-6 text-ink/64">
            Sign in to manage jewellery items, offers, categories, availability,
            image uploads, and customer enquiries.
          </p>
          <form onSubmit={onLogin} className="mt-6 grid gap-4">
            <label className="grid gap-2 text-sm font-semibold text-charcoal">
              Email
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                type="email"
                required
                className="rounded-md border border-gold/24 px-4 py-3 outline-none ring-gold/30 focus:ring-4"
                placeholder="owner@example.com"
              />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-charcoal">
              Password
              <input
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                required
                className="rounded-md border border-gold/24 px-4 py-3 outline-none ring-gold/30 focus:ring-4"
                placeholder="Admin password"
              />
            </label>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-charcoal px-5 py-3 text-sm font-bold text-gold-soft transition hover:bg-gold hover:text-charcoal disabled:opacity-60"
            >
              {loading ? <Loader2 className="animate-spin" size={16} /> : null}
              Login
            </button>
          </form>
          {error ? <p className="mt-4 text-sm font-semibold text-red-700">{error}</p> : null}
        </div>
      </section>
    );
  }

  return (
    <section className="bg-ivory py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.26em] text-gold-deep">
              Secure admin
            </p>
            <h1 className="mt-2 font-display text-4xl text-charcoal">
              Jewellery Management
            </h1>
          </div>
          <button
            type="button"
            onClick={logout}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-gold/45 px-5 py-3 text-sm font-bold text-charcoal transition hover:bg-gold"
          >
            <LogOut size={17} aria-hidden="true" />
            Logout
          </button>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg border border-gold/18 bg-white p-5 shadow-premium"
            >
              <p className="text-sm font-semibold text-ink/58">{stat.label}</p>
              <p className="mt-2 font-display text-4xl text-charcoal">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {notice ? (
          <div className="mt-6 flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
            <CheckCircle2 size={17} aria-hidden="true" />
            {notice}
          </div>
        ) : null}
        {error ? (
          <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            {error}
          </div>
        ) : null}

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-lg border border-gold/18 bg-white p-5 shadow-premium sm:p-6">
            <h2 className="font-display text-3xl text-charcoal">
              {editingId ? "Edit Product" : "Add Product"}
            </h2>
            <form onSubmit={onProductSubmit} className="mt-5 grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <AdminInput
                  label="Product Name"
                  value={productForm.name}
                  onChange={(value) =>
                    setProductForm((current) => ({ ...current, name: value }))
                  }
                />
                <label className="grid gap-2 text-sm font-semibold text-charcoal">
                  Category
                  <select
                    value={productForm.category}
                    onChange={(event) =>
                      setProductForm((current) => ({
                        ...current,
                        category: event.target.value
                      }))
                    }
                    className="rounded-md border border-gold/24 px-4 py-3 outline-none ring-gold/30 focus:ring-4"
                  >
                    {categories.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <AdminInput
                  label="Original Price"
                  type="number"
                  value={String(productForm.originalPrice)}
                  onChange={(value) =>
                    setProductForm((current) => ({
                      ...current,
                      originalPrice: Number(value)
                    }))
                  }
                />
                <AdminInput
                  label="Discount %"
                  type="number"
                  value={String(productForm.discountPercent)}
                  onChange={(value) =>
                    setProductForm((current) => ({
                      ...current,
                      discountPercent: Number(value)
                    }))
                  }
                />
                <AdminInput
                  label="SKU"
                  value={productForm.sku}
                  onChange={(value) =>
                    setProductForm((current) => ({ ...current, sku: value }))
                  }
                />
              </div>

              <AdminInput
                label="Material"
                value={productForm.material}
                onChange={(value) =>
                  setProductForm((current) => ({ ...current, material: value }))
                }
              />

              <label className="grid gap-2 text-sm font-semibold text-charcoal">
                Description
                <textarea
                  value={productForm.description}
                  onChange={(event) =>
                    setProductForm((current) => ({
                      ...current,
                      description: event.target.value
                    }))
                  }
                  rows={4}
                  className="rounded-md border border-gold/24 px-4 py-3 outline-none ring-gold/30 focus:ring-4"
                />
              </label>

              <div className="grid gap-3">
                <div>
                  <p className="text-sm font-semibold text-charcoal">
                    Product Images <span className="text-red-700">*</span>
                  </p>
                  <p className="mt-1 text-xs leading-5 text-ink/55">
                    Upload up to 8 JPG, PNG, WebP, or AVIF images. Maximum 5 MB each.
                  </p>
                </div>

                <label
                  className={`flex items-center justify-center gap-2 rounded-md border border-dashed border-gold/40 bg-ivory px-4 py-4 text-sm font-bold text-charcoal transition ${
                    isUploading
                      ? "cursor-wait opacity-65"
                      : "cursor-pointer hover:bg-gold/10"
                  }`}
                >
                  {isUploading ? (
                    <Loader2 className="animate-spin" size={18} aria-hidden="true" />
                  ) : (
                    <ImagePlus size={18} aria-hidden="true" />
                  )}
                  {isUploading ? "Uploading images..." : "Choose Images to Upload"}
                  <input
                    type="file"
                    multiple
                    accept="image/jpeg,image/png,image/webp,image/avif"
                    disabled={isUploading || uploadedImages.length >= 8}
                    className="sr-only"
                    onChange={(event) => {
                      void onUpload(event.target.files);
                      event.target.value = "";
                    }}
                  />
                </label>

                {uploadedImages.length > 0 ? (
                  <div className="grid gap-3 sm:grid-cols-2">
                    {uploadedImages.map((image, index) => (
                      <div
                        key={`${image.url}-${index}`}
                        className="flex min-w-0 items-center gap-3 rounded-md border border-gold/18 bg-ivory p-3"
                      >
                        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md bg-pearl">
                          <Image
                            src={image.url}
                            alt={image.name}
                            fill
                            sizes="56px"
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold text-charcoal" title={image.name}>
                            {image.name}
                          </p>
                          <p className="mt-1 text-xs font-semibold text-emerald-700">
                            Uploaded
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeUploadedImage(index)}
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-red-200 text-red-700 transition hover:bg-red-50"
                          aria-label={`Remove ${image.name}`}
                          title={`Remove ${image.name}`}
                        >
                          <Trash2 size={15} aria-hidden="true" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="rounded-md bg-amber-50 px-4 py-3 text-xs font-semibold text-amber-800">
                    No image uploaded yet. At least one image is required.
                  </p>
                )}
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  ["inStock", "In Stock"],
                  ["featured", "Featured"],
                  ["newArrival", "New Arrival"]
                ].map(([key, label]) => (
                  <label
                    key={key}
                    className="flex items-center gap-3 rounded-md border border-gold/18 bg-ivory px-4 py-3 text-sm font-semibold text-charcoal"
                  >
                    <input
                      type="checkbox"
                      checked={Boolean(productForm[key as keyof ProductInput])}
                      onChange={(event) =>
                        setProductForm((current) => ({
                          ...current,
                          [key]: event.target.checked
                        }))
                      }
                      className="h-4 w-4 accent-gold"
                    />
                    {label}
                  </label>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  disabled={loading || isUploading}
                  className="inline-flex items-center gap-2 rounded-full bg-charcoal px-6 py-3 text-sm font-bold text-gold-soft transition hover:bg-gold hover:text-charcoal disabled:opacity-60"
                >
                  {loading ? <Loader2 className="animate-spin" size={16} /> : <Plus size={16} />}
                  {editingId ? "Save Changes" : "Add Product"}
                </button>
                {editingId ? (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingId(null);
                      setProductForm(emptyProduct);
                      setUploadedImages([]);
                    }}
                    className="rounded-full border border-gold/35 px-6 py-3 text-sm font-bold text-charcoal transition hover:bg-gold/12"
                  >
                    Cancel
                  </button>
                ) : null}
              </div>
            </form>
          </div>

          <div className="grid gap-8">
            <div className="rounded-lg border border-gold/18 bg-white p-5 shadow-premium sm:p-6">
              <h2 className="font-display text-3xl text-charcoal">
                Manage Categories
              </h2>
              <form onSubmit={saveCategory} className="mt-5 flex gap-3">
                <input
                  value={newCategory}
                  onChange={(event) => setNewCategory(event.target.value)}
                  className="min-w-0 flex-1 rounded-full border border-gold/24 px-4 py-3 text-sm outline-none ring-gold/30 focus:ring-4"
                  placeholder="Category name"
                />
                <button
                  type="submit"
                  className="rounded-full bg-charcoal px-5 py-3 text-sm font-bold text-gold-soft transition hover:bg-gold hover:text-charcoal"
                >
                  Add
                </button>
              </form>
              <div className="mt-5 flex flex-wrap gap-2">
                {categories.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-2 rounded-full border border-gold/24 bg-ivory px-3 py-2 text-sm font-semibold text-charcoal"
                  >
                    {item}
                    <button
                      type="button"
                      onClick={() => removeCategory(item)}
                      className="text-red-700"
                      aria-label={`Delete ${item}`}
                      title={`Delete ${item}`}
                    >
                      <Trash2 size={14} aria-hidden="true" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-gold/18 bg-white p-5 shadow-premium sm:p-6">
              <h2 className="font-display text-3xl text-charcoal">
                Set Offers
              </h2>
              <form onSubmit={saveOffer} className="mt-5 grid gap-4">
                <AdminInput
                  label="Offer Title"
                  value={offerForm.title}
                  onChange={(value) =>
                    setOfferForm((current) => ({ ...current, title: value }))
                  }
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="grid gap-2 text-sm font-semibold text-charcoal">
                    Type
                    <select
                      value={offerForm.type}
                      onChange={(event) =>
                        setOfferForm((current) => ({
                          ...current,
                          type: event.target.value as Offer["type"]
                        }))
                      }
                      className="rounded-md border border-gold/24 px-4 py-3 outline-none ring-gold/30 focus:ring-4"
                    >
                      <option>Festival Offer</option>
                      <option>Limited Time</option>
                      <option>New Arrival</option>
                    </select>
                  </label>
                  <AdminInput
                    label="Discount %"
                    type="number"
                    value={String(offerForm.discountPercent)}
                    onChange={(value) =>
                      setOfferForm((current) => ({
                        ...current,
                        discountPercent: Number(value)
                      }))
                    }
                  />
                </div>
                <AdminInput
                  label="CTA Text"
                  value={offerForm.cta}
                  onChange={(value) =>
                    setOfferForm((current) => ({ ...current, cta: value }))
                  }
                />
                <label className="grid gap-2 text-sm font-semibold text-charcoal">
                  Description
                  <textarea
                    value={offerForm.description}
                    onChange={(event) =>
                      setOfferForm((current) => ({
                        ...current,
                        description: event.target.value
                      }))
                    }
                    rows={3}
                    className="rounded-md border border-gold/24 px-4 py-3 outline-none ring-gold/30 focus:ring-4"
                  />
                </label>
                <button
                  type="submit"
                  className="inline-flex w-fit items-center gap-2 rounded-full bg-charcoal px-6 py-3 text-sm font-bold text-gold-soft transition hover:bg-gold hover:text-charcoal"
                >
                  <Plus size={16} aria-hidden="true" />
                  Save Offer
                </button>
              </form>
              <div className="mt-5 grid gap-3">
                {offers.map((offer) => (
                  <div
                    key={offer._id || offer.id}
                    className="flex items-start justify-between gap-3 rounded-md border border-gold/18 bg-ivory p-4"
                  >
                    <div>
                      <p className="font-bold text-charcoal">{offer.title}</p>
                      <p className="mt-1 text-sm text-ink/60">
                        {offer.type} · {offer.discountPercent}% off
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeOffer(offer)}
                      className="text-red-700"
                      aria-label={`Delete ${offer.title}`}
                      title={`Delete ${offer.title}`}
                    >
                      <Trash2 size={17} aria-hidden="true" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-lg border border-gold/18 bg-white p-5 shadow-premium sm:p-6">
            <h2 className="font-display text-3xl text-charcoal">
              Product Inventory
            </h2>
            <div className="mt-5 grid gap-4">
              {products.map((product) => (
                <div
                  key={product._id || product.id}
                  className="grid gap-4 rounded-lg border border-gold/18 bg-ivory p-4 sm:grid-cols-[92px_1fr_auto]"
                >
                  <div className="relative h-24 w-full overflow-hidden rounded-md bg-pearl sm:w-24">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      sizes="92px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-charcoal">{product.name}</p>
                    <p className="mt-1 text-sm text-ink/60">
                      {product.category} · {product.discountPercent}% off ·{" "}
                      {formatCurrency(
                        discountedPrice(
                          product.originalPrice,
                          product.discountPercent
                        )
                      )}
                    </p>
                    <button
                      type="button"
                      onClick={() => toggleStock(product)}
                      className={`mt-3 rounded-full px-3 py-1 text-xs font-bold ${
                        product.inStock
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {product.inStock ? "In Stock" : "Out of Stock"}
                    </button>
                  </div>
                  <div className="flex items-center gap-2 sm:justify-end">
                    <button
                      type="button"
                      onClick={() => startEdit(product)}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/35 text-charcoal transition hover:bg-gold"
                      aria-label={`Edit ${product.name}`}
                      title={`Edit ${product.name}`}
                    >
                      <Edit3 size={16} aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeProduct(product)}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-red-200 text-red-700 transition hover:bg-red-50"
                      aria-label={`Delete ${product.name}`}
                      title={`Delete ${product.name}`}
                    >
                      <Trash2 size={16} aria-hidden="true" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-gold/18 bg-white p-5 shadow-premium sm:p-6">
            <h2 className="font-display text-3xl text-charcoal">
              Customer Enquiries
            </h2>
            <div className="mt-5 grid gap-4">
              {enquiries.length === 0 ? (
                <p className="rounded-md bg-ivory p-4 text-sm text-ink/60">
                  No enquiries yet.
                </p>
              ) : (
                enquiries.map((enquiry) => (
                  <div
                    key={enquiry._id}
                    className="rounded-md border border-gold/18 bg-ivory p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-bold text-charcoal">{enquiry.name}</p>
                        {enquiry.productName ? (
                          <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-gold-deep">
                            {enquiry.productName}
                          </p>
                        ) : null}
                        <p className="mt-1 text-sm text-ink/60">
                          {enquiry.phone} · {enquiry.email}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeEnquiry(enquiry._id, enquiry.name)}
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-red-200 text-red-700 transition hover:bg-red-50"
                        aria-label={`Delete enquiry from ${enquiry.name}`}
                        title={`Delete enquiry from ${enquiry.name}`}
                      >
                        <Trash2 size={15} aria-hidden="true" />
                      </button>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-ink/72">
                      {enquiry.message}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <a
                        href={`tel:${enquiry.phone.replace(/\s+/g, "")}`}
                        className="inline-flex items-center gap-2 rounded-full border border-gold/30 px-3 py-2 text-xs font-bold text-charcoal transition hover:bg-gold/10"
                      >
                        <Phone size={14} aria-hidden="true" />
                        Call
                      </a>
                      <a
                        href={`mailto:${enquiry.email}`}
                        className="inline-flex items-center gap-2 rounded-full border border-gold/30 px-3 py-2 text-xs font-bold text-charcoal transition hover:bg-gold/10"
                      >
                        <Mail size={14} aria-hidden="true" />
                        Email
                      </a>
                      {enquiry.phone ? (
                        <a
                          href={`https://wa.me/${enquiry.phone.replace(/[^0-9]/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border border-gold/30 px-3 py-2 text-xs font-bold text-charcoal transition hover:bg-gold/10"
                        >
                          <Phone size={14} aria-hidden="true" />
                          WhatsApp
                        </a>
                      ) : null}
                    </div>
                    <p className="mt-3 text-xs uppercase tracking-[0.14em] text-ink/45">
                      {new Date(enquiry.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AdminInput({
  label,
  value,
  onChange,
  type = "text"
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-charcoal">
      {label}
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        type={type}
        required
        className="rounded-md border border-gold/24 px-4 py-3 outline-none ring-gold/30 focus:ring-4"
      />
    </label>
  );
}
