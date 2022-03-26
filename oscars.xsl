<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

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
			<xsl:for-each select="Nomination">
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
							<xsl:value-of select="Won"/>
						</td>
						<td>
							<xsl:value-of select="Info"/>
						</td>
					</tr>
				</xsl:if>
			</xsl:for-each>
		</table>
		<ol>
			<xsl:for-each select="Nomination">
			  <xsl:if 
					test="contains(Year, $year) and contains(Category, $category) and contains(Nominee, $nominee) and contains(Info, $info) and contains(Won, $won)"
				>
					<li>
						<p>
							<xsl:value-of select="Year"/>, <xsl:value-of select="Category"/> 
						</p>
						<p>
							<xsl:value-of select="Nominee"/>
						</p>
						<p>
							<xsl:value-of select="Info"/>
						</p>
						<p>
							<xsl:value-of select="Won"/>
						</p>
					</li>
				</xsl:if>
			</xsl:for-each>
		</ol>
  </xsl:template>

</xsl:stylesheet>