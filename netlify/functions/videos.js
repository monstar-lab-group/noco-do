const { getAllVideos } = require('../../lib/markdown');

exports.handler = async function(event, context) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'CORS enabled' })
    };
  }

  try {
    const videos = getAllVideos();
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(videos)
    };
  } catch (error) {
    console.error('Error in videos function:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to fetch videos' })
    };
  }
};
