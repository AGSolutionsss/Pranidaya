export default {
  //user
  category1: [
    
  ],
  //Admin
  category7: [
    {
      menu_title: "sidebar.dashboards",
      menu_icon: "zmdi zmdi-view-dashboard",
      path: "/app/dashboard",
      child_routes: null,
    },
    {
      menu_title: "Master",
      menu_icon: "zmdi zmdi-file-text",
      path: "",
      child_routes: [
        {
          menu_title: "Items",
          menu_icon: "zmdi zmdi-account",
          path: "/app/item",
          child_routes: null,
        },
        {
          menu_title: "Vendors",
          menu_icon: "zmdi zmdi-account",
          path: "/app/vendor",
          child_routes: null,
        },
      ]
    },
    {
      menu_title: "Stock",
      menu_icon: "zmdi zmdi-account-circle",
      path: "",
      child_routes: [
        {
          menu_title: "Purchase",
          menu_icon: "zmdi zmdi-account-circle",
          path: "/app/purchase",
          child_routes: null,
        },
        {
          menu_title: "Consumption",
          menu_icon: "zmdi zmdi-account",
          path: "/app/cons",
          child_routes: null,
        },
        {
          menu_title: "Stock",
          menu_icon: "zmdi zmdi-account",
          path: "/app/stock",
          child_routes: null,
        },
      ]
    },
    {
      menu_title: "sidebar.donor",
      menu_icon: "zmdi zmdi-account",
      path: "/app/donor",
      child_routes: null,
    },
    
    {
      menu_title: "Receipts",
      menu_icon: "zmdi zmdi-receipt",
      path: "",
      child_routes: [
        {
          menu_title: "Cash Receipts",
          menu_icon: "zmdi zmdi-account",
          path: "/app/receipts",
          child_routes: null,
        },
        {
          menu_title: "Material Receipts",
          menu_icon: "zmdi zmdi-account",
          path: "/app/receiptsM",
          child_routes: null,
        },
      ]
    },
    
    {
      menu_title: "Website Donation",
      menu_icon: "zmdi zmdi-account-o",
      path: "/app/payment",
      child_routes: null,
    },
    
    {
      menu_title: "Download",
      menu_icon: "zmdi zmdi-download",
      path: "",
      child_routes: [
        {
          menu_title: "Donor",
          menu_icon: "zmdi zmdi-download",
          path: "/app/donor-download",
        },
        {
          menu_title: "Cash Receipt",
          menu_icon: "zmdi zmdi-download",
          path: "/app/receipt-download",
        },
        
      ],

     },
  ],

  //Manager
  category8: [
    {
      menu_title: "sidebar.dashboards",
      menu_icon: "zmdi zmdi-view-dashboard",
      path: "/app/dashboard",
      child_routes: null,
    },
    {
      menu_title: "Master",
      menu_icon: "zmdi zmdi-file-text",
      path: "",
      child_routes: [
        {
          menu_title: "Items",
          menu_icon: "zmdi zmdi-account",
          path: "/app/item",
          child_routes: null,
        },
        {
          menu_title: "Vendors",
          menu_icon: "zmdi zmdi-account",
          path: "/app/vendor",
          child_routes: null,
        },
      ]
    },
    {
      menu_title: "Stock",
      menu_icon: "zmdi zmdi-account-circle",
      path: "",
      child_routes: [
        {
          menu_title: "Purchase",
          menu_icon: "zmdi zmdi-account-circle",
          path: "/app/purchase",
          child_routes: null,
        },
        {
          menu_title: "Consumption",
          menu_icon: "zmdi zmdi-account",
          path: "/app/cons",
          child_routes: null,
        },
        {
          menu_title: "Stock",
          menu_icon: "zmdi zmdi-account",
          path: "/app/stock",
          child_routes: null,
        },
      ]
    },
    {
      menu_title: "sidebar.donor",
      menu_icon: "zmdi zmdi-account",
      path: "/app/donor",
      child_routes: null,
    },
    {
      menu_title: "Receipts",
      menu_icon: "zmdi zmdi-receipt",
      path: "",
      child_routes: [
        {
          menu_title: "Cash Receipts",
          menu_icon: "zmdi zmdi-account",
          path: "/app/receipts",
          child_routes: null,
        },
        {
          menu_title: "Material Receipts",
          menu_icon: "zmdi zmdi-account",
          path: "/app/receiptsM",
          child_routes: null,
        },
      ]
    },
    
    {
      menu_title: "Website Donation",
      menu_icon: "zmdi zmdi-account-o",
      path: "/app/payment",
      child_routes: null,
    },
    {
      menu_title: "Download",
      menu_icon: "zmdi zmdi-download",
      path: "",
      child_routes: [
        {
          menu_title: "Donor",
          menu_icon: "zmdi zmdi-download",
          path: "/app/donor-download",
        },
        {
          menu_title: "Cash Receipt",
          menu_icon: "zmdi zmdi-download",
          path: "/app/receipt-download",
        },
        
      ],

     },
  ],
  category3: [
   
  ],
  category4: [
    
  ],
  category5: [
    
  ],
  category6: [
    
  ],
};
