"use client";

import Link from "next/link";
import {Package, FileText } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">
      <section className="text-center px-6 md:px-16 ">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
          AI Powered Tools for <br />
          <span className="text-green-600">Sustainable Commerce</span>
        </h2>

        <p className="mt-6 text-gray-600 max-w-xl mx-auto">
          Automate product catalog classification and generate intelligent B2B
          proposals using AI. Built with structured AI outputs, real business
          logic, and production-ready architecture.
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-8 px-6 md:px-20 mt-16 pb-20">
        <Link href="/classify-product">
          <div className="bg-white shadow-lg rounded-xl p-8 hover:shadow-2xl transition cursor-pointer border hover:border-green-500">
            <div className="bg-green-100 w-fit p-4 rounded-lg mb-4">
              <Package className="text-green-700" size={28} />
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              AI Auto-Category & Tag Generator
            </h3>

            <p className="text-gray-600 text-sm">
              Automatically classify products, generate SEO tags, and apply
              sustainability filters using AI.
            </p>

            <div className="mt-6">
              <span className="text-green-600 font-medium">Open Module →</span>
            </div>
          </div>
        </Link>

        <Link href="/proposal-generator">
          <div className="bg-white shadow-lg rounded-xl p-8 hover:shadow-2xl transition cursor-pointer border hover:border-green-500">
            <div className="bg-green-100 w-fit p-4 rounded-lg mb-4">
              <FileText className="text-green-700" size={28} />
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              AI B2B Proposal Generator
            </h3>

            <p className="text-gray-600 text-sm">
              Generate sustainable product proposals with budget allocation,
              product mix, and impact positioning summaries.
            </p>

            <div className="mt-6">
              <span className="text-green-600 font-medium">Open Module →</span>
            </div>
          </div>
        </Link>
      </section>
    </div>
  );
}
