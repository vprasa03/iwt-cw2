<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

	<!-- Parameters -->
  <xsl:param name="year"/>
  <xsl:param name="category"/>
	<xsl:param name="nominee"/>
	<xsl:param name="info"/>
	<xsl:param name="won"/>

  <xsl:template match="/Oscars">
		<table>
			<tr>
				<th>Year</th>
				<th>Category</th>
				<th>Nominee</th>
				<th>Won</th>
				<th>Info</th>
			</tr>

			<!-- Loop through each Nomination item -->
			<xsl:for-each select="Nomination">
				<!-- Test matching parameters -->
			  <xsl:if 
					test="contains(Year, $year) and contains(Category, $category) and contains(Nominee, $nominee) and contains(Info, $info) and contains(Won, $won)"
				>
					<tr>
						<td>
							<xsl:value-of select="Year"/> 
						</td>
						<td>
							<xsl:value-of select="Category"/> 
						</td>
						<td>
							<xsl:value-of select="Nominee"/>
						</td>
						<td>
							<xsl:value-of select="Info"/>
						</td>
						<td>
							<xsl:value-of select="Won?"/>
						</td>
					</tr>
				</xsl:if>
			</xsl:for-each>
		</table>
  </xsl:template>

</xsl:stylesheet>