http://www.service-repository.com/service/overview/-2082028434

I. GetCitiesByCountry Web Service

Proxy endpoint: /v1/countries/<country>
Proxy method: GET
WSDL: http://www.webservicex.com/globalweather.asmx?WSDL



Proxy must:
1. Accept GET method only
2. Receive country path parameter
3. Cache response by Country for 1 min
4. Proxy must be secured by Apikey and Appsecret via HTTP header Authorization with a Basic realm
5. Response format can be JSON or XML as follows:
   a. HTTP header Accept is either application/json or application/xml,
      if present and not any of those two then return "405 Method Not Allowed",
      with body {"message": "Your message here", "errorCode": 405, "info": "https://en.wikipedia.org/wiki/List_of_HTTP_status_codes"}

   b. If <country>.json or <country>.xml it overrides (a) HTTP header Accept,
      if present and not any of those two then return "405 Method Not Allowed",
      with body {"message": "Your message here", "errorCode": 405, "info": "https://en.wikipedia.org/wiki/List_of_HTTP_status_codes"}

   c. If (a) or (b) are missing then default to application/json

6. Proxy must have a Target Endpoint, invokation must be performed neither as Service Callout nor JavaScript policy
7. Transformation to JSON must not be performed by using XML-to-JSON policy but
   a. Using JavaScript E4X libraries +
   b. Using XSLT ++
8. Response must be:
   JSON:
   {
        "_metadata": {
            "_link": "<original URL request>"
        },
        "country": "<country path parameter>",
        "count": "<number of returned cities>",
        "cities": [
            {
                "name": "cityName1"
            },
            {
                "name": "cityName2"
            },
            {
                "name": "cityNameN"
            }
        ]
  }

  XML:
    <?xml version="1.0" encoding="UTF-8"?>
    <Result>
       <Metadata>
          <Link>[original URL request]</Link>
       </Metadata>
       <Country>[country path parameter]</Country>
       <Count>[number of returned cities]</Count>
       <Cities>
          <City>[city name1]</City>
          <City>[city name2]</City>
          <City>[city name3]</City>
       </Cities>
    </Result>

----- Sample Request -----

POST http://www.webservicex.com/globalweather.asmx HTTP/1.1
Accept-Encoding: gzip,deflate
Content-Type: text/xml;charset=UTF-8
SOAPAction: "http://www.webserviceX.NET/GetCitiesByCountry"
Content-Length: 333
Host: www.webservicex.com
Connection: Keep-Alive
User-Agent: Apache-HttpClient/4.1.1 (java 1.5)

<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://www.webserviceX.NET">
   <soapenv:Header/>
   <soapenv:Body>
      <web:GetCitiesByCountry>
         <!--Optional:-->
         <web:CountryName>??? country name, e.g. Mexico ????</web:CountryName>
      </web:GetCitiesByCountry>
   </soapenv:Body>
</soapenv:Envelope>

----- Sample Response -----
HTTP/1.1 200 OK
Cache-Control: private, max-age=0
Content-Length: 7884
Content-Type: text/xml; charset=utf-8
Server: Microsoft-IIS/7.0
X-AspNet-Version: 4.0.30319
X-Powered-By: ASP.NET
Date: Fri, 14 Aug 2015 14:55:28 GMT

<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><GetCitiesByCountryResponse xmlns="http://www.webserviceX.NET"><GetCitiesByCountryResult>&lt;NewDataSet&gt;
  &lt;Table&gt;
    &lt;Country&gt;Mexico&lt;/Country&gt;
    &lt;City&gt;Acapulco / G. Alvarez&lt;/City&gt;
  &lt;/Table&gt;
  &lt;Table&gt;
    &lt;Country&gt;Mexico&lt;/Country&gt;
    &lt;City&gt;Aerop. Internacional Monterrey, N. L.&lt;/City&gt;
  &lt;/Table&gt;
  &lt;Table&gt;
    &lt;Country&gt;Mexico&lt;/Country&gt;
    &lt;City&gt;Aguascalientes, Ags.&lt;/City&gt;
  &lt;/Table&gt;
  &lt;Table&gt;
    &lt;Country&gt;Mexico&lt;/Country&gt;
    &lt;City&gt;Bahias De Huatulco&lt;/City&gt;
  &lt;/Table&gt;
&lt;/NewDataSet&gt;</GetCitiesByCountryResult></GetCitiesByCountryResponse></soap:Body></soap:Envelope>

9. Proxy must have a Quota policy with Allow, Interval and TimeUnit values extracted from Product attributes and default values 10, 1, minute. Product must have 5, 5, minute
