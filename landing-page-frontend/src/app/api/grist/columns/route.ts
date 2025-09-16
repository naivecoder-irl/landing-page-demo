/**
 * Debugging method for Grist backend table column
 * Access http://127.0.0.1:3000/api/grist/columns
 * 
 */
export async function GET() {
    const base = process.env.GRIST_BASE_URL!;
    const key = process.env.GRIST_API_KEY!;
    const doc = process.env.GRIST_DOC_ID!;
    const table = process.env.GRIST_TABLE_ID!;

    const res = await fetch(`${base}/api/docs/${doc}/tables/${table}/columns`, {
        headers: { Authorization: `Bearer ${key}` },
        cache: 'no-store',
    });

    const text = await res.text();
    return new Response(text, {
        status: res.status,
        headers: { 'Content-Type': 'application/json' },
    });
}
