export class returnImageNameBasedOnUrl{
    static nameImg(url:string){
        const urlFull = url.split('?')
        const urlBase = urlFull[0].split('/');
        const nameImg = urlBase[urlBase.length - 1];
        return nameImg;
    }
}