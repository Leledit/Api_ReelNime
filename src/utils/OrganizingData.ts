import { ListItem } from "../interfaces/listItem";

export default class OrganizingData {
  static  organizingItemList(data: any[]): ListItem[] {
    let listingItens: ListItem[] = [];
    data.map((item) => {
      listingItens.push({
        id: item.id,
        name: item.name,
        urlImg: item.urlImg,
      });
    });

    return listingItens
  }
}
