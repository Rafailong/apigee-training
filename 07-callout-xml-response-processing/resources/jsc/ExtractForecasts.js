var yweather= new Namespace("http://xml.weather.yahoo.com/ns/rss/1.0");

var content = context.getVariable('response.content')
    .replace(/^<\?xml.*?\?>\s+/, '')
    .replace(/<!--.*?-->/gm, '');
var responseXML = new XML(content);

var response = [];
var forecasts = responseXML..yweather::forecast;
for each (var f in forecasts) {
    var code = f.@code.toString(),
        date = f.@date.toString(),
        day = f.@day.toString(),
        high = f.@high.toString(),
        low = f.@low.toString(),
        text = f.@text.toString();
    response.push({'code': code, 'date': date, 'day': day, 'high': high, 'low': low, 'text': text});
}

context.setVariable('forecasts', JSON.stringify({'response': response}));
