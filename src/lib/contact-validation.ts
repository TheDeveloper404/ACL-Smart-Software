export const MAX_CONTACT_BODY_BYTES = 64 * 1024;

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
  company: string;
  budget: string;
}

export type ValidContact =
  | { kind: 'honeypot' }
  | { kind: 'message'; value: ContactMessage };

export class ContactInputError extends Error {
  constructor(public readonly status: 400 | 413) {
    super('Invalid contact input');
  }
}

/** Bound bytes while reading, including requests without Content-Length. */
export async function readContactJson(request: Request): Promise<unknown> {
  const length = request.headers.get('content-length');
  if (length && /^\d+$/.test(length) && Number(length) > MAX_CONTACT_BODY_BYTES) {
    throw new ContactInputError(413);
  }
  const reader = request.body?.getReader();
  if (!reader) throw new ContactInputError(400);
  const decoder = new TextDecoder('utf-8', { fatal: true });
  let raw = '';
  let bytes = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > MAX_CONTACT_BODY_BYTES) {
        await reader.cancel();
        throw new ContactInputError(413);
      }
      raw += decoder.decode(value, { stream: true });
    }
    raw += decoder.decode();
  } catch (error) {
    if (error instanceof ContactInputError) throw error;
    throw new ContactInputError(400);
  } finally { reader.releaseLock(); }
  try { return JSON.parse(raw); } catch { throw new ContactInputError(400); }
}

export function validateContactInput(input: unknown): ValidContact | null {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return null;
  const body = input as Record<string, unknown>;
  const { name, email, message, company, budget, _hp } = body;
  if (_hp !== undefined && (typeof _hp !== 'string' || _hp.length > 200)) return null;
  // Honeypot responses do not reach the email transport.
  if (typeof _hp === 'string' && _hp.trim()) return { kind: 'honeypot' };
  if (typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string') return null;
  if (!name.trim() || !email.trim() || !message.trim()) return null;
  if (name.length > 100 || email.length > 200 || message.length > 5000) return null;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return null;
  if (company !== undefined && (typeof company !== 'string' || company.length > 200)) return null;
  if (budget !== undefined && (typeof budget !== 'string' || budget.length > 100)) return null;
  return {
    kind: 'message',
    value: {
      name: name.trim(), email: email.trim(), message: message.trim(),
      company: typeof company === 'string' ? company.trim() : '',
      budget: typeof budget === 'string' ? budget.trim() : '',
    },
  };
}
