<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
    xmlns:html="http://www.w3.org/TR/REC-html40"
    xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
    xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
      <head>
        <title>XML Sitemap | BuyPvaGmail.com (Rank Math SEO Style)</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style type="text/css">
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
            color: #334155;
            background-color: #f8fafc;
            margin: 0;
            padding: 30px 20px;
            line-height: 1.5;
          }
          .container {
            max-width: 1100px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 12px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.07), 0 2px 4px -2px rgba(0, 0, 0, 0.05);
            border: 1px solid #e2e8f0;
            overflow: hidden;
          }
          .header {
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
            color: #ffffff;
            padding: 32px 36px;
            border-bottom: 3px solid #2563eb;
          }
          .header h1 {
            margin: 0 0 8px 0;
            font-size: 26px;
            font-weight: 800;
            letter-spacing: -0.02em;
            display: flex;
            align-items: center;
            gap: 10px;
          }
          .badge {
            display: inline-block;
            background-color: #2563eb;
            color: #ffffff;
            font-size: 11px;
            font-weight: 700;
            text-transform: uppercase;
            padding: 3px 8px;
            border-radius: 4px;
            letter-spacing: 0.05em;
          }
          .header p {
            margin: 0;
            color: #94a3b8;
            font-size: 14px;
          }
          .header p a {
            color: #60a5fa;
            text-decoration: none;
            font-weight: 600;
          }
          .header p a:hover {
            text-decoration: underline;
          }
          .nav-bar {
            background: #f1f5f9;
            padding: 12px 36px;
            font-size: 13px;
            color: #64748b;
            border-bottom: 1px solid #e2e8f0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 10px;
          }
          .nav-bar a {
            color: #2563eb;
            font-weight: 600;
            text-decoration: none;
          }
          .content {
            padding: 24px 36px 36px 36px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            font-size: 13px;
          }
          th {
            background-color: #f8fafc;
            color: #475569;
            font-weight: 700;
            text-align: left;
            padding: 12px 14px;
            border-bottom: 2px solid #cbd5e1;
            text-transform: uppercase;
            font-size: 11px;
            letter-spacing: 0.05em;
          }
          td {
            padding: 12px 14px;
            border-bottom: 1px solid #f1f5f9;
            vertical-align: middle;
          }
          tr:hover td {
            background-color: #f8fafc;
          }
          tr:nth-child(even) {
            background-color: #fafbfd;
          }
          td a {
            color: #0f172a;
            font-weight: 600;
            text-decoration: none;
            word-break: break-all;
          }
          td a:hover {
            color: #2563eb;
            text-decoration: underline;
          }
          .url-index {
            color: #94a3b8;
            font-size: 11px;
            width: 40px;
          }
          .date-cell {
            color: #64748b;
            font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
            font-size: 12px;
            white-space: nowrap;
          }
          .tag {
            display: inline-block;
            background: #e0f2fe;
            color: #0369a1;
            padding: 2px 6px;
            border-radius: 4px;
            font-size: 11px;
            font-weight: 600;
          }
          .footer {
            padding: 18px 36px;
            background: #f8fafc;
            border-top: 1px solid #e2e8f0;
            color: #64748b;
            font-size: 12px;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>
              <span>XML Sitemap Index</span>
              <span class="badge">Rank Math SEO</span>
            </h1>
            <p>
              Generated by Rank Math SEO standard schema for 
              <a href="https://buypvagmail.com/">BuyPvaGmail.com</a> to index all verified PVA &amp; Aged Gmail products.
            </p>
          </div>

          <div class="nav-bar">
            <div>
              <xsl:choose>
                <xsl:when test="sitemap:sitemapindex">
                  <span>Sitemaps in this index: <strong><xsl:value-of select="count(sitemap:sitemapindex/sitemap:sitemap)"/></strong></span>
                </xsl:when>
                <xsl:otherwise>
                  <span>URLs in this sitemap: <strong><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></strong></span>
                </xsl:otherwise>
              </xsl:choose>
            </div>
            <div>
              <a href="https://buypvagmail.com/sitemap_index.xml">Index XML</a> | 
              <a href="https://buypvagmail.com/product-sitemap.xml">Products XML</a> | 
              <a href="https://buypvagmail.com/vintage-sitemap.xml">Vintage XML</a> | 
              <a href="https://buypvagmail.com/sitemap">HTML Sitemap</a>
            </div>
          </div>

          <div class="content">
            <!-- SITEMAP INDEX VIEW -->
            <xsl:if test="sitemap:sitemapindex">
              <table>
                <thead>
                  <tr>
                    <th class="url-index">#</th>
                    <th>Sitemap</th>
                    <th>Last Modified</th>
                  </tr>
                </thead>
                <tbody>
                  <xsl:for-each select="sitemap:sitemapindex/sitemap:sitemap">
                    <tr>
                      <td class="url-index"><xsl:value-of select="position()"/></td>
                      <td>
                        <a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc"/></a>
                      </td>
                      <td class="date-cell">
                        <xsl:value-of select="sitemap:lastmod"/>
                      </td>
                    </tr>
                  </xsl:for-each>
                </tbody>
              </table>
            </xsl:if>

            <!-- URLSET VIEW (Single Sitemap) -->
            <xsl:if test="sitemap:urlset">
              <table>
                <thead>
                  <tr>
                    <th class="url-index">#</th>
                    <th>URL</th>
                    <th>Changefreq</th>
                    <th>Priority</th>
                    <th>Last Modified</th>
                  </tr>
                </thead>
                <tbody>
                  <xsl:for-each select="sitemap:urlset/sitemap:url">
                    <tr>
                      <td class="url-index"><xsl:value-of select="position()"/></td>
                      <td>
                        <a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc"/></a>
                      </td>
                      <td>
                        <xsl:if test="sitemap:changefreq">
                          <span class="tag"><xsl:value-of select="sitemap:changefreq"/></span>
                        </xsl:if>
                      </td>
                      <td style="font-weight:600; color:#2563eb;">
                        <xsl:value-of select="sitemap:priority"/>
                      </td>
                      <td class="date-cell">
                        <xsl:value-of select="sitemap:lastmod"/>
                      </td>
                    </tr>
                  </xsl:for-each>
                </tbody>
              </table>
            </xsl:if>
          </div>

          <div class="footer">
            BuyPvaGmail.com • 100% Phone Verified PVA &amp; 2008–2025 Aged Gmail Accounts • Sitemaps.org Protocol 0.9 Compliant
          </div>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
