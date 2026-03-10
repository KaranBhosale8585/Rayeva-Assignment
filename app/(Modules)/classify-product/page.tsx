"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function ClassifyProductPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/classify-product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
        }),
      });

      const data = await res.json();
console.log(data)
      if (!res.ok) {
        toast.error(data.message || "Something went wrong. Please try again.");
        return;
      }

      const parsed = JSON.parse(data.result);
      setResult(parsed);
    } catch (err: any) {
      toast.error(err.message || "Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">
          AI Product Category Generator
        </h1>

        <p className="text-gray-500 mb-6">
          Enter product details to generate category, SEO tags, and
          sustainability filters.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Product Name
            </label>
            <input
              type="text"
              placeholder="Eco Friendly Paper Cups"
              className="w-full border rounded-lg p-3 mt-1 focus:ring-2 text-gray-800 focus:ring-green-500 outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              placeholder="Biodegradable disposable cups made from recycled paper..."
              className="w-full border rounded-lg p-3 mt-1 h-28 focus:ring-2 text-gray-800 focus:ring-green-500 outline-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition"
          >
            {loading ? "Classifying..." : "Generate Category"}
          </button>
        </form>

        {result && (
          <div className="mt-6 bg-gray-50 text-gray-800 border rounded-lg p-4">
            <h2 className="font-semibold text-lg mb-3">AI Result</h2>

            <p>
              <b>Primary Category:</b> {result.primary_category}
            </p>
            <p>
              <b>Sub Category:</b> {result.sub_category}
            </p>

            <div className="mt-3">
              <b>SEO Tags:</b>
              <div className="flex flex-wrap gap-2 mt-2">
                {result.seo_tags.map((tag: string, i: number) => (
                  <span
                    key={i}
                    className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-3">
              <b>Sustainability Filters:</b>
              <div className="flex flex-wrap gap-2 mt-2">
                {result.sustainability_filters.map((tag: string, i: number) => (
                  <span
                    key={i}
                    className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
