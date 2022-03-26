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
	  echo "<h4>$key:" . htmlentities($val) . "</h4>";
	}

	// Set parameters
	$processor->setParameter("", "year", "83");
	$processor->setParameter("", "category", "Leading");

	// Transform to html
	$htmlDoc = $processor->transformToDoc($xmlDoc);

	// Print result
	print $htmlDoc->saveXML();