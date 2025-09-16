/**
 * Debugging method for Grist API
 * Access http://127.0.0.1:3000/api/grist/debug
 * 
 * @returns 
 */
export async function GET() {
    const base = process.env.GRIST_BASE_URL!;
    const key = process.env.GRIST_API_KEY!;
    const doc = process.env.GRIST_DOC_ID!;

    const res = await fetch(`${base}/api/docs/${doc}/tables`, {
        headers: { Authorization: `Bearer ${key}` },
        cache: 'no-store',
    });

    const text = await res.text();
    return new Response(text, {
        status: res.status,
        headers: { 'Content-Type': 'application/json' },
    });
}
