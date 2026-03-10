"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function ProposalGeneratorPage() {
  const [budget, setBudget] = useState("");
  const [eventType, setEventType] = useState("");
  const [guests, setGuests] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/proposal-generator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          budget,
          event_type: eventType,
          guests,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Something went wrong.");
        return;
      }

      const parsed = JSON.parse(data.result);
      setResult(parsed);
    } catch (err: any) {
      toast.error(err.message || "Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">
          AI B2B Proposal Generator
        </h1>

        <p className="text-gray-500 mb-6">
          Generate a sustainable product mix proposal for your event within the
          given budget.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Budget (₹)
            </label>
            <input
              type="number"
              placeholder="50000"
              className="w-full border rounded-lg p-3 mt-1 text-gray-800 focus:ring-2 focus:ring-green-500 outline-none"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Event Type
            </label>
            <input
              type="text"
              placeholder="Corporate Conference"
              className="w-full border rounded-lg p-3 mt-1 text-gray-800 focus:ring-2 focus:ring-green-500 outline-none"
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Number of Guests
            </label>
            <input
              type="number"
              placeholder="200"
              className="w-full border rounded-lg p-3 mt-1 text-gray-800 focus:ring-2 focus:ring-green-500 outline-none"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition"
          >
            {loading ? "Generating Proposal..." : "Generate Proposal"}
          </button>
        </form>

        {result && (
          <div className="mt-6 bg-gray-50 text-gray-800 border rounded-lg p-4">
            <h2 className="font-semibold text-lg mb-3">AI Proposal</h2>

            <div className="space-y-3">
              <h3 className="font-semibold">Product Mix</h3>

              {result.product_mix.map((product: any, i: number) => (
                <div
                  key={i}
                  className="border rounded-lg p-3 bg-white flex justify-between"
                >
                  <div>
                    <p className="font-medium">{product.product_name}</p>
                    <p className="text-sm text-gray-500">
                      Qty: {product.quantity}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm">₹{product.unit_price} / unit</p>
                    <p className="font-medium">₹{product.total_price}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 border-t pt-3">
              <p>
                <b>Total Allocated:</b> ₹{result.budget_summary.total_allocated}
              </p>

              <p>
                <b>Remaining Budget:</b> ₹
                {result.budget_summary.remaining_budget}
              </p>
            </div>

            <div className="mt-4">
              <b>Impact Positioning:</b>
              <p className="text-gray-600 mt-1">{result.impact_positioning}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
