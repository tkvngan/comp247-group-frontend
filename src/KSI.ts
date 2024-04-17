export type FieldName =
       "ROAD_CLASS"
     | "DISTRICT"
     | "ACCLOC"
     | "TRAFFCTL"
     | "VISIBILITY"
     | "LIGHT"
     | "RDSFCOND"
     | "INVTYPE"
     | "INVAGE"
     | "INJURY"
     | "HOOD_158"
     | "LATITUDE"
     | "LONGITUDE"
     | "PEDESTRIAN"
     | "CYCLIST"
     | "AUTOMOBILE"
     | "MOTORCYCLE"
     | "TRUCK"
     | "TRSN_CITY_VEH"
     | "EMERG_VEH"
     | "PASSENGER"
     | "SPEEDING"
     | "AG_DRIV"
     | "REDLIGHT"
     | "ALCOHOL"
     | "DISABILITY";

export interface FieldDefinition {
    description: string;
    type: "number" | "string" | "boolean" ;
    values?: string[] | Record<string, string>;
}

export type FieldDefinitions = Record<FieldName, FieldDefinition>

export const fieldDefinitions: FieldDefinitions = {
    ROAD_CLASS: {
        description: "Road Classification",
        type: "string",
        values: ["Collector", "Expressway", "Expressway Ramp", "Laneway", "Local", "Major Arterial", "Major Arterial Ramp", "Minor Arterial", "Other", "Pending"]
    },
    
    DISTRICT: {
        description: "City District",
        type: "string",
        values: ["Etobicoke York", "North York", "Scarborough", "Toronto East York", "Toronto and East York"]
    },

    ACCLOC: {
        description: "Collision Location",
        type: "string",
        values: ["At Intersection", "At/Near Private Drive", "Intersection Related", "Laneway", "Non Intersection", "Overpass or Bridge", "Private Driveway", "Trail", "Underpass or Tunnel"]
    },
    
    TRAFFCTL: {
        description: "Traffic Control Type",
        type: "string",
        values: ["No Control", "Pedestrian Crossover", "Police Control", "School Guard", "Stop Sign", "Streetcar (Stop for)", "Traffic Controller", "Traffic Gate", "Traffic Signal", "Yield Sign"]
    },
    
    VISIBILITY: {
        description: "Environment Condition",
        type: "string",
        values: ["Clear", "Drifting Snow", "Fog, Mist, Smoke, Dust", "Freezing Rain", "Other", "Rain", "Snow", "Strong wind"]
    },
    
    LIGHT: {
        description: "Light Condition",
        type: "string",
        values: ["Dark", "Dark, artificial", "Dawn", "Dawn, artificial", "Daylight", "Daylight, artificial", "Dusk", "Dusk, artificial", "Other"]
    },
    
    RDSFCOND: {
        description: "Road Surface Condition",
        type: "string",
        values: ["Dry", "Ice", "Loose Sand or Gravel", "Loose Snow", "Other", "Packed Snow", "Slush", "Spilled liquid", "Wet"]
    },
    
    INVTYPE: {
        description: "Involvement Type",
        type: "string",
        values: ["Cyclist", "Cyclist Passenger", "Driver", "Driver - Not Hit", "In-Line Skater", "Moped Driver", "Moped Passenger", "Motorcycle Driver", "Motorcycle Passenger", "Other", "Other Property Owner", "Passenger", "Pedestrian", "Pedestrian - Not Hit", "Trailer Owner", "Truck Driver", "Vehicle Owner", "Wheelchair", "Witness"]
    },
    
    INVAGE: {
        description: "Age of Involved Party",
        type: "string",
        values: ["0 to 4", "10 to 14", "15 to 19", "20 to 24", "25 to 29", "30 to 34", "35 to 39", "40 to 44", "45 to 49", "5 to 9", "50 to 54", "55 to 59", "60 to 64", "65 to 69", "70 to 74", "75 to 79", "80 to 84", "85 to 89", "90 to 94", "Over 95", "unknown"]
    },
    
    INJURY: {
        description: "Severity of Injury",
        type: "string",
        values: ["Fatal", "Major", "Minimal", "Minor"]
    },

    HOOD_158: {
        description: "Neighborhood",
        type: "string",
        values: {
            "1": "West Humber-Clairville",
            "2": "Mount Olive-Silverstone-Jamestown",
            "3": "Thistletown-Beaumond Heights",
            "4": "Rexdale-Kipling",
            "5": "Elms-Old Rexdale",
            "6": "Kingsview Village-The Westway",
            "7": "Willowridge-Martingrove-Richview",
            "8": "Humber Heights-Westmount",
            "9": "Edenbridge-Humber Valley",
            "10": "Princess-Rosethorn",
            "11": "Eringate-Centennial-West Deane",
            "12": "Markland Wood",
            "13": "Etobicoke West Mall",
            "15": "Kingsway South",
            "16": "Stonegate-Queensway",
            "18": "New Toronto",
            "19": "Long Branch",
            "20": "Alderwood",
            "21": "Humber Summit",
            "22": "Humbermede",
            "23": "Pelmo Park-Humberlea",
            "24": "Black Creek",
            "25": "Glenfield-Jane Heights",
            "27": "York University Heights",
            "28": "Rustic",
            "29": "Maple Leaf",
            "30": "Brookhaven-Amesbury",
            "31": "Yorkdale-Glen Park",
            "32": "Englemount-Lawrence",
            "33": "Clanton Park",
            "34": "Bathurst Manor",
            "35": "Westminster-Branson",
            "36": "Newtonbrook West",
            "37": "Willowdale West",
            "38": "Lansing-Westgate",
            "39": "Bedford Park-Nortown",
            "40": "St.Andrew-Windfields",
            "41": "Bridle Path-Sunnybrook-York Mills",
            "42": "Banbury-Don Mills",
            "43": "Victoria Village",
            "44": "Flemingdon Park",
            "46": "Pleasant View",
            "47": "Don Valley Village",
            "48": "Hillcrest Village",
            "49": "Bayview Woods-Steeles",
            "50": "Newtonbrook East",
            "52": "Bayview Village",
            "53": "Henry Farm",
            "54": "O`Connor Parkview",
            "55": "Thorncliffe Park",
            "56": "Leaside-Bennington",
            "57": "Broadview North",
            "58": "Old East York",
            "59": "Danforth-East York",
            "60": "Woodbine-Lumsden",
            "61": "Taylor Massey",
            "62": "East End Danforth",
            "63": "The Beaches",
            "64": "Woodbine Corridor",
            "65": "Greenwood-Coxwell",
            "66": "Danforth",
            "67": "Playter Estates-Danforth",
            "68": "North Riverdale",
            "69": "Blake-Jones",
            "70": "South Riverdale",
            "71": "Cabbagetown-South St. James Town",
            "72": "Regent Park",
            "73": "Moss Park",
            "74": "North St. James Town",
            "78": "Kensington-Chinatown",
            "79": "University",
            "80": "Palmerston-Little Italy",
            "81": "Trinity-Bellwoods",
            "83": "Dufferin Grove",
            "84": "Little Portugal",
            "85": "South Parkdale",
            "86": "Roncesvalles",
            "87": "High Park-Swansea",
            "88": "High Park North",
            "89": "Runnymede-Bloor West Village",
            "90": "Junction Area",
            "91": "Weston-Pelham Park",
            "92": "Corso Italia-Davenport",
            "94": "Wychwood",
            "95": "Annex",
            "96": "Casa Loma",
            "97": "Yonge-St. Clair",
            "98": "Rosedale-Moore Park",
            "99": "Mount Pleasant East",
            "100": "Yonge-Eglinton",
            "101": "Forest Hill South",
            "102": "Forest Hill North",
            "103": "Lawrence Park South",
            "105": "Lawrence Park North",
            "106": "Humewood-Cedarvale",
            "107": "Oakwood Village",
            "108": "Briar Hill-Belgravia",
            "109": "Caledonia-Fairbank",
            "110": "Keelesdale-Eglinton West",
            "111": "Rockcliffe-Smythe",
            "112": "Beechborough-Greenbrook",
            "113": "Weston",
            "114": "Lambton Baby Point",
            "115": "Mount Dennis",
            "116": "Steeles",
            "118": "Tam O’Shanter-Sullivan",
            "119": "Wexford/Maryvale",
            "120": "Clairlea-Birchmount",
            "121": "Oakridge",
            "122": "Birchcliffe-Cliffside",
            "123": "Cliffcrest",
            "124": "Kennedy Park",
            "125": "Ionview",
            "126": "Dorset Park",
            "128": "Agincourt South-Malvern West",
            "129": "Agincourt North",
            "130": "Milliken",
            "133": "Centennial Scarborough",
            "134": "Highland Creek",
            "135": "Morningside",
            "136": "West Hill",
            "138": "Eglinton East",
            "139": "Scarborough Village",
            "140": "Guildwood",
            "141": "Golfdale-Cedarbrae-Woburn",
            "142": "Woburn North",
            "143": "West Rouge",
            "144": "Morningside Heights",
            "145": "Malvern West",
            "146": "Malvern East",
            "147": "L’Amoreaux West",
            "148": "East L’Amoreaux",
            "149": "Parkwoods-O’Connor Hills",
            "150": "Fenside-Parkwoods",
            "151": "Yonge-Doris",
            "152": "East Willowdale",
            "153": "Avondale",
            "154": "Oakdale-Beverley Heights",
            "155": "Downsview",
            "156": "Bendale-Glen Andrew",
            "157": "Bendale South",
            "158": "Islington",
            "159": "Etobicoke City Centre",
            "160": "Mimico-Queensway",
            "161": "Humber Bay Shores",
            "162": "West Queen West",
            "163": "Fort York-Liberty Village",
            "164": "Wellington Place",
            "165": "Harbourfront-CityPlace",
            "166": "St Lawrence-East Bayfront-The Islands",
            "167": "Church-Wellesley",
            "168": "Downtown Yonge East",
            "169": "Bay-Cloverhill",
            "170": "Yonge-Bay Corridor",
            "171": "Junction-Wallace Emerson",
            "172": "Dovercourt Village",
            "173": "North Toronto",
            "174": "South Eglinton-Davisville",
            "NSA": "NSA"
        },
    },

    LATITUDE: {
        description: "Latitude",
        type: "number"
    },

    LONGITUDE: {
        description: "Longitude",
        type: "number"
    },

    PEDESTRIAN: {
        description: "Pedestrian Involved",
        type: "boolean"
    },
    
    CYCLIST: {
        description: "Cyclist Involved",
        type: "boolean"
    },
    
    AUTOMOBILE: {
        description: "Driver Involved",
        type: "boolean"
    },
    
    MOTORCYCLE: {
        description: "Motorcyclist Involved",
        type: "boolean"
    },
    
    TRUCK: {
        description: "Truck Driver Involved",
        type: "boolean"
    },
    
    TRSN_CITY_VEH: {
        description: "Transit or City Vehicle Involved",
        type: "boolean"
    },
    
    EMERG_VEH: {
        description: "Emergency Vehicle Involved",
        type: "boolean"
    },
    
    PASSENGER: {
        description: "Passenger Involved",
        type: "boolean"
    },
    
    SPEEDING: {
        description: "Speeding Related",
        type: "boolean"
    },
    
    AG_DRIV: {
        description: "Aggressive and Distracted Driving",
        type: "boolean"
    },
    
    REDLIGHT: {
        description: "Red Light Related",
        type: "boolean"
    },
    
    ALCOHOL: {
        description: "Alcohol Related",
        type: "boolean"
    },
    
    DISABILITY: {
        description: "Medical or Physical Disability Related",
        type: "boolean"
    },
}

export const fieldNames: FieldName[] = Object.keys(fieldDefinitions) as FieldName[]

export const models: Record<string, string> = {
    'rf': 'Random Forest',
    'svm': 'SVM',
    'naive': 'NaiveBayes',
    'logistic': 'Logistic Regression',
    "voting": "Voting Classifier",
}
