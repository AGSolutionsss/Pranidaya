import Widgets from "Routes/widgets";
import AdvanceUIComponents from "Routes/advance-ui-components";
import ChartsComponents from "Routes/charts";
import Users from "Routes/users";
import Components from "Routes/components";
import Icons from "Routes/icons";
import Dashboard from "Routes/dashboard";
import Crm from "Routes/crm";
import NewListDonor from "Routes/Donor";
import NewListReceipts from "Routes/Receipts";
import NewListReceiptsM from "Routes/ReceiptsM";
import NewListPayment from "Routes/Payment";
import Team from "Routes/Team";
import Maintenance from "../container/Maintenance";
import { AsyncAboutUsComponent} from "Components/AsyncComponent/AsyncComponent";
import DonorDownload from "Routes/Download/DonorDownload";
import ReceiptDownload from "Routes/Download/ReceiptDownload";
import TeamDownload from "Routes/Download/TeamDownload";
import NewListVendors from "Routes/Vendors";
import NewListItem from "Routes/Items";
import NewListPurchase from "Routes/Purchase";
import NewListCons from "Routes/Cons";
import NewListStock from "Routes/Stock";
import ReceiptMaterialDownload from "Routes/Download/ReceiptMaterialDownload";
import PurchaseDownload from "Routes/Download/PurchaseDownload";
import ConsumptionDownload from "Routes/Download/ConsumptionDownload";
import WebsiteDonationDownload from "Routes/Download/WebsiteDonationDownload";
import StockSummary from "Routes/Reports/StockSummary";

export default [
  {
    path: "dashboard",
    component: Dashboard,
  },
  {
    path: "crm",
    component: Crm,
  },
  {
    path: "widgets",
    component: Widgets,
  },
 
  {
    path: "icons",
    component: Icons,
  },
  {
    path: "about-us",
    component: AsyncAboutUsComponent,
  },
  {
    path: "charts",
    component: ChartsComponents,
  },
  {
    path: "users",
    component: Users,
  },
  {
    path: "ui-components",
    component: Components,
  },
  {
    path: "advanced-component",
    component: AdvanceUIComponents,
  },
  
  {
    path: "Donor",
    component: NewListDonor,
  },
  {
    path: "Receipts",
    component: NewListReceipts,
  },
  {
    path: "ReceiptsM",
    component: NewListReceiptsM,
  },
  {
    path: "Team",
    component: Team,
  },
  {
    path: "maintenance",
    component: Maintenance,
  },
  {
    path:"donor-download",
    component: DonorDownload,
  },
  {
    path:"receipt-download",
    component: ReceiptDownload,
  },
  {
    path:"team-download",
    component: TeamDownload,
  },
  {
    path:"payment",
    component: NewListPayment,
  },
  {
    path:"vendor",
    component: NewListVendors,
  },
  {
    path:"item",
    component: NewListItem,
  },
  {
    path:"purchase",
    component: NewListPurchase,
  },
  {
    path:"cons",
    component: NewListCons,
  },
  {
    path:"stock",
    component: NewListStock,
  },
  {
    path:"receipt-material-download",
    component: ReceiptMaterialDownload,
  },
  {
    path:"purchase-download",
    component: PurchaseDownload,
  },
  {
    path:"consumption-download",
    component: ConsumptionDownload,
  },
  {
    path:"website-donation-download",
    component: WebsiteDonationDownload,
  },
  {
    path:"stock-summary",
    component: StockSummary,
  },
];
