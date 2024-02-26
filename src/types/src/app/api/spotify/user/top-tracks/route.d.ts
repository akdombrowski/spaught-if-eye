import { NextRequest, NextResponse } from "next/server";
export declare function ReadFormData(request: NextRequest): Promise<{
    name: FormDataEntryValue | null;
    email: FormDataEntryValue | null;
}>;
export declare function GET(request: NextRequest): Promise<NextResponse<unknown>>;
export declare function POST(request: NextRequest): Promise<NextResponse<unknown>>;
//# sourceMappingURL=route.d.ts.map