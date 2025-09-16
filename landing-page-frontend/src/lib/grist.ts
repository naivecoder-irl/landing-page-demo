// grist form submit method
import 'server-only';

type Lead = {
    fullName: string;
    email: string;
    phone?: string | null;
};

export async function gristAddLead(lead: Lead) {
    const base = process.env.GRIST_BASE_URL!;
    const key = process.env.GRIST_API_KEY!;
    const doc = process.env.GRIST_DOC_ID!;
    const table = process.env.GRIST_TABLE_ID!; // Users

    const res = await fetch(`${base}/api/docs/${doc}/tables/${table}/records`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${key}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            records: [
                {
                    fields: {
                        fullName: lead.fullName,
                        email: lead.email,
                        phone: lead.phone ?? '',
                    },
                },
            ],
        }),
        cache: 'no-store',
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(
            `Grist error ${res.status} [doc=${doc} table=${table}]: ${text}`
        );
    }


    const json = await res.json();
    return json?.records?.[0]?.id as number | undefined;
}
