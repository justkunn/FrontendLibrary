import { BASE_URL } from "../../shared/config/env";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

/**
 * Fungsi inti untuk request HTTP.
 * Semua apiGet/apiPost/apiPut/apiDelete akan memanggil fungsi ini.
 */
async function request<TResponse>(
    path: string,
    method: HttpMethod,
    body?: unknown
): Promise<TResponse> {
    const url = `${BASE_URL}${path}`;

    console.info(`[api] ${method} ${url}`);
    const res = await fetch(url, {
        method,
        headers: {
            // Kita set JSON karena umumnya API REST pakai JSON
            "Content-Type": "application/json",
        },
        // Body hanya dikirim kalau ada datanya
        body: body !== undefined ? JSON.stringify(body) : undefined,
    });

    console.info(`[api] ${method} ${url} -> ${res.status}`);
    // Kalau status bukan 2xx, anggap error
    if (!res.ok) {
        // Coba baca pesan error dari backend (kalau ada)
        const message = await safeReadError(res);
        throw new Error(message || `Request gagal: ${res.status} ${res.statusText}`);
    }

    // Beberapa endpoint bisa mengembalikan "no content" (204)
    if (res.status === 204) {
        return undefined as TResponse;
    }

    // Normalnya API mengembalikan JSON
    const data = (await res.json()) as TResponse;
    console.info(`[api] ${method} ${url} response`, data);
    return data;
}

/**
 * Membaca error body dengan aman (kadang backend kirim text, kadang JSON).
 */
async function safeReadError(res: Response): Promise<string | null> {
    try {
        const contentType = res.headers.get("content-type") || "";
        if (contentType.includes("application/json")) {
            const data = (await res.json()) as { message?: string };
            return data?.message ?? JSON.stringify(data);
        }
        return await res.text();
    } catch {
        return null;
    }
}

// Helper functions agar pemakaian lebih enak dibaca
export function apiGet<TResponse>(path: string) {
    return request<TResponse>(path, "GET");
}

export function apiPost<TResponse>(path: string, body: unknown) {
    return request<TResponse>(path, "POST", body);
}

export function apiPut<TResponse>(path: string, body: unknown) {
    return request<TResponse>(path, "PUT", body);
}

export function apiDelete<TResponse>(path: string) {
    return request<TResponse>(path, "DELETE");
}
