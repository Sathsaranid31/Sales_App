export const MOCK_ORDERS = [
  { id: "929562", customer: "BLUEBOLT IMPROVEMENT STORES",   division: "BLU-THE IMMIGRATION GROUP", custPO: "CMP5121",        store: "",      start: "01/01/2024", complete: "01/24/2024", realArrival: "01/24/2024", orderQty: 1419, shippedQty: 0, openQty: 1419, openDate: "5,493.46", totalDate: "5,149.46", bi: 0 },
  { id: "928708", customer: "WAL-MART STORES [DOMESTIC]",    division: "WAF-WAE FOODS",             custPO: "1029213044",     store: "4106",  start: "03/09/2024", complete: "04/09/2024", realArrival: "04/09/2024", orderQty: 1,    shippedQty: 0, openQty: 1,    openDate: "1,202.69", totalDate: "1,207.00", bi: 0 },
  { id: "929710", customer: "WAL-MART STORES [DOMESTIC]",    division: "WAF-WAE FOODS",             custPO: "1029261945",     store: "",      start: "02/22/2024", complete: "03/29/2024", realArrival: "03/22/2024", orderQty: 29,   shippedQty: 0, openQty: 29,   openDate: "195.65",   totalDate: "395.65",   bi: 0 },
  { id: "929711", customer: "WAL-MART STORES [DOMESTIC]",    division: "WAF-WAE FOODS",             custPO: "1029300000",     store: "4082",  start: "03/28/2024", complete: "03/29/2024", realArrival: "03/22/2024", orderQty: 11,   shippedQty: 0, openQty: 11,   openDate: "33.00",    totalDate: "50.40",    bi: 0 },
  { id: "929715", customer: "WAL-MART STORES [DOMESTIC]",    division: "WAF-WAE FOODS",             custPO: "7034514514",     store: "",      start: "03/27/2024", complete: "03/29/2024", realArrival: "03/29/2024", orderQty: 36,   shippedQty: 0, openQty: 36,   openDate: "108.00",   totalDate: "108.00",   bi: 0 },
  { id: "929726", customer: "ENKORE - CAMPBELL-PALM OFFICE", division: "AGF-LAKE OFFICE",           custPO: "471965481130130",store: "140.981",start:"03/25/2024", complete: "03/29/2024", realArrival: "03/29/2024", orderQty: 2099, shippedQty: 0, openQty: 2099, openDate: "4.82",     totalDate: "4.82",     bi: 0 },
  { id: "929732", customer: "ELCRO - HOME SCENE",            division: "MKT-MIKE CAMPBELL",         custPO: "11-43581",       store: "821",   start: "03/25/2024", complete: "03/29/2024", realArrival: "03/25/2024", orderQty: 725,  shippedQty: 0, openQty: 725,  openDate: "1,344.05", totalDate: "1,340.00", bi: 0 },
  { id: "929733", customer: "ELCRO - HOME SCENE",            division: "MKT-MIKE CAMPBELL",         custPO: "11-43508",       store: "",      start: "03/29/2024", complete: "04/04/2024", realArrival: "",           orderQty: 2480, shippedQty: 0, openQty: 2480, openDate: "1,700.00", totalDate: "1,700.00", bi: 0 },
];

export const TOP_ITEMS = [
  { rank: 1, name: "WA100 - WAL-MART PREMIUM SET",  division: "WAF-WAE FOODS",             sales: 128450, vol: 12400, gp: 38.2 },
  { rank: 2, name: "BL200 - BLUEBOLT BASIC KIT",    division: "BLU-THE IMMIGRATION GROUP", sales: 94320,  vol: 9800,  gp: 41.5 },
  { rank: 3, name: "EL300 - ELCRO HOME BUNDLE",     division: "MKT-MIKE CAMPBELL",         sales: 76100,  vol: 7250,  gp: 35.8 },
  { rank: 4, name: "WA110 - WAL-MART ESSENTIALS",   division: "WAF-WAE FOODS",             sales: 63800,  vol: 6100,  gp: 29.4 },
  { rank: 5, name: "EN400 - ENKORE OFFICE PACK",    division: "AGF-LAKE OFFICE",           sales: 51200,  vol: 4900,  gp: 44.1 },
];

export const TOP_CUSTOMERS = [
  { rank: 1, name: "WAL-MART STORES [DOMESTIC]",      division: "WAF-WAE FOODS",             sales: 342890, vol: 31200, gp: 36.7 },
  { rank: 2, name: "BLUEBOLT IMPROVEMENT STORES",     division: "BLU-THE IMMIGRATION GROUP", sales: 187450, vol: 17800, gp: 39.2 },
  { rank: 3, name: "ELCRO - HOME SCENE",              division: "MKT-MIKE CAMPBELL",         sales: 142300, vol: 13500, gp: 33.5 },
  { rank: 4, name: "ENKORE - CAMPBELL-PALM OFFICE",   division: "AGF-LAKE OFFICE",           sales: 98700,  vol: 9200,  gp: 41.8 },
  { rank: 5, name: "TARGET CORP",                     division: "TGT-GENERAL MERCH",         sales: 76500,  vol: 7100,  gp: 28.9 },
];

export const TOP_SP = [
  { rank: 1, name: "MIKE CAMPBELL",  region: "Southeast", sales: 421800, vol: 38900, gp: 37.4 },
  { rank: 2, name: "SARAH JOHNSON",  region: "Northeast", sales: 318500, vol: 28700, gp: 40.1 },
  { rank: 3, name: "DAVID CHEN",     region: "West",      sales: 276400, vol: 24100, gp: 35.6 },
  { rank: 4, name: "LISA MARTINEZ",  region: "Midwest",   sales: 203900, vol: 18600, gp: 38.9 },
  { rank: 5, name: "JAMES WILSON",   region: "Southwest", sales: 168700, vol: 15200, gp: 32.7 },
];

export const PRESET_PROMPTS = [
  { id: 1,  category: "Items",     label: "Top Items $ / Month",     query: "Top selling items by $ this month" },
  { id: 2,  category: "Items",     label: "Top Items Vol / YTD",     query: "Top selling items by volume YTD" },
  { id: 3,  category: "Items",     label: "Top Items GP% / YTD",     query: "Top selling items by GP% YTD" },
  { id: 4,  category: "Customer",  label: "Top Customers $ / Month", query: "Top customer by $ this month" },
  { id: 5,  category: "Customer",  label: "Top Customers Vol / YTD", query: "Top customer by volume YTD" },
  { id: 6,  category: "Customer",  label: "Top Customers GP% / YTD", query: "Top customer by GP% YTD" },
  { id: 7,  category: "Sales Rep", label: "Top SP $ / Month",        query: "Top selling SP by $ this month" },
  { id: 8,  category: "Sales Rep", label: "Top SP Vol / YTD",        query: "Top selling SP by volume YTD" },
  { id: 9,  category: "Sales Rep", label: "Top SP GP% / YTD",        query: "Top selling SP by GP% YTD" },
  { id: 10, category: "Orders",    label: "Open Orders",             query: "Show open orders inquiry" },
];

export const CAT_COLORS = {
  Items:      { bg: "#e8f4ec", text: "#1a7a3a", border: "#a8d5b5" },
  Customer:   { bg: "#e8f0fb", text: "#1a4fa0", border: "#a8c4f0" },
  "Sales Rep":{ bg: "#fef3e2", text: "#8a5a00", border: "#f0c870" },
  Orders:     { bg: "#fce8e8", text: "#9a2020", border: "#f0a8a8" },
};
