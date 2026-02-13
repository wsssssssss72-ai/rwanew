
// Declare CryptoJS as a global variable since it is loaded via script tag in index.html
declare var CryptoJS: any;

// Constants - Verbatim from HTML
export const RENDER_PLAYER = "https://lennisterrwa.vercel.app/player?url=";
export const RENDER_PDF = "https://lennisterrwa.vercel.app/pdf-viewer?url=";
export const WA_LINK = "https://whatsapp.com/channel/0029VbAvDSX0QeahEg4kkE3U";
export const API_URL = "https://rwawebfree.vercel.app/api/proxy";

// Global Encryption Logic - Verbatim
export function decrypt(e: string) {
    try {
        // Fix: Use the declared global CryptoJS to ensure full type safety for all property accesses
        const t = CryptoJS.enc.Utf8.parse("638udh3829162018");
        const a = CryptoJS.enc.Utf8.parse("fedcba9876543210");
        return CryptoJS.AES.decrypt(
            { ciphertext: CryptoJS.enc.Base64.parse(e.split(':')[0]) },
            t,
            { iv: a, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }
        ).toString(CryptoJS.enc.Utf8);
    } catch (e) {
        console.error("Decryption error:", e);
        return "";
    }
}

// Fetch helper - Verbatim
export async function apiCall(endpoint: string) {
    try {
        const res = await fetch(`${API_URL}?endpoint=${encodeURIComponent(endpoint)}`);
        if (res.ok) {
            const data = await res.json();
            return data;
        }
        throw new Error("Backend Error");
    } catch (e) {
        console.error(e);
        return { data: [] };
    }
}

// Helper for local storage parsing
export const safeParse = (k: string) => {
    try {
        const item = localStorage.getItem(k);
        return item ? JSON.parse(item) : null;
    } catch (e) {
        return null;
    }
};
