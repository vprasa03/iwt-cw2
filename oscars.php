<?php
	echo "Hello, world!";
	$xmlDoc = new DomDocument();
	$xmlDoc->load("oscars.xml");
	$xslDoc = new DomDocument();
	$xslDoc->load("oscars.xsl");

	$processor = new XSLTProcessor();
	$xslDoc = $processor->importStylesheet($xslDoc);
	$htmlDoc = $processor->transformToDoc($xmlDoc);
	
	// Parse url query parameters
	parse_str($_SERVER["QUERY_STRING"], $params);
	foreach($params as $key => $val) {
	  echo "<h4>$key:$val</h4>";
	}

	// Print result
	print $htmlDoc->saveXML();
?>