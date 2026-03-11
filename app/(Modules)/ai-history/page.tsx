"use client";

import { useEffect, useState } from "react";
import { Package, CalendarDays } from "lucide-react";

export default function AIHistory() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/history")
      .then((res) => res.json())
      .then((data) => {
        const products = (data.productLogs || []).map((p: any) => ({
          ...p,
          type: "product",
        }));

        const proposals = (data.proposalLogs || []).map((p: any) => ({
          ...p,
          type: "proposal",
        }));

        const merged = [...products, ...proposals].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );

        setLogs(merged);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading AI History...
      </div>
    );

  return (
    <div className="min-h-screen text-gray-600 bg-gray-50 px-4 py-10">
      <div className="max-w-7xl mx-auto space-y-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            AI Activity History
          </h1>
          <p className="text-gray-500">
            All AI product classifications and event proposals
          </p>
        </div>

        {logs.length === 0 && (
          <p className="text-gray-500">No AI activity yet.</p>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {logs.map((item) => (
            <div
              key={item._id}
              className="bg-white border rounded-xl shadow-sm p-5 hover:shadow-md transition"
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className={`p-2 rounded-lg ${
                    item.type === "product" ? "bg-green-100" : "bg-blue-100"
                  }`}
                >
                  {item.type === "product" ? (
                    <Package className="w-5 h-5 text-green-600" />
                  ) : (
                    <CalendarDays className="w-5 h-5 text-blue-600" />
                  )}
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800">
                    {item.type === "product"
                      ? item.productName
                      : item.event_type}
                  </h3>

                  <span className="text-xs text-gray-500 capitalize">
                    {item.type}
                  </span>
                </div>
              </div>

              {item.type === "product" && (
                <>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                    {item.description}
                  </p>

                  <p className="text-sm">
                    <b>Primary:</b> {item.response.primary_category}
                  </p>

                  <p className="text-sm mb-2">
                    <b>Sub:</b> {item.response.sub_category}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {item.response.seo_tags.map((tag: string, i: number) => (
                      <span
                        key={i}
                        className="bg-gray-100 text-xs px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </>
              )}

              {item.type === "proposal" && (
                <>
                  <div className="text-sm text-gray-600 mb-2">
                    Budget: ₹{item.budget} <br />
                    Guests: {item.guests}
                  </div>

                  {item.response.product_mix.map((p: any, i: number) => (
                    <div
                      key={i}
                      className="flex justify-between text-xs border-b py-1"
                    >
                      <span>{p.product_name}</span>
                      <span>₹{p.total_price}</span>
                    </div>
                  ))}

                  <div className="mt-2 text-xs">
                    <p>
                      <b>Total:</b>{" "}
                      {item.response.budget_summary.total_allocated}
                    </p>
                    <p>
                      <b>Remaining:</b>{" "}
                      {item.response.budget_summary.remaining_budget}
                    </p>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
