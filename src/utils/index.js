export function navigateTo({ path }){
    if(!path){
        console.error('Path is required for this function to work', 100);
    }
    return window.location.href = path;
}