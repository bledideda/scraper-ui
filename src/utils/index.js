export function navigateTo({ path, router }){
    if(!path){
        console.error('Path is required for this function to work', 100);
    }
    if(!router){
        return window.location.href = path;
    }
    return router.push(path);
}