import Product from "../models/Product.js";

// GET /api/products
export const listProducts = async (req, res, next) => {
  try {
    const { featured, limit, search, newest } = req.query;

    const filter = {};

    if (search) {
      filter.name = {
        $regex: search,
        $options: "i",
      };
    }

    if (featured === "true") {
      filter.featured = true;
    }

    let query = Product.find(filter);

    const isNewest = newest === undefined || newest === "true";
    if (isNewest) {
      query = query.sort({ createdAt: -1 });
    }

    if (limit) {
      query = query.limit(Number(limit));
    }

    const products = await query.exec();
    res.json(products);
  } catch (err) {
    next(err);
  }
};

// GET /api/products/:id
export const getProduct = async (req, res, next) => {
  try {
    const item = await Product.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Product not found" });
    res.json(item);
  } catch (err) {
    next(err);
  }
};

// POST /api/products
export const createProduct = async (req, res, next) => {
  try {
    const { name, price, description, stock, featured } = req.body;
    let finalImageURL;

    if (req.file) {
      finalImageURL = `${req.protocol}://${req.get("host")}/uploads/${
        req.file.filename
      }`;
    }

    const item = await Product.create({
      name,
      image: finalImageURL,
      price,
      description,
      stock,
      featured,
    });
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
};
// PUT /api/products/:id
export const updateProduct = async (req, res, next) => {
  try {
    const { name, price, description, stock, featured } = req.body;

    const updateData = {
      name,
      price,
      description,
      stock,
      featured,
    };

    if (req.file) {
      updateData.image = `${req.protocol}://${req.get("host")}/uploads/${
        req.file.filename
      }`;
    }

    const item = await Product.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!item) return res.status(404).json({ message: "Product not found" });
    res.json(item);
  } catch (err) {
    next(err);
  }
};
// DELETE /api/products/:id
export const deleteProduct = async (req, res, next) => {
  try {
    const r = await Product.findByIdAndDelete(req.params.id);
    if (!r) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted" });
  } catch (err) {
    next(err);
  }
};
