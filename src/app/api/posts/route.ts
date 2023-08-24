import { NextRequest, NextResponse } from "next/server";
import { getPosts } from "@/lib/dropbox.service";
export const GET = async (req: NextRequest) => {
    try {
        const queryParamUrl = req.url.split('?')[1];
        const queryParam: URLSearchParams = new URLSearchParams(queryParamUrl);
        const date = queryParam.get('date');
        const slug = queryParam.get('slug');
        const category = queryParam.get('category');
        
        const data = await getPosts(date as string, slug as string, category as string);
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        return NextResponse.json({
            message: error as string,
        }, {
            status: 500,
        });
    }
}