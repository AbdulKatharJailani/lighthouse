export const htmlContent = `
  <html>
    <head>
      <style>
        body {
          font-family: 'Arial', sans-serif;
          background-color: #f5f5f5;
          color: #333;
          margin: 20px;
          padding: 20px;
        }

        h1 {
          color: #007bff;
          text-align: center;
          margin-top: 10px;
        }

        h2 {
          color: #007bff;
          margin-top: 20px;
        }

        .container {
          display: flex;
          justify-content: space-around;
          align-items: center;
          flex-wrap: wrap;
          margin-top: 20px;
        }

        .column {
          flex: 1;
          margin: 10px;
          padding: 20px;
          border-radius: 8px;
          background-color: #fff;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }

        th, td {
          border: 1px solid #ddd;
          padding: 12px;
          text-align: left;
        }

        th {
          background-color: #007bff;
          color: #fff;
          font-weight: bold;
        }

        tr:nth-child(even) {
          background-color: #f2f2f2;
        }

        tr:hover {
          background-color: #e5e5e5;
        }
      </style>
    </head>
    <body>
      <h1>Lighthouse Scores and Performance Metrics</h1>
      <h2>Website Name: {{WEBSITE_NAME}}</h2>
      <h2>Page Type: {{PAGE_TYPE}}</h2>
      <h2>Config Type: {{CONFIG_TYPE}}</h2>

      <div class='container'>
        <div class='column'>
          <h2>Category Scores</h2>
          <table>
            <tr>
              <th>Category</th>
              <th>Score (%)</th>
            </tr>
            {{CATEGORIZED_SCORES}}
          </table>
        </div>

        <div class='column'>
          <h2>Performance Metrics</h2>
          <table>
            <tr>
              <th>Metric</th>
              <th>Value</th>
            </tr>
            {{PERFORMANCE_METRICS_ROWS}}
          </table>
        </div>
      </div>
    </body>
  </html>
`;
