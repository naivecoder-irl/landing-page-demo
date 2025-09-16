// app/api/form/submit/route.ts
import { gristAddLead } from '@/lib/grist';

export async function POST(req: Request) {
    try {
        const data = await req.json();

        const fullName = (data?.fullName ?? '').trim();
        const email = (data?.email ?? '').trim();
        const phone = (data?.phone ?? '').trim();

        if (!fullName || fullName.length < 2) {
            return Response.json({ error: 'Full Name is required (min 2 chars).' }, { status: 400 });
        }
        if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
            return Response.json({ error: 'Valid Email is required.' }, { status: 400 });
        }

        const id = await gristAddLead({ fullName, email, phone });
        return Response.json({ ok: true, id }, { status: 200 });
    } catch (e: unknown) {
        const message = e instanceof Error ? e.message : 'Internal error';
        return Response.json({ error: message }, { status: 500 });
    }
}

