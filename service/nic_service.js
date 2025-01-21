var http = require('http');
var url = require('url');

http.createServer(
    (req, res) => {
        // parse url
        let parsedUrl = url.parse(req.url, true);
        // writing header
        res.writeHead(200, {'Content-Type':'text/plain'});

        if (parsedUrl.pathname==='/nic'){
            res.write("Receiving NIC number...\nProcessing...\n");
            let nic = parsedUrl.query.nic_number;
            
            // year
            let year = nic.substring(0,4);

            // middle portion for gender and birth day
            let middle = nic.substring(4,7);

            let day = 0;

            // gender
            if (middle < 500) {
                res.write("You are a Male\n");
                day = middle;
            } else {
                res.write("You are a Female\n");
                day = middle - 500;
            }

            let month, date;

            // birth date
            if (day <= 31) {
                month = 1;
                date = day;
            } else if (day <= 60) {
                month = 2;
                date = day - 31;
            } 
            else if (day <= 91) {
                month = 3;
                date = day - 60;
            } else if (day <= 121) {
                month = 4;
                date = day - 91;
            } else if (day <= 152) {
                month = 5;
                date = day - 121;
            } else if (day <= 182) {
                month = 6;
                date = day - 152;
            } else if (day <= 213) {
                month = 7;
                date = day - 182;
            } else if (day <= 244) {
                month = 8;
                date = day - 213;
            } else if (day <= 274) {
                month = 9;
                date = day - 244;
            } else if (day <= 305) {
                month = 10;
                date = day - 274;
            } else if (day <= 335) {
                month = 11;
                date = day - 305;
            } else if (day <= 366) {
                month = 12;
                date = day - 335;
            } else {
                res.write("Invalid NIC number\n");
                res.end();
                return;
            }

            res.write(`Your birth date is: ${year}-${month}-${date}\n`);
            res.end();

        } else {
            res.statusCode = 404;
            res.end('Page Not Found');
        }
    }
).listen(9090);