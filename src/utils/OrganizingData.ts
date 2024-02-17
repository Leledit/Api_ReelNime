import { DashboardPopular } from "../interfaces/dashboardPopular";
import { ListItem } from "../interfaces/listItem";

export default class OrganizingData {
  static organizingItemList(data: any[]): ListItem[] {
    let listingItens: ListItem[] = [];
    data.map((item) => {
      listingItens.push({
        id: item.id,
        name: item.name,
        urlImg: item.urlImg,
      });
    });

    return listingItens;
  }

  static organizingDashboardPopular(data: any[]): DashboardPopular[] {
    let listingItens: DashboardPopular[] = [];
    data.map((item) => {
      listingItens.push({
        id: item.id,
        name: item.name,
        urlImg: item.urlImg,
        note: item.note,
        releaseYear: item.releaseYear,
      });
    });

    return listingItens;
  }
}
