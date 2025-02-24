import { Request, Response, NextFunction } from "express";
import { body, check, validationResult } from "express-validator";
import { Product, ProductDocument } from "../models/Product";
import { CallbackError, NativeError } from "mongoose";

/**
 * Create a new product.
 * @route POST /products
 */
export const createProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await check("name", "Name is required").not().isEmpty().run(req);
    await check("price", "Price must be a valid number").isFloat({ min: 0 }).run(req);
    await check("description", "Description is required").not().isEmpty().run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }

    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description
    });

    product.save((err: NativeError) => {
        if (err) return next(err);
        res.status(201).json(product);
    });
};

/**
 * List products with basic filters.
 * @route GET /products
 */
export const listProducts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { minPrice, maxPrice, name } = req.query;
    const filter: any = {};

    if (minPrice) filter.price = { ...filter.price, $gte: Number(minPrice) };
    if (maxPrice) filter.price = { ...filter.price, $lte: Number(maxPrice) };
    if (name) filter.name = new RegExp(name as string, "i");

    Product.find(filter, (err: CallbackError, products: ProductDocument[]) => {
        if (err) return next(err);
        res.json(products);
    });
};

/**
 * Get details of a product.
 * @route GET /products/:id
 */
export const getProduct = (req: Request, res: Response, next: NextFunction): void => {
    Product.findById(req.params.id, (err: CallbackError, product: ProductDocument | null) => {
        if (err) return next(err);
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.json(product);
    });
};

/**
 * Update product details.
 * @route PUT /products/:id
 */
export const updateProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await check("name", "Name cannot be empty").optional().not().isEmpty().run(req);
    await check("price", "Price must be a valid number").optional().isFloat({ min: 0 }).run(req);
    await check("description", "Description cannot be empty").optional().not().isEmpty().run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }

    Product.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err: CallbackError, product: ProductDocument | null) => {
        if (err) return next(err);
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.json(product);
    });
};

/**
 * Delete a product.
 * @route DELETE /products/:id
 */
export const deleteProduct = (req: Request, res: Response, next: NextFunction): void => {
    Product.findByIdAndDelete(req.params.id, (err: CallbackError, product: ProductDocument | null) => {
        if (err) return next(err);
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.json({ message: "Product deleted successfully" });
    });
};
