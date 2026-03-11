import mongoose from "mongoose";

const ProductLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    productName: String,
    description: String,

    response: {
      primary_category: String,
      sub_category: String,
      seo_tags: [String],
      sustainability_filters: [String],
    },
  },
  { timestamps: true },
);

const ProposalLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    budget: Number,
    event_type: String,
    guests: Number,

    response: {
      product_mix: [
        {
          product_name: String,
          quantity: Number,
          unit_price: Number,
          total_price: Number,
        },
      ],
      budget_summary: {
        total_allocated: Number,
        remaining_budget: Number,
      },
      impact_positioning: String,
    },
  },
  { timestamps: true },
);

export const ProductLog =
  mongoose.models.ProductLog || mongoose.model("ProductLog", ProductLogSchema);

export const ProposalLog =
  mongoose.models.ProposalLog ||
  mongoose.model("ProposalLog", ProposalLogSchema);