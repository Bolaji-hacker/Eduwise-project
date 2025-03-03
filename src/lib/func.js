import toast from "react-hot-toast";

export const handleCopy = async (text) => {
    try {
        await navigator.clipboard.writeText(text);
        toast.success("Copied!!!");

        // setCopied(true);

        // setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
    } catch (error) {
        toast.error("Failed to copy text: ", error);
    }
};

export function formatPrice(amount) {
    return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
}
