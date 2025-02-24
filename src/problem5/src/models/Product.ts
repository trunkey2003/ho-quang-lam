import mongoose from "mongoose";

export type ProductDocument = mongoose.Document & {
    name: string;
    description: string;
    price: number;
    category: string;
    stock: number;
    imageUrl: string;
};

const productSchema = new mongoose.Schema<ProductDocument>(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        category: { type: String, required: true },
        stock: { type: Number, required: true },
        imageUrl: { type: String, required: true },
    },
    { timestamps: true },
);

export const Product = mongoose.model<ProductDocument>("Product", productSchema);
