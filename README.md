# FireCrawl MCP Integration

A Model Context Protocol (MCP) integration that provides powerful web scraping capabilities using FireCrawl's advanced features. This package enables seamless web scraping, content extraction, and data processing within your MCP-enabled environment.

## Features

- 🌐 **Advanced Web Scraping**: JavaScript rendering, dynamic content extraction
- 🔍 **Smart Content Filtering**: Customizable tag inclusion/exclusion
- 📱 **Multi-Platform Support**: Desktop and mobile viewport options
- 🚀 **Batch Processing**: Efficient handling of multiple URLs
- 🔄 **Automatic Retries**: Built-in retry mechanism with exponential backoff
- 📊 **Credit Monitoring**: Track API usage with configurable thresholds
- 🔒 **Secure Configuration**: Environment-based secret management

## Installation

```bash
npm install firecrawl-mcp
```

## Quick Start

1. Set up your FireCrawl API key:
```bash
export FIRECRAWL_API_KEY=your-api-key
```

2. Run the MCP server:
```bash
npx firecrawl-mcp
```

## Configuration

### Environment Variables

Required:
- `FIRECRAWL_API_KEY`: Your FireCrawl API key

Optional:
- `FIRECRAWL_API_URL`: Custom API endpoint for self-hosted instances
- `FIRECRAWL_RETRY_MAX_ATTEMPTS`: Maximum retry attempts (default: 3)
- `FIRECRAWL_RETRY_INITIAL_DELAY`: Initial retry delay in ms (default: 1000)
- `FIRECRAWL_RETRY_MAX_DELAY`: Maximum retry delay in ms (default: 10000)
- `FIRECRAWL_RETRY_BACKOFF_FACTOR`: Retry backoff multiplier (default: 2)
- `FIRECRAWL_CREDIT_WARNING_THRESHOLD`: Credit warning level (default: 1000)
- `FIRECRAWL_CREDIT_CRITICAL_THRESHOLD`: Credit critical level (default: 100)

## Usage Examples

### Basic Web Scraping
```javascript
{
  "name": "firecrawl_scrape",
  "arguments": {
    "url": "https://example.com",
    "formats": ["markdown"],
    "onlyMainContent": true
  }
}
```

### Batch Processing
```javascript
{
  "name": "firecrawl_batch_scrape",
  "arguments": {
    "urls": [
      "https://example1.com",
      "https://example2.com"
    ],
    "options": {
      "formats": ["markdown"],
      "onlyMainContent": true
    }
  }
}
```

### Web Search with Content Extraction
```javascript
{
  "name": "firecrawl_search",
  "arguments": {
    "query": "your search query",
    "limit": 5,
    "scrapeOptions": {
      "formats": ["markdown"],
      "onlyMainContent": true
    }
  }
}
```

## Development

1. Clone the repository:
```bash
git clone https://github.com/yourusername/firecrawl-mcp.git
```

2. Install dependencies:
```bash
npm install
```

3. Run tests:
```bash
npm test
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Security

- Never commit your API keys or sensitive credentials
- Use environment variables for configuration
- Regularly rotate your API keys
- Monitor credit usage to prevent unauthorized access

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- Documentation: [FireCrawl Docs](https://firecrawl.dev/docs)
- Issues: [GitHub Issues](https://github.com/yourusername/firecrawl-mcp/issues)
- Community: [Discord Server](https://discord.gg/firecrawl)

## Acknowledgments

- FireCrawl team for the amazing API
- MCP community for continuous support
- All contributors who have helped shape this project 