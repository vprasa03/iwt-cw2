<?php
	// Load xml document and xslt stylesheet
	$xmlDoc = new DomDocument();
	$xmlDoc->load("oscars.xml");
	$xslDoc = new DomDocument();
	$xslDoc->load("oscars.xsl");
	$processor = new XSLTProcessor();
	$xslDoc = $processor->importStylesheet($xslDoc);
	
	// Parse url query parameters
	parse_str($_SERVER["QUERY_STRING"], $params);
	foreach($params as $key => $val) {
	  // Pass parameters to xslt
		$processor->setParameter("", $key, htmlentities($val));
	}

	// Transform to html
	$htmlDoc = $processor->transformToDoc($xmlDoc);

	// Print result
	print $htmlDoc->saveXML();