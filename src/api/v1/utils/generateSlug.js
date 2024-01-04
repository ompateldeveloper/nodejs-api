export default function generateSlug(str) {
    return str
        .toLowerCase()
        .replace(/ /g, '-') 
        .replace(/[^\w-]+/g, ''); 
}