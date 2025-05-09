const { getVideoById } = require('../../lib/markdown');

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
    const id = event.path.split('/').pop();
    
    if (!id) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Video ID is required' })
      };
    }
    
    const video = getVideoById(id);
    
    if (!video) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ error: 'Video not found' })
      };
    }
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(video)
    };
  } catch (error) {
    console.error('Error in video-by-id function:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to fetch video' })
    };
  }
};
