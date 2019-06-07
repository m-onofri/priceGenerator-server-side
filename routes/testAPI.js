const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
    const listini = {
        ALL_INCLUSIVE: {
            a: {start: ["2019", "01", "15"], end: ["2019", "05", "07"], ad: 53, ad34: 42.20, chd3: 26.50, chd4: 26.50, inf: 0, animal: 5.00, culla: 10.00, sing: 15.00},
            b: {start: ["2019", "05", "08"], end: ["2019", "05", "28"], ad: 62, ad34: 49.60, chd3: 31.00, chd4: 26.50, inf: 0, animal: 5.00, culla: 10.00, sing: 15.00},
            c: {start: ["2019", "05", "29"], end: ["2019", "07", "09"], ad: 67, ad34: 53.60, chd3: 33.50, chd4: 33.50, inf: 0, animal: 5.00, culla: 10.00, sing: 15.00},
            d: {start: ["2019", "07", "10"], end: ["2019", "07", "23"], ad: 78, ad34: 62.40, chd3: 39.00, chd4: 39.00, inf: 0, animal: 5.00, culla: 10.00, sing: 15.00},
            e: {start: ["2019", "07", "24"], end: ["2019", "07", "30"], ad: 64, ad34: 51.20, chd3: 32.00, chd4: 32.00, inf: 0, animal: 5.00, culla: 10.00, sing: 15.00},
            f: {start: ["2019", "07", "31"], end: ["2019", "11", "13"], ad: 53, ad34: 42.20, chd3: 26.50, chd4: 26.50, inf: 0, animal: 5.00, culla: 10.00, sing: 15.00}
        },
        ALL_INC_PP: {
            a: {start: ["2019", "01", "15"], end: ["2019", "05", "07"], ad: 49.72, ad34: 39.78, chd3: 24.86, chd4: 24.86, inf: 0, animal: 5.00, culla: 10.00, sing: 15.00},
            b: {start: ["2019", "05", "08"], end: ["2019", "05", "28"], ad: 58.16, ad34: 46.53, chd3: 29.08, chd4: 29.08, inf: 0, animal: 5.00, culla: 10.00, sing: 15.00},
            c: {start: ["2019", "05", "29"], end: ["2019", "07", "09"], ad: 62.92, ad34: 50.34, chd3: 31.46, chd4: 31.46, inf: 0, animal: 5.00, culla: 10.00, sing: 15.00},
            d: {start: ["2019", "07", "10"], end: ["2019", "07", "23"], ad: 73.36, ad34: 58.69, chd3: 36.68, chd4: 36.68, inf: 0, animal: 5.00, culla: 10.00, sing: 15.00},
            e: {start: ["2019", "07", "24"], end: ["2019", "07", "30"], ad: 60.00, ad34: 48.00, chd3: 30.00, chd4: 30.00, inf: 0, animal: 5.00, culla: 10.00, sing: 15.00},
            f: {start: ["2019", "07", "31"], end: ["2019", "11", "13"], ad: 49.72, ad34: 39.78, chd3: 24.86, chd4: 24.86, inf: 0, animal: 5.00, culla: 10.00, sing: 15.00}
        },
        LIDL: {
            a: {start: ["2019", "01", "15"], end: ["2019", "05", "07"], ad: 46.33, ad34: 37.06, chd3: 0, chd4: 23.165, inf: 0, animal: 5.00, culla: 10.00, sing: 15.00},
            b: {start: ["2019", "05", "08"], end: ["2019", "05", "28"], ad: 59.67, ad34: 47.74, chd3: 0, chd4: 29.835, inf: 0, animal: 5.00, culla: 10.00, sing: 15.00},
            c: {start: ["2019", "05", "29"], end: ["2019", "07", "09"], ad: 63.00, ad34: 50.40, chd3: 0, chd4: 31.500, inf: 0, animal: 5.00, culla: 10.00, sing: 15.00},
            d: {start: ["2019", "07", "10"], end: ["2019", "07", "23"], ad: 78.43, ad34: 62.75, chd3: 0, chd4: 39.215, inf: 0, animal: 5.00, culla: 10.00, sing: 15.00},
            e: {start: ["2019", "07", "24"], end: ["2019", "07", "30"], ad: 59.67, ad34: 47.74, chd3: 0, chd4: 29.835, inf: 0, animal: 5.00, culla: 10.00, sing: 15.00},
            f: {start: ["2019", "07", "31"], end: ["2019", "11", "13"], ad: 46.33, ad34: 37.06, chd3: 0, chd4: 23.165, inf: 0, animal: 5.00, culla: 10.00, sing: 15.00}
        },
        LIDL_PP: {
            a:{start: ["2019", "01", "15"], end: ["2019", "05", "07"], ad: 42.62, ad34: 34.10, chd3: 0, chd4: 21.31, inf: 0, animal: 5.00, culla: 10.00, sing: 15.00},
            b:{start: ["2019", "05", "08"], end: ["2019", "05", "28"], ad: 54.90, ad34: 43.92, chd3: 0, chd4: 27.45, inf: 0, animal: 5.00, culla: 10.00, sing: 15.00},
            c:{start: ["2019", "05", "29"], end: ["2019", "07", "09"], ad: 57.96, ad34: 46.37, chd3: 0, chd4: 28.98, inf: 0, animal: 5.00, culla: 10.00, sing: 15.00},
            d:{start: ["2019", "07", "10"], end: ["2019", "07", "23"], ad: 72.16, ad34: 57.73, chd3: 0, chd4: 36.08, inf: 0, animal: 5.00, culla: 10.00, sing: 15.00},
            e:{start: ["2019", "07", "24"], end: ["2019", "07", "30"], ad: 54.90, ad34: 43.92, chd3: 0, chd4: 27.45, inf: 0, animal: 5.00, culla: 10.00, sing: 15.00},
            f:{start: ["2019", "07", "31"], end: ["2019", "11", "13"], ad: 42.62, ad34: 34.10, chd3: 0, chd4: 21.31, inf: 0, animal: 5.00, culla: 10.00, sing: 15.00}
        }   
    }
    res.send(listini);
});
 
module.exports = router;