<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

  <xsl:template match="/Oscars/Nomination">
		<ol>
			<xsl:for-each select=".">
				<li>
					<p>
							<xsl:value-of select="Year"/>, <xsl:value-of select="Category"/> 
					</p>
					<p>"<xsl:value-of select="Nominee"/></p>
					<p><xsl:value-of select="Info"/></p>
					<p><xsl:value-of selec="Won"/></p>
				</li>
			</xsl:for-each>
		</ol>
  </xsl:template>

</xsl:stylesheet>