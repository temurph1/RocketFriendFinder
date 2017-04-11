var request = require('request'),
cheerio = require('cheerio'),
titles = [];

request('http://www.reddit.com/r/RocketLeagueFriends/', function(err, resp, body){
	if (!err && resp.statusCode == 200){
		var $ = cheerio.load(body);
		$('a.title', '#siteTable').each(function(){
			titles.push($(this).html());
		});

		console.log(titles);

	}
});





