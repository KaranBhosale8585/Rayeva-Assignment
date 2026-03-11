import { connectDB } from "@/lib/mongoDB";
import { ProductLog, ProposalLog } from "@/models/AiLog";
import { getCurrentUser } from "@/utils/getCurrentUser";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const ProductLogs = await ProductLog.find({ userId: user._id }).sort({
      createdAt: -1,
    });

    const ProposalLogs = await ProposalLog.find({ userId: user._id }).sort({
      createdAt: -1,
    });

    return NextResponse.json({
      productLogs: ProductLogs,
      proposalLogs: ProposalLogs,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching logs" },
      { status: 500 },
    );
  }
}
